import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { setObjets1ToObjets2 } from 'src/app/global-functions';

import { DelegationhttpService } from '../../delegation/service/delegationhttp.service';
import { fadeInUp400ms } from './../../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from './../../../../@vex/animations/stagger.animation';
import {
  StandartAutocompleteComponent,
} from './../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Localite } from './../localite/localite.model';
import { LocaliteService } from './../service/localite.service';
import { LocalitehttpService } from './../service/localitehttp.service';



@Component({
  selector: 'vex-createupdatelocalite',
  templateUrl: './createupdatelocalite.component.html',
  styleUrls: ['./createupdatelocalite.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
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
    MatAutocompleteModule,
    StandartAutocompleteComponent,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatCardModule
  ]
})
export class CreateupdatelocaliteComponent {

  form: FormGroup = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || ''],
    codePostal: [this.defaults?.codePostal || ''],
    delegation: [this.defaults?.delegation || ''],

  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Localite | undefined,
    private dialogRef: MatDialogRef<CreateupdatelocaliteComponent>,
    private fb: FormBuilder,
    private serviceHttp: LocalitehttpService,
    private service: LocaliteService,
    private serviceHttpDelegaton: DelegationhttpService
  ) { }

  listeDelegation: any = []
  inputAutocomplete: any = { delegation: "" }
  outputAutocomplete: any = { delegation: "" }
  newItemEvent(newValue: any) {
    this.outputAutocomplete[newValue[0]] = newValue[1]
  }



  ngOnInit() {

    this.serviceHttpDelegaton.GetAll().subscribe((res) => {
      this.listeDelegation = this.serviceHttpDelegaton.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Localite;
    }



    this.form.patchValue(this.defaults);
    if (this.mode == 'update') {
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
    const item = this.form.value as Localite;
    setObjets1ToObjets2(item, this.outputAutocomplete, true)

    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }

  update() {
    const item: any = this.form.value;
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



