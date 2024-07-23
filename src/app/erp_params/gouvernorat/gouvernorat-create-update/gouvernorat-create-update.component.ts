import { Component } from '@angular/core';

import {Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
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
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable, ReplaySubject, filter, map, startWith } from 'rxjs';
import { CategorieHttpService } from '../../categories/services/categorie-http.service';
import {MatOptionModule} from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Gouvernorat } from '../models/gouvernorat.model';
import { GouvernoratHttpService } from '../services/gouvernorat-http.service';
import { GouvernoratService } from '../services/gouvernorat.service';
import { PaysService } from '../../pays/services/pays.service';
import { setObjets1ToObjets2 } from 'src/app/global-functions';


@Component({
  selector: 'vex-gouvernorat-create-update',
  templateUrl: './gouvernorat-create-update.component.html',
  styleUrls: ['./gouvernorat-create-update.component.scss'],
  standalone: true,
  imports: [
    StandartAutocompleteComponent,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
  AsyncPipe,
    NgForOf,

  ]
})
export class GouvernoratCreateUpdateComponent implements OnInit{


  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    pays: [this.defaults?.pays || ''] ,
   });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Gouvernorat | undefined,
    private dialogRef: MatDialogRef<GouvernoratCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:GouvernoratHttpService,
    private service:GouvernoratService,
    private servicePays: PaysService

  ) {}

  listepays:any =[]
  inputAutocomplete:any = {pays:""}
  outputAutocomplete:any =  {pays:""}
  newItemEvent(newValue:any){
    this.outputAutocomplete[newValue[0]] = newValue[1]
  }

  ngOnInit() {

    this.servicePays.GetAll().subscribe((res) => {
      this.listepays = this.servicePays.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Gouvernorat;
    }

    this.form.patchValue(this.defaults);
    if( this.mode == 'update')
    {
      setObjets1ToObjets2(this.form.value, this.inputAutocomplete, false)
      setObjets1ToObjets2(this.form.value, this.outputAutocomplete, false)
    }
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
    const item = this.form.value as Gouvernorat;
    setObjets1ToObjets2(item, this.outputAutocomplete, true)

    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item:any = this.form.value;
    setObjets1ToObjets2(item, this.outputAutocomplete, true)

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
