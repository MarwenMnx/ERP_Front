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
import { SousFamille } from '../models/sous-famille.model';
import { SousFamilleHttpService } from '../services/sous-famille-http.service';
import { SousFamilleService } from '../services/sous-famille.service';
import { FamilleHttpService } from '../../familles/services/famille-http.service';
import { setObjets1ToObjets2 } from 'src/app/global-functions';


@Component({
  selector: 'vex-sous-famille-create-update',
  templateUrl: './sous-famille-create-update.component.html',
  styleUrls: ['./sous-famille-create-update.component.scss'],
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
export class SousFamilleCreateUpdateComponent implements OnInit{

  inputAutocomplete:any = {famille:""}
  outputAutocomplete:any =  {famille:""}
  newItemEvent(newValue:any){
    this.outputAutocomplete[newValue[0]] = newValue[1]
  }

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    famille: [this.defaults?.famille || ''] ,
   });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: SousFamille | undefined,
    private dialogRef: MatDialogRef<SousFamilleCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:SousFamilleHttpService,
    private service:SousFamilleService,
    private serviceHttpFamille: FamilleHttpService

  ) {}
  public families:any =[]
  ngOnInit() {

    this.serviceHttpFamille.GetAll().subscribe((res) => {
      this.families = this.serviceHttpFamille.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as SousFamille;
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
    const item = this.form.value as SousFamille;
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
