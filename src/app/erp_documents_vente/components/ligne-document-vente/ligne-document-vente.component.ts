import { Component, Inject, OnInit, Input, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
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
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { getData, hideLoading, isObjectIdMongoose, markFormGroupTouched, markInputsAsTouchedByClass, notEqualToZero, onBlurInputMontant, roundmMargeNumber, roundmMontantNumber, roundmQuantiteNumber, roundmQuantiteString, roundmTauxNumber, showAlertError, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
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
import { FideliteComponent } from 'src/app/erp_params/products/fidelite/fidelite.component';
import { DocumentsComponent } from 'src/app/erp_params/products/documents/documents.component';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TestFormComponent } from 'src/app/erp_params/products/product-create-update/test-form.component';
import { Product } from 'src/app/erp_params/products/models/product.model';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { CategorieHttpService } from 'src/app/erp_params/categories/services/categorie-http.service';
import { MarqueHttpService } from 'src/app/erp_params/marque/services/marque-http.service';
import { UniteHttpService } from 'src/app/erp_params/unite/services/unite-http.service';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { TauxTvaHttpService } from 'src/app/erp_params/taux-tva/services/taux-tva-http.service';
import { Famille } from 'src/app/erp_params/familles/models/famille.model';
import { SousFamille } from 'src/app/erp_params/sous-famille/models/sous-famille.model';
import { Unite } from 'src/app/erp_params/unite/modeles/unite.model';
import { Tauxtva } from 'src/app/erp_params/taux-tva/models/tauxTva.model';
import { EmplacementTable } from 'src/app/erp_params/products/models/emplacement.model';
import { FraisTable } from 'src/app/erp_params/products/models/frais.model';
import { FraisComponent } from 'src/app/erp_params/products/frais/frais.component';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { Fournisseur } from 'src/app/erp_params/fournisseurs/models/fournisseur.model';
import { DocumentVente, LigneDocumentVente } from '../../models/document-vente.model';
import { LigneDocumentVenteService } from '../../services/ligne-document-vente.service';
import { ListeLigneDocumentVenteComponent } from '../liste-ligne-document-vente/liste-ligne-document-vente.component';
import { Output, EventEmitter } from '@angular/core';
import { enum_type_operation, enum_types_articles, enum_types_vente } from 'src/app/global-enums';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { LibelleComponent } from 'src/app/utils/libelle/libelle.component';
import { DataParamRoute } from '../../models/data.model';
import { ProductModalComponent } from 'src/app/erp_params/products/product-modal/product-modal.component';

@Component({
  selector: 'vex-ligne-document-vente',
  templateUrl: './ligne-document-vente.component.html',
  styleUrls: ['./ligne-document-vente.component.scss'],
  standalone: true,
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
    
    TestFormComponent,
    ListeLigneDocumentVenteComponent,
    LibelleComponent
  ]
})
export class LigneDocumentVenteComponent {

  constructor(
    private dialog: MatDialog,
    private standartAutocompleteService:StandartAutocompleteService,
    private fb: FormBuilder,
    private service:ProductServiceService,
    private ligneDocumentVenteService:LigneDocumentVenteService,
    private utilService:UtilService
  ) {
  }

  isOpenPanelPlusDetails = false
  @Input() allArticles:ArticleDepotPvs[] = []
  @Input() documentOriginal!:DocumentVente
  @Input() document!:DocumentVente
  @Input() dataParams:DataParamRoute = new DataParamRoute()
  @Input() blockModification:Boolean = false

  @Input() lignes:LigneDocumentVente[] = []

  form:FormGroup = this.fb.group({
    _id : '',
    numero : '',
    article:[null, Validators.required],
    //start detail article
    quantite: 0,
    quantiteUnite1: [0, [notEqualToZero()]],
    unite1: null,
    quantiteUnite2: 0,
    unite2: null,
    prixAchatUnitaireHT: 0,
    prixVenteBrutHT: [0, [notEqualToZero()]],
    tauxremise: 0,
    remiseMontant: 0,
    prixVenteUnitaireHT: 0,
    isFodec: false,
    tauxFodec: 0,
    montantFodec: 0,
    isDC: false,
    tauxDC: 0,
    montantDC: 0,
    prixVenteUnitaireNetHT: 0,
    tauxTVA: 0,
    montantTVA: 0,
    redevance: 0,
    prixVenteUnitaireTTC: 0,
    totalBrutHT: 0,
    totalRemise: 0,
    totalHT: 0,
    totalFodec: 0,
    totalDC: 0,
    totalNetHT: 0,
    totalTVA: 0,
    totalRedevance: 0,
    timbreFiscale: 0,
    totalTTC: 0,
    gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
    gainCommercialTotal: 0, // (quantite * (PV TTC - Prix Achat TTC))
    gainReelUnitaire: 0, // (PV TTC - Prix revient TTC)
    gainReelTotal: 0, // (quantite * (PV TTC - Prix revient TTC))
    depot_pv:"",
    quantiteLivre:0,
    quantiteRestante:0,
    isQte1:true,
    isQte2:false
  });

  misajourLignes(newValue:any){
    this.lignes = newValue[1]
    this.misaJourParentEvent()
  }

  resetForm(){
    setTimeout(() => {
      this.form.patchValue({article:null})
      this.form.reset();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      let changes2:any = changes
      if (changes2.allArticles) {
        if(this.form.value.article){
          let articleDepot = changes2.allArticles.currentValue.find((x:any) => x.article._id === this.form.value.article._id)
          if(articleDepot){
            this.newItemEvent(['article', articleDepot])
          }
        }
      }
    } catch (e) {
    }
  }

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
      if(!newValue[1]){
        this.resetForm()
      }else{
        if(!this.document.client){
          showAlertError('Erreur!', 'Veuillez selectionner le client.');
          this.resetForm()
          return
        }   
        
        if (this.lignes && Array.isArray(this.lignes) && this.lignes.find(x => x.article._id === newValue[1].article._id && newValue[1].depotpv._id == x.depot_pv._id)) {
          let index = this.lignes.findIndex(x => x.article._id === newValue[1].article._id && newValue[1].depotpv._id == x.depot_pv._id)
          const ligneDocElements = document.getElementsByClassName('ligne-doc');
          let ligne:any = ligneDocElements[index]
          ligne.style.background = '#ff000040';
         
          setTimeout(() => {
            ligne.style.background = 'white';
          }, 10000)

          setTimeout(() => {
            ligne.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.form.patchValue({ article: null })
            this.form.reset();
            showAlertError("Erreur", "L\'article " + newValue[1].article.reference + " existe déjà.")
          })
          return
        } 

        newValue[1].article.image = undefined
        this.form.patchValue(newValue[1].article)
        
        this.form.patchValue({
          article: newValue[1].article,
          quantiteUnite1: 0,
          quantiteUnite2: 0,
          prixAchatUnitaireHT: newValue[1].article.prixAchat,
          prixVenteBrutHT: newValue[1].article.prixVenteHT,
          tauxremise: 0,
          remiseMontant: 0,
          prixVenteUnitaireHT: newValue[1].article.prixVenteHT,
          isFodec: newValue[1].article.isFodecV,
          tauxFodec: newValue[1].article.tauxFodecV ? newValue[1].article.tauxFodecV : 1,
          montantFodec: newValue[1].article.prixFodecV,
          isDC: newValue[1].article.isDCVente,
          tauxDC: newValue[1].article.tauxDCVente,
          montantDC: newValue[1].article.prixFodecV,
          prixVenteUnitaireNetHT: newValue[1].article.prixNetVenteHT,
          tauxTVA: (this.document.client && this.document.client.exonereTva == true) ? 0 : newValue[1].article.tauxTVA,
          montantTVA: newValue[1].article.montantTVAVente,
          redevance: newValue[1].article.redevance,
          prixVenteUnitaireTTC: newValue[1].article.prixTTC,
          depot_pv: newValue[1].depotpv,
          isQte1:true,
          isQte2:false
        })
        this.changePrixVHT()
        this.form.patchValue(this.ligneDocumentVenteService.changeReadonlyBettweenQte1AndQte2(true, this.form.value))
        this.changeTotals()
      }
    }
    InputNumberChangeObservibalService.submitChangeInput()
  }

  @Output() misaJourParent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "lignes"
  misaJourParentEvent() {
    this.misaJourParent.emit([this.keyOfForm, this.lignes]);
  }

  @Output() restartListProduitsEvent = new EventEmitter<string>();
  restartListProduits() {
    this.restartListProduitsEvent.emit();
    this.newItemEvent(['article', null])
  }

  changeQuantite1(){
    if(!this.form.value.article) return
    this.form.patchValue(this.ligneDocumentVenteService.changeQuantite1(this.form.value))
    this.changeTotals()
    this.checkQuantite()
  }
  
  changeQuantite2(){
    if(!this.form.value.article) return
    this.form.patchValue(this.ligneDocumentVenteService.changeQuantite2(this.form.value))
    this.changeTotals()
    this.checkQuantite()
  }

  changePrixVHT(){
    if(!this.form.value.article) return
    this.form.patchValue(this.ligneDocumentVenteService.changePrixVente(this.form.value))
  }

  changeTotals(){
    if(!this.form.value.article) return
    if(this.form.controls["isQte1"].value == true){
      this.form.patchValue(this.ligneDocumentVenteService.changeTotals(this.form.value))
    }else{
      this.form.patchValue(this.ligneDocumentVenteService.changeTotals(this.form.value, true))
    }
    InputNumberChangeObservibalService.submitChangeInput()
  }

  changePrixUnitaireHT(){
    if(!this.form.value.article) return
    this.form.patchValue(this.ligneDocumentVenteService.changePrixUnitaireHT(this.form.value))
    this.changePrixVHT()
    this.changeTotals()
  }

  changePrixUnitaireTTC(){
    if(!this.form.value.article) return
    this.form.patchValue(this.ligneDocumentVenteService.changePrixUnitaireTTC(this.form.value))
    this.changePrixUnitaireHT()
  }

  checkQuantite(){
    if(this.dataParams.withCheckQuantiteStock)
      return this.ligneDocumentVenteService.checkQuantiteIsValide(this.documentOriginal, this.lignes, this.allArticles, this.form.value, undefined)
    else 
      return true
  }

  addNewLigne(){
    if (!this.form.valid){
      if(!this.form.controls['article'].value){
        showAlertError('Erreur!', 'Veuillez selectionner l\'article et la quantite.');
      }else{
        showAlertError('Erreur!', 'Veuillez remplir la quantite.');
      }
      return
    }

    if( !this.checkQuantite() ){
      return
    }

    this.form.patchValue({
      numero:this.getLastNumero(), 
      _id:ListeLigneDocumentVenteComponent._id++ + ''
    })
    try{
      this.lignes.push(this.form.value)
    }catch(e){
      this.lignes = []
      this.lignes.push(this.form.value)
    }
    this.lignes = JSON.parse(JSON.stringify(this.lignes))
    this.newItemEvent(["article", null])
    this.misaJourParentEvent()
  }

  getLastNumero(){
    try{
      return this.lignes.reduce((max, x) => {
        const numero = Number(x.numero);
        return numero > max ? numero : max;
      }, 0) + 1;
    }catch(e){
      return 1
    }
  }

  openProductModal(modeCreate:Boolean){
    this.dialog
    .open(ProductModalComponent, {
      data: {
        idProduct: !modeCreate && this.form.value.article ? this.form.value.article._id : null,
      },
    })
    .afterClosed()
    .subscribe((item: any) => {
      if (item) {
        this.restartListProduitsEvent.emit();
      }
    });
  }
  
  
}
