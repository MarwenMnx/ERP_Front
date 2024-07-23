import { Component, Inject, OnInit, Input, SimpleChanges } from '@angular/core';
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
import { getData, hideLoading, markFormGroupTouched, markInputsAsTouchedByClass, notEqualToZero, onBlurInputMontant, roundmMargeNumber, roundmMontantNumber, roundmQuantiteNumber, roundmTauxNumber, showAlertError, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
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
import { DocumentAchat, LigneDocumentAchat } from '../../models/document-achat.model';
import { LigneDocumentAchatService } from '../../services/ligne-document-achat.service';
import { ListeLigneDocumentAchatComponent } from '../liste-ligne-document-achat/liste-ligne-document-achat.component';
import { Output, EventEmitter } from '@angular/core';
import { enum_type_operation, enum_types_articles, enum_types_vente } from 'src/app/global-enums';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { DataParamRoute } from 'src/app/erp_documents_vente/models/data.model';
import { ProductModalComponent } from 'src/app/erp_params/products/product-modal/product-modal.component';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'vex-ligne-document-achat',
  templateUrl: './ligne-document-achat.component.html',
  styleUrls: ['./ligne-document-achat.component.scss'],
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
    TestFormComponent,
    ListeLigneDocumentAchatComponent
  ]
})
export class LigneDocumentAchatComponent {

  constructor(
    private tokenService:TokenService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private service:ProductServiceService,
    private ligneDocumentAchatService:LigneDocumentAchatService
  ) {
  }

  isOpenPanelPlusDetails = false
  @Input() allArticles:ArticleDepotPvs[] = []
  @Input() lignes:LigneDocumentAchat[] = []
  @Input() documentOriginal!:DocumentAchat
  @Input() document!:DocumentAchat
  @Input() dataParams:DataParamRoute = new DataParamRoute()
  @Input() blockModification:Boolean = false

  form:FormGroup = this.fb.group({
    _id : '',
    numero : '',
    article:[null, Validators.required],
    quantite: 0,
    quantiteUnite1: [0, [notEqualToZero()]],
    unite1: '',
    quantiteUnite2: 0,
    unite2: '',

    prixFourn: [0, [notEqualToZero()]],
    tauxremise: 0,
    remiseMontant: 0,
    prixAchatUnitaireHT: 0,
    isFodec: [false],
    tauxFodec: 1,
    montantFodec: 0,
    isDC:[false],
    tauxDC: 0,
    montantDC: 0,
    prixAchatUnitaireNetHT: 0,
    tauxTVA: 0,
    montantTVA: 0,
    redevance: 0,
    prixAchatUnitaireTTC: 0,

    totalBrutHT: 0,
    totalRemise: 0,
    totalHT: 0,
    totalFodec: 0,
    totalDC: 0,
    totalNetHT: 0,
    totalTVA: 0,
    totalRedevance: 0,
    totalTTC: 0,
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
        if(!this.document.fournisseur){
          showAlertError('Erreur!', 'Veuillez selectionner le fournisseur.');
          this.resetForm()
          return
        }  

        if (this.lignes && Array.isArray(this.lignes) && this.lignes.find(x => x.article._id === newValue[1].article._id)) {
          let index = this.lignes.findIndex(x => x.article._id === newValue[1].article._id)
          const ligneDocElements = document.getElementsByClassName('ligne-doc');
          let ligne:any = ligneDocElements[index]
          if(ligne && ligne.style){
            ligne.style.background = '#ff000040';
         
            setTimeout(() => {
              ligne.style.background = 'white';
            }, 10000)
  
            setTimeout(() => {
              this.form.patchValue({ article: null })
              this.form.reset();
              showAlertError("Erreur", "L\'article " + newValue[1].article.reference + " existe déjà.")
              ligne.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
          }
          return
        }
         
        this.form.patchValue(newValue[1].article)
        this.form.patchValue({
          article: newValue[1].article,
          quantiteUnite1: 1,
          quantite: 1,
          unite1: newValue[1].article.unite1,
          quantiteUnite2: (newValue[1].article.unite2 && newValue[1].article.coefficient > 0) ? roundmQuantiteNumber(1 * newValue[1].article.coefficient) : 0,
          unite2: newValue[1].article.unite2,
          prixFourn:  newValue[1].article.prixFourn,
          tauxremise: newValue[1].article.remiseF,
          remiseMontant:  newValue[1].article.remiseMontant,
          prixAchatUnitaireHT:  roundmMontantNumber(Number(newValue[1].article.prixFourn) - Number(newValue[1].article.remiseMontant) - newValue[1].article.prixFourn * newValue[1].article.tauxremise / 100),
          isFodec: newValue[1].article.isFodecA,
          tauxFodec: newValue[1].article.tauxFodecA ? newValue[1].article.tauxFodecA : 1,
          montantFodec: newValue[1].article.prixFodecA,
          isDC: newValue[1].article.isDC,
          tauxDC: newValue[1].article.tauxDC,
          montantDC: newValue[1].article.prixDC,
          prixAchatUnitaireNetHT: newValue[1].article.prixAchat,
          tauxTVA:  (this.tokenService.societeCourante.exemptVAT == true) ? 0 : newValue[1].article.tauxTVA,
          montantTVA:  newValue[1].article.montantTVA,
          redevance:  newValue[1].article.redevance,
          prixAchatUnitaireTTC:  newValue[1].article.prixAchatTTC,
          isQte1:true,
          isQte2:false
        })
        this.changePrixVHT()
        this.changeTotals()
        this.checkStockMax()
      }
    }
  }

  @Output() misaJourParent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "lignes"
  misaJourParentEvent() {
    this.misaJourParent.emit([this.keyOfForm, this.lignes]);
  }

  changeQuantite1(){
    this.form.patchValue(this.ligneDocumentAchatService.changeQuantite1(this.form.value))
    this.changeTotals()
    //this.checkStockMax()
  }

  changeQuantite2(){
    this.form.patchValue(this.ligneDocumentAchatService.changeQuantite2(this.form.value))
    this.changeTotals()
    //this.checkStockMax()
  }

  checkStockMax(){
    this.ligneDocumentAchatService.checkStockMax(this.documentOriginal, this.lignes, this.allArticles, this.form.value, undefined)
  }

  changePrixVHT(){
    this.form.patchValue(this.ligneDocumentAchatService.changePrixVHT(this.form.value))
  }

  changeTotals(){
    if(!this.form.value.article) return
    if(this.form.controls["isQte1"].value == true){
      this.form.patchValue(this.ligneDocumentAchatService.changeTotals(this.form.value))
    }else{
      this.form.patchValue(this.ligneDocumentAchatService.changeTotals(this.form.value, true))
    }
    InputNumberChangeObservibalService.submitChangeInput()
  }

  changePrixUnitaireHT(){
    this.form.patchValue(this.ligneDocumentAchatService.changePrixUnitaireHT(this.form.value))
    this.changePrixVHT()
    this.changeTotals()
  }

  changePrixUnitaireTTC(){
    this.form.patchValue(this.ligneDocumentAchatService.changePrixUnitaireTTC(this.form.value))
    this.changePrixUnitaireHT()
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
    this.form.patchValue({
      numero:this.getLastNumero(), 
      _id:ListeLigneDocumentAchatComponent._id++ + ''
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

  @Output() restartListProduitsEvent = new EventEmitter<string>();
  restartListProduits(modeCreate:Boolean = true) {
    this.restartListProduitsEvent.emit();
    if(modeCreate){
      this.newItemEvent(['article', null])
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
        this.restartListProduits(modeCreate)
      }
    });
  }
  
}
