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
import { Router } from '@angular/router';

import { SoustypevehiculeHttpService } from './services/soustypevehicule-http.service';
import { SoustypevehiculeCreateUpdateComponent } from './soustypevehicule-create-update/soustypevehicule-create-update.component';
import { SousTypeVehicule } from './models/soustypevehicule.model';
import { SoustypevehiculeService } from './services/soustypevehicule.service';


@Component({
  selector: 'vex-soustypevehicule',
  templateUrl: './soustypevehicule.component.html',
  styleUrls: ['./soustypevehicule.component.scss'],
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
export class SoustypevehiculeComponent {

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<SousTypeVehicule[]> = new ReplaySubject<SousTypeVehicule[]>(1);
  data$: Observable<SousTypeVehicule[]> = this.subject$.asObservable();
  listItems: SousTypeVehicule[] = [];

  @Input()
  columns: TableColumn<SousTypeVehicule>[] = [
    {
      label: 'LIBELLE',
      property: 'libelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'TYPE VÈHICULE',
      property: 'marque',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<SousTypeVehicule>;
  selection = new SelectionModel<SousTypeVehicule>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  
  constructor(private service:SoustypevehiculeService, 
    private serviceHttp:SoustypevehiculeHttpService, 
    private dialog: MatDialog, private router:Router) {}
  
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

    ngOnInit() {

    this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next( this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<SousTypeVehicule[]>(Boolean)).subscribe((listItems) => {
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
    .open(SoustypevehiculeCreateUpdateComponent, {})
    .afterClosed()
    .subscribe((item: SousTypeVehicule) => {
      if (item) {
        this.listItems.unshift(new SousTypeVehicule(item));
        this.subject$.next(this.listItems);
      }
    });
  }

  update(item: SousTypeVehicule) {
    this.dialog
      .open(SoustypevehiculeCreateUpdateComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new SousTypeVehicule(updatedItem);
          this.subject$.next(this.listItems);
        }
      });
  }

  delete(item: SousTypeVehicule) {
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
  }

  deleteItems(listItems: SousTypeVehicule[]) {
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

  toggleColumnVisibility(column: TableColumn<SousTypeVehicule>, event: Event) {
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
}


