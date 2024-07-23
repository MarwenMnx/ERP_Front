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
import { Commande_client } from '../models/commandes_clients.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';

@Component({
  selector: 'vex-commandes-clients-create-update',
  templateUrl: './commandes-clients-create-update.component.html',
  styleUrls: ['./commandes-clients-create-update.component.scss'],
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
export class CommandesClientsCreateUpdateComponent implements OnInit {
  
  static id = 100;

 form = this.fb.group({
    id: [CommandesClientsCreateUpdateComponent.id++],
    etatCommande: this.defaults?.etatCommande,
    // dateCommande: [this.defaults?.dateCommande || ''],
    
    // dateCommande: this.defaults?.dateCommande || new Date(),
    dateCommande: this.date_form.parse(this.defaults?.dateCommande),//new Date(),
    numCommande: [this.defaults?.numCommande || ''],
    dateBL: this.defaults?.dateBL || '',
    // dateBL: this.date_form.parse(this.defaults?.dateBL),
    numBL: this.defaults?.numBL || '',
    // dateDevis: this.defaults?.dateDevis || '',
    // dateDevis:  this.date_form.parse(this.defaults?.dateDevis),
    numDevis: this.defaults?.numDevis || '',
    codeClient: this.defaults?.codeClient || '',
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
    @Inject(MAT_DIALOG_DATA) public defaults: Commande_client | undefined,
    private dialogRef: MatDialogRef<CommandesClientsCreateUpdateComponent>,
    private fb: FormBuilder,private date_form:AppDateAdapter
 
  
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Commande_client;
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
