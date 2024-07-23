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
import {ExerciceHttpService} from "../services/exercice-http.service";
import {Excercice} from "../models/exercice.model";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SharedModule} from "../../../utils/shared.module";


@Component({
  selector: 'vex-exercices-create-update',
  templateUrl: './exercices-create-update.component.html',
  styleUrls: ['./exercices-create-update.component.scss'],
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
    MatInputModule,MatCheckboxModule,SharedModule
  ]
})
export class ExercicesCreateUpdateComponent implements OnInit {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    annee_exercice: [this.defaults?.annee_exercice  || '', Validators.required],
    timbreFiscale:  [this.defaults?.timbreFiscale   || 0, Validators.required],
    timbreTicket:  [this.defaults?.timbreTicket     || 0, Validators.required],
    enCours: false,
    cloturee: false,
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Excercice | undefined,
    private dialogRef: MatDialogRef<ExercicesCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp: ExerciceHttpService,
  ) {
  }


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Excercice;
    }

    this.form.patchValue(this.defaults);
  }

  save() {
    console.log("***********save************",this.form.value)
    if (!this.form.valid) return
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as Excercice;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.serviceHttp.successCreate(res, this.dialogRef)
    });
  }

  update() {
    console.log("***********update************",this.form.value)
    const item: any = this.form.value;
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
