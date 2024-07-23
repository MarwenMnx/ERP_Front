import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataParamRoute } from '../../models/data.model';
import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { ChiffreAffaireClientHttpService } from './services/chiffre-affaire-client-http.service';
@Component({
  selector: 'vex-chiffre-affaire-client',
  standalone:true,
  templateUrl: './chiffre-affaire-client.component.html',
  styleUrls: ['./chiffre-affaire-client.component.scss'],
  imports: [TableCroiseeComponent]

})
export class ChiffreAffaireClientComponent {

  pagetitle: string = 'Statistiques Chiffre Affaire Client';
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
      uniqueName: 'client',
    },
    {
     uniqueName: 'tiersCategorie',
   }, 
 
 ];

  measures: any[] = [

   {
      uniqueName: 'total_TTC',
      aggregation: 'sum'
    }, 
    {
      uniqueName: 'total_HT',
      aggregation: 'sum'
    }, 
  
  ]
  //integration de Api vente_article*/
  jsonData: any[] = [
    {
      client: { type: 'string' },
      tiersCategorie: { type: 'string'},
      date: { type: 'string' },
      trimestre: { type: 'string' },
      mois: { type: 'string' },
      jour: { type: 'string' },
      total_TTC: { type: 'number' },
      total_HT: { type: 'number' }
    }
  ];

  constructor(
    private serviceHttp: ChiffreAffaireClientHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  dataParams: DataParamRoute = new DataParamRoute();

  ngOnInit() {
    // Fetch data and subscribe to the Observable
    this.serviceHttp.GetAll().subscribe((data) => {
      console.log('======================Chiffre d"Affaire Client==============');
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
          tiersCategorie: line.client.tiersCategorie ? line.client.tiersCategorie.libelle : "vide",
          client: line.client.raisonSociale,
          total_TTC: line.total_TTC,
          total_HT: line.total_HT,
        });
      });
    });

  }
}

