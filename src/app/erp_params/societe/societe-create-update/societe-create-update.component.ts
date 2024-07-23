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
import {Societe} from "../models/societe.model";
import {SocieteHttpServiceService} from "../services/societe-http-service.service";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'vex-societe-create-update',
  templateUrl: './societe-create-update.component.html',
  styleUrls: ['./societe-create-update.component.scss'],
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
    MatInputModule,MatSlideToggleModule
  ]
})


export class SocieteCreateUpdateComponent implements OnInit {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    raisonSociale: [this.defaults?.raisonSociale || '', Validators.required],
    matriculeFiscale: [this.defaults?.matriculeFiscale || '', Validators.required],
    responsable: [this.defaults?.responsable || '', Validators.required],
    cin_responsable: [this.defaults?.cin_responsable || '', Validators.required],
    rib: [this.defaults?.rib || '' ],
    telephone: [this.defaults?.telephone || ''],
    mobile: [this.defaults?.mobile || ''],
    fax: [this.defaults?.fax || ''],
    address: [this.defaults?.address || ''],
    exemptVAT: [this.defaults?.exemptVAT || false],
    exemptTimbreFiscale: [this.defaults?.exemptTimbreFiscale || false],
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Societe | undefined,
    private dialogRef: MatDialogRef<SocieteCreateUpdateComponent>,
    private fb: FormBuilder,
    private societeHttpServiceService:SocieteHttpServiceService
  ) {
  }


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Societe;
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
    const item = this.form.value as Societe;
    this.societeHttpServiceService.AddNew(item).subscribe((res) => {
      this.societeHttpServiceService.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item: any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.societeHttpServiceService.update(item).subscribe((res) => {
      this.societeHttpServiceService.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
