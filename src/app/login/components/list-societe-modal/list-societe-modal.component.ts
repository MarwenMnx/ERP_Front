import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import { CategorieService } from 'src/app/erp_params/categories/services/categorie.service';
import { CategorieHttpService } from 'src/app/erp_params/categories/services/categorie-http.service';
import { CategorieCreateUpdateComponent } from 'src/app/erp_params/categories/categorie-create-update/categorie-create-update.component';
import { Categorie } from 'src/app/erp_params/categories/models/categorie.model';
import { TokenService } from 'src/app/services/token.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import {StandartAutocompleteService} from "../../../utils/autocompletes/standart-autocomplete.service";
import {ParamsGeneralHttpService} from "../../../erp_params/params-general/services/params-general-http.service";

@Component({
  selector: 'vex-list-societe-modal',
  templateUrl: './list-societe-modal.component.html',
  styleUrls: ['./list-societe-modal.component.scss'],
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
    MatInputModule,
    StandartAutocompleteComponent
  ],
})
export class ListSocieteModalComponent {

  form:FormGroup = this.fb.group({
    societe: [ '', Validators.required] ,
    pointvente: [ '', Validators.required] ,
    exercice: [ '', Validators.required]
  });

  point_vente_local:any = []
  excercice_local:any = []
  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      console.log(newValue[1])
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
    if( newValue[0]=='societe'){
      this.point_vente_local  = newValue[1].point_ventes
      this.excercice_local    = newValue[1].exercices

      if(this.point_vente_local.length==1){this.form.controls["pointvente"].setValue(this.point_vente_local[0])}
      if(this.excercice_local.length==1){this.form.controls["exercice"].setValue(this.excercice_local[0])}
    }
  }

  constructor(
    private dialogRef: MatDialogRef<ListSocieteModalComponent>,
    private fb: FormBuilder,
    private tokenService:TokenService,
    private paramsGeneralHttpService:ParamsGeneralHttpService
    ) {}

    societes:any    = []
    pointventes:any = []
    exercices:any   = []

  ngOnInit() {
    this.societes     = this.tokenService.user ? this.tokenService.user.societes : []
    this.pointventes  = this.tokenService.user ? this.tokenService.point_vente : []
    this.exercices    = this.tokenService.user ? this.tokenService.exercice: []

    if(this.societes.length==1){this.newItemEvent(["societe", this.societes[0]])}


    console.log("Listes des societé : " +this.societes)
    console.log("listes de PV : " +this.pointventes)
    console.log("listes de excer : " +this.exercices)
  }


  save() {
    let role_user:any = false
    if (!this.form.valid) {
    StandartAutocompleteService.submitFormAutocomplete()
    return}
      console.log("*****************SOCIETE********************")
      console.log(this.form.controls['societe'].value)
      console.log("******************POIN VENTE*******************")
    console.log(this.form.controls['pointvente'].value)
      console.log("********************EXCERCICE*****************")
    console.log(this.form.controls['exercice'].value)
      console.log("*************************************")

        this.tokenService.saveSocieteCourante(this.form.controls['societe'].value)
        this.tokenService.savePointVenteCourante(this.form.controls['pointvente'].value)
        this.tokenService.saveExerciceCourante(this.form.controls['exercice'].value)


        console.log("******role*******"+this.tokenService.getRole())
        role_user = this.tokenService.getRole() ;

    this.paramsGeneralHttpService.GetAll().subscribe((res) => {
      res.RESULTAT[0].valeur = JSON.parse(res.RESULTAT[0].valeur)
      this.tokenService.saveParamsGeneral(res)
    });


    this.form.reset();
    this.dialogRef.close(role_user);
  }

}
