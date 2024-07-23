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

import { MatGridListModule } from '@angular/material/grid-list';
import { Chauffeur } from '../models/chauffeur.model';
import { ChauffeurHttpService } from '../services/chauffeur-http.service';
import {Transporteur} from "../../transporteur/models/transporteur.model";
import {TransporteurHttpService} from "../../transporteur/services/transporteur-http.service";
import {TransporteurService} from "../../transporteur/services/transporteur.service";
@Component({
  selector: 'vex-chauffeur-create-update',
  templateUrl: './chauffeur-create-update.component.html',
  styleUrls: ['./chauffeur-create-update.component.scss'],
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
    MatInputModule,
    MatGridListModule
  ]
})
export class ChauffeurCreateUpdateComponent implements OnInit  {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    nom: [this.defaults?.nom || '', Validators.required] ,
    numVehicule: [this.defaults?.numVehicule || '', Validators.required] ,
    tel: [this.defaults?.tel || ''] ,
    email: [this.defaults?.email || '',Validators.email] ,
    gsm: [this.defaults?.gsm || ''] ,

  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Chauffeur | undefined,
    private dialogRef: MatDialogRef<ChauffeurCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:ChauffeurHttpService
  ) {}


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Chauffeur;
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
    const item = this.form.value as Chauffeur;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.serviceHttp.successCreate(res, this.dialogRef)
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
      this.serviceHttp.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
