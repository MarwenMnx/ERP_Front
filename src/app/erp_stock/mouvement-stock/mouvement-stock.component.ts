import {
  AfterViewInit, NgModule,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { IndexedDbService } from 'src/app/utils/indexedDB_PWA/indexeddb.service';


import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { aioTableData, aioTableData3, aioTableLabels } from 'src/static-data/aio-table-data';
import { Mouvement_stock } from './models/mouvement-stock';
import { FiltreCatgFamilleSousFamilleComponent } from "../../utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component";
import { UtilService } from "../../utils/UtilService.service";
import { MouvementStockHttpService } from "./services/mouvement-stock-http.service";

import { HttpClient } from "@angular/common/http";
import { TokenService } from "../../services/token.service";
import { DateRangePickerComponent } from "../../utils/date-range-picker/date-range-picker/date-range-picker.component";
import { FiltreAutocompletSelectAllComponent } from "../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component";

import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Depot } from "../../erp_params/depot/models/depot.model";
import { Categorie } from "../../erp_params/categories/models/categorie.model";
import { Famille } from "../../erp_params/familles/models/famille.model";
import { SousFamille } from "../../erp_params/sous-famille/models/sous-famille.model";
import { Product } from "../../erp_params/products/models/product.model";
import { DepotHttpService } from "../../erp_params/depot/services/depot-http.service";
import { enum_colonnes_list } from 'src/app/global-enums';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import * as XLSX from 'xlsx';
import {hideLoading, showLoading} from "../../global-functions";

export interface dataSearch {
  code_societe: string;
  code_exercice: string;
  date1: Date;
  date2: Date;
  depotpv: Depot[];
  type_mouvement: string;
  document: string;
  categories: Categorie[];
  familles: Famille[];
  sous_familles: SousFamille[];
  articles: Product[];
}

@Component({
  selector: 'vex-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
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
    FormsModule, MatSelectModule,
    MatDialogModule, MatOptionModule, MatFormFieldModule, FormsModule,
    MatInputModule, FiltreCatgFamilleSousFamilleComponent, DateRangePickerComponent, FiltreAutocompletSelectAllComponent
  ]
})
export class MouvementStockComponent {

  labelTextPR = 'Période';
  get_DateRange: any
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange
  }

  // labelTextCT   = 'Type mouvement';
  //dataTypeTiers = this.utilService.parseEnumToObject('enum_type_mouvement');
  // selectedKey   = 'key';
  // selectedVal   = 'value';
  // preSelectedCT: any = [];
  //
  selectedListTypeMouvement: any = 0;
  //
  // set_SelectedListTypeMouvement(p_SelectedList: any) {
  //   this.selectedListTypeMouvement = p_SelectedList;
  // }

  dataTypeDocument = this.utilService.parseEnumToObject('enum_type_document_entree_sortie');
  labelTextBC = 'Type Document';
  selectedKeyBq = 'value';//'key';
  selectedValBq = 'key';//'value';
  preSelectedBq: any = [];

  selectedListDoc: any;

  set_SelectedList(p_SelectedList: any) {
    var resultList = this.utilService.listStringOfArrayObject(p_SelectedList, 'value')
    // console.log("**********set_SelectedList111111************")
    // console.log(resultList)
    // console.log("*********set_SelectedList222222222*************")
    this.selectedListDoc = resultList;
  }

  set_listDocument() {
    switch (this.selectedListTypeMouvement) {
      case -1:
        this.dataTypeDocument = this.utilService.parseEnumToObject('enum_type_document_sortie');
        break

      case 1:
        this.dataTypeDocument = this.utilService.parseEnumToObject('enum_type_document_entree');
        break

      default:
        this.dataTypeDocument = this.utilService.parseEnumToObject('enum_type_document_entree_sortie');
        break
    }

  }

  dataDepot: any = []; //Depot[] = [];
  labelTextDp = 'Dépôt/Point de Vente';
  selectedKeyDepot = 'code_unique';
  selectedValDepot = 'libelle';
  preSelectedItems: any = ""

  selectedListFromFiltreDepot: any;

  set_SelectedListDepot(p_SelectedList: any) {
    this.selectedListFromFiltreDepot = p_SelectedList;
  }

  selectedNumDoc: string = ""

  layoutCtrl = new UntypedFormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Mouvement_stock[]> = new ReplaySubject<Mouvement_stock[]>(1);
  data$: Observable<Mouvement_stock[]> = this.subject$.asObservable();
  commandes: Mouvement_stock[] = [];

  @Input()
  columns: TableColumn<Mouvement_stock>[] = [
    // {
    //   label: 'Checkbox',
    //   property: 'checkbox',
    //   type: 'checkbox',
    //   visible: true
    // },

    {
      label: 'N°document',
      property: 'numero',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Date',
      property: 'date',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'T.Mouvement',
      property: 'type_MVT',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'T.Document',
      property: 'type_document',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Code CLient',
      property: 'client_code',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Raison Social',
      property: 'client_raison',
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
      label: 'Dépôt',
      property: 'depotpv',
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
      label: 'Qte Entrée',
      property: 'quantiteEntree',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Qte Sortie',
      property: 'quantiteSortie',
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
      label: 'Qte Entrée2',
      property: 'quantiteEntree2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'Qte Sortie2',
      property: 'quantiteSortie2',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    //{label: 'ACTIONS', property: 'actions', type: 'button', visible: true}
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Mouvement_stock>;
  selection = new SelectionModel<Mouvement_stock>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, public utilService: UtilService, private serviceHttDepot: DepotHttpService,
    private mouvementStockHttpService: MouvementStockHttpService, private tokenService: TokenService,
    private indexDB: IndexedDbService,
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
listMvm: Mouvement_stock[] = [];

  /** Gets the total cost of all transactions. */
  getTotalCost(clmn:any) {

     if(clmn=='quantiteEntree'){
       return this.dataSource.filteredData
         .map((t:any) => t.type_MVT ==1 ? t.quantiteUnite1 : 0)
         .reduce((acc:any, value:any) => acc + value, 0);
     }

     if(clmn=='quantiteSortie'){
       return this.dataSource.filteredData
         .map((t:any) => t.type_MVT ==-1 ? t.quantiteUnite1 : 0)
         .reduce((acc:any, value:any) => acc + value, 0);
     }
     if(clmn=='quantiteEntree2'){
       return this.dataSource.filteredData
         .map((t:any) => t.type_MVT ==1 ? t.quantiteUnite2 : 0)
         .reduce((acc:any, value:any) => acc + value, 0);
     }

     if(clmn=='quantiteSortie2'){
       return this.dataSource.filteredData
         .map((t:any) => t.type_MVT ==-1 ? t.quantiteUnite2 : 0)
         .reduce((acc:any, value:any) => acc + value, 0);
     }


  }

  isAccordionDetailsOpen: boolean = false
  get_listMvmt() {

    let listCategory = undefined
    let listFamille = undefined
    let listSousFamille = undefined
    let listArticles = undefined
    let numero_doc = undefined

    if (this.selectedNumDoc != "") { numero_doc = this.selectedNumDoc }

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
      code_societe: this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
      date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
      depotpv: this.selectedListFromFiltreDepot,
      type_mouvement: this.selectedListTypeMouvement,
      type_document: this.selectedListDoc,
      document: numero_doc,
      categories: listCategory,
      familles: listFamille,
      sous_familles: listSousFamille,
      articles: listArticles,
    }
    showLoading()
    this.mouvementStockHttpService.GetAll(listFiltre).subscribe((res) => {
      //this.subject$.next(this.mouvementStockHttpService.getData(res.RESULTAT));
       this.dataSource = new MatTableDataSource<Mouvement_stock>;
      this.listMvm = res.RESULTAT as Mouvement_stock[]
       this.dataSource.data = this.listMvm as Mouvement_stock[] //= this.mouvementStockHttpService.getData(res.RESULTAT);
      //this.dataSource._updateChangeSubscription()
      //this.listMvm = res.RESULTAT
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
        _id: items[key]._id,
        libelle: items[key].libelle,
        code_unique: items[key].code_unique
      });
    }
    return newItems;
  }

  ngOnInit() {

    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.dataDepot = this.getDataDepot(res.RESULTAT);
    });

    this.dataSource = new MatTableDataSource<Mouvement_stock>;
    this.data$.pipe(filter<Mouvement_stock[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));

    this.get_listMvmt()

  }

  async ngAfterViewInit() {

    // this.show_paginate()
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    let colonnes: TableColumn<Mouvement_stock>[] = await this.indexDB.getIndexedDB(enum_colonnes_list.mouvementStock) as TableColumn<Mouvement_stock>[]
    if (colonnes) this.columns = colonnes

  }

  show_paginate() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
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
    // this.dataSource.filter = value;
    //this.dataSource.data = this.listMvm
    this.dataSource.data =  this.listMvm.filter(
      (mvmt) => mvmt.article.reference.concat(mvmt.client?.code,mvmt.client?.raisonSociale,
                          mvmt.type_document,mvmt.numero,this.utilService.formatDateTime(mvmt.date).toString(),
                          mvmt.article.designation,mvmt.unite1?.libelle,mvmt.unite2?.libelle , mvmt.depotpv?.libelle)
        .toLowerCase().indexOf(value.toLowerCase()) >= 0
    );
  }

  toggleColumnVisibility(column: TableColumn<Mouvement_stock>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  async saveColumnVisibility() {
    await this.indexDB.putIndexedDB(enum_colonnes_list.mouvementStock, this.columns, 0)
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
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Mouvement-stock");
  }

  exportToPdf(): void {
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Mouvement-stock");
  }

}


