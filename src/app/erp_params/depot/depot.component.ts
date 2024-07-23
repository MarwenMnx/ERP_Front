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
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
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
import { Depot } from './models/depot.model';
import { DepotService } from './services/depot.service';
import { DepotHttpService } from './services/depot-http.service';
import { DepotCreateUpdateComponent } from './depot-create-update/depot-create-update.component';
import { UtilService } from '../../utils/UtilService.service';
import { FiltreAutocompletSelectAllComponent } from '../../utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';


@Component({
  selector: 'vex-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss'],
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
    MatInputModule,
    
  ]
})
export class DepotComponent {

 layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Depot[]> = new ReplaySubject<Depot[]>(1);
  data$: Observable<Depot[]> = this.subject$.asObservable();
  listItems: Depot[] = [];

  @Input()
  columns: TableColumn<Depot>[] = [
    {
      label: 'LIBELLE',
      property: 'libelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'RESPONSABLE',
      property: 'responsable',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'TÉLÉPHONE',
      property: 'telephone',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'EMAIL',
      property: 'email',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'TYPE',
      property: 'type',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'NOTES',
      property: 'notes',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Depot>;
  selection = new SelectionModel<Depot>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private service: DepotService,
    private serviceHttDepot: DepotHttpService,
    private dialog: MatDialog,
    private router: Router,
    public utilService: UtilService
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  ngOnInit() {
    this.utilService.parseEnumToObject('enum_typeDepotPV');
    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.subject$.next(this.serviceHttDepot.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Depot[]>(Boolean)).subscribe((listItems) => {
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

  create() {
    this.dialog
      .open(DepotCreateUpdateComponent, {})
      .afterClosed()
      .subscribe((item: Depot) => {
        if (item) {
          this.listItems.unshift(new Depot(item));
          this.subject$.next(this.listItems);
        }
      });
  }

  update(item: Depot) {
    this.dialog
      .open(DepotCreateUpdateComponent, {
        data: item
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new Depot(updatedItem);
          this.subject$.next(this.listItems);
        }
      });
  }

  delete(item: Depot) {
    this.serviceHttDepot.delete(item._id).subscribe((res) => {
      if (!res.OK) {
        alert(res.MESSAGE);
        return;
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
  }

  deleteItems(listItems: Depot[]) {
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

  /*onLabelChange(change: MatSelectChange, row: Categorie) {
    const index = this.listItems.findIndex((c) => c === row);
    this.listItems[index].labels = change.value;
    this.subject$.next(this.products);
  }*/
}