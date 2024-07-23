import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule  ,FormControl} from '@angular/forms';
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
import { NgIf } from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { Journal_Vente } from '../models/journal_vente.model';
@Component({
  selector: 'vex-journal-vente-create-update',
  templateUrl: './journal-vente-create-update.component.html',
  styleUrls: ['./journal-vente-create-update.component.scss'],
  standalone: true,
  
  providers:
    [
       { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
     // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class JournalVenteCreateUpdateComponent implements OnInit {
  
  static id = 100;

 form = this.fb.group({
    id: [JournalVenteCreateUpdateComponent.id++],
    dateVente: this.date_form.parse(this.defaults?.dateVente),
    // dateVente: this.defaults?.dateVente || new Date(),
    numVente: this.defaults?.numVente,
    numFacture: [this.defaults?.numFacture || ''],
    // dateFacture: this.defaults?.dateFacture || new Date(),
    dateFacture: this.date_form.parse(this.defaults?.dateFacture),

    
    codeClient: this.defaults?.codeClient || '',
    raisonSociale: this.defaults?.raisonSociale || '',
    refArticle: this.defaults?.refArticle || '',
    desiArticle: this.defaults?.desiArticle || '',
    categorie: this.defaults?.categorie || '',
    famille: this.defaults?.famille || '',
    sousFamille: this.defaults?.sousFamille || '',
    quantitè: this.defaults?.quantitè || '',
    unitè: this.defaults?.unitè || '',
    pvUHT: this.defaults?.pvUHT || '',
    totalBrut: this.defaults?.totalBrut || '',
    TauxRemise: this.defaults?.TauxRemise || '',  
    montantRemise: this.defaults?.montantRemise || '', 
    totalNet: this.defaults?.totalNet || '', 
    tauxTVA: this.defaults?.tauxTVA || '', 
    MontantTVA: this.defaults?.MontantTVA || '', 
    redevance: this.defaults?.redevance || '', 
    puTTC: this.defaults?.puTTC || '', 
    totalTTC: this.defaults?.totalTTC || '', 

    
  });
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Journal_Vente | undefined,
    private dialogRef: MatDialogRef<JournalVenteCreateUpdateComponent>,
    private fb: FormBuilder,private date_form:AppDateAdapter
 
  
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Journal_Vente;
    }

    //this.form.patchValue(this.defaults);
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    let customer:any = this.form.value;
    customer.dateVente = this.date_form.format(customer.dateVente  ,"DD/MM/YYYY")
    customer.dateFacture = this.date_form.format(customer.dateFacture  ,"DD/MM/YYYY")
     
   

    this.dialogRef.close(customer);
  }

  updateCustomer() {
    let customer:any = this.form.value;
    customer.dateVente = this.date_form.format(customer.dateVente  ,"DD/MM/YYYY")
    customer.dateFacture = this.date_form.format(customer.dateFacture  ,"DD/MM/YYYY")
    

    if (!this.defaults) {
      throw new Error(
        'Customer ID does not exist, this customer cannot be updated'
      );
    }

    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
