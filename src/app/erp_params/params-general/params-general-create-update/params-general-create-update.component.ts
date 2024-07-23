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
import {ParamsGeneralHttpService} from "../services/params-general-http.service";
import {ParamsGeneral} from "../models/paramsGeneral.model";

@Component({
  selector: 'vex-params-general-create-update',
  templateUrl: './params-general-create-update.component.html',
  styleUrls: ['./params-general-create-update.component.scss'],
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
export class ParamsGeneralCreateUpdateComponent implements OnInit  {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: ['', [Validators.required, Validators.pattern('^[a-z0-9_]+$')]], // Champ 'libelle' avec validation requise et pattern
    valeur: [this.defaults?.valeur || '', Validators.required] ,
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: ParamsGeneral | undefined,
    private dialogRef: MatDialogRef<ParamsGeneralCreateUpdateComponent>,
    private fb: FormBuilder,
    private paramsGeneralHttpService:ParamsGeneralHttpService
  ) {}


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as ParamsGeneral;
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
    const item = this.form.value as ParamsGeneral;
    this.paramsGeneralHttpService.AddNew(item).subscribe((res) => {
      this.paramsGeneralHttpService.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.paramsGeneralHttpService.update(item).subscribe((res) => {
      this.paramsGeneralHttpService.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
