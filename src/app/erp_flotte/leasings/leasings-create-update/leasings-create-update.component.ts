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
import { Leasings } from '../models/leasings.model';
import { LeasingsHttpService } from '../services/leasings-http.service';
import { LeasingsService } from '../services/leasings.service';

@Component({
  selector: 'vex-leasings-create-update',
  templateUrl: './leasings-create-update.component.html',
  styleUrls: ['./leasings-create-update.component.scss'],
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
export class LeasingsCreateUpdateComponent {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    matricule_fiscale: [this.defaults?.matricule_fiscale || '', Validators.required] ,
    raison_sociale: [this.defaults?.raison_sociale || '', Validators.required] ,

  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Leasings | undefined,
    private dialogRef: MatDialogRef<LeasingsCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:LeasingsHttpService,
    private service:LeasingsService
  ) {}


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Leasings;
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
    const item = this.form.value as Leasings;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
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

