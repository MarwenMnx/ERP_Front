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
} from '../../../../static-data/aio-table-data';
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
import { FiltreDatesComponent } from '../../../utils/filtre-dates/filtre-dates.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { DateRangePickerComponent } from '../../../utils/date-range-picker/date-range-picker/date-range-picker.component';
import { FiltreAutocompletSelectAllComponent } from '../../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { UtilService } from '../../../utils/UtilService.service';
import {TicketHttpService} from "./../services/ticket-http.service";
import {Ticket} from "./../models/ticket.model";
import {Reglement} from "../../reglements/models/reglement.model";
import {ReglementHttpService} from "../../reglements/services/reglement-http.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/utils/dateAdapter/date.adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenService } from 'src/app/services/token.service';
import { getDateInput, hideLoading, showLoading } from 'src/app/global-functions';
import { UsersService } from '../../users/services/users.service';
import { UsersHttpService } from '../../users/services/users-http.service';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';
import { ReglementsCreateUpdateComponent } from 'src/app/erp_documents_achat/components/reglements/reglements-create-update.component';


@Component({
  selector: 'vex-reglement-ticket',
  templateUrl: './reglement-ticket.component.html',
  styleUrls: ['./reglement-ticket.component.scss'],
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

export class ReglementTicketComponent {

  layoutCtrl = new UntypedFormControl('boxed');

  allUtilisateurs:any[] = []

  form:FormGroup = this.fb.group({
    date1: [new Date()],
    date2: [new Date()],
    code_societe: [this.tokenService.getCodeSociete(), Validators.required],
    code_exercice: [this.tokenService.getCodeExercice(), Validators.required],
    code_depotpv: [this.tokenService.getCodePointeVente(), Validators.required],
    utilisateur: [""],
    tab_reg:      "reglementclients",
    type:         "tickets"
  })

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
      label: 'N° Ticket',
      property: 'lettrageReglement',
      type: 'text',
      visible: true,
    },
    {
      label: 'N° Bon Livraison',
      property: 'lettrageReglement_BL',
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
      label: 'Montant',
      property: 'montant',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Vendeur',
      property: 'utilisateur',
      type: 'text',
      visible: true,
    },
    {
      label: 'Code_client',
      property: 'client_code',
      type: 'text',
      visible: true,
    },
    {
      label: 'Raison_social',
      property: 'client_raison',
      type: 'text',
      visible: true,
    },
    {
      label: 'Mode_reglement',
      property: 'modeReglement',
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
      label: 'Date écheance',
      property: 'dateEcheance',
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
      property: 'banque',
      type: 'text',
      visible: true,
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];

  columnsClient: TableColumn<Reglement>[] = [
    {
      label: 'Numéro',
      property: 'numero',
      type: 'text',
      visible: true,
    },
    {
      label: 'N° Doc',
      property: 'lettrageReglement',
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
      label: 'Montant',
      property: 'montant',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Utilisateur',
      property: 'utilisateur',
      type: 'text',
      visible: true,
    },
    {
      label: 'Code_client',
      property: 'client_code',
      type: 'text',
      visible: true,
    },
    {
      label: 'Raison_social',
      property: 'client_raison',
      type: 'text',
      visible: true,
    },
    {
      label: 'Mode_reglement',
      property: 'modeReglement',
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
      label: 'Date écheance',
      property: 'dateEcheance',
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
      property: 'banque',
      type: 'text',
      visible: true,
    },

    { label: 'ACTIONS', property: 'actionsModSup', type: 'button', visible: true }
  ];

  columnsFournisseur: TableColumn<Reglement>[] = [
    {
      label: 'Numéro',
      property: 'numero',
      type: 'text',
      visible: true,
    },
    {
      label: 'N° Doc',
      property: 'lettrageReglement',
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
      label: 'Montant',
      property: 'montant',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'Utilisateur',
      property: 'utilisateur',
      type: 'text',
      visible: true,
    },
    {
      label: 'Code_fournisseur',
      property: 'client_code',
      type: 'text',
      visible: true,
    },
    {
      label: 'Raison_social',
      property: 'client_raison',
      type: 'text',
      visible: true,
    },
    {
      label: 'Mode_reglement',
      property: 'modeReglement',
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
      label: 'Date écheance',
      property: 'dateEcheance',
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
      property: 'banque',
      type: 'text',
      visible: true,
    },

    { label: 'ACTIONS', property: 'actionsModSup', type: 'button', visible: true }
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

  constructor(
    public impressionPdfService:ImpressionPdfService,
    private serviceReglementHttp: ReglementHttpService,
    private dialog: MatDialog,
    private router: Router,
    public utilService: UtilService,
    private tokenService:TokenService,
    private ticketHttpService:TicketHttpService,
    private fb: FormBuilder,
    private usersService:UsersService,
    private usersHttpService:UsersHttpService,
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  async ngOnInit() {

    this.dataSource = new MatTableDataSource();
    await this.getAllUsers()
    await this.getRegs()


    this.data$.pipe(filter<Reglement[]>(Boolean)).subscribe((listItems) => {
      this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  selectedListUtilisateur: any;
  set_SelectedListUtilisateurs(p_SelectedList: any) {
    this.selectedListUtilisateur = p_SelectedList;
  }

  async getAllUsers() {
    return new Promise((resolve) => {
      let codeSoc = this.tokenService.getCodeSociete()
      let idUs    = this.tokenService.user?._id
      let dataUs:any  = {_id: idUs, code_societe : codeSoc, me:true}
      this.usersHttpService.usersBySociete(dataUs).subscribe((res) => {
        //this.subject$.next(this.usersHttpService.getData(res.RESULTAT));
        this.allUtilisateurs = res.RESULTAT
        this.selectedListUtilisateur = res.RESULTAT
        this.allUtilisateurs.map(x => {
          x.concatUser = x.nom +' '+ x.prenom
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

  async getRegs(){

    showLoading()
    let res:any = await this.getAllRegs()
    if(res.RESULTAT)
      this.subject$.next(this.serviceReglementHttp.getData(res.RESULTAT));
    hideLoading()

  }

  get_DateRange: any
  set_SelectedDateRange(p_SelectedDateRange: any) {
    this.get_DateRange = p_SelectedDateRange
  }

  async getAllRegs() {
    return new Promise((resolve) => {
      let req:any = this.form.value

      if(this.selectedListUtilisateur && this.selectedListUtilisateur.length > 0){
        req.utilisateur = this.selectedListUtilisateur.map( (x:any) => {
          return x._id
        })
      }

      let today = new Date();
      let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      let myToday_End   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      let listFiltre: any = {
        code_societe:  this.tokenService.getCodeSociete(),
        code_exercice: this.tokenService.getCodeExercice(),
        code_depotpv : this.tokenService.getCodePointeVente(),
        date1: this.get_DateRange != undefined ? this.get_DateRange.dateStart : myToday_Start.toString(), //"2024-01-01T12:41:23.896Z",
        date2: this.get_DateRange != undefined ? this.get_DateRange.dateEnd : myToday_End.toString(), //"2024-02-28T12:41:23.896Z",
        utilisateur :req.utilisateur ,
        tab_reg:      "reglementclients",
        type:         "tickets"
      }

      this.serviceReglementHttp.GetAllTickets(listFiltre).subscribe((res) => {
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

  toggleColumnVisibility(column: TableColumn<Reglement>, event: Event) {
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

  openImpressionPDF(reg:Reglement){
    if(reg && reg._id)
    this.impressionPdfService.imprimerReglement(reg._id);
  }

  @ViewChild('TABLE') table!: ElementRef;

  ExportTOExcel(){
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Règlements"+ (req.utilisateur && req.utilisateur.login ? " ("+ req.utilisateur.nom +" "+ req.utilisateur.prenom+") ":"") +(getDateInput(date1) != getDateInput(date2) ? " ("+getDateInput(date1)+" - "+getDateInput(date2)+") ": " ("+getDateInput(date2)+")" ));
  }

  exportToPdf(): void {
    let req = this.form.value
    let date1 = new Date(req.date1)
    let date2 = new Date(req.date2)
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Règlements"+ (req.utilisateur && req.utilisateur.login ? " ("+ req.utilisateur.nom +" "+ req.utilisateur.prenom+") ":"") +(getDateInput(date1) != getDateInput(date2) ? " ("+getDateInput(date1)+" - "+getDateInput(date2)+") ": " ("+getDateInput(date2)+")" ));
  }

}
