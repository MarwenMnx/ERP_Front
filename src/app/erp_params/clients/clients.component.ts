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
import { MatTabsModule } from '@angular/material/tabs';
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
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
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
import { DocumentsComponent } from '../products/documents/documents.component';
import { Router } from '@angular/router';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { Client } from './models/client.model';
import { ClientHttpService } from './services/client-http.service';
import { ClientService } from './services/client.service';
import { RouterLink } from '@angular/router';
import { hideLoading, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';

@Component({
  selector: 'vex-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [fadeInUp400ms,stagger40ms],
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule,MatTabsModule,
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
    DocumentsComponent,
    RouterLink
  ]
})


export class ClientsComponent implements OnInit, AfterViewInit  {
  layoutCtrl = new UntypedFormControl('boxed');

   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  data$: Observable<Client[]> = this.subject$.asObservable();
  listItems: Client[] = [];

  @Input()
  columns: TableColumn<Client>[] = [
    // {
    //   label: 'checkbox',
    //   property: 'checkbox',
    //   type: 'checkbox',
    //   visible: true
    // },
    {
        label: 'CODE',
      property: 'code',
        type: 'text',
        visible: true,
       },
       {
        label: 'RAISON SOCIALE',
        property: 'raisonSociale',
        type: 'text',
        visible: true,
      },
       {
        label: 'MATRICULE FISCALE',
      property: 'matriculeFiscale',
        type: 'text',
        visible: true,
       },   
    {
      label: 'TÉLÉPHONE',
      property: 'telephone',
      type: 'text',
      visible: true,
    },

    {
      label: 'MOBILE',
      property: 'mobile',
      type: 'text',
      visible: true,
    },

    {
      label: 'SOLDE',
      property: 'solde',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'plafondSolde',
      property: 'plafondSolde',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'enCours',
      property: 'enCours',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'plafondEnCours',
      property: 'plafondEnCours',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    
    {
      label: 'EMAIL',
      property: 'email',
      type: 'text',
      visible: true,
    },
    // { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
    // { label: 'Contact', property: 'contact', type: 'button', visible: true },
    // {
    //   label: 'Address',
    //   property: 'address',
    //   type: 'text',
    //   visible: true,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },
    // {
    //   label: 'Street',
    //   property: 'street',
    //   type: 'text',
    //   visible: false,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },
    // {
    //   label: 'Zipcode',
    //   property: 'zipcode',
    //   type: 'text',
    //   visible: false,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },
    // {
    //   label: 'City',
    //   property: 'city',
    //   type: 'text',
    //   visible: false,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },
    // {
    
    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Client>;
  selection = new SelectionModel<Client>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private service:ClientService, 
    private serviceHttp:ClientHttpService, 
    private dialog: MatDialog, 
    private router:Router,
    public utilService:UtilService,
    public impressionPdfService:ImpressionPdfService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  // getData() {
  //   return of(aioTableData.map((product) => 
  //   new Client(product)));
  // }

  // getData(items:any) {
  //   let newItems = []
  //   for (let key of Object.keys(items)){
  //     newItems.push(new Client(items[key]))
  //   }
  //   return newItems
  // }   
  ngOnInit() {
    showLoading()


    this.serviceHttp.GetAll().subscribe((res) => {
      hideLoading()
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Client[]>(Boolean)).subscribe((listItems) => {
      this.listItems = listItems;
      this.dataSource.data = listItems;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  createProduct() {
    this.router.navigate(['/clients/new']);
  }
  updateProduct(client: Client) {
    this.router.navigate(['/clients/edit/'+client._id]);
  }

  deleteProduct(client: Client) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer " '+client.code+' " ?')
    .then((result) => {
      if (result.isConfirmed) {
        this.listItems.splice(
          this.listItems.findIndex(
            (existingClient) => existingClient._id === client._id
          ),
          1
        );
        this.selection.deselect(client);
        this.subject$.next(this.listItems);
        
        this.serviceHttp.delete(client._id).subscribe((res) => {
          succesAlerteAvecTimer(res.MESSAGE);
        });

      } else {
        // User cancelled, handle accordingly
      }
    });
  }

  
  deleteProducts(clients: Client[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    clients.forEach((c) => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Client>, event: Event) {
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
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Clients");
  }

  exportToPdf(): void {
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Clients");
  }

}


