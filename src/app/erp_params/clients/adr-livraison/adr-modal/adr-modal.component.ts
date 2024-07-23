import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
// import { Customer } from '../interfaces/customer.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Client } from '../../models/client.model';

import {FormsModule} from '@angular/forms';
import { AdresseLivraison } from '../../models/adresse.model';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { ClientService } from '../../services/client.service';
import { showAlertError } from 'src/app/global-functions';
import {MapsGeocalisationComponent} from "../../../maps-geocalisation/maps-geocalisation.component";


@Component({
  selector: 'vex-adr-modal',
  templateUrl: './adr-modal.component.html',
  styleUrls: ['./adr-modal.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    StandartAutocompleteComponent

  ]
})
export class AdrModalComponent implements OnInit {

  value = '';
  static id = 100;

  form:FormGroup = this.fb.group({
    _id: this.defaults?._id || AdrModalComponent.id++ + '',
    titre: ['', Validators.required],
    pays : '',
    gouvernorat : '',
    delegation : '',
    localite : '',
    codePostale : '',
    adresse : '',
    url_maps:   '',
    longitude:  0,
    latitude:   0,
  });

  allPays = []
  gouvernoratsFiltree = []
  delegationsFiltree = []
  localitesFiltree = []

  addChangeEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
    if( ["pays", "gouvernorat", "delegation"].includes(newValue[0]) ){
      this.filtrerAdress()
    }
  }

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: AdresseLivraison,
    private dialogRef: MatDialogRef<AdrModalComponent>,
    private fb: FormBuilder,
    private service:ClientService,
    private dialog: MatDialog ,
  ) {
    this.allPays = this.service.allPays
    this.service.allPaysObservable.subscribe(res => {
      this.allPays = res
      this.filtrerAdress()
    })
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new AdresseLivraison(null);
    }

    this.form.patchValue(this.defaults);
    this.filtrerAdress()
  }

  filtrerAdress(){
    let inputs:any = {
      pays : this.form.controls['pays'].value,
      gouvernorat : this.form.controls['gouvernorat'].value,
      delegation : this.form.controls['delegation'].value,
      localite : this.form.controls['localite'].value
    }

    let outputs = this.service.filtrerAdress(inputs, this.allPays)

    this.delegationsFiltree = outputs.delegationsFiltree
    this.gouvernoratsFiltree = outputs.gouvernoratsFiltree
    this.localitesFiltree = outputs.localitesFiltree

    this.defaults.pays = outputs.pays
    this.defaults.gouvernorat = outputs.gouvernorat
    this.defaults.delegation = outputs.delegation
    this.defaults.localite = outputs.localite

    this.form.patchValue(outputs)
  }

  openGeocalisation() {

    this.dialog
      .open(MapsGeocalisationComponent, {
        data: this.form.value,
        disableClose: true,
        //width: '400px'
      })
      .afterClosed()
      .subscribe((result) => {

        if(result!=''){
          this.form.controls["url_maps"].setValue(result.url_maps)
          this.form.controls["longitude"].setValue(result.longitude)
          this.form.controls["latitude"].setValue(result.latitude)
          this.form.controls["adresse"].setValue(result.adresse)
        }

      });

  }

  save() {
    if (!this.form.valid){
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }

    if (this.mode === 'create') {
      this.createAdresse();
    } else if (this.mode === 'update') {
      this.updateAdresse();
    }
  }


  createAdresse() {
    const item = this.form.value;
    this.dialogRef.close(item);
  }

  updateAdresse() {
    const item = this.form.value;
    this.dialogRef.close(item);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
