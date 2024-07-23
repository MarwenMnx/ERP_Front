import {
  AfterViewInit,NgModule,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {TableColumn} from '@vex/interfaces/table-column.interface';


import {SelectionModel} from '@angular/cdk/collections';
import {fadeInUp400ms} from '@vex/animations/fade-in-up.animation';
import {stagger40ms} from '@vex/animations/stagger.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import {MatSelectChange,MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {VexPageLayoutContentDirective} from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {VexBreadcrumbsComponent} from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import {VexPageLayoutHeaderDirective} from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import {VexPageLayoutComponent} from '@vex/components/vex-page-layout/vex-page-layout.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {aioTableData, aioTableData3, aioTableLabels} from 'src/static-data/aio-table-data';
import {FiltreCatgFamilleSousFamilleComponent} from "../../utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component";
import {UtilService} from "../../utils/UtilService.service";

import {TokenService} from "../../services/token.service";
import {DateRangePickerComponent} from "../../utils/date-range-picker/date-range-picker/date-range-picker.component";
import {FiltreAutocompletSelectAllComponent} from "../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component";

import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Depot}            from "../../erp_params/depot/models/depot.model";
import {Categorie}        from "../../erp_params/categories/models/categorie.model";
import {Famille}          from "../../erp_params/familles/models/famille.model";
import {SousFamille}      from "../../erp_params/sous-famille/models/sous-famille.model";
import {Product}          from "../../erp_params/products/models/product.model";
import {DepotHttpService} from "../../erp_params/depot/services/depot-http.service";
import {RappelStockHttpService} from "./services/rappel-stock-http.service";
import {Rappel_stock} from "./models/rappel-stock";
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import {hideLoading, showLoading} from "../../global-functions";

export interface dataSearch {
  code_societe:   string;
  code_exercice:  string;
  date1:          Date;
  date2:          Date;
  depotpv:        Depot[];
  type_mouvement: string;
  document:       string;
  categories:     Categorie[];
  familles:       Famille[];
  sous_familles:  SousFamille[];
  articles:       Product[];
}

@Component({
  selector: 'vex-rappel-stock',
  templateUrl: './rappel-stock.component.html',
  styleUrls: ['./rappel-stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,MatSelectModule,
    MatDialogModule,MatOptionModule,MatFormFieldModule,FormsModule,
    MatInputModule, FiltreCatgFamilleSousFamilleComponent, DateRangePickerComponent, FiltreAutocompletSelectAllComponent
  ]
})
export class RappelStockComponent  {


  trackByFn(index: number, item: any): any {
    return item.id;
  }

  labelTextPR = 'Période';
  get_DateRange:any
  set_SelectedDateRange(p_SelectedDateRange: any){
    this.get_DateRange = p_SelectedDateRange
  }

  selectedListTypeQuantite: any = 0;


  dataTypeArticle     = this.utilService.parseEnumToObject('enum_types_articles');
  labelTextBC         = 'Type article';
  selectedKeyART      = 'key';
  selectedValART      = 'value';
  preSelectedART: any = [];

  selectedListTypeARt: any;

  set_SelectedList(p_SelectedList: any) {
     var resultList        = this.utilService.listStringOfArrayObject(p_SelectedList,'key')
    this.selectedListTypeARt  = resultList;
  }

  dataDepot: any    =  [] ; //Depot[] = [];
  labelTextDp       = 'Dépôt/Point de Vente';
  selectedKeyDepot  = 'code_unique';
  selectedValDepot  = 'libelle';
  preSelectedItems: any = ""

  selectedListFromFiltreDepot: any;

  set_SelectedListDepot(p_SelectedList: any) {
    this.selectedListFromFiltreDepot = p_SelectedList;
  }

  layoutCtrl = new UntypedFormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Rappel_stock[]> = new ReplaySubject<Rappel_stock[]>(1);
  data$: Observable<Rappel_stock[]> = this.subject$.asObservable();
  commandes: Rappel_stock[] = [];

  @Input()
  columns: TableColumn<Rappel_stock>[] = [
    // {
    //   label: 'Checkbox',
    //   property: 'checkbox',
    //   type: 'checkbox',
    //   visible: true
    // },

    {
      label: 'Type article',
      property: 'typeArticle',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Référence',
      property: 'reference',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Désignation',
      property: 'designation',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'categorie',
      property: 'categorie',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'famille',
      property: 'famille',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'sousFamille',
      property: 'sousFamille',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: "qteEnStock",
      property: 'qteEnStock',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Unité 1',
      property: 'unite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'coefficient',
      property: 'coefficient',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Unité 2',
      property: 'unite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'qte_init_articlePV',
      property: 'qte_init_articlePV',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalAchatQteUnite1',
      property: 'totalAchatQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },



    {
      label: 'totalAchatQteUnite2',
      property: 'totalAchatQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalRetourFRQteUnite1',
      property: 'totalRetourFRQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'totalRetourFRQteUnite2',
      property: 'totalRetourFRQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
  {
      label: 'totalVenteQteUnite1',
      property: 'totalVenteQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
{
      label: 'totalVenteQteUnite2',
      property: 'totalVenteQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'totalRetourCLQteUnite1',
      property: 'totalRetourCLQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalRetourCLQteUnite2',
      property: 'totalRetourCLQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalEntreeQteUnite1',
      property: 'totalEntreeQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalEntreeQteUnite2',
      property: 'totalEntreeQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },


    {
      label: 'totalSortieQteUnite1',
      property: 'totalSortieQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalSortieQteUnite2',
      property: 'totalSortieQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalCorrectionQteUnite1',
      property: 'totalCorrectionQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalCorrectionQteUnite2',
      property: 'totalCorrectionQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalCasseQteUnite1',
      property: 'totalCasseQteUnite1',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'totalCasseQteUnite2',
      property: 'totalCasseQteUnite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'qteinit',
      property: 'qteinit',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'qte_finale',
      property: 'qte_finale',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'qte_finale_unite2',
      property: 'qte_finale_unite2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    //{label: 'ACTIONS', property: 'actions', type: 'button', visible: true}
  ];
  pageSize = 0;//10;
  pageSizeOptions: number[] =[] ;//= [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Rappel_stock>;
  selection = new SelectionModel<Rappel_stock>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, public utilService: UtilService, private serviceHttDepot: DepotHttpService,
              public utileService:UtilService, private rappelStockHttpService: RappelStockHttpService, private tokenService: TokenService,
              public impressionPdfService: ImpressionPdfService) {

  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */

  filterCateg(p_synchronizData: any) {
    this.filtrerEvent = p_synchronizData
  }

  filtrerEvent: any

  filtrerMv() {
    this.get_listMvmt()
  }

  isAccordionDetailsOpen:boolean=false
  get_listMvmt() {

    let listCategory    = undefined
    let listFamille     = undefined
    let listSousFamille = undefined
    let listArticles    = undefined

    if(this.filtrerEvent!=undefined){
      if(this.filtrerEvent.categories.length>0){
        listCategory        = this.utilService.listStringOfArrayObject(this.filtrerEvent.categories,'_id')
      }
      if(this.filtrerEvent.familles.length>0){
        listFamille        = this.utilService.listStringOfArrayObject(this.filtrerEvent.familles,'_id')
      }
      if(this.filtrerEvent.sousFamilles.length>0){
        listSousFamille        = this.utilService.listStringOfArrayObject(this.filtrerEvent.sousFamilles,'_id')
      }
      if(this.filtrerEvent.articles.length>0){
        listArticles        = this.utilService.listStringOfArrayObject(this.filtrerEvent.articles,'_id')
      }
    }

    let today         = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);

    let listFiltre: any = {
      code_societe:   this.tokenService.getCodeSociete(),
      code_exercice:  this.tokenService.getCodeExercice(),
      code_depotpv:   this.tokenService.getCodePointeVente(),
      date1: this.get_DateRange!=undefined ? this.get_DateRange.dateStart : myToday_Start.toString() , //"2024-01-01T12:41:23.896Z",
      date2: this.get_DateRange!=undefined ? this.get_DateRange.dateEnd :   myToday_End.toString() , //"2024-02-28T12:41:23.896Z",
      depotpv:          this.selectedListFromFiltreDepot,
      type_quantite:    this.selectedListTypeQuantite ,
      type_article:     this.selectedListTypeARt ,
      categories:     listCategory ,
      familles:       listFamille ,
      sous_familles:  listSousFamille,
      articles:       listArticles,
    }

    showLoading()
    this.rappelStockHttpService.GetAll(listFiltre).subscribe((res) => {
      //this.subject$.next(this.mouvementStockHttpService.getData(res.RESULTAT));
      //this.dataSource = new MatTableDataSource();
      this.dataSource.data = res.RESULTAT as Rappel_stock[] //this.rappelStockHttpService.getData(res.RESULTAT);
      this.show_paginate()
      hideLoading()
    });


  }

  //declarer une methode pour ajouter les depots cochés
  getDataDepot(items: any) {
    let newItems = [];
    for (let key of Object.keys(items)) {
      // newItems.push(new Depot(items[key]));
      newItems.push({
        _id:items[key]._id,
        libelle:items[key].libelle,
        code_unique:items[key].code_unique
      });
    }
    return newItems;
  }

  ngOnInit() {

    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.dataDepot = this.getDataDepot(res.RESULTAT);
    });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter<Rappel_stock[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));

   // this.get_listMvmt()

  }

  ngAfterViewInit() {

   // this.show_paginate()

  }

  show_paginate(){
    if (this.paginator) {
      //this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Rappel_stock>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  // onLabelChange(change: MatSelectChange, row: Commande_client) {
  //   const index = this.commandes.findIndex((c) => c === row);
  //   this.commandes[index].labels = change.value;
  //   this.subject$.next(this.commandes);
  // }

  @ViewChild('TABLE') table!: ElementRef;

  ExportTOExcel(){
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Rappel-stock");
  }

  exportToPdf(): void {
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Rappel-stock");
  }
}


