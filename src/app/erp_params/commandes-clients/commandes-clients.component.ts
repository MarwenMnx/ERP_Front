import {
  AfterViewInit,
  Component,
  DestroyRef,
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
import { Commande_client } from './models/commandes_clients.model';
import { CommandesClientsCreateUpdateComponent } from './commandes-clients-create-update/commandes-clients-create-update.component';
import { aioTableData, aioTableLabels } from 'src/static-data/aio-table-data';
@Component({
  selector: 'vex-commandes-clients',
  templateUrl: './commandes-clients.component.html',
  styleUrls: ['./commandes-clients.component.scss'],
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
    FormsModule,
    MatDialogModule,
    MatInputModule
  ]
})

export class CommandesClientsComponent implements OnInit , AfterViewInit{

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Commande_client[]> = new ReplaySubject<Commande_client[]>(1);
  data$: Observable<Commande_client[]> = this.subject$.asObservable();
  commandes: Commande_client[] = [];

  @Input()
  columns: TableColumn<Commande_client>[] = [
    // {
    //   label: 'CHECKBOX',
    //   property: 'checkbox',
    //   type: 'checkbox',
    //   visible: true
    // },
    
    {
      label: 'ÉTAT COMMANDE',
      property: 'etatCommande',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'D.COMMANDE',
      property: 'dateCommande',
      type: 'text',
      visible: true
    },
    
    {
      label: 'N°COMMANDE',
      property: 'numCommande',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'D.BL',
      property: 'dateBL',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'N°BL',
      property: 'numBL',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'D.DEVIS',
      property: 'dateDevis',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'N°DEVIS',
      property: 'numDevis',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'CODE CLIENT',
      property: 'codeClient',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'RAISON SOCIALE',
      property: 'raisonSociale',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL BRUTE',
      property: 'totalBrute',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL REMISE',
      property: 'totalRemise',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL NET',
      property: 'totalNet',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL TVA',
      property: 'totalTva',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL REDEVANCE',
      property: 'totalRedevance',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'TOTAL TTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'NOTE',
      property: 'note',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
   
  
  
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Commande_client>;
  selection = new SelectionModel<Commande_client>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(aioTableData.map((commande: any) => new Commande_client(commande)));
  }

  ngOnInit() {
    this.getData().subscribe((commandes) => {
      this.subject$.next(commandes);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Commande_client[]>(Boolean)).subscribe((commandes) => {
      this.commandes = commandes;
      this.dataSource.data = commandes;
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

  createCommande() {
    this.dialog
      .open(CommandesClientsCreateUpdateComponent)
      .afterClosed()
      .subscribe((commande: Commande_client) => {
        /**
         * commande is the updated commande (if the user pressed Save - otherwise it's null)
         */
        if (commande) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.commandes.unshift(new Commande_client(commande));
          this.subject$.next(this.commandes);
        }
      });
  }

  updateCommande(commande: Commande_client) {
    this.dialog
      .open(CommandesClientsCreateUpdateComponent, {
        data: commande
      })
      .afterClosed()
      .subscribe((updatedCommande) => {
        /**
         * commande is the updated commande (if the user pressed Save - otherwise it's null)
         */
        if (updatedCommande) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.commandes.findIndex(
            (existingCommande) => existingCommande.id === updatedCommande.id
          );
          this.commandes[index] = new Commande_client(updatedCommande);
          this.subject$.next(this.commandes);
        }
      });
  }

  deleteCommande(commande: Commande_client) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.commandes.splice(
      this.commandes.findIndex(
        (existingcommande) => existingcommande.id === commande.id
      ),
      1
    );
    this.selection.deselect(commande);
    this.subject$.next(this.commandes);
  }

  deleteCommandes(commandes: Commande_client[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    commandes.forEach((c) => this.deleteCommande(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Commande_client>, event: Event) {
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
}

