import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { TypeChequeTicketHttpService } from '../services/typeChequeTicket-http.service';
import { typeChequeTicketService } from '../services/typeChequeTicket.service';
import { typeChequeTicket } from '../models/typeChequeTicket.model';
@Component({
  selector: 'vex-typechequeticket-create-update',
  templateUrl: './typechequeticket-create-update.component.html',
  styleUrls: ['./typechequeticket-create-update.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class typeChequeTicketCreateUpdateComponent implements OnInit {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    code: [this.defaults?.code || '', Validators.required] ,
    montant_ticket: [this.defaults?.montant_ticket || ''] ,
    taux_deduction: [this.defaults?.taux_deduction || ''] ,
    montant_deduction: [this.defaults?.montant_deduction || ''] ,
    valeur_ticket: [this.defaults?.valeur_ticket || ''] ,

  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: typeChequeTicket | undefined,
    private dialogRef: MatDialogRef<typeChequeTicketCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:TypeChequeTicketHttpService,
    private service:typeChequeTicketService
  ) {}


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as typeChequeTicket;
    }

    this.form.patchValue(this.defaults);
  }

  save() {
    if (!this.form.valid) return
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as typeChequeTicket;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this type cheque ticket cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      this.service.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
