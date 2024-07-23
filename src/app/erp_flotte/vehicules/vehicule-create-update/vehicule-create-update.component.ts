import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MarqueHttpService } from '../../marque/services/marque-http.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Vehicule } from '../models/vehicule.model';
import { VehiculeHttpService } from '../services/vehicule-http.service';
import { TypevehiculeHttpService } from '../../typevehicule/services/typevehicule-http.service';
import { VehiculeService } from '../services/vehicule.service';
import { SoustypevehiculeHttpService } from '../../soustypevehicule/services/soustypevehicule-http.service';
import { ModelevehiculeHttpService } from '../../modelevehicule/services/modelevehicule-http.service';
import { LeasingsHttpService } from '../../leasings/services/leasings-http.service';
import {
  APP_DATE_FORMATS,
  AppDateAdapter
} from 'src/app/utils/dateAdapter/date.adapter';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'src/app/utils/shared.module';
import { showAlertError } from 'src/app/global-functions';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { UtilService } from '../../../utils/UtilService.service';

@Component({
  selector: 'vex-vehicule-create-update',
  templateUrl: './vehicule-create-update.component.html',
  styleUrls: ['./vehicule-create-update.component.scss'],
  standalone: true,

  providers: [
    { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    DatePipe
  ],
  imports: [
    StandartAutocompleteComponent,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    AsyncPipe,
    NgForOf,
    MatDatepickerModule,
    MatCheckboxModule,
    SharedModule,
    MatAutocompleteModule,
    MatDividerModule,
    DatePipe,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class VehiculeCreateUpdateComponent implements OnInit {
  inputCtrl: any = FormControl;
  disabled: boolean = true;

  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  selectedTime: any;
  showDatepicker = false;
  selectedDate = new Date();

  selectDate: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  newItemEvent(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['marque_vehicule'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  newItemTypeVehicule(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['type_vehicule'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  newItemSousTypeVehicule(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['soustype_vehicule'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  newItemModeleVehicule(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['modele_vehicule'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  newItemLeasing(newValue: any) {
    try {
      if (this.form.contains(newValue[0])) {
        this.form.controls['leasing'].setValue(newValue[1]);
      }
    } catch (e) {}
  }

  form = this.fb.group({
    _id: [''],
    libelle: [''],
    immatricule: ['', Validators.required],
    num_chassis: [''],
    type_plateau: [''],
    charge_total: 0,
    essieu: 0,
    nbre_cheveaux: 0,
    poid_vide: 0,
    charge_utile: 0,
    nb_places: 0,
    // date_mise_circulation:"",
    date_mise_circulation:this.date_form.parse(this.defaults?.date_mise_circulation)|| new Date(),
    date_achat:this.date_form.parse(this.defaults?.date_achat)|| new Date(),
    date_main_leve_leasing:this.date_form.parse(this.defaults?.date_mise_circulation)|| new Date(),
    basculante: false,
    valeur_achat: 0,
    type_conteur: [''],
    nombre_km_actuelle: [''],
    notes: [''],
    //listes deroulante
    marque_vehicule: [''],
    type_vehicule: ['', Validators.required],
    soustype_vehicule: ['', Validators.required],
    modele_vehicule: ['', Validators.required],
    leasing: [this.defaults?.leasing || '', Validators.required]
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Vehicule | undefined,
    private dialogRef: MatDialogRef<VehiculeCreateUpdateComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private date_form: AppDateAdapter,
    private serviceHttp: VehiculeHttpService,
    private service: VehiculeService,
    public utilService:UtilService,

    /* Pour acceder au service marque */
    private serviceHttpMarque: MarqueHttpService,

    /* Pour acceder au service type Vehicule */
    private serviceHttpTypeVehicule: TypevehiculeHttpService,

    /* Pour acceder au service sous type Vehicule */
    private serviceHttpSousTypeVehicule: SoustypevehiculeHttpService,

    /* Pour acceder au service modele Vehicule */
    private serviceHttpModeleVehicule: ModelevehiculeHttpService,

    /* Pour acceder au service modele Vehicule */
    private serviceHttpLeasing: LeasingsHttpService
  ) {}
  public modeles: any = [];
  public typevehicules: any = [];
  public soustypevehicules: any = [];
  public modelesvehicules: any = [];
  public leasinglist: any = [];

  ngOnInit() {
    //get all marque form getall service
    this.serviceHttpMarque.GetAll().subscribe((res) => {
      this.modeles = this.serviceHttpMarque.getData(res.RESULTAT);
    });

    //get all  véhicule form getall service
    this.serviceHttpTypeVehicule.GetAll().subscribe((res) => {
      this.typevehicules = this.serviceHttpTypeVehicule.getData(res.RESULTAT);
    });

    //get all  sous type véhicule form getall service
    this.serviceHttpSousTypeVehicule.GetAll().subscribe((res) => {
      this.soustypevehicules = this.serviceHttpSousTypeVehicule.getData(
        res.RESULTAT
      );
    });
    //get all  modeles véhicule form getall service
    this.serviceHttpModeleVehicule.GetAll().subscribe((res) => {
      this.modelesvehicules = this.serviceHttpModeleVehicule.getData(
        res.RESULTAT
      );
    });

    //get all  leasing list form getall service
    this.serviceHttpLeasing.GetAll().subscribe((res) => {
      this.leasinglist = this.serviceHttpLeasing.getData(res.RESULTAT);
    });

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = new Vehicule(null);
    }

    this.form.patchValue(this.defaults);
    this.inputCtrl = new FormControl({ value: '', disabled: this.disabled });
  }

  save() {
    if (!this.form.valid) {
      StandartAutocompleteService.submitFormAutocomplete();
      showAlertError(
        'Erreur!',
        'Veuillez remplir correctement tous les champs du formulaire.'
      );
      return;
    }

    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as Vehicule;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef);
    });
  }

  update() {
    const item: any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      this.service.successUpdate(res, this.dialogRef);
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
