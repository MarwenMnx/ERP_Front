import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import {TokenService} from "../../../services/token.service";
import {UtilService} from "../../../utils/UtilService.service";
import {UsersHttpService} from "../../../erp_params/users/services/users-http.service";
import {StandartAutocompleteComponent} from "../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SharedModule} from "../../../utils/shared.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../../utils/dateAdapter/date.adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatRadioModule} from "@angular/material/radio";
import {ChargeCaisse} from "../../charge_caisse/models/chargeCaisse.model";
import {ChargeCaisseHttpService} from "../../charge_caisse/services/chargeCaisse-http.service";
import {TypeChargesHttpService} from "../../../erp_params/type-charges/services/type-charges-http.service";
import {CaissesHttpService} from "../services/Caisses-http.service";
import {Caisses} from "../models/caisses.model";
import {TypeCaissesHttpService} from "../../type-caisses/services/type-caisses-http.service";
import {Depot} from "../../../erp_params/depot/models/depot.model";
import {DepotHttpService} from "../../../erp_params/depot/services/depot-http.service";
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import {User} from "../../../erp_params/users/models/user.model";

@Component({
  selector: 'vex-caisses-create-update',
  templateUrl: './caisses-create-update.component.html',
  styleUrls: ['./caisses-create-update.component.scss'],
  standalone: true,
  providers:
    [
      { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      DatePipe
    ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,CommonModule,
    MatIconModule, FormsModule,
    MatDividerModule, SharedModule,
    MatAutocompleteModule,MatRadioModule,
    MatFormFieldModule,DatePipe, MatDatepickerModule,
    MatInputModule ,StandartAutocompleteComponent,FiltreAutocompletSelectAllComponent
  ]
})
export class CaissesCreateUpdateComponent  implements OnInit {

  form = this.fb.group({
    _id:                  [this.defaults?._id || ''],
    numero:               [this.defaults?.numero || '', Validators.required] ,
    libelle:              [this.defaults?.libelle || '', Validators.required] ,
    date_ouverture:       this.date_form.parse(this.defaults?.date_ouverture)|| new Date(),
    fondCaisse:           this.defaults?.fondCaisse || '',
    montant:              [this.defaults?.montant || '', Validators.required] ,
    utilisateur_ouverture_caisse: [ this.defaults?.utilisateur_ouverture_caisse || '', Validators.required] ,
    typeCaisse:           [ this.defaults?.typeCaisse || '', Validators.required] ,
    // beneficiaireExterne:  [this.defaults?.beneficiaireExterne || '', Validators.required] ,
    //
    // beneficiaireInterne:  [ this.defaults?.beneficiaireInterne || '', Validators.required] ,
    // utilisateur:          [ this.defaults?.utilisateur || '', Validators.required] ,
    // type_charge:          [ this.defaults?.type_charge || '', Validators.required] ,

    // code_societe:         this.tokenService.getCodeSociete(),
    // code_exercice:        this.tokenService.getCodeExercice(),
    // code_depotpv :        this.tokenService.getCodePointeVente(),
    // sessionCaisse:        this.defaults?.sessionCaisse  ,
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Caisses | undefined,
    private dialogRef: MatDialogRef<CaissesCreateUpdateComponent>,
    private fb: FormBuilder,private date_form:AppDateAdapter,
    private serviceHttp:CaissesHttpService,
    private datePipe:DatePipe , private tokenService:TokenService ,
    public utilService:UtilService,private serviceHttpUsers: UsersHttpService,
    private serviceHttpTypeCaisse: TypeCaissesHttpService,private serviceHttDepot: DepotHttpService,
  ) {}

  public users:any =[]
  listTypeCaisses:any =[]

  dataDepot: Depot[] = [];
  labelTextBC             = 'Dépôt/Point de Vente';
  selectedKeyDepot        = '_id';
  selectedValDepot        = 'libelle';
  preSelectedItems:any    = ""

  selectedListFromFiltre: any;
  set_SelectedList(p_SelectedList: any) {
    this.selectedListFromFiltre = p_SelectedList;
  }

  dataUsers: User[] = [];
  labelTextUS          = 'Utilisateur possède caisse';
  selectedKeyUS        = '_id';
  selectedValUS        = 'nom';
  preSelectedUS:any    = ""
  selectedListFromFiltreUS: any;
  set_SelectedListUser(p_SelectedList: any) {
    this.selectedListFromFiltreUS = p_SelectedList;
  }

  selectDate :any = this.datePipe.transform(new Date(), "yyyy-MM-dd")

  newItemEvent(newValue:any){
    // try{
    //   if (this.form.contains(newValue[0])) {
    //     if(newValue[0]=='beneficiaireInterne')  {this.form.controls["beneficiaireInterne"].setValue(newValue[1])}
    //     if(newValue[0]=='type_charge')          {this.form.controls["type_charge"].setValue(newValue[1])}
    //     if(newValue[0]=='utilisateur')          {this.form.controls["utilisateur"].setValue(newValue[1])}
    //   }
    // }catch(e){}
  }

  types_charge:any = []
  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Caisses;
    }

    let codeSoc     = this.tokenService.getCodeSociete()
    let idUs        = this.tokenService.user?._id
    let dataUs:any  = {_id: idUs, code_societe : codeSoc , possedeCaisse:true}
    this.serviceHttpUsers.usersBySociete(dataUs).subscribe((res) => {
      this.users      = this.serviceHttpUsers.getData(res.RESULTAT);
      this.dataUsers  = res.RESULTAT
    });

    this.serviceHttp.GetAll().subscribe((res) => {
      this.types_charge = this.serviceHttp.getData(res.RESULTAT);
    });

    this.serviceHttpTypeCaisse.GetAll().subscribe((res) => {
      this.listTypeCaisses = res.RESULTAT ;
    });

    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.dataDepot = res.RESULTAT// this.getDataDepot(res.RESULTAT);
    });
    this.preSelectedItems = this.defaults.depotpv
    this.preSelectedUS = this.defaults.utilisateurs_caisse


    this.form.patchValue(this.defaults);
  }

  save() {

    //if (!this.form.valid) return

    const item   = this.form.value as Caisses;
    item.depotpv = this.selectedListFromFiltre
    item.utilisateurs_caisse = this.selectedListFromFiltreUS
    // item.beneficiaireInterne  = this.showDivIntern==true   ? item.beneficiaireInterne : null
    // item.beneficiaireExterne  = this.showDivIntern==false  ? item.beneficiaireExterne : ''
    //
    // item.sessionCaisse  = this.tokenService.sessionCaisseCourante
    // item.utilisateur    = {
    //   _id:   this.tokenService.user?._id ? this.tokenService.user?._id : "",
    //   nom:   this.tokenService.user?.nom ? this.tokenService.user?.nom : ""
    // }

    if (this.mode === 'create') {
      this.create(item);
    } else if (this.mode === 'update') {
      this.update(item);
    }
  }

  create(item:any) {
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.serviceHttp.successCreate(res, this.dialogRef)
    });
  }

  update(item:any) {
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      this.serviceHttp.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }


}
