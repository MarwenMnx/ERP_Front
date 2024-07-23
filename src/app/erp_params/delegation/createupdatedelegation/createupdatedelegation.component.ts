import { setObjets1ToObjets2 } from 'src/app/global-functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
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
import { StandartAutocompleteComponent } from './../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';


import {DelegationService} from '../service/delegation.service';
import {DelegationhttpService} from '../service/delegationhttp.service';
import { Delegation } from '../delegation/delegation.model';
import { GouvernoratHttpService } from './../../gouvernorat/services/gouvernorat-http.service';

@Component({
  selector: 'vex-createupdatedelegation',
  templateUrl: './createupdatedelegation.component.html',
  styleUrls: ['./createupdatedelegation.component.scss'],
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
    StandartAutocompleteComponent,

  ]
})
export class CreateupdatedelegationComponent {

  form: FormGroup = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    gouvernorat:  [this.defaults?.gouvernorat || ''] ,

  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Delegation | undefined,
    private dialogRef: MatDialogRef<CreateupdatedelegationComponent>,
    private fb: FormBuilder,
    private serviceHttp:DelegationhttpService,
    private service:DelegationService,
    private ServicehttpGouvernerat :GouvernoratHttpService
  ) {}


  public listeDelegation:any = []
  inputAutocomplete:any = {gouvernorat:""}
  outputAutocomplete:any =  {gouvernorat:""}
  newItemEvent(newValue:any){
    this.outputAutocomplete[newValue[0]] = newValue[1]
  }

  ngOnInit() {

    this.ServicehttpGouvernerat.GetAll().subscribe((res) => {
      this.listeDelegation = this.ServicehttpGouvernerat.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Delegation;
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
    const item = this.form.value as Delegation;
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


