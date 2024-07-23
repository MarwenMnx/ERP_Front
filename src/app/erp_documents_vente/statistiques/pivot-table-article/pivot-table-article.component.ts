import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto'; // Import Chart from Chart.js
import { DataParamRoute } from '../../models/data.model';
import { TableCroiseeComponent } from 'src/app/utils/table-croisee/table-croisee.component';
import { PivotTableHttpService } from './services/pivot-table-article-http.service';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { DepotHttpService } from 'src/app/erp_params/depot/services/depot-http.service';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { UtilService } from 'src/app/utils/UtilService.service';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pivot-table-article',
  standalone: true,
  templateUrl: './pivot-table-article.component.html',
  imports: [TableCroiseeComponent,
    DateRangePickerComponent ,
    FiltreAutocompletSelectAllComponent,
    FiltreCatgFamilleSousFamilleComponent,
    MatIconModule,
    NgIf,
    MatButtonModule,
  ]

})
export class PivotTableComponent {

  isAccordionDetailsOpen: boolean = false
  pagetitle: string = 'Statistiques  Articles';
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
     uniqueName: 'categorie',
   },
  
   {
     uniqueName: 'famille',
   },
   {
     uniqueName: 'sousFamille',
   },
   {
     uniqueName: 'designation',
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
      uniqueName: 'somme_QT',
      aggregation: 'sum'
    }
  ]
  //integration de Api vente_article*/
  jsonData: any[] = [
    {
      // article: { type: 'string' },
      famille: { type: 'string' },
      sousFamille: { type: 'string' },
      date: { type: 'string' },
      trimestre: { type: 'string' },
      mois: { type: 'string' },
      jour: { type: 'string' },
      // dateFormatee :{ type: 'string' },
      categorie: { type: 'string' },
      // reference: { type: 'string' },
      designation: { type: 'string' },
      somme_HT: { type: 'number' },
      somme_QT: { type: 'number' },
      somme_TTC: { type: 'number' }
    }
  ];

  constructor(
    private serviceHttp: PivotTableHttpService,
    private serviceHttDepot: DepotHttpService,
    private route: ActivatedRoute,
    public utilService: UtilService,
    private tokenService: TokenService,
    private router: Router
  ) { }


  
/* ajout date range filtrage*/
labelTextPR = 'Période';
get_DateRange: any
set_SelectedDateRange(p_SelectedDateRange: any) {
  this.get_DateRange = p_SelectedDateRange
}

//ajout depot selection multiple 
dataDepot: any = []; //Depot[] = [];
labelTextDp = 'Dépôt/Point de Vente';
selectedKeyDepot = 'code_unique';
selectedValDepot = 'libelle';
preSelectedItems: any = ""

selectedListFromFiltreDepot: any;
 
//la liste selected de depot 
set_SelectedListDepot(p_SelectedList: any) {
  this.selectedListFromFiltreDepot = p_SelectedList;
}

  dataParams: DataParamRoute = new DataParamRoute();
 //declarer une methode pour ajouter les depots cochés
 getDataDepot(items: any) {
  let newItems = [];
  for (let key of Object.keys(items)) {
    // newItems.push(new Depot(items[key]));
    newItems.push({
      _id: items[key]._id,
      libelle: items[key].libelle,
      code_unique: items[key].code_unique
    });
  }
  return newItems;
}
 /*filtre categorie famille sous famille article */
  filterCateg(p_synchronizData: any) {
    this.filtrerEvent = p_synchronizData
  }

  filtrerEvent: any
  filterArticle() {
      // Clear existing data
    
    this.get_listMvmt()
  }


  get_listMvmt() {
    this.jsonData = [];
    let listCategory = undefined
    let listFamille = undefined
    let listSousFamille = undefined
    let listArticles = undefined

  if (this.filtrerEvent != undefined) {
    if (this.filtrerEvent.categories.length > 0) {
      listCategory = this.utilService.listStringOfArrayObject(this.filtrerEvent.categories, '_id')
    }
    if (this.filtrerEvent.familles.length > 0) {
      listFamille = this.utilService.listStringOfArrayObject(this.filtrerEvent.familles, '_id')
    }
    if (this.filtrerEvent.sousFamilles.length > 0) {
      listSousFamille = this.utilService.listStringOfArrayObject(this.filtrerEvent.sousFamilles, '_id')
    }
    if (this.filtrerEvent.articles.length > 0) {
      listArticles = this.utilService.listStringOfArrayObject(this.filtrerEvent.articles, '_id')
    }
  }



  let today = new Date();
  let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  let myToday_End = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  let listFiltre: any = {
    code_depotpv: this.selectedListFromFiltreDepot,
    code_societe: this.tokenService.getCodeSociete(),
    code_exercice: this.tokenService.getCodeExercice(),
    date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
    date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
    categories: listCategory,
    familles: listFamille,
    sous_familles: listSousFamille,
    articles: listArticles,
  }
  if(this.selectedListFromFiltreDepot==""){
      showAlertError(
      'Erreur!',
      'Veuillez remplir correctement tous les champs du formulaire.'
    )
  }
  else 
  {

// Fetch data and subscribe to the Observable
console.log('===================  Filtred Article  =================');
console.log(listFiltre);
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
    const jour =  mois + '-' +  dateObj.getDate();
    const trimestre = Math.ceil(mois / 3);
    this.jsonData.push({
      date: line.date, //date complete
      // Formatjour:Formatjour.toString(),
      jour: jour.toString(), // Ajout du jour
      mois: mois.toString(),// Convertir le mois en chaîne de caractères
      trimestre: trimestre.toString(), // Ajout du trimestre
      article: line.article.reference,
      reference : line.article.reference,
      designation: line.article.designation,
      categorie: line.article.categorie.libelle,
      famille: line.article.famille ? line.article.famille.libelle : "vide",
      sousFamille: line.article.sousFamille ? line.article.sousFamille.libelle : "vide",
      somme_HT: line.somme_HT,
      somme_QT: line.somme_QT,
      somme_TTC: line.somme_TTC,
    
    });
  });

  this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
  
})}};
  ngOnInit() {
  
    //getAll Depot 
    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.dataDepot = this.getDataDepot(res.RESULTAT);
    });
  }
}
