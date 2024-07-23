import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogModule,
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

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';

import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/utils/shared.module';
import { ComposantsComponent } from 'src/app/erp_params/products/composants/composants.component';
import { StocksComponent } from 'src/app/erp_params/products/stocks/stocks.component';

import { DocumentsComponent } from 'src/app/erp_params/products/documents/documents.component';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TestFormComponent } from 'src/app/erp_params/products/product-create-update/test-form.component';
import { Output, EventEmitter } from '@angular/core';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { DocumentCasse, LigneDocumentCasse } from '../../boncasse/modeles/boncasse.model';
import { LigneDocumentCasseService } from '../../services/ligne-document-casse.service';
import { ListeLigneDocumentCasseComponent } from '../liste-ligne-document-casse/liste-ligne-document-casse.component';
import { notEqualToZero, showAlertError, showAlertSucess } from 'src/app/global-functions';
import { ListeLigneDocumentVenteComponent } from 'src/app/erp_documents_vente/components/liste-ligne-document-vente/liste-ligne-document-vente.component';
import { DocumentCorrectionStock, LigneCorrectionStock } from '../../correction-stock/models/correction-stock.model';
import { ListLigneCorrectionStockComponent } from '../list-ligne-correction-stock/list-ligne-correction-stock.component';
import { LigneCorrectionStockService } from '../../services/ligne-correction-stock.service';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { Product } from 'src/app/erp_params/products/models/product.model';
// import { LigneDocumentVenteService } from '../../services/ligne-document-vente.service';

@Component({
  selector: 'vex-ligne-correction-stock',
  templateUrl: './ligne-correction-stock.component.html',
  styleUrls: ['./ligne-correction-stock.component.scss'],
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

    ComposantsComponent,
    StocksComponent,

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
    ListLigneCorrectionStockComponent,
    FiltreCatgFamilleSousFamilleComponent
  ]
})
export class LigneCorrectionStockComponent {

  constructor(
    private standartAutocompleteService: StandartAutocompleteService,
    private fb: FormBuilder,
    // private service:ProductServiceService,
    private ligneCorrectionStockService: LigneCorrectionStockService,
    private utilService: UtilService
  ) {
  }

  @Input() allArticles: ArticleDepotPvs[] = []
  @Input() documentOriginal!: DocumentCorrectionStock
  @Input() lignes: LigneCorrectionStock[] = []

  form: FormGroup = this.fb.group({
    _id: '',
    numero: '',
    article: [null, Validators.required],
    //start detail article
    quantiteUnite1: [0, [notEqualToZero()]],
    unite1: null,
    quantiteUnite2: 0,
    quantite_en_stock: 0,
    quantite_difference: 0,
    quantite_nouvelle: 0,
    coefficient: 0,
    unite2: null,
    notes: "",
    isQte1: false,
    isQte2: false,

  });

  misajourLignes(newValue: any) {
    this.lignes = newValue[1]
    this.misaJourParentEvent()
  }
  newItemEvent(newValue: any) {
    console.log(newValue);
    
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
      if (!newValue[1]) {
        this.form.patchValue({ article: null })
        this.form.reset();
      } else {
        let isExiste = false
        if (this.lignes && Array.isArray(this.lignes) && this.lignes.find(x => x.article._id === newValue[1].article._id)) {
          setTimeout(() => {
            this.form.patchValue({ article: null })
            this.form.reset();
          })

          showAlertError("Erreur", "L\'article " + newValue[1].article.reference + " existe déjà.")
          return
        }

        this.form.patchValue(newValue[1].article)
        this.form.patchValue({
          article: newValue[1].article,
          quantiteUnite1: 0,
          quantiteUnite2: 0,
          quantite_en_stock: newValue[1].quantite,
          quantite_difference: 0,
          quantite_nouvelle: newValue[1].quantite
        })
        this.form.patchValue(this.ligneCorrectionStockService.changeReadonlyBettweenQte1AndQte2(true, this.form.value))
        this.changeTotals()
      }
    }
    InputNumberChangeObservibalService.submitChangeInput()
  }

  @Output() misaJourParent = new EventEmitter<[string, Object]>();
  keyOfForm: string = "lignes"
  misaJourParentEvent() {
    this.misaJourParent.emit([this.keyOfForm, this.lignes]);
  }

  changeQuantite1() {
    this.form.patchValue(this.ligneCorrectionStockService.changeQuantite1(this.form.value))
  }

  changeQuantite2() {
    this.form.patchValue(this.ligneCorrectionStockService.changeQuantite2(this.form.value))
  }

  changeNouvelleQuantite() {
    this.form.patchValue(this.ligneCorrectionStockService.changeNouvelleQte(this.form.value))
  }

  checkQuantite() {
    //return this.ligneDocumentCasseService.checkQuantiteIsValide(this.documentOriginal, this.lignes, this.allArticles, this.form.value, undefined)
  }

  selectMutipleArticles(){
    let articles:any | Product[] = []
    if(!this.filtrerEvent){
      showAlertError("Erreur", "Aucun élément n'a été sélectionné. Veuillez sélectionner un élément dans la liste avant de continuer.")
      return
    }
    
    if(this.filtrerEvent.articles.length > 0){
      let ids = this.filtrerEvent.articles.map((x: any) => x._id);
      articles = this.allArticles.filter((x: any) => {
        return x.article && ids.includes(x.article._id);
      });
    }else if(this.filtrerEvent.sousFamilles.length > 0){
      let ids = this.filtrerEvent.sousFamilles.map((x: any) => x._id);
      articles = this.allArticles.filter((x: any) => {
        return x.article && x.article.sousFamille && ids.includes(x.article.sousFamille._id);
      });
    }else if(this.filtrerEvent.familles.length > 0){
      let ids = this.filtrerEvent.familles.map((x: any) => x._id);
      articles = this.allArticles.filter((x: any) => {
        return x.article && x.article.famille && ids.includes(x.article.famille._id);
      });
    }else if(this.filtrerEvent.categories.length > 0){
      let ids = this.filtrerEvent.categories.map((x: any) => x._id);
      articles = this.allArticles.filter((x: any) => {
        return x.article && x.article.famille && ids.includes(x.article.categorie._id);
      });
    }else{
      showAlertError("Erreur", "Aucun élément n'a été sélectionné. Veuillez sélectionner un élément dans la liste avant de continuer.")
      return
    }

    let lignes:any | LigneCorrectionStock[] = this.lignes ? this.lignes : []
    let compteur = 0
    for(let item of articles){
      if(lignes.filter((x:any) => x.article._id == item.article._id).length == 0){
        compteur++
        this.form.patchValue(item.article)
        this.form.patchValue({
          article: item.article,
          quantiteUnite1: 0,
          quantiteUnite2: 0,
          quantite_en_stock: item.quantite,
          quantite_difference: 0,
          quantite_nouvelle: item.quantite
        })
        lignes.push(
          this.form.value
        )
      }
    }
    compteur = 1
    lignes = lignes.map((x:any) => {
      x.numero = compteur
      compteur++
      return x
    })
    this.lignes = lignes
    showAlertSucess("Succes", "Vous avez "+compteur+" lignes ajoutés.")
  }

  addNewLigne() {
    if (!this.form.valid) {
      if (!this.form.controls['article'].value) {
        showAlertError('Erreur!', 'Veuillez selectionner l\'article et la quantite.');
      } else {
        showAlertError('Erreur!', 'Veuillez remplir la quantite.');
      }
      return
    }
    this.form.patchValue({
      numero: this.ligneCorrectionStockService.getLastNumero(this.lignes),

      _id: ListeLigneDocumentCasseComponent._id++ + ''
    })
    try {
      this.lignes.push(this.form.value)
    } catch (e) {
      this.lignes = []
      this.lignes.push(this.form.value)
    }
    this.lignes = JSON.parse(JSON.stringify(this.lignes))
    this.newItemEvent(["article", null])
    this.misaJourParentEvent()

    console.log('====================================');
    console.log(this.lignes);
    console.log('====================================');
  }

  changeTotals() {
    if (this.form.controls["isQte1"].value == true) {
      this.form.patchValue(this.ligneCorrectionStockService.changeTotals(this.form.value))
    } else {
      this.form.patchValue(this.ligneCorrectionStockService.changeTotals(this.form.value, true))
    }
  }

  filtrerEvent: any
  filterCateg(p_synchronizData: any) {
    console.log(p_synchronizData);
    
    this.filtrerEvent = p_synchronizData
  }


}






