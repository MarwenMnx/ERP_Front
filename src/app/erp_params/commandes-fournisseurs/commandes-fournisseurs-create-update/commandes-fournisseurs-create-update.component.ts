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
import { Commande_fournisseur } from '../models/Commande_fournisseur.model.';
@Component({
  selector: 'vex-commandes-fournisseurs-create-update',
  templateUrl: './commandes-fournisseurs-create-update.component.html',
  styleUrls: ['./commandes-fournisseurs-create-update.component.scss'],
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
export class CommandesFournisseursCreateUpdateComponent implements OnInit {
  
  static id = 100;

 form = this.fb.group({
    id: [CommandesFournisseursCreateUpdateComponent.id++],
    etatCommande: this.defaults?.etatCommande,
    // dateCommande: [this.defaults?.dateCommande || ''],
    
    // dateCommande: this.defaults?.dateCommande || new Date(),
    dateCommande: this.date_form.parse(this.defaults?.dateCommande),//new Date(),
    numCommande: [this.defaults?.numCommande || ''],
    dateBC: this.defaults?.dateBC || '',
    // dateBL: this.date_form.parse(this.defaults?.dateBL),
    numBR: this.defaults?.numBR || '',
    // dateDevis: this.defaults?.dateDevis || '',
    // dateDevis:  this.date_form.parse(this.defaults?.dateDevis),
    codeFournisseur: this.defaults?.codeFournisseur || '',
    raisonSociale: this.defaults?.raisonSociale || '',
    totalBrute: this.defaults?.totalBrute || '',
    totalRemise: this.defaults?.totalRemise || '',
    totalNet: this.defaults?.totalNet || '',
    totalTva: this.defaults?.totalTva || '',
    totalRedevance: this.defaults?.totalRedevance || '',
    totalTTC: this.defaults?.totalTTC || '',
    note: this.defaults?.note || '',  
    
  });
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Commande_fournisseur | undefined,
    private dialogRef: MatDialogRef<CommandesFournisseursCreateUpdateComponent>,
    private fb: FormBuilder,private date_form:AppDateAdapter
 
  
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Commande_fournisseur;
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
    customer.dateCommande = this.date_form.format(customer.dateCommande  ,"DD/MM/YYYY")
    customer.dateBL = this.date_form.format(customer.dateBL  ,"DD/MM/YYYY")
    customer.dateDevis = this.date_form.format(customer.dateDevis  ,"DD/MM/YYYY")    
    // if (!customer.imageSrc) {
    //   customer.imageSrc = 'assets/img/avatars/1.jpg';
    // }

    this.dialogRef.close(customer);
  }

  updateCustomer() {
    let customer:any = this.form.value;
    customer.dateCommande = this.date_form.format(customer.dateCommande  ,"DD/MM/YYYY")
    customer.dateBL = this.date_form.format(customer.dateBL  ,"DD/MM/YYYY")
    customer.dateDevis = this.date_form.format(customer.dateDevis  ,"DD/MM/YYYY")    

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

