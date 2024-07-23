import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormControl,
  FormsModule,
  Validators,
  FormGroup,

} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { getPatternOfNumeroTelephone, onBlurInputMontant, setObjets1ToObjets2 } from 'src/app/global-functions';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { DocumentsComponent } from '../../products/documents/documents.component';

import { FraisComponent } from '../../products/frais/frais.component';
import { DetailsComponent } from '../../clients/details/details.component';
import { AdrLivraisonComponent } from '../../clients/adr-livraison/adr-livraison.component';
import { ContactComponent } from '../contact/contact.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexBreadcrumbComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumb/vex-breadcrumb.component';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { Fournisseur } from '../models/fournisseur.model';
import { FournisseurHttpService } from '../services/fournisseur-http.service';
import { FournisseurService } from '../services/fournisseur.service';
import { CategorieHttpService } from '../../categories/services/categorie-http.service';
import { FamilleHttpService } from '../../familles/services/famille-http.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categorie } from '../../categories/models/categorie.model';
import { Famille } from '../../familles/models/famille.model';
import { stagger40ms } from '@vex/animations/stagger.animation';
import Swal from 'sweetalert2';
import { getData, hideLoading, showAlertError, showLoading } from 'src/app/global-functions';
import { SharedModule } from 'src/app/utils/shared.module';
import { enum_conditionReglement, enum_modeReglement, enum_statusProspection } from 'src/app/global-enums';
import { UtilService } from 'src/app/utils/UtilService.service';

@Component({
  selector: 'vex-fournisseur-create-update',
  templateUrl: './fournisseur-create-update.component.html',
  styleUrls: ['./fournisseur-create-update.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    CommonModule,
    FraisComponent,
    DocumentsComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe,
    StandartAutocompleteComponent,
    DetailsComponent,
    AdrLivraisonComponent,
    ContactComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    SharedModule
  ],
})
export class FournisseurCreateUpdateComponent {

  listConditionReglements = this.utilService.parseEnumToObject("enum_conditionReglement")

  foodCtrl: any = FormControl;


  disabledCtrl: any = FormControl;
  disabled: boolean = true;

  isInputDisabled: boolean = true;
  decimal_value: number = 5.123456789;

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  newItemEvent(newValue: any) {
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
    if (["pays", "gouvernorat", "delegation"].includes(newValue[0])) {
      this.filtrerAdress()
    }
  }

  auto = '';

  form: FormGroup = this.fb.group({
    _id: '',
    code: '',
    raisonSociale: ['', Validators.required],
    matriculeFiscale: '',
    telephone: ['', Validators.pattern(getPatternOfNumeroTelephone())],
    tiersCategorie: '',
    mobile: ['', Validators.pattern(getPatternOfNumeroTelephone())],
    email: ['', Validators.email],
    solde: 0,
    plafondSolde: 0,
    enCours: '',
    plafondEnCours: 0,
    remise: '0',
    conditionReglement: enum_conditionReglement.COMPTANT,//a modifier apres 
    tauxRS: '0',
    exonereTva: [false],
    exonereRS: [false],
    actif: [false],
    pays: '',
    gouvernorat: '',
    delegation: '',
    localite: '',
    codePostale: '',
    adresse: '',
    siteWeb: '',
    statusProspection: enum_statusProspection.JAMAIS_CONTACTE, // enumeartion
    modeReglement: enum_modeReglement.ESPECE, // enumeartion
    observation: '',
    adresseLivraison: [],
    contact: [],
    //code_societe: '',
    //deleted: [false],
  });

  mode: 'create' | 'update' = 'create';

  public defaults: Fournisseur = new Fournisseur(null)
  private routeSub: Subscription;
  private id: string = ''

  constructor(private fb: FormBuilder,
    private utilService: UtilService,
    private serviceHttp: FournisseurHttpService,
    private categorieServiceHttp: CategorieHttpService,
    private familleServiceHttp: FamilleHttpService,
    private service: FournisseurService,
    private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id']
        this.mode = 'update';
        console.log("this.mode = " + this.mode);
      }
    });
  }

  /*a modifier */
  clickForm() {
    console.log(this.form.get('categorie'))
  }

  allPays: any[] = []
  allTiersCategorie: any[] = []
  gouvernoratsFiltree: any[] = []
  delegationsFiltree: any[] = []
  localitesFiltree: any[] = []

  async getDetails() {
    return new Promise((resolve) => {
      this.serviceHttp.GetDetails(this.id).subscribe((res: any) => {
        this.service.successGetDetails(res, this.form, this.defaults)
        this.defaults = res.RESULTAT
        this.defaults.solde = res.RESULTAT.solde.toFixed(3);
        this.form.patchValue(this.defaults);
        resolve(null)
      });
    });
  }

  async getAllAdress() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllAdress().subscribe((res: any) => {
        this.allPays = getData(res.RESULTAT);
        this.service.setAllPays(this.allPays)
        this.filtrerAdress()
        resolve(null)
      });
    });
  }

  async getAllTypeContact() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllTypeContact().subscribe((res: any) => {
        this.service.setAllTypeContacts(getData(res.RESULTAT));
        resolve(null)
      });
    });
  }

  async getAllTiersCategorie() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllTiersCategorie().subscribe((res: any) => {
        this.allTiersCategorie = getData(res.RESULTAT);
        resolve(null)
      });
    });
  }


  async ngOnInit() {
    showLoading()
    if (this.id) {
      await this.getDetails()
    }
    await this.getAllAdress()
    await this.getAllTypeContact()
    await this.getAllTiersCategorie()
    hideLoading()
  }

  filtrerAdress() {
    let inputs: any = {
      pays: this.form.controls['pays'].value,
      gouvernorat: this.form.controls['gouvernorat'].value,
      delegation: this.form.controls['delegation'].value,
      localite: this.form.controls['localite'].value
    }

    let outputs = this.service.filtrerAdress(inputs, this.allPays)

    this.delegationsFiltree = outputs.delegationsFiltree
    this.gouvernoratsFiltree = outputs.gouvernoratsFiltree
    this.localitesFiltree = outputs.localitesFiltree

    this.defaults.pays = outputs.pays
    this.defaults.gouvernorat = outputs.gouvernorat
    this.defaults.delegation = outputs.delegation
    this.defaults.localite = outputs.localite

    this.form.patchValue(outputs)
  }

  save() {
    if (!this.form.valid) {
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }
    if (this.mode === 'create') {
      this.createProduct();
    } else if (this.mode === 'update') {
      this.updateProduct();
    }
  }

  createProduct() {
    showLoading()
    const item = this.service.remove_id(this.form.value);
    this.serviceHttp.AddNew(item).subscribe((res: any) => {
      this.service.successCreate(res)
    });
  }

  updateProduct() {
    showLoading()
    const item = this.service.remove_IdInSousList(this.form.value);
    this.serviceHttp.update(item).subscribe((res: any) => {
      this.service.successCreate(res)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  // Event handler for the blur event (hover out)
  onBlur(event: any) {
    onBlurInputMontant(event);
  }

  changeExonereRS() {
    let tauxRS = this.form.get('exonereRS') ? 0 : this.form.get('tauxRS')
    this.form.patchValue({ tauxRS: tauxRS })
  }

}

