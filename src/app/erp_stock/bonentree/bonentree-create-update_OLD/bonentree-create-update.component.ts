
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {

  MatDialogModule,

} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, AsyncPipe, NgFor, NgIf, DatePipe} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { Subscription } from 'rxjs';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/utils/shared.module';
import { ComposantsComponent } from 'src/app/erp_params/products/composants/composants.component';
import { StocksComponent } from 'src/app/erp_params/products/stocks/stocks.component';
import { CodebarreComponent } from 'src/app/erp_params/products/codebarre/codebarre.component';
import { PromotionremiseComponent } from 'src/app/erp_params/products/promotionremise/promotionremise.component';
import { Promotionremise2Component } from 'src/app/erp_params/products/promotionremise2/promotionremise2.component';
import { HistoriqueachatComponent } from 'src/app/erp_params/products/historiqueachat/historiqueachat.component';
import { FideliteComponent } from 'src/app/erp_params/products/fidelite/fidelite.component';
import { DocumentsComponent } from 'src/app/erp_params/products/documents/documents.component';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TestFormComponent } from 'src/app/erp_params/products/product-create-update/test-form.component';
import { FraisComponent } from 'src/app/erp_params/products/frais/frais.component';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ReglementsComponent } from 'src/app/erp_documents_achat/components/reglements/reglements.component';
import { TokenService } from 'src/app/services/token.service';
import { ArticlesDepotPvHttpService } from 'src/app/erp_params/article-depotpvs/services/articles-depot-pv-http.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { hideLoading,showAlertError, showConfirmationDialog, showLoading } from 'src/app/global-functions';
import { DepotHttpService } from 'src/app/erp_params/depot/services/depot-http.service';
import { Depot } from 'src/app/erp_params/depot/models/depot.model';
import { UsersHttpService } from 'src/app/erp_params/users/services/users-http.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { LigneDocumentSortiesService } from '../../services/ligne-document-sorties.service';
import { Vehicule } from 'src/app/erp_flotte/vehicules/models/vehicule.model';
import { VehiculeHttpService } from 'src/app/erp_flotte/vehicules/services/vehicule-http.service';
import { DocumentEnteeSorties, LigneDocumentEntreeSorties } from '../../entreeSortie/entresortie.model';
import { DataParamRoute } from '../modeles/data.model';
import { BonentreeHttpService } from '../services/bonentree-http.service';
import { BonentreeService } from '../services/bonentree.service';
import { LigneDocumenEntreeComponent } from '../../components/ligne-document-entree/ligne-document-entree.component';
import { BonsortiesHttpService } from '../../bonsorties/services/bonsorties-http.service';
import { ListeLigneDocumentSortiesComponent } from '../../components/liste-ligne-document-sorties/liste-ligne-document-sorties.component';
import { ListeLigneDocumentEntreeComponent } from '../../components/liste-ligne-document-entree/liste-ligne-document-entree.component';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'vex-bonentree-create-update',
  templateUrl: './bonentree-create-update.component.html',
  styleUrls: ['./bonentree-create-update.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    LigneDocumenEntreeComponent,
    RouterLink,
    SharedModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgFor,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AsyncPipe,
    VexBreadcrumbsComponent,
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
    ComposantsComponent,
    StocksComponent,
    CodebarreComponent,
    PromotionremiseComponent,
    Promotionremise2Component,
    HistoriqueachatComponent,
    FideliteComponent,
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
    VexBreadcrumbsComponent,
    TestFormComponent,
    ReglementsComponent,
    MatDatepickerModule,
    FormsModule,
    ListeLigneDocumentEntreeComponent,
    ListeLigneDocumentSortiesComponent,


  ],
  providers:
  [
     { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
   // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    DatePipe
  ]
})


export class BonentreeCreateUpdateComponent {


inputCtrl:any = FormControl;
disabled: boolean = true;
// Définir la variable isDisabled à true ou false selon la logique dans le standart-autocomplete
  isDisabled: boolean = true;// ou false
  isChecked: boolean = false;
  dataDepot: DocumentEnteeSorties[] = [];
  labelTextBC = 'etat';
  selectedKeyDepot = '_id';
  selectedValDepot = 'libelle';
  preSelectedItems:any = ""

  selectedType: any = 1;
  selectCtrl: UntypedFormControl = new UntypedFormControl();

   newItemEventDep(newValue: any) {
    this.allDepotsDest = []
    for (let item of  this.allDepots){
      if(item._id != newValue[1]["_id"])
         {
          this.allDepotsDest.push(item)
         }
        }
        this.filtredArticlesByDepot(newValue[1]["_id"])
        try {
            if (this.form.contains(newValue[0])) {
            this.form.controls[newValue[0]].setValue(newValue[1]);
            }
            if(newValue[0] == "depotpv"){
            this.form.patchValue({code_depotpv: newValue[1].codeUnique})
          }
    } catch (e) {}
  }


  /* depot destination */

  newItemEventDest(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }
     if(newValue[0] == "depotpv"){
        this.form.patchValue({code_depotpv: newValue[1].codeUnique})
      }
    } catch (e) {}
  }

  /* event vehicule  */
   newItemEventVh(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }

      if(newValue[0] == "depotpv"){
        this.form.patchValue({code_depotpv: newValue[1].codeUnique})
      }
    } catch (e) {}
  }


     /* event Ligne  */

     newItemEventLigne(newValue: any) {
      try {
        if (this.form.contains(newValue[0])) {
          this.form.controls[newValue[0]].setValue(newValue[1]);
        }

        if(newValue[0] == "depotpv"){
          this.form.patchValue({code_depotpv: newValue[1].codeUnique})
        }
      } catch (e) {}
    }

 /* event user*/

  newItemEventUser(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['nom'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
   }
  selectedTime: any;
  showDatepicker = false;
  selectedDate = new Date();
   selectDate :any = this.datePipe.transform(new Date(), "yyyy-MM-dd")


   @Input() documentOriginal!:DocumentEnteeSorties
   @Input() lignes:LigneDocumentEntreeSorties[] = []


  form:FormGroup = this.fb.group({
    _id : '',
    numero : '',
    // date: this.date_form.parse(this.defaults.date)|| new Date(),
     date : [new Date(), Validators.required],
    depotpv: [null, Validators.required],
    utilisateur: [null, Validators.required], //afficher le nom de utilisateur
    notes: '',
    lignes: [],
    code_societe: '',
    code_exercice: '',
    code_depotpv: '',
    chauffeur : '',
    vehicule:'',
    depot_PV_source:null,
    depot_PV_destination:null,
    bon_sortie:null,
    etat: [null, Validators.required]
   });
  type = new FormControl();



/*mis a jours ligne */


misajourLignes(newValue:any){
  this.lignes = newValue[1]
  this.misaJourParentEvent()
}


  newItemEvent(newValue: any) {
    this.allDepotsDest = []
    for (let item of  this.allDepots){
      if(item._id != newValue[1]["_id"])
      {
        this.allDepotsDest.push(item)
      }
    }
    this.filtredArticlesByDepot(newValue[1]["_id"])
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }
      if(newValue[0] == "depotpv"){
        this.form.patchValue({code_depotpv: newValue[1].codeUnique})
      }
    } catch (e) {}
  }

@Output() misaJourParent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "lignes"
  misaJourParentEvent() {
    this.misaJourParent.emit([this.keyOfForm, this.lignes]);
  }

/*logique open and close */
  isOpenPanelPlusDetails = false


  mode: 'create' | 'update' = 'create';

  public defaults: DocumentEnteeSorties = new DocumentEnteeSorties(null)
  private routeSub: Subscription;
  private id:string = ''
  dataParams:DataParamRoute = new DataParamRoute()

  constructor(
    public utilService:UtilService,
    private tokenService:TokenService,
    private fb: FormBuilder,
    private serviceHttp:BonentreeHttpService,
    private depotServiceHttp:DepotHttpService,
    private service:BonentreeService,
    private route: ActivatedRoute,
    private UtilisateursserviceHttp:UsersHttpService,
    private ligneDocumentSortiesService:LigneDocumentSortiesService,
    private serviceHttpProductDepotPV:ArticlesDepotPvHttpService,
    private serviceHttpVehicules:VehiculeHttpService,
    private serviceHttpBonSorties:BonsortiesHttpService,
    private datePipe:DatePipe,
    private date_form:AppDateAdapter,

  ) {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['id']){
        this.id = params['id']
        this.mode = 'update';
      }
    });

    this.route.data.subscribe((data:any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
    });
  }
  allArticles:any[] = [];
  allArticlesByDepot:any[] = [];
  allUtilisateurs:any[] = [];
  allDepots:Depot[] = [];
  allDepotsDest:any = [];
  allVehicules:Vehicule[] = [];
  allBonSorties:DocumentEnteeSorties[] = [];


 listBonSortie = this.utilService.parseEnumToObject('enum_etat_bonsortie');
  ngOnInit() {
   this.inputCtrl = new FormControl({value: '', disabled: this.disabled})
  if (this.defaults) {
    this.mode = 'create';
  } else {
    this.defaults = {} as DocumentEnteeSorties;
  }

  // this.preSelectedItems = this.defaults.ayant_acces

  this.selectedType = this.defaults.etat;
  this.form.patchValue(this.defaults);

   if(this.id){
      showLoading()
      this.serviceHttp.GetDetails(this.id).subscribe((res) => {
        hideLoading()
        this.service.successGetDetails(res, this.form, this.defaults)
        let lignes = res.RESULTAT.lignes
        res.RESULTAT.lignes.forEach((res:any) => {
          res.numero = this.ligneDocumentSortiesService.getLastNumero(lignes);
        });

        this.defaults = JSON.parse(JSON.stringify(res.RESULTAT))
        this.form.patchValue(res.RESULTAT);
        InputNumberChangeObservibalService.submitChangeInput()

      });
    }else{
      // this.defaults.depotpv = this.tokenService.pointVenteCourante
      this.defaults.utilisateur = {
        _id:   this.tokenService.user?._id ? this.tokenService.user?._id : "",
        nom:   this.tokenService.user?.nom ? this.tokenService.user?.nom : ""
      }

      this.form.patchValue(
        {
          exercice : this.tokenService.getCodeExercice(),
          code_societe : this.tokenService.getCodeSociete(),
          code_exercice : this.tokenService.getCodeExercice(),
          code_depotpv : this.tokenService.getCodePointeVente(),
          depotpv : this.tokenService.pointVenteCourante,
          utilisateur : this.tokenService.user,
          sessionCaisse: this.tokenService.sessionCaisseCourante,
        }
      )
      //this.filtredArticlesByDepot()
    }
     //getallDepots
    /*this.depotServiceHttp.GetAll().subscribe((res) => {
      this.allDepots = this.depotServiceHttp.getData(res.RESULTAT);
    });*/
    let depotCourant = JSON.parse(JSON.stringify(this.tokenService.pointVenteCourante))
    this.allDepots = depotCourant?.ayant_acces;
    this.allDepots.push(depotCourant);

     //getallUsers
    this.UtilisateursserviceHttp.GetAll().subscribe((res) => {
      this.allUtilisateurs = this.UtilisateursserviceHttp.getData(res.RESULTAT);
    });

     //getallArticles
    this.serviceHttpProductDepotPV.getAllArticlesByDepotPV().subscribe((res) => {
      this.allArticles = this.serviceHttpProductDepotPV.getDataArticleDepotPvss(res.RESULTAT) ;
      this.filtredArticlesByDepot(this.tokenService.pointVenteCourante._id)
    });


     //getallVehicules
     this.serviceHttpVehicules.GetAll().subscribe((res) => {
      this.allVehicules = this.serviceHttpVehicules.getData(res.RESULTAT) ;

    });

      //getallBonSorties
     this.serviceHttpBonSorties.GetAll().subscribe((res) => {
      this.allBonSorties = this.serviceHttpBonSorties.getData(res.RESULTAT) ;
     });

  }

  filtredArticlesByDepot(_id_dp:any){
    if(this.form.value.depotpv){
      //this.allArticlesByDepot = this.allArticles.filter(x => x.depotpv._id == this.form.value.depotpv._id)
      this.allArticlesByDepot = this.allArticles.filter(x => x.depotpv._id == _id_dp)
    }else{
      this.allArticlesByDepot = []
    }
  }

  save() {

    // if(!this.ligneDocumentSortiesService.checkAllLigne(this.defaults, this.form.value.lignes, this.allArticles)) return
    if (!this.form.valid){
      StandartAutocompleteService.submitFormAutocomplete()
      // showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }
    // showConfirmationDialog('Confirmation', 'Êtes-vous sûr de vouloir enregistrer dans le depot " '+this.form.value.depotpv?.libelle+' " ?')
    {
        if (this.mode === 'create') {
          this.createProduct();
        } else if (this.mode === 'update') {
          this.updateProduct();
        }
      }
        // User cancelled, handle accordingly

    }
   createProduct() {
    const item = this.service.remove_id(this.form.value);
    showLoading()
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res)
    });
  }

  updateProduct() {
    showLoading()
    const item = this.service.remove_IdInSousList(this.form.value);
    this.serviceHttp.update(item).subscribe((res) => {
      this.service.successCreate(res)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }


  checkQuantite(){
    return this.ligneDocumentSortiesService.checkQuantiteIsValide(this.documentOriginal, this.lignes, this.allArticles, this.form.value, undefined)
  }



  addDetails(){


    if( !this.checkQuantite() ){
      return
    }
    if (!this.form.valid){
      if(!this.form.controls['bon_sortie'].value){
        showAlertError('Erreur!', 'Veuillez selectionner le bon sortie.');
      }
      console.log("*************************")
      console.log(this.form.controls['bon_sortie'].value)
      console.log("*************************")
      //return
    }

    this.form.patchValue({
      numero:this.ligneDocumentSortiesService.getLastNumero(this.lignes),
      _id:ListeLigneDocumentSortiesComponent._id++ + ''
    })
    try{
      this.lignes.push(this.form.value)
    }catch(e){
      this.lignes = []
      this.lignes.push(this.form.value)
    }
    ////this.lignes = JSON.parse(JSON.stringify(this.lignes))
    //this.newItemEvent(["article", null])
    this.misaJourParentEvent()

    console.log('====================================');
    console.log(this.lignes);
    console.log('====================================');
  }



  changeTotals(){
    if(this.form.controls["isQte1"].value == true){
      this.form.patchValue(this.ligneDocumentSortiesService.changeTotals(this.form.value))
    }else{
      this.form.patchValue(this.ligneDocumentSortiesService.changeTotals(this.form.value, true))
    }
  }

  }

