import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';

import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf, CommonModule } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter } from 'stream';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/utils/shared.module';
import { dateVaidator, getDateByForma, getDateInput, isObjectIdMongoose, notEqualToZero, roundmMontantString, showAlertError, showAlertSucess, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { TokenService } from 'src/app/services/token.service';
import { Lettrage, Reglement } from 'src/app/erp_params/reglements/models/reglement.model';
import { ReglementHttpService } from 'src/app/erp_params/reglements/services/reglement-http.service';
import { BanqueHttpService } from 'src/app/erp_params/banque/services/banque-http.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Banque, IBanqueCollection } from 'src/app/erp_params/banque/models/banque.model';
import { CompteBancaires, ICompteBancaires } from 'src/app/erp_params/compteBancaires/models/compteBancaires.model';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import {  NavigationEnd } from '@angular/router';
import { MatTable } from '@angular/material/table';
import Swal from "sweetalert2";


@Component({
  selector: 'vex-reglement-create-update',
  templateUrl: './reglement-create-update.component.html',
  styleUrls: ['./reglement-create-update.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    NgFor,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatDatepickerModule,
    SharedModule,
    StandartAutocompleteComponent
  ],
  providers:
    [
      { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class CreateAndUpdateReglementComponent implements OnInit {

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  static id = 0
  fournisseurs: any[] = [];
  clients: any[] = [];
  @ViewChild('table', { static: true }) table!: MatTable<any>;

  reglements: any[] = [];
  displayedColumns: string[] = ['modeReglement', 'numPiece', 'banque', 'dateEcheance', 'titulaire', 'ticketEcart', 'montant', 'delete'];


  showClients: boolean = true;
  showFournisseurs: boolean = true;
  showFields: boolean = false;

  

  form: FormGroup = this.fb.group({
    _id: [this.data?.reglement?._id || CreateAndUpdateReglementComponent.id++ + ''],
    numero: [this.data?.reglement?.numero || ''],
    date: [this.data?.reglement?.date || new Date(), [Validators.required, dateVaidator]],
    fournisseur: [this.data?.document?.fournisseur || {}],
    client: [this.data?.document?.client || {}],
    modeReglement: [this.data?.reglement?.modeReglement || '1'],
    montant: [this.data?.reglement?.montant || this.data?.document?.resteAPayer, [notEqualToZero()]],
    dateEcheance: [this.data?.reglement?.dateEcheance || null, [dateVaidator]],
    compteBancaire: [this.data?.reglement?.compteBancaire || ''],
    agence: [this.data?.reglement?.agence || ''],
    banque: [this.data?.reglement?.banque || ''],
    numPiece: [this.data?.reglement?.numPiece || ''],
    titulaire: [this.data?.reglement?.titulaire || ''],
    note: [this.data?.reglement?.note || ''],
    exercice: [this.data?.reglement?.exercice || ''],
    code_societe: [this.data?.reglement?.code_societe || ''],
    code_exercice: [this.data?.reglement?.code_exercice || ''],
    code_depotpv: [this.data?.reglement?.code_depotpv || ''],
    depotpv: [this.data?.reglement?.depotpv || {}],
    sessionCaisse: [this.data?.reglement?.sessionCaisse || {}],
    lettrageReglement: [this.data?.reglement?.lettrageReglement || {}],
    utilisateur: [this.data?.reglement?.utilisateur || {}],
    MTsaisie: [this.data?.reglement?.MTsaisie || ''],
    taux: [this.data?.reglement?.taux || ''],
   

  });

  mode: 'create' | 'update' = 'create';

  changeModeReglement(ev: any) {
    const selectedValue = parseInt(ev.value, 10); 
    this.showFields = selectedValue !== 1;
    console.log('Selected value:', selectedValue);
    console.log('Show fields:', this.showFields); 
  }
  getAllFournisseurs() {
    this.reglementHTTPService.getAllFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    });
  }
  getAllClients() {
    this.reglementHTTPService.getAllClients().subscribe(data => {
      this.clients = data;
    });
  }

  getAllReglements() {
    this.reglementHTTPService.getAllReglements().subscribe(data => {
      this.reglements = data;
    });
  }


  
  calculateMontantRegle() {
    const MTsaisie = parseFloat(this.form.get('MTsaisie')?.value) || 0;
    const taux = parseFloat(this.form.get('taux')?.value) || 0;
    return (MTsaisie * taux)/100;
  }

  calculateResteAPayer() {
    const MTsaisie = parseFloat(this.form.get('MTsaisie')?.value) || 0;
    const montantRegle = this.calculateMontantRegle();
    return MTsaisie - montantRegle;
  }
  
  
  

  deleteReglement(reglement: Reglement): void {
    if (confirm(`Are you sure you want to delete ${reglement.modeReglement}?`)) {
      this.reglementHTTPService.deleteReglement(reglement).subscribe({
        next: (updatedReglements: Reglement[]) => {
          this.reglements = updatedReglements;
          console.log('Reglement deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting reglement:', err);
        }
      });
    }
  
}

  getDateFormat(date: Date) {
    return getDateInput(date)
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any | undefined,
    private banqueServiceHttp: BanqueHttpService,
    private reglementHTTPService: ReglementHttpService,
    private dialogRef: MatDialogRef<CreateAndUpdateReglementComponent>,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private route: ActivatedRoute // Inject ActivatedRoute
      
  ) 
  {
    // if (data.isDocumentAchat) {
    //   this.banqueServiceHttp.GetCollections().subscribe((res) => {
    //     if (res.OK) {
    //       this.allBanques = res.RESULTAT
    //       this.setCompteBancaires()
    //     }
    //   });
    // } else {
    //   this.banqueServiceHttp.GetAll().subscribe((res) => {
    //     if (res.OK) {
    //       this.allBanques = res.RESULTAT
    //       // this.allBanques = this.banqueServiceHttp.getData(res.RESULTAT)
    //       //this.setCompteBancaires()
    //     }
    //   });
    // }

  }

  // newItemEvent(newValue: any) {
  //   if (this.form.contains(newValue[0])) {
  //     this.form.controls[newValue[0] as string].setValue(newValue[1])
  //   }

  //   if (["banque"].includes(newValue[0]) && this.data.isDocumentAchat) {
  //     this.setCompteBancaires()
  //   }
  // }

  allBanques: IBanqueCollection[] | Banque[] = []
  allCompteBancaires: CompteBancaires[] = []
  setCompteBancaires() {
    let idBanque = this.form.value.banque ? this.form.value.banque._id : null
    let idCompteBancaire = this.form.value.compteBancaire ? this.form.value.compteBancaire._id : null
    let banque: IBanqueCollection | undefined | Banque = this.allBanques.find((x: IBanqueCollection | Banque) => x._id == idBanque)
    if (!banque) {
      this.form.controls['banque'].setValue("")
      this.form.controls['compteBancaire'].setValue("")
      this.allCompteBancaires = []
      return
    }
    this.allCompteBancaires = (banque as IBanqueCollection).compteBancaires
    let compteBanque = this.allCompteBancaires.find((x: ICompteBancaires) => x._id == idCompteBancaire)
    if (!compteBanque) {
      this.form.controls['compteBancaire'].setValue("")
      return
    }
  }

  ngOnInit() {

    
    this.form.get('MTsaisie')?.valueChanges.subscribe(() => {
      this.calculateMontantRegle();
      this.calculateResteAPayer();
    });

    this.form.get('taux')?.valueChanges.subscribe(() => {
      this.calculateMontantRegle();
      this.calculateResteAPayer();
    });

    this.route.url.subscribe(url => {
      const path = url.map(segment => segment.path).join('/');
      console.log(this.route.url);
      
  
      if (path === 'fournisseur/reglements') {
        this.showFournisseurs = true; // Show fournisseurs list
        this.showClients = false;
      } else if (path === 'reglements') {
        this.showClients = true; // Show clients list
        this.showFournisseurs = false;
        
      }
    });
    this.getAllFournisseurs();
    this.getAllClients();
    this.getAllReglements();


    if (this.data?.reglement) {
      this.mode = 'update';
    } else {
      this.form.patchValue(
        {
          exercice: this.tokenService.getCodeExercice(),
          code_societe: this.tokenService.getCodeSociete(),
          code_exercice: this.tokenService.getCodeExercice(),
          code_depotpv: this.tokenService.getCodePointeVente(),
          depotpv: this.tokenService.pointVenteCourante,
          sessionCaisse: this.tokenService.sessionCaisseCourante,
          utilisateur: {
            _id: this.tokenService.user?._id,
            nom: this.tokenService.user?.nom,
            email: this.tokenService.user?.email,
          }
        }
      )
    }

    console.log(this.form.value.date);
    

  }


 
  isUpdateReg() {
    return this.data?.reglement?.numero;
  }

 

  onBlur(event: any, dateInput: any) {
    event.stopPropagation();
    setTimeout(() => {
      dateInput.focus();
    });
  }

}