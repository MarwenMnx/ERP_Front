import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto'; // Import Chart from Chart.js
import { DataParamRoute } from '../../models/data.model';


import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { PivotTableRayonHttpService } from './services/pivot-table-rayon-http.service';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Depot } from 'src/app/erp_params/depot/models/depot.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepotHttpService } from 'src/app/erp_params/depot/services/depot-http.service';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';

@Component({
  selector: 'vex-pivot-table-rayon',
  standalone: true,
  templateUrl: './pivot-table-rayon.component.html',
  styleUrls: ['./pivot-table-rayon.component.scss'],
  imports: [TableCroiseeComponent , 
            DateRangePickerComponent ,
            StandartAutocompleteComponent,
            MatIconModule
     ]
})
export class PivotTableRayonComponent {

  pagetitle: string = 'Statistiques  Rayon'; 
  tableId: string ='table-id';

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
 
  rows:any[] = [
   {
     uniqueName: 'rayon'
   },
   {
     uniqueName: 'niveau'
   },
   {
    uniqueName: 'casier'
  },
 ];

 measures:any[] = [
   {
     uniqueName: 'somme_HT',
     aggregation: 'sum'
   },
   {
     uniqueName: 'somme_QT',
     aggregation: 'sum'
   },
   {
     uniqueName: 'somme_TTC',
     aggregation: 'sum'
   }
 ]
//integration de Api vente_article*/
 jsonData: any[] = [
   {
     rayon: { type: 'string' },
     niveau: { type: 'string' },
     casier: { type: 'string' },
     date: { type: 'string' },
     trimestre: { type: 'string' },
     mois: { type: 'string' },
     jour: { type: 'string' },
     // dateFormatee :{ type: 'string' },
     somme_HT: { type: 'number' },
     somme_QT: { type: 'number' },
     somme_TTC: { type: 'number' }
   }
 ];

 constructor(
   private serviceHttp: PivotTableRayonHttpService,
   private depotServiceHttp:DepotHttpService,
   private route: ActivatedRoute,
   private router: Router,
   private fb: FormBuilder,
   private tokenService: TokenService
  
 ) {}


 FiltredDepots :any = '';
  
  /*filtre le depot*/
newItemEvent(newValue: any) {
this.FiltredDepots = newValue[1].code_unique
}


/* ajout date range filtrage*/
  labelTextPR = 'Période';
  get_DateRange: any
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange
  }

 dataParams: DataParamRoute = new DataParamRoute();
 allDepots:Depot[] = [];


 filterRayon() {
  this.jsonData = [];
  let today = new Date();
  let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  let myToday_End = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  let listFiltre: any = {
    code_depotpv: this.FiltredDepots,
    code_societe: this.tokenService.getCodeSociete(),
    code_exercice: this.tokenService.getCodeExercice(),
    date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
    date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
  
  }
  if(this.FiltredDepots==""){
      showAlertError(
      'Erreur!',
      'Veuillez remplir correctement tous les champs du formulaire.'
    )
  }
  else
  {
 console.log('===================  filterrred  =================');
 console.log(listFiltre);
 console.log('====================================');
  this.serviceHttp.GetAll(listFiltre).subscribe((data) => {
    console.log('====================================');
   console.log(this.jsonData);
   console.log('====================================');  
   
    let lignes: any = data.RESULTAT;
    lignes.map((line: any) => {
       /*definir une object date et renvoyer le mois et la trimestre  et le jour */ 
        const dateObj = new Date(line.date);
        const mois = dateObj.getMonth() + 1; // Les mois sont indexés à partir de zéro, donc on ajoute 1
        // const Formatjour = dateObj.getDate(); // Récupération du jour
        const jour = (mois < 10 ? '0' : '') + mois + '-' + (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate();
        const trimestre = Math.ceil(mois / 3);
         this.jsonData.push({
         rayon: line.rayon,
          niveau: line.niveau,
          date: line.date, //date complete
          jour: jour.toString(), // Ajout du jour
          somme_HT: line.somme_HT,
          somme_QT: line.somme_QT,
          somme_TTC: line.somme_TTC,
          casier: line.casier,
          mois: mois.toString() ,// Convertir le mois en chaîne de caractères
          trimestre: trimestre.toString(), // Ajout du trimestre
       
        });
      });

      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
      
    });
    
  }

 }

 ngOnInit() {
  //getAllUsers
  this.depotServiceHttp.GetAll().subscribe((res) => {
    this.allDepots = this.depotServiceHttp.getData(res.RESULTAT);
  });

 
 }};
