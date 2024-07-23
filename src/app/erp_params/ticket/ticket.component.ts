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
import { Router } from '@angular/router';
import { FiltreDatesComponent } from '../../utils/filtre-dates/filtre-dates.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { DateRangePickerComponent } from '../../utils/date-range-picker/date-range-picker/date-range-picker.component';
import { FiltreAutocompletSelectAllComponent } from '../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { UtilService } from '../../utils/UtilService.service';
import {TicketHttpService} from "./services/ticket-http.service";
import {Ticket} from "./models/ticket.model";
import {DetailsTicketComponent} from "./details-ticket/details-ticket.component";
import { Client } from '../clients/models/client.model';
import { ClientHttpService } from '../clients/services/client-http.service';
import { TokenService } from 'src/app/services/token.service';
import { MatOptionModule } from '@angular/material/core';
import { enum_modes_imprission, enum_status_paiement } from 'src/app/global-enums';
import { UsersHttpService } from '../users/services/users-http.service';
import { getDateInput, hideLoading, showLoading } from 'src/app/global-functions';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import {DocumentVente} from "../../erp_documents_vente/models/document-vente.model";

@Component({
  selector: 'vex-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
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
    MatSelectModule,
    MatOptionModule,
    StandartAutocompleteComponent
  ]
})
export class TicketComponent {

  layoutCtrl = new UntypedFormControl('fullwidth');
  selectCtrl: UntypedFormControl = new UntypedFormControl();
  enum_status_paiement = enum_status_paiement
  enum_modes_imprission = enum_modes_imprission

  form:FormGroup = this.fb.group({
    date1: [new Date()],
    date2: [new Date()],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    code_depotpv: [this.tokenService.getCodePointeVente(), Validators.required],
    payee: [0],
    bloque: [0]
  })

  allClients: Client[] = [];
  async getAllClients() {
    return new Promise((resolve) => {
      this.clientServiceHttp.GetAll().subscribe((res) => {
        this.allClients = this.clientServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  allUtilisateurs:any[] = []
  async getAllUsers() {
    return new Promise((resolve) => {
      let codeSoc = this.tokenService.getCodeSociete()
      let idUs    = this.tokenService.user?._id
      let dataUs:any  = {_id: idUs, code_societe : codeSoc, me:true}
      this.usersHttpService.usersBySociete(dataUs).subscribe((res) => {
        //this.subject$.next(this.usersHttpService.getData(res.RESULTAT));
        this.allUtilisateurs         = res.RESULTAT
        this.selectedListUtilisateur = res.RESULTAT

        this.allUtilisateurs.map(x => {
          x.concatUser = x.nom +' '+ x.prenom
        })

        resolve(res)
      });
    });
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

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Ticket[]> = new ReplaySubject<Ticket[]>(1);
  data$: Observable<Ticket[]> = this.subject$.asObservable();
  listItems: Ticket[] = [];

  @Input()
  columns: TableColumn<Ticket>[] = [
    {
      label: 'Numéro',
      property: 'numero',
      type: 'text',
      visible: true,
    },
    {
      label: 'Numéro-BL',
      property: 'numeroBL',
      type: 'text',
      visible: true,
    },
    {
      label: 'Date',
      property: 'date',
      type: 'text',
      visible: true,
    },

    {
      label: 'Vendeur',
      property: 'utilisateur_caissier',
      type: 'text',
      visible: true,
    },
    {
      label: 'Client',
      property: 'client',
      type: 'text',
      visible: true,
    },

    {
      label: 'totalTTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'total_Payer',
      property: 'totalPayer',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'reste_A_Payer',
      property: 'resteAPayer',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
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

    {
      label: 'nomMachine',
      property: 'nomMachine',
      type: 'text',
      visible: true,
    },

    {
      label: 'sessionCaisse',
      property: 'sessionCaisse',
      type: 'text',
      visible: true,
    },

   // { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Ticket>;
  selection = new SelectionModel<Ticket>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private tokenService:TokenService,
    private dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    private ticketHttpService:TicketHttpService,
    private usersHttpService:UsersHttpService,
    private clientServiceHttp: ClientHttpService,
    private fb: FormBuilder,
    public impressionPdfService:ImpressionPdfService,

  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  async ngOnInit() {
    //     this.utilService.parseEnumToObject(enum_typetiers)
    //    let xxxxx =  this.utilService.getEnumKeyByValue(enum_typetiers,1)
    // console.log("***********************"+xxxxx)
    showLoading()

    this.dataSource = new MatTableDataSource();

    await this.getAllClients()
    await this.getAllUsers()
    await this.getDocs()

    hideLoading()

    this.data$.pipe(filter<Ticket[]>(Boolean)).subscribe((listItems) => {
      this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  async getDocs(){
    showLoading()
    let res:any = await this.getAllDocs()
    if(res.RESULTAT && res.RESULTAT.length && res.RESULTAT.length > 0){
      this.subject$.next(this.ticketHttpService.getData(res.RESULTAT));
    }else{
     this.subject$.next([])
    }
    hideLoading()
  }

  async getAllDocs() {
    return new Promise((resolve) => {

      let req:any = this.form.value
      // if(this.selectedListUtilisateur){
      //   req.cassier = this.selectedListUtilisateur
      // }

      if(this.selectedListUtilisateur && this.selectedListUtilisateur.length > 0){
        req.caissier = this.selectedListUtilisateur.map( (x:any) => {
          return x._id
        })
      }

      if(this.selectedListClient && this.selectedListClient.length > 0){
        req.client = this.selectedListClient.map( (x:any) => {
          return x._id
        })
      }

      if(req.payee == 0) req.payee = undefined

      if(req.bloque != 0)
        req.bloque = req.bloque == 1
      else
        req.bloque = undefined

      //req.utilisateur = req.utilisateur && req.utilisateur._id ? req.utilisateur._id : undefined
      this.ticketHttpService.GetAll(req).subscribe((res) => {
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


  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Ticket>, event: Event) {
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


  create() {
    // console.log(
    //   '***********this.selectedListFromFiltre************* >>> : ',
    //   this.selectedListFromFiltre
    // );
    // console.log(
    //   '***********this.selectedListReglement************* >>> : ',
    //   this.selectedListReglement
    // );
  }

  update(item: Ticket) {
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

  delete(item: Ticket) {
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

  deleteItems(listItems: Ticket[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    listItems.forEach((c) => this.delete(c));
  }

  selectedListClient: any;
  set_SelectedListClients(p_SelectedList: any) {
    this.selectedListClient = p_SelectedList;
  }

  selectedListUtilisateur: any;
  set_SelectedListUtilisateurs(p_SelectedList: any) {
    this.selectedListUtilisateur = p_SelectedList;
  }

  @ViewChild('TABLE') table!: ElementRef;

  ExportTOExcel(){
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Tickets ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")");
  }

  exportToPdf(): void {
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Tickets ("+(getDateInput(date1) != getDateInput(date2) ? getDateInput(date1)+" - "+getDateInput(date2): getDateInput(date2))+")");
  }

  consulterTicket(item:Ticket){

    this.dialog
      .open(DetailsTicketComponent, {
        data: {detailsPanier:item},
        disableClose: true,
        //width: '400px'
      })
      .afterClosed()
      .subscribe((resultUpdatePanier) => {

      });

  }

  openImpressionPDF(doc: DocumentVente, mode?:number){
    this.impressionPdfService.openPopup(doc._id, "Ticket", "/ticket", mode);
  }

}
