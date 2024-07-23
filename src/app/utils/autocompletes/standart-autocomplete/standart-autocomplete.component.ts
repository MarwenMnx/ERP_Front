import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { CountryState } from '../../../../forms/form-elements/form-elements.component';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {AsyncPipe, CommonModule, NgFor, NgIf} from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StandartAutocompleteService } from '../standart-autocomplete.service';
import { UtilService } from '../../UtilService.service';
import { SharedModule } from '../../shared.module';
import {RouterLink} from "@angular/router";
import {VexSecondaryToolbarComponent} from "@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import {VexBreadcrumbsComponent} from "@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {FraisComponent} from "../../../erp_params/products/frais/frais.component";
import {ComposantsComponent} from "../../../erp_params/products/composants/composants.component";
import {StocksComponent} from "../../../erp_params/products/stocks/stocks.component";
import {CodebarreComponent} from "../../../erp_params/products/codebarre/codebarre.component";
import {PromotionremiseComponent} from "../../../erp_params/products/promotionremise/promotionremise.component";
import {Promotionremise2Component} from "../../../erp_params/products/promotionremise2/promotionremise2.component";
import {HistoriqueachatComponent} from "../../../erp_params/products/historiqueachat/historiqueachat.component";
import {FideliteComponent} from "../../../erp_params/products/fidelite/fidelite.component";
import {DocumentsComponent} from "../../../erp_params/products/documents/documents.component";
import {TestFormComponent} from "../../../erp_params/products/product-create-update/test-form.component";
import {ReglementsComponent} from "../../../erp_documents_achat/components/reglements/reglements.component";

@Component({
  selector: 'vex-standart-autocomplete',
  templateUrl: './standart-autocomplete.component.html',
  styleUrls: ['./standart-autocomplete.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    ScrollingModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe,
    RouterLink,
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
  ]
})
export class StandartAutocompleteComponent implements OnChanges {
  itemCtrl: UntypedFormControl = new UntypedFormControl();
  @Input() control: AbstractControl<any, any> | null = new FormControl();

  @Input() value:any = {}
  @Input() libelle?:string  = "Libelle"
  @Input() modeReturnObjet:Boolean  = false
  //add disabled field

  @Input() disabled:Boolean  = false
  @Input() fieldId:string  = "libelle"
  @Input() fieldDisplayed:string = "libelle"
  @Input() keyOfForm:string = "libelle"
  @Input() items: any[] = [];
  @Input() isRequired = false
  @Input() isArticle = false
  @Input() isVente = true
  @Input() fieldDisplayedIsNumber = false
  @Input() fieldDisplayedIsTaux = false


  form = this.fb.group({
    libelle: [''] ,
  });

  @Input() parentForm:any = new FormControl();

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  addNewItem(item: any | null) {
    this.newItemEvent.emit([this.keyOfForm, item ? item : ""]);
  }

  @ViewChild('submitButton', { static: false }) submitButton!: ElementRef;
  @ViewChild('inputAutoComplete', { static: false }) inputAutoComplete!: ElementRef;

  constructor(private fb: FormBuilder, public utileService:UtilService){
    this.form.get('libelle')?.valueChanges.subscribe((value) => {
      if(value)
      this.itemCtrl.setValue(value)
    });
    StandartAutocompleteService.submitFormulaireObservable.subscribe(res => {
      if(this.isRequired && !this.form.valid) this.inputAutoComplete.nativeElement.click();
    })
  }

  filteredItems$: Observable<any[]> =

  this.itemCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((item) => (item ? this.filterItems(item).slice(0, 500) : this.items.slice(0, 500)))
  );
  sizeItems = 200
  initialiserList(valeur:string){

    this.filteredItems$ = this.itemCtrl.valueChanges.pipe(
      startWith(valeur),
      debounceTime(150),
      distinctUntilChanged(),
      map((item) => (item ? this.filterItems(item).slice(0, this.sizeItems) : this.items.slice(0, this.sizeItems)))
    );
  }

  filterItems(libelle: string) {
    return this.items.filter(
      (item) => this.isExiste(item, libelle)
    );
  }

  isExiste(item: any, libelle:any){
    let libelle2 = libelle.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let libelle1 = "";
    if(this.isArticle){
      libelle1 = (item.article.reference+" "+item.article.designation).toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }else{
      libelle1 = item[this.fieldDisplayed].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    return libelle1.toLowerCase().indexOf(libelle2.toLowerCase()) > -1
  }

  onEnter(event: any, item: any){
    try{
      if(!item){
        this.addNewItem(null)
        this.control?.setValue("")
        this.form.controls['libelle'].setValue("")
         return
      }
    }catch(e){ return }

    if(!event.source._selected) return

    if(this.modeReturnObjet){
      this.addNewItem(item)
    }else{
      this.control?.setValue(item[this.fieldId])
      this.addNewItem(item[this.fieldId])
    }
  }

  getValueArticle(item:any){
    return item.article.reference +":"+ item.article.designation
  }

  getValue(item: any){
    if(this.isArticle){
      return this.getValueArticle(item)
    }
    return item[this.fieldDisplayed]
  }

  ngOnChanges(changes: SimpleChanges) {
    try{
      if(this.isRequired && changes['isRequired']){
        this.form.get('libelle')?.setValidators([Validators.required]);
        this.form.get('libelle')?.updateValueAndValidity();
      }
      if (changes['items']){
        this.initialiserList('')
      }
      let value = this.value ? (this.modeReturnObjet === true ? this.getValue(this.value) : this.getValueByKey(this.value)) : ""
      try{
        this.itemCtrl = new UntypedFormControl(value);
        this.form.controls['libelle'].setValue(value)
        this.initialiserList(value)
      }catch(e){}

    }catch(e){}
  }

  getValueByKey(value:any){
    let items:any = this.items
    for(let item of items){
      if(!this.isArticle){
        if(item[this.fieldId] == value){
          return item[this.fieldDisplayed]
        }
      }else{
        if(this.getValueArticle(item) == value){
          return this.getValueArticle(item)
        }
      }
    }
  }

  trackByFn(index: number, item: any): any {
    return item._id; // Use a unique identifier for items if available
  }

}


