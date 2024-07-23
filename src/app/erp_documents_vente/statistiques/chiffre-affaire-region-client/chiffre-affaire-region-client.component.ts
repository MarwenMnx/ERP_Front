import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormControl,
  FormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import {  Subscription } from 'rxjs';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';


import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { getData, hideLoading, showLoading } from 'src/app/global-functions';
import { SharedModule } from 'src/app/utils/shared.module';

import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { FiltrePaysGouvDeligationLocaliteComponent } from './filtre-pays-gouv-deligation-localite/filtre-pays-gouv-deligation-localite.component';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { ChiffreAffaireRegionClientHttpService } from './services/chiffre-affaire-region-client-http.service';
import { TokenService } from 'src/app/services/token.service';
import { ClientHttpService } from 'src/app/erp_params/clients/services/client-http.service';
import { ClientService } from 'src/app/erp_params/clients/services/client.service';
import { DataParamRoute } from '../../models/data.model';

@Component({
  selector: 'vex-chiffre-affaire-region-client',
  templateUrl: './chiffre-affaire-region-client.component.html',
  standalone: true,
  styleUrls: ['./chiffre-affaire-region-client.component.scss'],
  imports: [
    TableCroiseeComponent,
    DateRangePickerComponent,
    MatIconModule,
    MatButtonModule,
    FiltrePaysGouvDeligationLocaliteComponent,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe,
    StandartAutocompleteComponent,
    VexBreadcrumbsComponent,
    SharedModule
  ]
})
export class ChiffreAffaireRegionClientComponent {
  isAccordionDetailsOpen: boolean = false;
  pagetitle: string = 'Statistiques Chiffre Affaire Client Par Region ';
  tableId: string = 'table-id';
  //------------*********  les lignes afficher par defauts ***********------------

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  columns: any[] = [
    {
      uniqueName: 'date'
    },
    {
      uniqueName: 'trimestre'
    },
    {
      uniqueName: 'mois'
    },
    {
      uniqueName: 'jour'
    }
  ];

  rows: any[] = [
    {
      uniqueName: 'pays'
    },
    {
      uniqueName: 'gouvernorat'
    },
    {
      uniqueName: 'delegation'
    },
    {
      uniqueName: 'localite'
    }
  ];

  measures: any[] = [
    {
      uniqueName: 'total_TTC',
      aggregation: 'sum'
    },
    {
      uniqueName: 'total_HT',
      aggregation: 'sum'
    }
  ];
  //integration de Api vente_article*/
  jsonData: any[] = [
    {
      pays: { type: 'string' },
      gouvernorat: { type: 'string' },
      delegation: { type: 'string' },
      localite: { type: 'string' },
      date: { type: 'string' },
      trimestre: { type: 'string' },
      mois: { type: 'string' },
      jour: { type: 'string' },
      total_TTC: { type: 'number' },
      total_HT: { type: 'number' }
    }
  ];

  /* methode details pays gouve deleg localitè */

  newItemEvent(newValue: any) {
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1]);
    }
    if (['pays', 'gouvernorat', 'delegation'].includes(newValue[0])) {
      this.filtrerAdress();
    }
  }

  /*form details*/
  auto = '';
  form: FormGroup = this.fb.group({
    _id: '',
    pays: '',
    gouvernorat: '',
    delegation: '',
    localite: ''
  });
  mode: 'create' | 'update' = 'create';
  public defaults: Client = new Client(null);
  private routeSub: Subscription;
  private id: string = '';
  constructor(
    private serviceChiffreHttp: ChiffreAffaireRegionClientHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private serviceHttp: ClientHttpService,
    private service: ClientService
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.mode = 'update';
      }
    });
  }

    allPays: any[] = [];
    gouvernoratsFiltree: any[] = [];
    delegationsFiltree: any[] = [];
    localitesFiltree: any[] = [];

  /*methode filter adress*/

  async getAdresses() {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllAdress().subscribe((res) => {
        this.allPays = getData(res.RESULTAT);
        this.service.setAllPays(this.allPays);
        this.filtrerAdress();
        resolve(null);
      });
    });
  }

  /* ajout date range filtrage*/
  labelTextPR = 'Période';
  get_DateRange: any;
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange;
  }

  dataParams: DataParamRoute = new DataParamRoute();

  filterRegionClient() {
     // Clear existing data
     this.jsonData = [];
    let today = new Date();
    let myToday_Start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    let myToday_End = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );
    let listFiltre: any = {
      code_societe: this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      date1:
        this.get_DateRange != undefined
          ? this.get_DateRange.dateStart
          : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
      date2:
        this.get_DateRange != undefined
          ? this.get_DateRange.dateEnd
          : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
      pays: this.form.value.pays ? [this.form.value.pays._id] : [],
      gouvernorat: this.form.value.gouvernorat
        ? [this.form.value.gouvernorat._id]
        : [],
      delegation: this.form.value.delegation
        ? [this.form.value.delegation._id]
        : [],
      localite: this.form.value.localite ? [this.form.value.localite._id] : []
    };
    //filtered Data
    console.log('===================  filterrred  =================');
    console.log(listFiltre);
    console.log('====================================');
    {
      // Fetch data and subscribe to the Observable
      this.serviceChiffreHttp.GetAll(listFiltre).subscribe((data) => {
        console.log(
          '======================CHIFFRE AFFAIRE REGION CLINET=============='
        );
        console.log(this.jsonData);
        console.log('====================================');
        let lignes: any = data.RESULTAT;
        lignes.map((line: any) => {
          /*definir une object date et renvoyer le mois et la trimestre  et le jour */
          const dateObj = new Date(line.date);
          const mois = dateObj.getMonth() + 1; // Les mois sont indexés à partir de zéro, donc on ajoute 1
          // const Formatjour = dateObj.getDate(); // Récupération du jour
          const jour = mois + '-' + dateObj.getDate();
          const trimestre = Math.ceil(mois / 3);
          this.jsonData.push({
            date: line.date, //date complete
            // Formatjour:Formatjour.toString(),
            jour: jour.toString(), // Ajout du jour
            mois: mois.toString(), // Convertir le mois en chaîne de caractères
            trimestre: trimestre.toString(), // Ajout du trimestre
            pays: line.pays ? line.pays.libelle : 'vide',
            gouvernorat: line.gouvernorat ? line.gouvernorat.libelle : 'vide',
            delegation: line.delegation ? line.delegation.libelle : 'vide',
            localite: line.localite ? line.localite.libelle : 'vide',
            total_TTC: line.total_TTC,
            total_HT: line.total_HT
          });
        });

        this.jsonData = JSON.parse(JSON.stringify(this.jsonData));
      });
    }
  }
  async ngOnInit() {
    showLoading();
    await this.getAdresses()
     hideLoading()
  }

  filtrerAdress() {
    let inputs: any = {
      pays: this.form.controls['pays'].value,
      gouvernorat: this.form.controls['gouvernorat'].value,
      delegation: this.form.controls['delegation'].value,
      localite: this.form.controls['localite'].value
    };

    let outputs = this.service.filtrerAdress(inputs, this.allPays);

    this.delegationsFiltree = outputs.delegationsFiltree;
    this.gouvernoratsFiltree = outputs.gouvernoratsFiltree;
    this.localitesFiltree = outputs.localitesFiltree;

    this.defaults.pays = outputs.pays;
    this.defaults.gouvernorat = outputs.gouvernorat;
    this.defaults.delegation = outputs.delegation;
    this.defaults.localite = outputs.localite;

    this.form.patchValue(outputs);
  }
}
