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
import { DocumentAchatHttpService } from '../services/document-achat-http.service';
import { DocumentAchat } from '../models/document-achat.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { DataParamRoute } from 'src/app/erp_documents_vente/models/data.model';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import { IndexedDbService } from 'src/app/utils/indexedDB_PWA/indexeddb.service';
import { enum_colonnes_list, enum_status_paiement, enum_typetiers } from 'src/app/global-enums';
import { DateRangePickerComponent } from 'src/app/utils/date-range-picker/date-range-picker/date-range-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { Fournisseur } from 'src/app/erp_params/fournisseurs/models/fournisseur.model';
import { TokenService } from 'src/app/services/token.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { FournisseurHttpService } from 'src/app/erp_params/fournisseurs/services/fournisseur-http.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-document-achat-list',
  templateUrl: './document-achat-list.component.html',
  styleUrls: ['./document-achat-list.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    DateRangePickerComponent,
    FiltreCatgFamilleSousFamilleComponent,
    FiltreDatesComponent,
    RouterLink,
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
export class DocumentAchatListComponent {
  layoutCtrl = new UntypedFormControl('fullwidth');
  selectCtrl: UntypedFormControl = new UntypedFormControl();

  async getAllFournisseurs() {
    return new Promise((resolve) => {
      this.fournisseurServiceHttp.GetAll().subscribe((res) => {
        this.allFournisseurs = this.fournisseurServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getAllDocs() {
    return new Promise((resolve) => {
      let req = this.form.value
      let date1 = new Date(req.date1)
      let date2 = new Date(req.date2)
      req.date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), 0, 0, 0);
      req.date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 23, 59, 59);
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

  set_SelectedDateRange(p_SelectedDateRange: any){
    let today         = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);

    this.form.patchValue({
       date1:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateStart : myToday_Start.toString(),
       date2:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateEnd :   myToday_End.toString()
    })
  }

  allClients:Client[] = []
  allFournisseurs:Fournisseur[] = []

  form:FormGroup = this.fb.group({
    date1: [new Date()],
    date2: [new Date()],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    code_depotpv : [this.tokenService.getCodePointeVente(), Validators.required],
    fournisseur: [""],
    payee: [0],
  })

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<DocumentAchat[]> = new ReplaySubject<DocumentAchat[]>(1);
  data$: Observable<DocumentAchat[]> = this.subject$.asObservable();
  products: DocumentAchat[] = [];

  @Input()
  columns: TableColumn<DocumentAchat>[] = [
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
      label: 'Fournisseur',
      property: 'fournisseurLibelle',
      type: 'image',
      visible: true
    },
    {
      label: 'N° Doc.Fournisseur',
      property: 'numeroDocFournisseur',
      type: 'image',
      visible: true
    },
    {
      label: 'MT_Brut_HT',
      property: 'totalBrutHT',
      type: 'text',
      visible: true
    },
    {
      label: 'MT_Remise',
      property: 'totalRemise',
      type: 'text',
      visible: true
    },
    {
      label: 'MT_HT',
      property: 'totalHT',
      type: 'text',
      visible: true
    },
    {
      label: 'MT_Fodec',
      property: 'totalFodec',
      type: 'text',
      visible: true
    },
    {
      label: 'MT_DC',
      property: 'totalDC',
      type: 'text',
      visible: true
    },
    {
      label: 'MT_Net_HT',
      property: 'totalNetHT',
      type: 'text',
      visible: true
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
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<DocumentAchat>;
  selection = new SelectionModel<DocumentAchat>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute,
    private serviceHttp: DocumentAchatHttpService,
    private dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    private fb: FormBuilder,
    private indexDB: IndexedDbService,
    public impressionPdfService: ImpressionPdfService,
    private tokenService:TokenService,
    private fournisseurServiceHttp: FournisseurHttpService,
  ) {
  }

  enum_status_paiement = enum_status_paiement

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getMontantRoundom(nbr: number) {
    return roundmMontantString(nbr)
  }

  getDateFormat(date: Date) {
    return getDateByForma(date)
  }

  dataParams: DataParamRoute = new DataParamRoute()

  async getDocs(){
    showLoading()
    let res:any = await this.getAllDocs()
    if(res.RESULTAT)
    this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    hideLoading()
  }

  async ngOnInit() {

    this.route.data.subscribe((data: any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
    });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter<DocumentAchat[]>(Boolean)).subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });

    await this.getDocs()
    showLoading()
    await this.getAllFournisseurs()
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

    let colonnes: TableColumn<DocumentAchat>[] = await this.indexDB.getIndexedDB(enum_colonnes_list.documentAchat) as TableColumn<DocumentAchat>[]
    if (colonnes) this.columns = colonnes
  }

  createProduct() {
    this.router.navigate([this.dataParams.pageAjoute]);
  }

  updateProduct(product: DocumentAchat) {
    this.router.navigate([this.dataParams.pageModifie + product._id]);
  }

  openImpressionPDF(product: DocumentAchat) {
    this.impressionPdfService.openPopup(product._id, this.dataParams.title, this.dataParams.uriDocApi, undefined, true)
  }

  deleteProduct(item: DocumentAchat) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer " ' + item.numero + ' " ?')
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

          this.serviceHttp.delete(item, this.dataParams.uriDocApi).subscribe((res) => {
            succesAlerteAvecTimer(res.MESSAGE);
          });

        } else {
          // User cancelled, handle accordingly
        }
      });
  }

  deleteProducts(products: DocumentAchat[]) {
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

  toggleColumnVisibility(column: TableColumn<DocumentAchat>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  async saveColumnVisibility() {
    await this.indexDB.putIndexedDB(enum_colonnes_list.documentAchat, this.columns, 0)
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


}

