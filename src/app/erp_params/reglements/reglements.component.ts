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
import { Product } from '../products/models/product.model';
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
import { MatSelectChange } from '@angular/material/select';
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
import { Reglement } from './models/reglement.model';
import { ReglementHttpService } from './services/reglement-http.service';
import { FiltreDatesComponent } from '../../utils/filtre-dates/filtre-dates.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { DateRangePickerComponent } from '../../utils/date-range-picker/date-range-picker/date-range-picker.component';
import { FiltreAutocompletSelectAllComponent } from '../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { enum_modeReglement, enum_typetiers } from '../../global-enums';
import { UtilService } from '../../utils/UtilService.service';
import { BanqueHttpService } from '../banque/services/banque-http.service';
import { Banque } from '../banque/models/banque.model';
import { ArticleDepotPvs } from '../article-depotpvs/models/articleDepotPvs.model';
import { TokenService } from 'src/app/services/token.service';
import { getDateInput, hideLoading, showLoading } from 'src/app/global-functions';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import { UsersHttpService } from '../users/services/users-http.service';
import { ClientHttpService } from '../clients/services/client-http.service';
import { Client } from '../clients/models/client.model';
import { Fournisseur } from '../fournisseurs/models/fournisseur.model';
import { FournisseurHttpService } from '../fournisseurs/services/fournisseur-http.service';
import {CreateAndUpdateReglementComponent} from './reglement-create-update/reglement-create-update.component';

@Component({
  selector: 'vex-reglements',
  templateUrl: './reglements.component.html',
  styleUrls: ['./reglements.component.scss'],
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
    FormsModule,
    MatDialogModule,
    MatInputModule,
    FiltreDatesComponent,
    SharedModule,
    DateRangePickerComponent,
    FiltreAutocompletSelectAllComponent,
    MatDatepickerModule,
    StandartAutocompleteComponent,
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
export class ReglementsComponent {
  labelTextPR = 'Période règlement';
  labelTextPE = 'Période écheance';

  labelTextCT = 'Mode règlement';
  dataTypeTiers = this.utilService.parseEnumToObject('enum_modeReglement');
  selectedKey = 'key';
  selectedVal = 'value';
  preSelectedCT: any = [];

  dataBanque: Banque[] = [];
  labelTextBC = 'Banques';
  selectedKeyBq = '_id';
  selectedValBq = 'libelle';
  preSelectedBq: any = [];

  allUtilisateurs:any[] = []

  form:FormGroup = this.fb.group({
    date1: [new Date()],
    date2: [new Date()],
    dateEcheance1: [null],
    dateEcheance2: [null],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    code_depotpv: [this.tokenService.getCodePointeVente(), Validators.required],
  })

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Reglement[]> = new ReplaySubject<Reglement[]>(1);
  data$: Observable<Reglement[]> = this.subject$.asObservable();
  listItems: Reglement[] = [];

  @Input()
  columns: TableColumn<Reglement>[] = [
    {
      label: 'Numéro',
      property: 'numero',
      type: 'text',
      visible: true,
    },
    {
      label: 'Date',
      property: 'dateString',
      type: 'text',
      visible: true,
    },
    {
      label: 'Montant',
      property: 'montantString',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Utilisateur',
      property: 'utilisateurString',
      type: 'text',
      visible: true,
    },
    {
      label: 'Client',
      property: 'clientString',
      type: 'text',
      visible: true,
    },
    {
      label: 'Mode reglement',
      property: 'modeReglementString',
      type: 'text',
      visible: true,
    },
    {
      label: 'Type',
      property: 'typeString',
      type: 'text',
      visible: true,
    },
    {
      label: 'N° pièce',
      property: 'numPiece',
      type: 'text',
      visible: true,
    },
    {
      label: 'Date échenace',
      property: 'dateEcheanceString',
      type: 'text',
      visible: true,
    },
    {
      label: 'Titulaire',
      property: 'titulaire',
      type: 'text',
      visible: true,
    },
    {
      label: 'Banque',
      property: 'banqueString',
      type: 'text',
      visible: true,
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Reglement>;
  selection = new SelectionModel<Reglement>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  dataParams:any

  constructor(
    private serviceReglementHttp: ReglementHttpService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public utilService: UtilService,
    private tokenService:TokenService,
    private serviceHttpBanque: BanqueHttpService,
    private fb: FormBuilder,
    private usersHttpService:UsersHttpService,
    private clientServiceHttp: ClientHttpService,
    private fournisseurServiceHttp: FournisseurHttpService,
    public impressionPdfService:ImpressionPdfService,
  ) { 
    this.route.data.subscribe((data: any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
      if(this.dataParams && this.dataParams.isAchat == true){
        this.columns.map((x:any) => {
          if(x.property == 'clientString'){
            x.label = 'Fournisseur'
            x.property = 'fournisseurString'
          } 
        })
      }
    });
  }
  openCreateUpdateDialog() {
    this.dialog.open(CreateAndUpdateReglementComponent, {
      width: '1000px',
    });
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

 
  ///////********************/////

  getDataBanque(items: any) {
    let newItems = [];
    for (let key of Object.keys(items)) {
      newItems.push(new Banque(items[key]));
    }
    return newItems;
  }

  async ngOnInit() {
    //     this.utilService.parseEnumToObject(enum_typetiers)
    //    let xxxxx =  this.utilService.getEnumKeyByValue(enum_typetiers,1)
    // console.log("***********************"+xxxxx)
    this.dataSource = new MatTableDataSource();

    showLoading()
    
    if(this.dataParams && this.dataParams.isAchat == false){
      await this.getAllClients()
    }else{
      await this.getAllFournisseurs()
    }

    await this.getAllBanques()
    await this.getRegs()
    await this.getAllUsers()
    
    hideLoading()

    this.data$.pipe(filter<Reglement[]>(Boolean)).subscribe((listItems) => {
      this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  allClients: Client[] = [];
  async getAllClients() {
    return new Promise((resolve) => {
      this.clientServiceHttp.GetAll().subscribe((res) => {
        this.allClients = this.clientServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  allFournisseurs: Fournisseur[] = [];
  async getAllFournisseurs() {
    return new Promise((resolve) => {
      this.fournisseurServiceHttp.GetAll().subscribe((res) => {
        this.allFournisseurs = this.fournisseurServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getAllBanques() {
    return new Promise((resolve) => {
      this.serviceHttpBanque.GetAll().subscribe((res) => {
        this.dataBanque = res.RESULTAT
        // this.dataBanque = this.getDataBanque(res.RESULTAT);
        resolve(res)
      });
    });
  }

  async getAllUsers() {
    return new Promise((resolve) => {
      let codeSoc = this.tokenService.getCodeSociete()
      let idUs    = this.tokenService.user?._id
      let dataUs:any  = {_id: idUs, code_societe : codeSoc, me:true}
      this.usersHttpService.usersBySociete(dataUs).subscribe((res) => {
        //this.subject$.next(this.usersHttpService.getData(res.RESULTAT));
        this.allUtilisateurs = res.RESULTAT
        
        this.allUtilisateurs.map(x => {
          x.concatUser = x.nom + x.prenom
        })
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

  set_SelectedDateRangeEcheance(p_SelectedDateRange: any){
    let today         = new Date();
    let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);

    this.form.patchValue({
       dateEcheance1:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateStart : myToday_Start.toString(),
       dateEcheance2:p_SelectedDateRange!=undefined ? p_SelectedDateRange.dateEnd :   myToday_End.toString()
    })
  }

  async getRegs(){
    showLoading()
    let res:any = await this.getAllRegs()
    if(res.RESULTAT && res.RESULTAT.length && res.RESULTAT.length > 0){
     this.subject$.next(this.serviceReglementHttp.getData(res.RESULTAT));
    }else{
     this.subject$.next([])
    }
    hideLoading()
  }

  dataTypeDocument = this.utilService.parseEnumToObject('enum_type_document_vente');
  preSelectedTypeDocument: any = [];

  selectedListTypeDocument: any;

  set_SelectedListTypeDocument(p_SelectedList: any) {
    var resultList = this.utilService.listStringOfArrayObject(p_SelectedList, 'value')
    // console.log("**********set_SelectedList111111************")
    // console.log(resultList)
    // console.log("*********set_SelectedList222222222*************")
    this.selectedListTypeDocument = resultList;
  }

  selectedListClient: any;
  set_SelectedListClients(p_SelectedList: any) {
    this.selectedListClient = p_SelectedList;
  }

  selectedListFournisseur: any;
  set_SelectedListFournisseurs(p_SelectedList: any) {
    this.selectedListFournisseur = p_SelectedList;
  }

  selectedListUtilisateur: any;
  set_SelectedListUtilisateurs(p_SelectedList: any) {
    this.selectedListUtilisateur = p_SelectedList;
  }

  selectedListBanque: any;
  set_SelectedListBanque(p_SelectedList: any) {
    this.selectedListBanque = p_SelectedList;
  }

  selectedListModeReglement: any;
  set_SelectedListModeReglement(p_SelectedList: any) {
    this.selectedListModeReglement = p_SelectedList.map( (x:any) => {
      return x.key
    })
    //this.selectedListModeReglement = p_SelectedList;
  }

  async getAllRegs() {
    return new Promise((resolve) => {
      let req:any = this.form.value
      //let date1 = new Date(req.date1)
      //let date2 = new Date(req.date2)
      //req.date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), 0, 0, 0);
      //req.date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 23, 59, 59);
      if(this.selectedListUtilisateur && this.selectedListUtilisateur.length > 0){
        req.utilisateur = this.selectedListUtilisateur.map( (x:any) => {
          return x._id
        })
      }

      if(this.selectedListClient && this.selectedListClient.length > 0){
        req.client = this.selectedListClient.map( (x:any) => {
          return x._id
        })
      }

      if(this.selectedListFournisseur && this.selectedListFournisseur.length > 0){
        req.fournisseur = this.selectedListFournisseur.map( (x:any) => {
          return x._id
        })
      }

      if(this.selectedListModeReglement && this.selectedListModeReglement.length > 0){
        req.modeReglement = this.selectedListModeReglement
      }

      if(req.modeReglement && req.modeReglement.length > 0 && req.modeReglement.indexOf('1') == -1 && this.selectedListBanque && this.selectedListBanque.length > 0){
        req.banque = this.selectedListBanque.map( (x:any) => {
          return x._id
        })
      }

      if(!(req.modeReglement && req.modeReglement.length > 0 && req.modeReglement.indexOf('1') == -1)){
        req.dateEcheance1 = undefined
        req.dateEcheance2 = undefined
      }

      if(this.selectedListTypeDocument && this.selectedListTypeDocument.length > 0){
        req.type = this.selectedListTypeDocument
      }
      
      if(this.dataParams && this.dataParams.tab_reg){
        req.tab_reg = this.dataParams.tab_reg
      }
      
      //req.utilisateur = req.utilisateur && req.utilisateur._id ? req.utilisateur._id : undefined
      this.serviceReglementHttp.GetAll(req).subscribe((res) => {
       resolve(res)
      });
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  create() {
    
  }

  update(item: Reglement) {
    /*
    this.dialog
      .open(UsersCreateUpdateComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new Reglement(updatedItem);
          this.subject$.next(this.listItems);
        }
      });

     */
  }

  delete(item: Reglement) {
    /*
    this.serviceHttp.delete(item._id).subscribe((res) => {
      if(!res.OK){
        alert(res.MESSAGE)
        return
      }
      this.listItems.splice(
        this.listItems.findIndex(
          (existingItem) => existingItem._id === item._id
        ),
        1
      );
      this.selection.deselect(item);
      this.subject$.next(this.listItems);
    });

     */
  }

  deleteItems(listItems: Reglement[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    listItems.forEach((c) => this.delete(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Product>, event: Event) {
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

  openImpressionPDF(reg:Reglement){
    if(reg && reg._id)
    this.impressionPdfService.imprimerReglement(reg._id, this.dataParams && this.dataParams.tab_reg ? this.dataParams.tab_reg : undefined);
  }

  @ViewChild('TABLE') table!: ElementRef;
 
  ExportTOExcel(){
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Règlements "+ (this.dataParams && this.dataParams.isAchat && this.dataParams.isAchat == true ? "Fournisseur ": "Client ") + (req.utilisateur && req.utilisateur.login ? " ("+ req.utilisateur.nom +" "+ req.utilisateur.prenom+") ":"") +(getDateInput(date1) != getDateInput(date2) ? " ("+getDateInput(date1)+" - "+getDateInput(date2)+") ": " ("+getDateInput(date2)+")" ));
  }

  exportToPdf(): void {
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Règlements "+ (this.dataParams && this.dataParams.isAchat && this.dataParams.isAchat == true ? "Fournisseur ": "Client ") + (req.utilisateur && req.utilisateur.login ? " ("+ req.utilisateur.nom +" "+ req.utilisateur.prenom+") ":"") +(getDateInput(date1) != getDateInput(date2) ? " ("+getDateInput(date1)+" - "+getDateInput(date2)+") ": " ("+getDateInput(date2)+")" ));
  }
}
