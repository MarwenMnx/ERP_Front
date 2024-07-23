import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../static-data/aio-table-data';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
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
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { getDateByForma, getDateInput, hideLoading, roundmMontantString, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { DataParamRoute } from '../models/data.model';
import { DocumentVente } from '../models/document-vente.model';
import { DocumentVenteHttpService } from '../services/document-vente-http.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import { enum_colonnes_list, enum_modes_imprission, enum_status_paiement } from 'src/app/global-enums';
import { IndexedDbService } from 'src/app/utils/indexedDB_PWA/indexeddb.service';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenService } from 'src/app/services/token.service';
import { ClientHttpService } from 'src/app/erp_params/clients/services/client-http.service';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import * as XLSX from 'xlsx';
import {Ticket} from "../../erp_params/ticket/models/ticket.model";
import {DetailsTicketComponent} from "../../erp_params/ticket/details-ticket/details-ticket.component";

@Component({
  selector: 'vex-document-vente-list',
  templateUrl: './document-vente-list.component.html',
  styleUrls: ['./document-vente-list.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    DateRangePickerComponent,
    FiltreCatgFamilleSousFamilleComponent,
    FiltreDatesComponent,
    RouterLink,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexPageLayoutContentDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,

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
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    StandartAutocompleteComponent,
    MatSelectModule,
    MatOptionModule,
  ],
  providers:
  [
     { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
   // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DocumentVenteListComponent {
  layoutCtrl = new UntypedFormControl('fullwidth');
  enum_modes_imprission = enum_modes_imprission
  selectCtrl: UntypedFormControl = new UntypedFormControl();
  enum_status_paiement = enum_status_paiement

  async getAllClients() {
    return new Promise((resolve) => {
      this.clientHttpService.GetAll().subscribe((res) => {
        this.allClients = this.clientHttpService.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  get_DateRange: any
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange
  }
  async getAllDocs() {
    return new Promise((resolve) => {
      let req = this.form.value

      let today = new Date();
      let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      req.date1 = this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
      req.date2 = this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",

      this.serviceHttp.GetAll(this.dataParams.uriDocApi, undefined, req).subscribe((res) => {
       resolve(res)
      });
    });
  }

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
  }

  allClients:Client[] = []

  form:FormGroup = this.fb.group({
    date1: [new Date()],
    date2: [new Date()],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    code_depotpv: [this.tokenService.getCodePointeVente(), Validators.required],
    client: [""],
    payee: [0],
  })

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<DocumentVente[]> = new ReplaySubject<DocumentVente[]>(1);
  data$: Observable<DocumentVente[]> = this.subject$.asObservable();
  products: DocumentVente[] = [];

  @Input()
  columns: TableColumn<DocumentVente>[] = [
    {
      label: 'Numero',
      property: 'numero',
      type: 'text',
      visible: true
    },
    {
      label: 'Date',
      property: 'date',
      type: 'image',
      visible: true
    },
    {
      label: 'Client',
      property: 'clientLibelle',
      type: 'image',
      visible: true
    },
    {
      label: 'MT_Brut_HT',
      property: 'totalBrutHT',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_Remise',
      property: 'totalRemise',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_HT',
      property: 'totalHT',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_Fodec',
      property: 'totalFodec',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_DC',
      property: 'totalDC',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_Net_HT',
      property: 'totalNetHT',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_TVA',
      property: 'totalTVA',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_Redevance',
      property: 'totalRedevance',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'timbre_Fiscale',
      property: 'timbreFiscale',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_TTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'MT_Payer',
      property: 'totalPayer',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'reste_A_Payer',
      property: 'resteAPayer',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'GainCommerciale',
      property: 'totalGainCommerciale',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'GainReel',
      property: 'totalGainReel',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<DocumentVente>;
  selection = new SelectionModel<DocumentVente>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute,
    private serviceHttp:DocumentVenteHttpService,
    private dialog: MatDialog,
    private router:Router,
    public utilService:UtilService,
    public impressionPdfService:ImpressionPdfService,
    private indexDB:IndexedDbService,
    private tokenService:TokenService,
    private clientHttpService: ClientHttpService,
    private fb: FormBuilder) {
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getMontantRoundom(nbr:number){
    return roundmMontantString(nbr)
  }

  getDateFormat(date:Date){
    return getDateByForma(date)
  }

  dataParams:DataParamRoute = new DataParamRoute()

  async getDocs(){
    showLoading()
    let res:any = await this.getAllDocs()
    if(res.RESULTAT)
    this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    hideLoading()
  }

  async ngOnInit() {
    this.route.data.subscribe((data:any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<DocumentVente[]>(Boolean)).subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });

    await this.getDocs()
    showLoading()
    await this.getAllClients()
    hideLoading()

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  async ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    let colonnes:TableColumn<DocumentVente>[] = await this.indexDB.getIndexedDB(enum_colonnes_list.documentVENTE) as TableColumn<DocumentVente>[]
    if(colonnes) this.columns = colonnes
  }

  createProduct() {
    this.router.navigate([this.dataParams.pageAjoute]);
  }

  updateItem(product: DocumentVente) {
    this.router.navigate([this.dataParams.pageModifie+product._id]);
  }

  openImpressionPDF(doc: DocumentVente, mode?:number){
    this.impressionPdfService.openPopup(doc._id, this.dataParams.title, this.dataParams.uriDocApi, mode);
  }

  deleteProduct(item: DocumentVente) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer le ligne " '+item.numero+' " ?')
    .then((result) => {
      if (result.isConfirmed) {
        this.products.splice(
          this.products.findIndex(
            (existingProduct) => existingProduct._id === item._id
          ),
          1
        );
        this.selection.deselect(item);
        this.subject$.next(this.products);

        this.serviceHttp.delete(item, this.dataParams.uriDocApi).subscribe((res:any) => {
          succesAlerteAvecTimer(res.MESSAGE);
        });

      } else {
        // User cancelled, handle accordingly
      }
    });
  }

  deleteProducts(products: DocumentVente[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    products.forEach((c) => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<DocumentVente>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  async saveColumnVisibility() {
    await this.indexDB.putIndexedDB(enum_colonnes_list.documentVENTE, this.columns, 0)
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

  @ViewChild('TABLE') table!: ElementRef;

  ExportTOExcel(){
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste "+this.dataParams.title+" ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")");
  }

  exportToPdf(): void {
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste "+this.dataParams.title+" ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")");
  }


  consulterTicket(item:any){

    let autreDoc:any ={
      doc:item,
      type:'retour_ticket',
    }
    this.dialog
      .open(DetailsTicketComponent, {
        data: {detailsPanier:item.documentPrecedent[0] , autreDoc:autreDoc},
        disableClose: true,
        //width: '400px'
      })
      .afterClosed()
      .subscribe((resultUpdatePanier) => {

      });

  }
}

