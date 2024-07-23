import { Component, Inject, OnInit } from '@angular/core';
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
import {MatOptionModule} from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Modèle } from '../models/modele.model';
import { MarqueHttpService } from '../../marque/services/marque-http.service';
import { ModeleService } from '../services/modele.service';
import { ModeleHttpService } from '../services/modele-http.service';


@Component({
  selector: 'vex-modele-create-update',
  templateUrl: './modele-create-update.component.html',
  styleUrls: ['./modele-create-update.component.scss'],
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
export class ModeleCreateUpdateComponent implements OnInit {



  newItemEvent(newValue:any){
    try{
      if (this.form.contains(newValue[0])) {
        this.form.controls["marque"].setValue(newValue[1])
      }
    }catch(e){}
  }
  

  form = this.fb.group({
    _id: [''],
    libelle: [ '', Validators.required] ,
     marque: [ '', Validators.required] ,
   });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Modèle | undefined,
    private dialogRef: MatDialogRef<ModeleCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:ModeleHttpService,

    /*a changer pour acceder au service marque */ 
    private service:ModeleService,
    private serviceHttpCategory: MarqueHttpService

  ) {}
  public modeles:any =[]
  ngOnInit() {

    this.serviceHttpCategory.GetAll().subscribe((res) => {
      this.modeles = this.serviceHttpCategory.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new Modèle(null);
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

  // create() {
  //   const item = this.service.addSocieteRacine(this.form.value as Famille);
  //   this.serviceHttp.AddNew(item).subscribe((res) => {
  //     this.service.successCreate(res, this.dialogRef)
  //   });
  // }


  create() {
    const item = this.form.value as Modèle;
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
