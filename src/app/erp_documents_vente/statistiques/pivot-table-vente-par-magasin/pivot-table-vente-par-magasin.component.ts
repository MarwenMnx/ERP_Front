import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataParamRoute } from '../../models/data.model';
import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { VenteParMagasinHttpService } from './services/vente-par-magasin-http.service';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from 'src/app/services/token.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-pivot-table-vente-par-magasin',
  standalone: true,
  templateUrl: './pivot-table-vente-par-magasin.component.html',
  styleUrls: ['./pivot-table-vente-par-magasin.component.scss'],
  imports: [TableCroiseeComponent , 
            DateRangePickerComponent,
            MatIconModule,
            MatButtonModule
      ]

})
export class PivotTableVenteParMagasinComponent {

  pagetitle: string = 'Statistiques  Vente  Par Magasin';
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
      uniqueName: 'utilisateur',
    },
    {
     uniqueName: 'depotpv',
   }, 
 ];

  measures: any[] = [

    {
      uniqueName: 'somme_TTC',
      aggregation: 'sum'
    },
    {
      uniqueName: 'somme_HT',
      aggregation: 'sum'
    },
    {
      uniqueName: 'somme_NetHT',
      aggregation: 'sum'
    }
  ]
  //integration de Api vente_article*/
  jsonData: any[] = [
    {
      utilisateur: { type: 'string' },
      depotpv: { type: 'string'},
      date: { type: 'string' },
      trimestre: { type: 'string' },
      mois: { type: 'string' },
      jour: { type: 'string' },
      somme_HT: { type: 'number' },
      somme_NetHT: { type: 'number' },
      somme_TTC: { type: 'number' }
    }
  ];

  constructor(
    private serviceHttp: VenteParMagasinHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  /* ajout date range filtrage*/
  labelTextPR = 'Période';
  get_DateRange: any
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange
  }

  dataParams: DataParamRoute = new DataParamRoute();

  filterVenteMagasin() {
    this.jsonData = [];
    let today = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    let listFiltre: any = {
      code_societe: this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
      date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
    
    }

    // Fetch data and subscribe to the Observable
    this.serviceHttp.GetAll(listFiltre).subscribe((data) => {
      console.log('======================VENTE PAR MAGASIN==============');
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
          // utilisateur: line.utilisateur,
          utilisateur: line.utilisateur ? line.utilisateur.nom : "vide",
          // depotpv: line.depotpv,
          depotpv: line.depotpv ? line.depotpv.libelle : "vide",

          somme_HT: line.somme_HT,
          somme_NetHT: line.somme_NetHT,
          somme_TTC: line.somme_TTC,
     
        });
      });
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))

    });

  
  }

ngOnInit() {
   
}};

