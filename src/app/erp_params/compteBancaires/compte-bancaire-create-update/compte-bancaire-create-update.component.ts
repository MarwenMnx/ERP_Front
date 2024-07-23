import { setObjets1ToObjets2 } from 'src/app/global-functions';
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
import { MatOptionModule } from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { CompteBancaires } from '../models/compteBancaires.model';
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { CompteBancaireHttpService } from '../services/compte-bancaire-http.service';
import { BanqueHttpService } from '../../banque/services/banque-http.service';
@Component({
  selector: 'vex-compte-bancaire-create-update',
  templateUrl: './compte-bancaire-create-update.component.html',
  styleUrls: ['./compte-bancaire-create-update.component.scss'],
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
export class CompteBancaireCreateUpdateComponent implements OnInit {

  // inputAutocomplete:any = {banque:""}
  // outputAutocomplete:any =  {banque:""}
  // newItemEvent(newValue:any){
  //   this.outputAutocomplete[newValue[0]] = newValue[1]
  // }

  newItemEvent(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls["banque"].setValue(newValue[1])
      }
    } catch (e) { }
  }

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required],
    numeroCompte: [this.defaults?.numeroCompte || '', Validators.required],
    agence: [this.defaults?.agence || '', Validators.required],
    telephone: [this.defaults?.telephone || ''],
    rib: [this.defaults?.rib || '', Validators.required],
    iban: [this.defaults?.iban || ''],
    bic_swift: [this.defaults?.bic_swift || ''],
    banque: [this.defaults?.banque || '', Validators.required],
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: CompteBancaires | undefined,
    private dialogRef: MatDialogRef<CompteBancaireCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp: CompteBancaireHttpService,
    private service: CompteBancaireService,
    private serviceHttpBanque: BanqueHttpService

  ) { }
  public Banques: any = []
  ngOnInit() {

    this.serviceHttpBanque.GetAll().subscribe((res) => {
      this.Banques = res.RESULTAT;
      // this.Banques = this.serviceHttpBanque.getData(res.RESULTAT);
    });


    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new CompteBancaires(null);
    }
    this.form.patchValue(this.defaults);
  }
  // if( this.mode == 'update')
  // {
  //   setObjets1ToObjets2(this.form.value, this.inputAutocomplete, false)
  //   setObjets1ToObjets2(this.form.value, this.outputAutocomplete, false)
  // }



  save() {

    if (!this.form.valid) return
    console.log(this.mode)
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


  // create() {
  //   const item = this.form.value as CompteBancaires;
  //   setObjets1ToObjets2(item, this.outputAutocomplete, true)

  //   this.serviceHttp.AddNew(item).subscribe((res) => {
  //     this.service.successCreate(res, this.dialogRef)
  //   });
  // }


  create() {
    const item = this.form.value as CompteBancaires;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }


  // update() {
  //   const item:any = this.form.value;
  //   setObjets1ToObjets2(item, this.outputAutocomplete, true)

  //   if (!this.defaults) {
  //     throw new Error(
  //       'Item ID does not exist, this customer cannot be updated'
  //     );
  //   }
  //   this.serviceHttp.update(item).subscribe((res) => {
  //     this.service.successUpdate(res, this.dialogRef)
  //   });
  // }



  update() {
    const item: any = this.form.value;
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