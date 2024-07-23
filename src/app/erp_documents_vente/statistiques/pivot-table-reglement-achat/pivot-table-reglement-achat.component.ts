import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataParamRoute } from '../../models/data.model';
import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { ReglementAchatHttpService } from './services/reglement-achat-http.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { TokenService } from 'src/app/services/token.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { UtilService } from 'src/app/utils/UtilService.service';
@Component({
  selector: 'vex-pivot-table-reglement-achat',
  standalone:true,
  templateUrl: './pivot-table-reglement-achat.component.html',
  styleUrls: ['./pivot-table-reglement-achat.component.scss'],
  imports: [TableCroiseeComponent,
    DateRangePickerComponent,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    FiltreAutocompletSelectAllComponent
  ]

})
export class PivotTableReglementAchatComponent {

  dataTypeDocument = this.utilService.parseEnumToObject('enum_modeReglement');
  labelTextBC = 'Mode Reglement';
  selectedKeyBq = 'key';//'key';
  selectedValBq = 'value';//'value';
  preSelectedBq: any = [];
  selectedListDocument: any;

  set_SelectedList(p_SelectedList: any) {
   this.selectedListDocument = p_SelectedList;
  }
  pagetitle: string = 'Statistiques Règlement Achat';
  tableId: string = 'table-id';
  //------------*********  les lignes afficher par defauts ***********------------


  columns: any[] = [
   {
      uniqueName: 'date',
    },
    {
      uniqueName: 'trimestre',
    },
    {
      uniqueName: 'mois',
    },
    {
      uniqueName: 'jour',
    },
  ];

  rows: any[] = [
    {
      uniqueName: 'modeReglement',
    },
    {
     uniqueName: 'montant_1',
   }, 
 ];

  measures: any[] = [

   {
      uniqueName: 'montant_1',
      aggregation: 'sum'
    }, 
  
  ]
  //integration de Api vente_article*/
  jsonData: any[] = [
    {
      modeReglement: { type: 'string' },
      montant_1: { type: 'number'},
      date: { type: 'string' },
      trimestre: { type: 'string' },
      mois: { type: 'string' },
      jour: { type: 'string' },
  
    }
  ];

  constructor(
    private serviceHttp: ReglementAchatHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private utilService: UtilService

  ) { }


    /* ajout date range filtrage*/
    labelTextPR = 'Période';
    get_DateRange: any
    set_SelectedDateRange(p_SelectedDateRange: any) {
      this.get_DateRange = p_SelectedDateRange
    }
  dataParams: DataParamRoute = new DataParamRoute();

  filterReglementAchat() {
 let modesRegs = []
   for (let item of this.selectedListDocument){
   modesRegs.push(item.key)
   }

  this.jsonData = [];
    let today = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    let listFiltre: any = {
      tab_reg:"reglementfournisseurs",
      code_societe: this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
      date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
      modeReglement: modesRegs,
    }


 
    // Fetch data and subscribe to the Observable
    this.serviceHttp.GetAll(listFiltre).subscribe((data) => {
      console.log('======================Reglement ACHAT==============');
      console.log(this.jsonData);
      console.log('====================================');
      let lignes: any = data.RESULTAT;
      lignes.map((line: any) => {
        /*definir une object date et renvoyer le mois et la trimestre  et le jour */
        const dateObj = new Date(line.date);
        const mois = dateObj.getMonth() + 1; // Les mois sont indexés à partir de zéro, donc on ajoute 1
        // const Formatjour = dateObj.getDate(); // Récupération du jour
        const jour =  mois + '-' +  dateObj.getDate();
        const trimestre = Math.ceil(mois / 3);
        this.jsonData.push({
          date: line.date, //date complete
          // Formatjour:Formatjour.toString(),
          jour: jour.toString(), // Ajout du jour
          mois: mois.toString(),// Convertir le mois en chaîne de caractères
          trimestre: trimestre.toString(), // Ajout du trimestre
              modeReglement: line.modeReglement,
              montant_1: line.montant_1,
        });
      });
    });

  }

  ngOnInit() {
  }};
