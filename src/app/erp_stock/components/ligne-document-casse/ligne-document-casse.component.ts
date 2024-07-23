import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
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
import { notEqualToZero, showAlertError } from 'src/app/global-functions';
import { ListeLigneDocumentVenteComponent } from 'src/app/erp_documents_vente/components/liste-ligne-document-vente/liste-ligne-document-vente.component';
// import { LigneDocumentVenteService } from '../../services/ligne-document-vente.service';


@Component({
  selector: 'vex-ligne-document-casse',
  templateUrl: './ligne-document-casse.component.html',
  styleUrls: ['./ligne-document-casse.component.scss'],
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
    ListeLigneDocumentCasseComponent
  ]
})
export class LigneDocumenCasseComponent {

  constructor(
    private standartAutocompleteService:StandartAutocompleteService,
    private fb: FormBuilder,
    // private service:ProductServiceService,
    private ligneDocumentCasseService:LigneDocumentCasseService,
    private utilService:UtilService
  ) {
  }

  @Input() allArticles:ArticleDepotPvs[] = []
  @Input() documentOriginal!:DocumentCasse
  @Input() lignes:LigneDocumentCasse[] = []

  form:FormGroup = this.fb.group({
    _id : '',
    numero : '',
    article:[null, Validators.required],
    //start detail article
    quantiteUnite1: [0, [notEqualToZero()]],
    unite1: null,
    quantiteUnite2: 0,
    unite2: null,
    notes:"",
    isQte1:false,
    isQte2:false,
    depot_pv:"",

  });

  misajourLignes(newValue:any){
    this.lignes = newValue[1]
    this.misaJourParentEvent()
  }
 newItemEvent(newValue:any){

/**/ 

if (this.form.contains(newValue[0])) {
  this.form.controls[newValue[0] as string].setValue(newValue[1])
  if(!newValue[1]){
    this.form.patchValue({article:null})
    this.form.reset();
  }else{
   
    this.form.patchValue(newValue[1].article)
    this.form.patchValue({
      article: newValue[1].article,
      quantiteUnite1: 0,
      quantiteUnite2: 0,
      depot_pv: newValue[1].depotpv,

    })
    this.form.patchValue(this.ligneDocumentCasseService.changeReadonlyBettweenQte1AndQte2(true, this.form.value))
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


  /* controle des deux quantitèes*/ 


  changeQuantite1(){
    this.form.patchValue(this.ligneDocumentCasseService.changeQuantite1(this.form.value))
    this.changeTotals()
    this.checkQuantite()
  }
  
  changeQuantite2(){
    this.form.patchValue(this.ligneDocumentCasseService.changeQuantite2(this.form.value))
    this.changeTotals()
    this.checkQuantite()
  }

  checkQuantite(){
    return this.ligneDocumentCasseService.checkQuantiteIsValide(this.documentOriginal, this.lignes, this.allArticles, this.form.value, undefined)
  }
  addNewLigne(){
    
    if( !this.checkQuantite() ){
      return
    }
    if (!this.form.valid){
      if(!this.form.controls['article'].value){
        showAlertError('Erreur!', 'Veuillez selectionner l\'article et la quantite.');
      }else{
        showAlertError('Erreur!', 'Veuillez remplir la quantite.');
      }
      return
    }
    this.form.patchValue({
      numero:this.ligneDocumentCasseService.getLastNumero(this.lignes), 

      _id:ListeLigneDocumentCasseComponent._id++ + ''
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

    console.log('====================================');
    console.log(this.lignes);
    console.log('====================================');
  }

  changeTotals(){
    if(this.form.controls["isQte1"].value == true){
      this.form.patchValue(this.ligneDocumentCasseService.changeTotals(this.form.value))
    }else{
      this.form.patchValue(this.ligneDocumentCasseService.changeTotals(this.form.value, true))
    }
  }
  

  }




  

