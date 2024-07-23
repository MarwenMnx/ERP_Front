
import { Component } from '@angular/core';
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
import { CommonModule, AsyncPipe, NgFor, NgIf} from '@angular/common';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { hideLoading, parseEnumToObject, showAlertError, showConfirmationDialog, showLoading } from 'src/app/global-functions';
import { DepotHttpService } from 'src/app/erp_params/depot/services/depot-http.service';
import { Depot } from 'src/app/erp_params/depot/models/depot.model';
import { UsersHttpService } from 'src/app/erp_params/users/services/users-http.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { BonsortiesHttpService } from '../../bonsorties/services/bonsorties-http.service';
import { BonsortiesService } from '../../bonsorties/services/bonsorties.service';
import { DataParamRoute } from '../../bonsorties/models/data.model';
import { LigneDocumenSortiesComponent } from '../../components/ligne-document-sorties/ligne-document-sorties.component';
import { LigneDocumentSortiesService } from '../../services/ligne-document-sorties.service';

import { LigneDocumenEntreeComponent } from '../../components/ligne-document-entree/ligne-document-entree.component';
import { ListeLigneDocumentEntreeComponent } from '../../components/liste-ligne-document-entree/liste-ligne-document-entree.component';

import { enum_etat_bonsortie } from 'src/app/global-enums';
import { Vehicule } from 'src/app/erp_flotte/vehicules/models/vehicule.model';
import { VehiculeHttpService } from 'src/app/erp_flotte/vehicules/services/vehicule-http.service';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { log } from 'console';
import { DocumentEnteeSorties } from '../../entreeSortie/entresortie.model';
import {BonentreeService} from "../services/bonentree.service";
import {BonentreeHttpService} from "../services/bonentree-http.service";
import {isEmpty} from "rxjs/operators";
import {Chauffeur} from "../../../erp_flotte/chauffeur/models/chauffeur.model";
import {ChauffeurHttpService} from "../../../erp_flotte/chauffeur/services/chauffeur-http.service";


@Component({
  selector: 'vex-bonentree-create-update',
  templateUrl: './bonentree-create-update.component.html',
  styleUrls: ['./bonentree-create-update.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    LigneDocumenSortiesComponent,
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
    StandartAutocompleteComponent,
    VexBreadcrumbsComponent,
    TestFormComponent,
    ReglementsComponent,
    MatDatepickerModule,
    FormsModule,

  ],
  providers:
    [
      { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class BonentreeCreateUpdateComponent {
  showDivIntern = true;
  isChecked: boolean = false;
  dataDepot: DocumentEnteeSorties[] = [];
  labelTextBC = 'etat';
  selectedKeyDepot = '_id';
  selectedValDepot = 'libelle';
  preSelectedItems:any = ""

  selectedType: any = 1;
  selectCtrl: UntypedFormControl = new UntypedFormControl();

  selectArts_Div:boolean = false
  allBonSorties:DocumentEnteeSorties[] = [];

  newItemEventDep(newValue: any) {

    if(newValue[1]!=undefined ){

      if(newValue[1]["_id"]!=null)
      {
        this.selectArts_Div = false
      } else{
        this.filtredArticlesByDepot(newValue[1]["code_unique"])
        this.selectArts_Div = true
      }

        try {

        newValue[1].lignes.forEach((res:any) => {
          res.quantiteUnite1      = res.quantiteUnite1!=undefined  ? res.quantiteUnite1 : 0;
          res.quantiteUnite1_AFF  = res.quantiteUnite1!=undefined  ? res.quantiteUnite1 : 0;
          res.quantiteUnite2      = res.quantiteUnite2!=undefined ? res.quantiteUnite2 : 0 ;
          res.quantiteUnite2_AFF  = res.quantiteUnite2!=undefined ? res.quantiteUnite2 : 0 ;
          ///qte origine doit prendre toujours la qte du bon sortie
          res.quantiteUnite1_origine  = res.quantiteUnite1!=undefined ? res.quantiteUnite1 : 0 ;
          res.quantiteUnite2_origine  = res.quantiteUnite2!=undefined ? res.quantiteUnite2 : 0 ;
        });

        newValue[1].bon_sortie    = {
            _id: newValue[1]._id,  numero: newValue[1].numero,date: newValue[1].date,code_exercice:newValue[1].code_exercice,
            code_depotpv: newValue[1].code_depotpv, code_societe: newValue[1].code_societe
          };

        let depSrc = newValue[1].depot_PV_source
        let depDes = newValue[1].depot_PV_destination

        newValue[1].depot_PV_source       = depSrc //depDes
        newValue[1].depot_PV_destination  = depDes //depSrc
        newValue[1].code_depotpv          = newValue[1].depot_PV_destination.code_unique //newValue[1].depot_PV_source.code_unique
        newValue[1].depotpv               = newValue[1].depot_PV_destination //newValue[1].depot_PV_source
        newValue[1].numero                = ""

          let utilisateur_: any = {
            _id: this.tokenService.user?._id,
            nom: this.tokenService.user?.nom
          }
          newValue[1].utilisateur = utilisateur_

        this.defaults = newValue[1]
        this.form.patchValue(this.defaults);
        newValue[1].type_transport == "2" ? this.showDivTrigger('extern') :  this.showDivTrigger('intern')

        } catch (e) {}


    }

  }


  filtredArticlesByDepot(code_dp:any){
    if(this.form.value.depotpv){
      // this.allArticlesByDepot = this.allArticles.filter(x => x.depotpv._id == _id_dp)
      if(code_dp!=undefined){
        this.serviceHttpProductDepotPV.getAllArticlesByDepotPVCode(0,0,code_dp).subscribe((res) => {
          this.allArticlesByDepot = this.serviceHttpProductDepotPV.getDataArticleDepotPvss(res.RESULTAT) ;
        });
      }

    }else{
      this.allArticlesByDepot = []
    }
  }
  newItemEvent(newValue: any) {
    this.allDepotsDest = []
    for (let item of  this.allDepots){
      if(item._id != newValue[1]["_id"])
      {
        this.allDepotsDest.push(item)
      }
    }
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }
      if(newValue[0] == "depotpv"){
        this.form.patchValue({depot_PV_source: newValue[1].code_unique})
        this.form.patchValue({code_depotpv: newValue[1].code_unique})
      }

      if(newValue[1]["_id"]!=undefined){

        let datBS:any =  {
          source:   newValue[1]["_id"],
          destination:   newValue[1]["_id"],
          code_societe:  this.tokenService.getCodeSociete(),
          code_depotpv : this.tokenService.getCodePointeVente(),
          code_exercice : this.tokenService.getCodeExercice(),
        }
        this.serviceHttpBonSorties.GetAllByDepotDestSrc(datBS).subscribe((res) => {
          let newBonEntree:any              = new DocumentEnteeSorties(null)
          newBonEntree._id              = null
          newBonEntree.numero           = "SANS BON SORTIE"
          newBonEntree.type_transport   = "1"
          newBonEntree.date             = new Date()
          this.allBonSorties            = this.serviceHttpBonSorties.getData(res.RESULTAT) ;
          this.allBonSorties.unshift(newBonEntree);
        });
      }

    } catch (e) {}
  }

  /* depot destination */
  newItemEventDest(newValue: any) {
   // console.log("***************2222222222*********",newValue)
    this.form.patchValue({depot_PV_destination: newValue[1]})

    if(newValue[1]["_id"]!=undefined){

      let datBS:any =  {
        source:         this.form.value?.depot_PV_destination?._id, // ici on inverse car on cherche dans la table bon sortie
        destination:   this.form.value?.depot_PV_source?._id,
        code_societe:  this.tokenService.getCodeSociete(),
        code_depotpv : this.form.value?.depot_PV_destination?.code_unique,
        code_exercice : this.tokenService.getCodeExercice(),
      }
      this.serviceHttpBonSorties.GetAllByDepotDestSrc(datBS).subscribe((res) => {
        let newBonEntree:any          = new DocumentEnteeSorties(null)
        newBonEntree._id              = null
        newBonEntree.numero           = "SANS BON SORTIE"
        newBonEntree.type_transport   = "1"
        newBonEntree.date             = new Date()
        newBonEntree.code_unique      = this.form.value?.depot_PV_destination?.code_unique
        newBonEntree.lignes           = []
        newBonEntree.code_exercice    = this.tokenService.getCodeExercice()
        newBonEntree.code_societe     = this.tokenService.getCodeSociete()
        let depSrc:any = this.form.value.depot_PV_source
        let depDes:any = this.form.value.depot_PV_destination

        newBonEntree.depot_PV_source       = this.form.value.depot_PV_destination
        newBonEntree.depot_PV_destination  = this.form.value.depot_PV_source
        newBonEntree.code_depotpv          = depSrc.code_unique
        newBonEntree.depotpv               = this.form.value.depot_PV_source

        this.allBonSorties            = this.serviceHttpBonSorties.getData(res.RESULTAT) ;
        this.allBonSorties.unshift(newBonEntree);

      });

    }

  }

  /* event vehicule  */
  newItemEventVh(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  /* event chauffeur  */
  newItemEventCh(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }

    } catch (e) {}
  }


  /* event Ligne  */

  newItemEventLigne(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls[newValue[0]].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  /* event user*/

  newItemEventUser(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['utilisateur'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  form:FormGroup = this.fb.group({
    _id           : '',
    numero        : '',
    date          : [new Date(), Validators.required],
    depotpv:      this.tokenService.pointVenteCourante,
    utilisateur: [null, Validators.required], //afficher le nom de utilisateur
    notes:          '',
    lignes:         [],
    code_societe:   '',
    code_exercice:  '',
    code_depotpv:   '',
    chauffeur :     null,
    vehicule:        '',
    nom_chauffeur:      '',
    matricule_vehicule: '',
    type_transport:     "1",
    // etat:true,
    depot_PV_source:      null,
    depot_PV_destination: null,
    bon_sortie: null,
    etat:       [null, Validators.required]
  });
  type = new FormControl();

  mode: 'create' | 'update' = 'create';

  public defaults: DocumentEnteeSorties = new DocumentEnteeSorties(null)
  private routeSub: Subscription;
  private id:string = ''
  dataParams:DataParamRoute = new DataParamRoute()

  constructor(
    public utilService:UtilService,
    private tokenService:TokenService,
    private fb: FormBuilder,
    private depotServiceHttp:DepotHttpService,
    private service:BonentreeService,
    private route: ActivatedRoute,
    private UtilisateursserviceHttp:UsersHttpService,
    private ligneDocumentSortiesService:LigneDocumentSortiesService,
    private serviceHttpProductDepotPV:ArticlesDepotPvHttpService,
    private serviceHttpVehicules:VehiculeHttpService,
    private serviceHttpChauffeurs:ChauffeurHttpService,
    private serviceHttpBonSorties:BonsortiesHttpService,
    private serviceHttp:BonentreeHttpService,

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
  allChauffeurs:Chauffeur[] = [];



  listBonSortie = this.utilService.parseEnumToObject('enum_etat_bonsortie');

  ngOnInit() {
    if (this.id) {

      this.mode = 'update';
    } else {
      this.defaults = {} as DocumentEnteeSorties;
    }

    this.selectedType = this.defaults.etat;
    this.form.patchValue(this.defaults);

    if(this.id){
      showLoading()
      this.serviceHttp.GetDetails(this.id).subscribe((res) => {
        hideLoading()
        this.service.successGetDetails(res, this.form, this.defaults)
        let lignes = res.RESULTAT.lignes
        res.RESULTAT.lignes.forEach((res:any) => {
          res.numero              = this.ligneDocumentSortiesService.getLastNumero(lignes);
          res.quantiteUnite1      = res.quantiteUnite1!=undefined  ? res.quantiteUnite1 : 0;
          res.quantiteUnite1_AFF  = res.quantiteUnite1_origine!=undefined  ? res.quantiteUnite1_origine : res.quantiteUnite1;//res.quantiteUnite1!=undefined  ? res.quantiteUnite1 : 0;
          res.quantiteUnite2      = res.quantiteUnite2!=undefined ? res.quantiteUnite2 : res.quantiteUnite1 ;
          res.quantiteUnite2_AFF  = res.quantiteUnite2_origine!=undefined  ? res.quantiteUnite2_origine : res.quantiteUnite2;//res.quantiteUnite2!=undefined ? res.quantiteUnite2 : res.quantiteUnite1 ;

        });

        this.defaults = res.RESULTAT

        let src_dep = this.defaults.depot_PV_source
        let des_dep = this.defaults.depot_PV_destination
        this.defaults.depot_PV_source       = des_dep
        this.defaults.depot_PV_destination  = src_dep

        this.defaults.type_transport == "2" ? this.showDivTrigger('extern') :  this.showDivTrigger('intern')

        InputNumberChangeObservibalService.submitChangeInput()
      });
    }else{
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
    }

    let depotCourant = JSON.parse(JSON.stringify(this.tokenService.pointVenteCourante))
    // console.log("*********************",depotCourant)
    this.allDepots = depotCourant?.ayant_acces;
    this.allDepots.push(depotCourant);

    if(this.isCreateMode()) {
      let  utilisateur_:any = {
        _id:   this.tokenService.user?._id ,
        nom:   this.tokenService.user?.nom
      }
      this.defaults.utilisateur = utilisateur_
      this.defaults.depot_PV_source = this.tokenService.pointVenteCourante
      let set_listDP = ["depot_PV_source",this.tokenService.pointVenteCourante]
      this.newItemEvent(set_listDP)
    }


    //getallUsers
    this.UtilisateursserviceHttp.GetAll().subscribe((res) => {
      this.allUtilisateurs = this.UtilisateursserviceHttp.getData(res.RESULTAT);
    });

    //getallVehicules
    this.serviceHttpVehicules.GetAll().subscribe((res) => {
      this.allVehicules = this.serviceHttpVehicules.getData(res.RESULTAT) ;
    });

    //getallChauffeurs
    this.serviceHttpChauffeurs.GetAll().subscribe((res) => {
      this.allChauffeurs = this.serviceHttpChauffeurs.getData(res.RESULTAT) ;
    });

    //getallBonSorties
  }


  save() {

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

    let data_entree = this.form.value as DocumentEnteeSorties

    data_entree = this.service.remove_id(data_entree);
    data_entree.depot_PV_source.ayant_acces       = undefined
    data_entree.depot_PV_destination.ayant_acces  = undefined
    //data_entree?.depotpv?.ayant_acces          = undefined
    data_entree.utilisateur = {_id:data_entree.utilisateur._id , nom:data_entree.utilisateur.nom}
    data_entree.date  = this.utilService.setDateReel(data_entree.date)
   showLoading()
    this.serviceHttp.AddNew(data_entree).subscribe((res) => {
      this.service.successCreate(res)
    });

  }

  updateProduct() {
    let data_entree = this.form.value as DocumentEnteeSorties

    showLoading()
    const item = this.service.remove_IdInSousList(data_entree);

    item.bon_sortie = {
      _id:      item.bon_sortie._id,
      numero:   item.bon_sortie.numero,
      date:     item.bon_sortie.date
    }

    item.date  = this.utilService.setDateReel(item.date)
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
  showDivTrigger(type:string){
    type=='intern'? this.showDivIntern=true :  this.showDivIntern=false
  }

}

