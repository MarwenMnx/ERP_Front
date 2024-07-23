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
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {MatOptionModule} from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MarqueHttpService } from '../../marque/services/marque-http.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { ModèleVehicule } from '../models/modelVehicule.model';
import { ModelevehiculeHttpService } from '../services/modelevehicule-http.service';
import { ModelevehiculeService } from '../services/modelevehicule.service';
@Component({
  selector: 'vex-modelevehicule-create-update',
  templateUrl: './modelevehicule-create-update.component.html',
  styleUrls: ['./modelevehicule-create-update.component.scss'],
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
export class ModelevehiculeCreateUpdateComponent implements OnInit {
 
  newItemEvent(newValue:any){
    try{
      if (this.form.contains(newValue[0])) {
        this.form.controls["marque_vehicule"].setValue(newValue[1])
      }
    }catch(e){}
  }
  

  form = this.fb.group({
    _id: [''],
    libelle: [ '', Validators.required] ,
    marque_vehicule: [ '', Validators.required] ,
   });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: ModèleVehicule | undefined,
    private dialogRef: MatDialogRef<ModelevehiculeCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:ModelevehiculeHttpService,

    /*a changer pour acceder au service marque */ 
    private service:ModelevehiculeService,
    private serviceHttpMarque: MarqueHttpService

  ) {}
  public modeles:any =[]
  ngOnInit() {

    this.serviceHttpMarque.GetAll().subscribe((res) => {
      this.modeles = this.serviceHttpMarque.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new ModèleVehicule(null);
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
    const item = this.form.value as ModèleVehicule;
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
