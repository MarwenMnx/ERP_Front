import { Component, Inject, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { Product } from '../models/product.model';
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
import { FormControl } from '@angular/forms';
import { FraisComponent } from '../frais/frais.component';
import { ComposantsComponent } from '../composants/composants.component';
import { StocksComponent } from '../stocks/stocks.component';
import { CodebarreComponent } from '../codebarre/codebarre.component';
import { PromotionremiseComponent } from '../promotionremise/promotionremise.component';
import { Promotionremise2Component } from '../promotionremise2/promotionremise2.component';
import { HistoriqueachatComponent } from '../historiqueachat/historiqueachat.component';
import { FideliteComponent } from '../fidelite/fidelite.component';
import { DocumentsComponent } from '../documents/documents.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { getData, hideLoading, isObjectIdMongoose, markFormGroupTouched, markInputsAsTouchedByClass, notEqualToZero, onBlurInputMontant, roundmMargeNumber, roundmMontantNumber, roundmTauxNumber, showAlertError, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { ProductHttpServiceService } from '../services/product-http-service.service';
import { ProductServiceService } from '../services/product-service.service';
import { Categorie } from '../../categories/models/categorie.model';
import { CategorieHttpService } from '../../categories/services/categorie-http.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FamilleHttpService } from '../../familles/services/famille-http.service';
import { Famille } from '../../familles/models/famille.model';
import { EmplacementTable } from '../models/emplacement.model';
import { SousFamilleHttpService } from '../../sous-famille/services/sous-famille-http.service';
import { SousFamille } from '../../sous-famille/models/sous-famille.model';
import { MarqueHttpService } from '../../marque/services/marque-http.service';
import { Unite } from '../../unite/modeles/unite.model';
import { UniteHttpService } from '../../unite/services/unite-http.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/utils/shared.module';
import { FraisTable } from '../models/frais.model';
import { TestFormComponent } from './test-form.component';
import { TauxTvaHttpService } from '../../taux-tva/services/taux-tva-http.service';
import { Tauxtva } from '../../taux-tva/models/tauxTva.model';
import { enum_type_operation, enum_types_articles, enum_types_vente } from 'src/app/global-enums';
import { FournisseurService } from '../../fournisseurs/services/fournisseur.service';
import { FournisseurHttpService } from '../../fournisseurs/services/fournisseur-http.service';
import { StandartAutocompleteService } from '../../../utils/autocompletes/standart-autocomplete.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import {Depot} from "../../depot/models/depot.model";
import {DepotHttpService} from "../../depot/services/depot-http.service";
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CategorieCreateUpdateComponent } from '../../categories/categorie-create-update/categorie-create-update.component';
import { FamilleCreateUpdateComponent } from '../../familles/famille-create-update/famille-create-update.component';
import { SousFamilleCreateUpdateComponent } from '../../sous-famille/sous-famille-create-update/sous-famille-create-update.component';
import { UniteCreateUpdateComponent } from '../../unite/unite-create-update/unite-create-update.component';
import { MarqueCreateUpdateComponent } from '../../marque/marque-create-update/marque-create-update.component';
import { ModeleCreateUpdateComponent } from '../../modele/modele-create-update/modele-create-update.component';
import { TauxTvaCreateUpdateComponent } from '../../taux-tva/taux-tva-create-update/taux-tva-create-update.component';

export interface CountryState{
  name: string,
  population: string,
  flag: string,
}

@Component({
  selector: 'vex-product-create-update',
  templateUrl: './product-create-update.component.html',
  styleUrls: ['./product-create-update.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
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
    VexSecondaryToolbarComponent,
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
    TestFormComponent
  ]
})
export class ProductCreateUpdateComponent implements OnInit {

  selectedTabIndex: number = 0; 

  isChargeeMarques = false
  isChargeeFournisseurs = false
  isChargeeDepots = false
  isChargeeFrais = false
  isChargeeArticles = false
  
  async onSelectedTabIndexChanged(index: number) {
    switch (index) {
      case 1:
        if(!this.isChargeeFournisseurs){
          showLoading()
          await this.getMarques()
          await this.getFournisseurs()
          this.isChargeeFournisseurs = true
          hideLoading()
        }
        break;
      case 2:
        if(!this.isChargeeFrais){
          showLoading()
          await this.getFrais()
          this.isChargeeFrais = true
          hideLoading()
        }
        // Handle tab index 1
        break;
      case 3:
        if(!this.isChargeeArticles){
          showLoading()
          await this.getArticles()
          this.isChargeeArticles = true
          hideLoading()
        }
        // Handle tab index 1
        break;
      case 4:
        if(!this.isChargeeDepots){
          showLoading()
          await this.getDepots()
          this.isChargeeDepots = true
          hideLoading()
        }
        // Handle tab index 1
        break;
      // Add cases for other tab indexes as needed
      default:
        // Handle default case
    }
  }

  dataDepot: Depot[] = [];
  labelTextBC = 'Dépôt/Point de Vente';
  selectedKeyDepot = '_id';
  selectedValDepot = 'libelle';
  preSelectedItems:any = ""

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }

    if( ["categorie", "famille"].includes(newValue[0]) ){
      this.filtrerCategorieFamilleSousFamille(this.form.value)
    }

    if( ["marque"].includes(newValue[0])){
      this.filtrerMarqueModele(this.form.value)
    }

    if( ["frais"].includes(newValue[0]) ){
      this.changePrixVHT()
    }
  }

  form:FormGroup = this.fb.group({
    _id: '',
    //imageSrc: ['assets/img/avatars/placeholder-1-300x300.png'],

    reference: ['', Validators.required],
    codeBarre: [''],
    designation: ['', Validators.required],

    categorie:[{}, Validators.required],
    famille:'',
    sousFamille:'',
    //fournisseur:'',
    marque:'',
    modele:'',
    unite1:[null, Validators.required],
    unite2:null,

    venduPar:enum_types_vente.PC+"",

    valeurStock: 0,
    qteEnStock: 0,
    pmp: 0,
    prixFourn: [0, [notEqualToZero()]],
    remiseF: 0,
    remiseMontant: 0,
    isFodecA: [false],
    tauxFodecA: 1,
    prixFodecA: 0,
    isDC:[false],
    tauxDC: 0,
    prixDC: 0,

    isDCVente:[false],
    tauxDCVente: 0,
    prixDCVente: 0,

    isRedevanceVente:[false],

    prixAchat: 0,
    tauxTVA: 0,
    montantTVA: 0,
    prixAchatTTC: 0,
    prixRevient: 0,
    redevance: 0,
    prixRevientTTC: 0,
    margeSurPrixAchat: true,
    tauxMarge: 0,
    prixMarge: 0,
    prixVenteHT: 0,
    prixNetVenteHT: 0,
    isFodecV:false,
    prixFodecV: 0,
    tauxFodecV: 1,
    montantTVAVente: 0,
    prixTTC: 0,
    pVenteConseille: 0,
    //coefficient: [1, [notEqualToZero()]],
    coefficient: 1,
    refFournisseur: '',
    description: '',
    observation: '',
    stockReaprov: 0,
    venteStockNegatif:false,
    stockMax: 0,
    stockMin: 0,
    longueur:0,
    largeur:0,
    hauteur:0,
    surface:0,
    volume:0,
    poids:0,
    plafondRemise:0,
    typeArticle: enum_types_articles.PS+"",
    archive:true,
    lotSerieActive:false,
    enVente:true,
    enAchat:true,
    margeAppliqueeSur:enum_type_operation.ACHAT+"",
    emplacement:[],
    frais:[],
    prixQte:[],
    promotion:[],
    fidelite:[],
    //uniteLLH:'',
    //unitePoids:'',
    active: true,
    image: null,
    sansRemise: [true],
    prixParQte: [true],
    enPromotion: [true],
    pointFidelite: [true],
    nbPointFix: [false],
    nbPointVar: [true] ,
    enBalance: [false]

  });

  mode: 'create' | 'update' = 'create';

  public defaults: Product = new Product(null)
  private routeSub: Subscription;
  @Input() id:string = ''
  @Input() modePopup:Boolean = false

  constructor(
    private fb: FormBuilder,
    private serviceHttp:ProductHttpServiceService,
    private categorieServiceHttp:CategorieHttpService,
    private marqueServiceHttp:MarqueHttpService,
    private uniteServiceHttp:UniteHttpService,
    private service:ProductServiceService,
    private route: ActivatedRoute,
    private tauxServiceHttp:TauxTvaHttpService,
    private fournisseurService:FournisseurHttpService,
    public utilService:UtilService ,
    private serviceHttDepot: DepotHttpService,
    private dialog: MatDialog,
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      if(!this.modePopup && params['id']){
        this.id = params['id']
        this.mode = 'update';
      }
    });
  }

  async openPopup(typePopup:string){
    switch(typePopup){
      case 'TauxTVA':
        this.dialog
        .open(TauxTvaCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Categorie) => {
          if (item) {
            showLoading()
            await this.getTaux()
            hideLoading()
          }
        });
        break;
      case 'Categorie':
        this.dialog
        .open(CategorieCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Categorie) => {
          if (item) {
            showLoading()
            await this.getCategories()
            hideLoading()
          }
        });
        break;
      case 'Famille':
        this.dialog
        .open(FamilleCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Famille) => {
          if (item) {
            showLoading()
            await this.getCategories()
            hideLoading()
          }
        });
        break;
      case 'Sous Famille':
        this.dialog
        .open(SousFamilleCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: SousFamille) => {
          if (item) {
            showLoading()
            await this.getCategories()
            hideLoading()
          }
        });
        break; // Added break statement
       // Added break statement
      case 'Unité':
        this.dialog
        .open(UniteCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Unite) => {
          if (item) {
            showLoading()
            await this.getUnites()
            hideLoading()
          }
        });
        break; // Added break statement
         // Added break statement
      case 'Marque':
        this.dialog
        .open(MarqueCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Unite) => {
           if (item) {
             showLoading()
             await this.getMarques()
             hideLoading()
           }
        });
      case 'Modele':
        this.dialog
        .open(ModeleCreateUpdateComponent, {})
        .afterClosed()
        .subscribe(async(item: Unite) => {
          if (item) {
           showLoading()
           await this.getMarques()
           hideLoading()
         }
        });
        break; // Added break statement
        // Added break statement
        default:
        // Handle other types of pop-ups if needed
        break;
    }
  }

  clickForm(){
    console.log(this.form.get('categorie'))
  }

  allFournisseurs:any[] = [];

  allCategories:any[] = [];
  famillesFiltree:Famille[] = [];
  sousFamillesFiltree:SousFamille[] = [];

  allMarques:any[] = [];
  modelesFiltree:Famille[] = [];

  allArticles:Product[] = [];

  allUnites:Unite[] = [];
  allTaux:Tauxtva[] = [];

  async getProduct(id:string) {
    return new Promise((resolve) => {
      this.serviceHttp.GetDetails(this.id).subscribe((res) => {
        this.service.successGetDetails(res, this.form, this.defaults)
        this.defaults = res.RESULTAT
        this.form.patchValue(this.defaults);
        try{
          this.defaults.prixQte.sort((a, b) => a.qteMin - b.qteMin);
        }catch(e){}
        this.form.patchValue(this.defaults);
        this.form.patchValue({valeurStock:this.form.value.qteEnStock * this.form.value.prixAchat})
        resolve(null)
      });
    });
  }

  async getCategories() {
    return new Promise((resolve) => {
      this.categorieServiceHttp.GetAllWithFamilleAndSousFamille().subscribe((res) => {
        this.allCategories = getData(res.RESULTAT);
        this.filtrerCategorieFamilleSousFamille(this.form.value)
        resolve(null)
      });
    });
  }

  async getMarques() {
    return new Promise((resolve) => {
      this.marqueServiceHttp.GetAllWithModeles().subscribe((res) => {
        this.allMarques = getData(res.RESULTAT);
        this.filtrerMarqueModele(this.form.value)
        resolve(null)
      });
    });
  }

  async getUnites() {
    return new Promise((resolve) => {
      this.uniteServiceHttp.GetAll().subscribe((res) => {
        this.allUnites= this.uniteServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getFournisseurs() {
    return new Promise((resolve) => {
      this.fournisseurService.GetAll().subscribe((res) => {
        this.allFournisseurs= this.fournisseurService.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getDepots() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllDepot().subscribe((res) => {
        this.gererDepots(res)
        //this.form.patchValue({emplacement : newEmplacements})
        resolve(null)
      });
    });
  }
  
  gererDepots(res:any){
    let depots = getData(res.RESULTAT);
    let oldEmplacements = this.defaults.emplacement
    let newEmplacements = []
    for(let depot of depots){
      var oldEmplacement = oldEmplacements ? oldEmplacements.find(x => x.depot_pv._id == depot._id) : null;
      let item = new EmplacementTable({
        depot_pv:depot,
        magasin:depot.type,
        rayon:oldEmplacement ? oldEmplacement.rayon : "",
        niveau:oldEmplacement ? oldEmplacement.niveau : "",
        casier:oldEmplacement ? oldEmplacement.casier : "",
        selected:oldEmplacement ? true: false,
        qte_min:oldEmplacement ? oldEmplacement.qte_min: 0,
        qte_max:oldEmplacement ? oldEmplacement.qte_max: 0,
        venteStockNegatif:oldEmplacement ? oldEmplacement.venteStockNegatif: false,
        stockReaprov: oldEmplacement ? oldEmplacement.stockReaprov: 0,
        enVente: oldEmplacement ? oldEmplacement.enVente: true,
      })
      newEmplacements.push(item)
    }
    this.defaults.emplacement = newEmplacements
  }

  async getFrais() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllFrais().subscribe((res) => {
        this.gererFrais(res)
        resolve(null)
      });
    });
  }

  gererFrais(res:any){
    let frais = getData(res.RESULTAT);
    let oldFrais = this.defaults.frais
    let  newFrais = []
    for(let frai of frais){
      var oldFrai = oldFrais ? oldFrais.find(x => x.frais == frai._id) : null;
      let item = new FraisTable({
        frais:frai._id,
        fraisLibelle:frai.libelle,
        tauxTVA:frai.tauxTVA.taux,
        montantHT:oldFrai ? oldFrai.montantHT : 0,
        montantTTC:oldFrai ? oldFrai.montantTTC : 0
      })
      newFrais.push(item)
    }
    this.defaults.frais = newFrais
  }

  async getArticles() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAll().subscribe((res) => {
        this.allArticles = this.serviceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getTaux() {
    return new Promise((resolve) => {
      this.tauxServiceHttp.GetAll().subscribe((res) => {
        this.allTaux = this.tauxServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async ngOnInit() {
    if(this.modePopup && isObjectIdMongoose(this.id)){
      this.mode = 'update';
    }

    showLoading()
    if(this.id){
      await this.getProduct(this.id)
    }
    await this.getCategories()
    //await this.getMarques()
    await this.getUnites()
    //await this.getFournisseurs()
    //await this.getDepots()
    //await this.getFrais()
    //await this.getArticles()
    await this.getTaux()
    InputNumberChangeObservibalService.submitChangeInput()
    hideLoading()
  }

  filtrerCategorieFamilleSousFamille(outputAutocomplete:any){
    let idCategorie = outputAutocomplete.categorie ? outputAutocomplete.categorie._id : null
    let idFamille = outputAutocomplete.famille ? outputAutocomplete.famille._id : null
    let idSousFamille = outputAutocomplete.sousFamille ? outputAutocomplete.sousFamille._id : null
    let categorie = this.allCategories.find(x => x._id == idCategorie)
    
    if(!categorie){
      this.defaults.categorie = null
      this.defaults.famille = null
      this.defaults.sousFamille = null
      this.form.controls['categorie'].setValue("")
      this.form.controls['famille'].setValue("")
      this.form.controls['sousFamille'].setValue("")
      this.famillesFiltree = []
      this.sousFamillesFiltree = []
      return outputAutocomplete
    }

    this.famillesFiltree = categorie.familles
    let famille = categorie.familles.find((x:any) => x._id == idFamille)

    if(!famille){
      this.defaults.famille = null
      this.defaults.sousFamille = null
      this.form.controls['famille'].setValue("")
      this.form.controls['sousFamille'].setValue("")
      this.sousFamillesFiltree = []
      return outputAutocomplete
    }

    this.sousFamillesFiltree = famille.sous_familles

    if(!famille.sous_familles.find((x:any) => x._id == idSousFamille)){
      this.defaults.sousFamille = null
      this.form.controls['sousFamille'].setValue("")
      return outputAutocomplete
    }

    return outputAutocomplete
  }

  filtrerMarqueModele(outputAutocomplete:any){
    let idMarque = outputAutocomplete.marque ? outputAutocomplete.marque._id : null
    let idModele = outputAutocomplete.modele ? outputAutocomplete.modele._id : null

    let marque = this.allMarques.find(x => x._id == idMarque)

    if(!marque){
      this.defaults.marque = ""
      this.defaults.modele = ""
      this.form.controls['marque'].setValue("")
      this.form.controls['modele'].setValue("")
      this.modelesFiltree = []
      return outputAutocomplete
    }

    this.modelesFiltree = marque.modeles
    let modele = marque.modeles.find((x:any) => x._id == idModele)

    if(!modele){
      this.defaults.modele = ""
      this.form.controls['modele'].setValue("")
      return outputAutocomplete
    }

    return outputAutocomplete
  }

  save() {
    //return
    if (!this.form.valid){
      StandartAutocompleteService.submitFormAutocomplete()
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }

    if (this.form.value.unite2 && this.form.value.unite1 && this.form.value.unite1._id === this.form.value.unite2._id){
      showAlertError('Erreur!', 'Il est nécessaire que l\'unité 1 diffère de l\'unité 2.');
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
    const itemFormData = this.service.convertJSONToFormData(item)
    this.serviceHttp.AddNew(itemFormData).subscribe((res) => {
      if(!this.modePopup)
        this.service.successCreate(res)
      else
        this.closePopup(res)
    });
  }

  updateProduct() {
    showLoading()
    const item = this.service.remove_IdInSousList(this.form.value);
    const itemFormData = this.service.convertJSONToFormData(item)
    this.serviceHttp.update(itemFormData).subscribe((res) => {
      if(!this.modePopup)
        this.service.successCreate(res)
      else
        this.closePopup(res)
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
    onBlurInputMontant(event)
  }

  //autocomplete
  keySelectedTauxTVA = "taux"
  objetTauxTVA = { libelle: "Libelle" , taux: "Taux" }
  
  changePrixVenteTTC(){
    let article = this.form.value
    this.form.patchValue(this.service.changePrixVenteTTC(article));
    this.calculTauxMarge()
  }

  changePrixVenteHT(){
    this.calculTauxMarge()
  }

  changePrixAchat(){
    this.form.patchValue({prixFourn : this.form.get('prixAchat')?.value})
    this.changePrixVHT()
  }

  changePrixAchatTTC(){
    let article = this.form.value
    this.form.patchValue(this.service.changePrixAchatTTC(article));
    this.changePrixVHT()
  }

  calculTauxMarge(){
    let article = this.form.value
    this.form.patchValue(this.service.calculTauxMarge(article));
    this.changePrixVHT()
  }

  changePrixVHT() {
    let article:any = this.form.value
    this.form.patchValue(this.service.changePrixVHT(article));
    InputNumberChangeObservibalService.submitChangeInput()
  }


  imageData: string = '';
  image:any = null

  onFileSelect(event: Event) {
    let files:any = event.target as HTMLInputElement
    this.image = files?.files[0];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(this.image);

      this.form.patchValue({image: this.image})
    }
  }

  @Output() closePopupEvent = new EventEmitter<Object>();
  keyOfForm:string = "lignes"
  closePopup(response:any) {
    if(response.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      this.closePopupEvent.emit(response.RESULTAT);
    }else{
      showAlertError('Erreur!', response.RESULTAT);
    }
  }


}
