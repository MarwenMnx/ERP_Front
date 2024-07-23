import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, UntypedFormControl } from '@angular/forms';
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
import {MatOptionModule} from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { setObjets1ToObjets2 } from 'src/app/global-functions';
import { FraisHttpService } from '../services/frais-http.service';
import { FraisService } from '../services/frais.service';
import { TauxTvaHttpService } from '../../taux-tva/services/taux-tva-http.service';
import { Frais } from '../models/frais.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from 'src/app/utils/shared.module';
@Component({
  selector: 'vex-frais-create-update',
  templateUrl: './frais-create-update.component.html',
  styleUrls: ['./frais-create-update.component.scss'],
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
    MatCheckboxModule,
    SharedModule
    
  ]
})
export class FraisCreateUpdateComponent implements OnInit {

  isChecked: boolean = false;
  selectCtrl: UntypedFormControl = new UntypedFormControl();
 
  inputAutocomplete:any = {tauxTVA:""}
  outputAutocomplete:any =  {tauxTVA:""}
  newItemEvent(newValue:any){
    this.outputAutocomplete[newValue[0]] = newValue[1]
  }

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
     tauxTVA: [this.defaults?.tauxTVA || ''] ,
     direct: true ,
   
   });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Frais | undefined,
    private dialogRef: MatDialogRef<FraisCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:FraisHttpService,
    private service:FraisService,
    private serviceHttpTauxTVA: TauxTvaHttpService

  ) {
  }
  public TTVA:any =[]
  ngOnInit() {

    this.serviceHttpTauxTVA.GetAll().subscribe((res) => {
      this.TTVA = this.serviceHttpTauxTVA.getData(res.RESULTAT);
    });
    
   
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Frais;
    }

    this.form.patchValue(this.defaults);
    console.log(this.defaults)
    if( this.mode == 'update'){
      setObjets1ToObjets2(this.form.value, this.inputAutocomplete, false)
      setObjets1ToObjets2(this.form.value, this.outputAutocomplete, false)
    }
    
  }

  save() {
    
    if (!this.form.valid) return
    console.log(this.mode)
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as Frais;
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
