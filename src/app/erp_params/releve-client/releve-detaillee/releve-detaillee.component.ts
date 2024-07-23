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
import {expand, filter} from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../../static-data/aio-table-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { getDateByForma, getDateInput, hideLoading, isObjectIdMongoose, roundmMontantString, showAlertError, showAlertInfoHTML, showAlertSucess, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { DocumentAchatHttpService } from 'src/app/erp_documents_achat/services/document-achat-http.service';
import { Depot } from '../../depot/models/depot.model';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TokenService } from 'src/app/services/token.service';
import { DepotHttpService } from '../../depot/services/depot-http.service';
import { ArticlesDepotPvHttpService } from '../../article-depotpvs/services/articles-depot-pv-http.service';
import { SharedModule } from 'src/app/utils/shared.module';
import { ArticleDepotPvs } from '../../article-depotpvs/models/articleDepotPvs.model';
import { ExerciceHttpService } from '../../exercices/services/exercice-http.service'
import { Excercice } from '../../exercices/models/exercice.model';
import { ReleveClientHttpService } from './../services/releve-client-http.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UtilService } from 'src/app/utils/UtilService.service';
import { Client } from '../../clients/models/client.model';
import { ClientHttpService } from '../../clients/services/client-http.service';
import { IResponseBody, ReleveTiere } from './../models/releve-client.model';
import { enum_typetiers, page_orientation } from 'src/app/global-enums';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import {DateRangePickerComponent} from "../../../utils/date-range-picker/date-range-picker/date-range-picker.component";
import { Fournisseur } from '../../fournisseurs/models/fournisseur.model';
import { FournisseurHttpService } from '../../fournisseurs/services/fournisseur-http.service';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TableExpandableRowsExample} from "../../../utils/table_accordion/table-expandable-rows-example";


@Component({
  selector: 'vex-releve-detaillee',
  templateUrl: './releve-detaillee.component.html',
  styleUrls: ['./releve-detaillee.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms,trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),],
  imports: [
    DateRangePickerComponent,
    CommonModule,
    SharedModule,
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
    StandartAutocompleteComponent,
    MatDatepickerModule,
    MatFormFieldModule ,TableExpandableRowsExample
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
export class ReleveDetailleeComponent {
  layoutCtrl = new UntypedFormControl('fullwidth');

  subject$: ReplaySubject<ReleveTiere[]> = new ReplaySubject<ReleveTiere[]>(1);
  data$: Observable<ReleveTiere[]> = this.subject$.asObservable();
  products: ReleveTiere[] = [];

  set_SelectedDateRange(p_SelectedDateRange: any){
    let today         = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);

    this.form.patchValue({
      date1:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateStart : myToday_Start.toString(),
      date2:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateEnd :   myToday_End.toString()
    })
  }

  expandedElement: ReleveTiere[] = []
  @Input()
  columns: TableColumn<ReleveTiere>[] = [
    {
      label: 'N°=',
      property: 'numero',
      type: 'text',
      visible: true
    },
    {
      label: 'Date',
      property: 'dateString',
      type: 'text',
      visible: true
    },
    {
      label: 'Utilisateur',
      property: 'utilisateur',
      type: 'text',
      visible: true
    },
    {
      label: 'TotalTTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Montant',
      property: 'montant',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'modeReglement',
      property: 'modeReglementString',
      type: 'text',
      visible: true
    },
    {
      label: 'numPiece',
      property: 'numPiece',
      type: 'text',
      visible: true
    },
    {
      label: 'dateEcheance',
      property: 'dateEcheanceString',
      type: 'text',
      visible: true
    },
    {
      label: 'type_document',
      property: 'type_document',
      type: 'text',
      visible: true
    },
    {
      label: 'Debit',
      property: 'debit',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Credit',
      property: 'credit',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Solde',
      property: 'solde',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'soldeDebit',
      property: 'soldeDebit',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'soldeCredit',
      property: 'soldeCredit',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
  ]

  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<ReleveTiere>;
  selection = new SelectionModel<ReleveTiere>(true, []);
  searchCtrl = new UntypedFormControl();
  labels = aioTableLabels;

  allClients:Client[] = []
  allFournisseurs:Fournisseur[] = []

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute,
              private serviceHttp:ReleveClientHttpService,
              private dialog: MatDialog,
              private router:Router,
              private tokenService:TokenService,
              private serviceHttDepot: DepotHttpService,
              private articlesDepotPvHttpService:ArticlesDepotPvHttpService,
              private exerciceServiceHttp:ExerciceHttpService,
              public utileService:UtilService,
              public impressionPdfService:ImpressionPdfService,
              private fb: FormBuilder,
              private serviceFournisseurHttp:FournisseurHttpService,
              private serviceClientHttp:ClientHttpService
  ) {
   }

  form:FormGroup = this.fb.group({
    date1: [new Date(), Validators.required],
    date2: [new Date(), Validators.required],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    client: ["", Validators.required],
    fournisseur: ["", Validators.required],
    tiers: enum_typetiers.client,
    solde_initiale: 0,
    solde_credit: 0,
    solde_debit: 0,
    solde_periode: 0,
    solde_finale: 0,
    detaille:true
  })

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
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

  async getClients():Promise<Client[]>{
    return new Promise((resolve) => {
      this.serviceClientHttp.GetAll().subscribe((res) => {
        resolve(this.serviceClientHttp.getData(res.RESULTAT))
      });
    });
  }

  async getFournisseurs():Promise<Fournisseur[]>{
    return new Promise((resolve) => {
      this.serviceFournisseurHttp.GetAll().subscribe((res) => {
        resolve(this.serviceFournisseurHttp.getData(res.RESULTAT))
      });
    });
  }

  isFournisseur = false
  async ngOnInit() {
    this.route.data.subscribe((data:any) => {
      this.isFournisseur = data.isFournisseur; // Accessing the 'title' from the route data
      this.form = this.fb.group({
        date1: [new Date(), Validators.required],
        date2: [new Date(), Validators.required],
        code_societe: [this.tokenService.getCodeSociete(), Validators.required],
        code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
        client: [(this.isFournisseur == true) ? undefined : "", (this.isFournisseur == true) ? [] : Validators.required],
        fournisseur: [(this.isFournisseur == false) ? undefined : "", (this.isFournisseur == false) ? [] : Validators.required],
        tiers: (this.isFournisseur == false) ? enum_typetiers.client : enum_typetiers.fournisseur,
        solde_initiale: 0,
        solde_credit: 0,
        solde_debit: 0,
        solde_periode: 0,
        solde_finale: 0 ,
        detaille:true
      });
    });

    showLoading()

    if(this.isFournisseur === false){
      this.allClients = await this.getClients();
    }else{
      this.allFournisseurs = await this.getFournisseurs();
    }

    hideLoading()

    this.dataSource = new MatTableDataSource();

    this.subject$.subscribe((data: ReleveTiere []) => {
      this.products = data;
      this.dataSource.data = data;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  responseBody:IResponseBody | undefined
  getReleve(){
    if(!this.form.valid) {
      this.alertTierRequired()
      return
    }

    showLoading()
    let items:any = this.form.value
    this.serviceHttp.GetAllDetails(items).subscribe((res) => {
      this.responseBody = res.RESULTAT
      this.importSoldeCredit(this.responseBody ? this.responseBody?.list_documents : [])
      this.form.patchValue(this.responseBody ? this.responseBody : {})
      InputNumberChangeObservibalService.submitChangeInput()
      this.showPaginator()
      hideLoading()
    });
  }

  importSoldeCredit(list?:ReleveTiere[]){
    list = !list ? this.dataSource.data : list
    let solde = 0
    let soldeCredit = 0
    let soldeDebit = 0
    list?.forEach( (x:ReleveTiere) => {
      solde -= x.credit
      solde += x.debit
      soldeCredit += x.credit
      soldeDebit += x.debit
      x.solde = solde
      x.soldeCredit = soldeCredit
      x.soldeDebit = soldeDebit
      x.dateString = this.utileService.formatDate(x.date)
    })
    if (list) this.subject$.next(list)
  }

  alertTierRequired(){
    showAlertError('Erreur', 'On ne peut pas trouver le tier.')
  }

  ngAfterViewInit() {
    this.showPaginator()
  }

  showPaginator(){
    if(!this.dataSource) return true
    //if (this.paginator) {
    //  this.dataSource.paginator = this.paginator;
    //}

    //if (this.sort) {
    //  this.dataSource.sort = this.sort;
    //}
  }

  createProduct() {
  }

  updateProduct(product: ReleveTiere) {
  }

  deleteProduct(item: ReleveTiere) {
  }

  deleteProducts(products: ReleveTiere[]) {
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

  toggleColumnVisibility(column: TableColumn<ReleveTiere>, event: Event) {
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

  @ViewChild('TABLE') table!: ElementRef;

  ExportTOExcel(){
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    let tier = this.isFournisseur == true  ?  this.allFournisseurs.find(x => x._id == req.fournisseur) : this.allClients.find(x => x._id == req.client)

    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Relevé "+ (this.isFournisseur === false ? "Client " : "Fournisseur ")+(tier ? "("+tier.raisonSociale+")" : "")+" ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")", this.form.value.solde_initiale, this.form.value.solde_periode, this.form.value.solde_finale);
  }

  exportToPdf(): void {
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    let tier = this.isFournisseur == true  ?  this.allFournisseurs.find(x => x._id == req.fournisseur) : this.allClients.find(x => x._id == req.client)

    this.impressionPdfService.exportToPdf(this.table, this.columns, "Relevé "+ (this.isFournisseur === false ? "Client " : "Fournisseur ")+(tier ? "("+tier.raisonSociale+")" : "")+" ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")", page_orientation.portrait, this.form.value.solde_initiale, this.form.value.solde_periode, this.form.value.solde_finale);
  }

}

