
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule  ,FormControl, Validators , UntypedFormControl} from '@angular/forms';
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
import { NgIf, formatDate } from '@angular/common';
import {MatDatepickerInput, MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { Sessions_caisse } from '../models/sessions-caisses.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from 'src/app/utils/shared.module';
import { SessionsCaissesHttpService } from '../services/sessions-caisses-http.service';
import { SessionsCaissesService } from '../services/sessions-caisses.service';
import { UsersHttpService } from '../../../erp_params/users/services/users-http.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { markFormGroupTouched, markInputsAsTouchedByClass, showAlertError, showLoading } from 'src/app/global-functions';
import { DatePipe } from '@angular/common';
import {TokenService} from "../../../services/token.service";
import {UtilService} from "../../../utils/UtilService.service";
import {Depot} from "../../../erp_params/depot/models/depot.model";

@Component({
  selector: 'vex-sessions-caisses-create-update',
  templateUrl: './sessions-caisses-create-update.component.html',
  styleUrls: ['./sessions-caisses-create-update.component.scss'],
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
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SharedModule,
    MatAutocompleteModule,
    StandartAutocompleteComponent,
    MatDatepickerModule,
    DatePipe,
    MatNativeDateModule,


  ]
})
export class SessionsCaissesCreateUpdateComponent implements OnInit {

  isCheckboxDisabled:boolean = true;

  isDatePickerDisabled: boolean = true;
  inputCtrl:any = FormControl;
  disabled: boolean = true;
  isInputDisabled: boolean = true;

  events: string[] = [];
 addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  selectedTime: any;
  showDatepicker = false;
  selectedDate = new Date();

  selectDate :any = this.datePipe.transform(new Date(), "yyyy-MM-dd")
  newItemEvent(newValue:any){
    try{
      if (this.form.contains(newValue[0])) {
        this.form.controls["utilisateur_caissier"].setValue(newValue[1])
      }
    }catch(e){}
  }

  newItemEventDepot(newValue:any){
    try{
      if (this.form.contains(newValue[0])) {
        this.form.controls["depot_PV_source"].setValue(newValue[1])
      }
    }catch(e){}
  }


  isChecked: boolean = false;
  selectCtrl: UntypedFormControl = new UntypedFormControl();
  static id = 100;

 form = this.fb.group({
    _id: [SessionsCaissesCreateUpdateComponent.id++],
    numero: this.defaults?.numero,
    nom_machine_caisse: this.defaults?.nom_machine_caisse || '',

    // date_ouverture:  this.date_form.formatDateHeure(this.defaults?.date_ouverture) || new Date(),
    date_ouverture: this.date_form.parse(this.defaults?.date_ouverture)|| new Date(),
   //  date_cloture: this.date_form.formatDateHeure(this.defaults?.date_cloture) ||new Date(),
    date_cloture: this.date_form.parse(this.defaults?.date_cloture)|| new Date(),
  // date_cloture: this.date_form.parse(this.defaults?.date_cloture),
    fond_caisse_superviseur: this.defaults?.fond_caisse_superviseur || '',
    fond_caisse_caissier: this.defaults?.fond_caisse_caissier || '',
   total_vente : 0,
    total_encaissement: 0,
    totad_decaissement:0,
    total_gain: 0,
    montant_ecart:0,
    notes: this.defaults?.notes || '',
    cloture: true,
   utilisateur_caissier: [ this.defaults?.utilisateur_caissier || '', Validators.required] ,
   depot_PV_source:      this.defaults?.depot_PV_source || Depot,
  });
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Sessions_caisse,
    private dialogRef: MatDialogRef<SessionsCaissesCreateUpdateComponent>,
    private fb: FormBuilder,
    private date_form:AppDateAdapter,
    private serviceHttp:SessionsCaissesHttpService,
    private service:SessionsCaissesService,
    private serviceHttpUsers: UsersHttpService,
    private datePipe:DatePipe , private tokenService:TokenService ,
    public utilService:UtilService,

  ) {}

  public users:any =[]
  allDepots:Depot[] = [];
  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new Sessions_caisse(null);
    }

    let depotCourant = JSON.parse(JSON.stringify(this.tokenService.pointVenteCourante))
    // console.log("*********************",depotCourant)
    this.allDepots = depotCourant?.ayant_acces;
    this.allDepots.push(depotCourant);

    let  utilisateur_:any = {
      _id:   this.tokenService.user?._id ,
      nom:   this.tokenService.user?.nom
    }
     this.defaults.utilisateur_caissier = utilisateur_
     this.defaults.utilisateur_cloture = utilisateur_
    let curr_dep:any = this.tokenService?.pointVenteCourante
    if (this.mode === 'update') {

      const indexArr =  this.allDepots.filter(
        (depot:any) => depot?.code_unique.toString().toLowerCase().indexOf(this.defaults.code_depotpv.toString().toLowerCase()) >= 0
      );
      curr_dep = indexArr.length> 0 ?
        { _id: indexArr[0]._id, libelle: indexArr[0].libelle, code_unique:indexArr[0].code_unique} : curr_dep
    }
    this.defaults.depot_PV_source = curr_dep

    let codeSoc     = this.tokenService.getCodeSociete()
    let idUs        = this.tokenService.user?._id
    let dataUs:any  = {_id: idUs, code_societe : codeSoc , sessionCaisses:true}
    this.serviceHttpUsers.usersBySociete(dataUs).subscribe((res) => {
      this.users = this.serviceHttpUsers.getData(res.RESULTAT);
    });



    this.form.patchValue(this.defaults);

    this.inputCtrl = new FormControl({value: '', disabled: this.disabled})
  }

  save() {
    if (!this.form.valid){
      markFormGroupTouched(this.form);
      markInputsAsTouchedByClass();
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }

    if (this.mode === 'create') {
      this.createSessionCaisse();
    } else if (this.mode === 'update') {
      this.updateSessionCaisse();
    }


  }

  createSessionCaisse() {
    let item:any          = this.form.value as Sessions_caisse;
    let today             = new Date(item.date_ouverture);
    item.date_ouverture   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    item.code_depotpv     = item.depot_PV_source.code_unique
    showLoading()
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });
  }

  updateSessionCaisse() {
    const item:any = this.form.value;
    item.code_depotpv     = item.depot_PV_source.code_unique
    showLoading()

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
