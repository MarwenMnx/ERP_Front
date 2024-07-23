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
import { Transporteur } from './models/transporteur.model';
import { TransporteurCreateUpdateComponent } from './transporteur-create-update/transporteur-create-update.component';
import { TransporteurHttpService } from './services/transporteur-http.service';
import { TransporteurService } from './services/transporteur.service';

// import { CategorieHttpService } from './services/categorie-http.service';
// import { ICategorie, Categorie } from './models/categorie.model';
// import { CategorieCreateUpdateComponent } from './categorie-create-update/categorie-create-update.component';
// import { CategorieService } from './services/categorie.service';

@Component({
  selector: 'vex-transporteur',
  templateUrl: './transporteur.component.html',
  styleUrls: ['./transporteur.component.scss'],
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
export class TransporteurComponent {

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Transporteur[]> = new ReplaySubject<Transporteur[]>(1);
  data$: Observable<Transporteur[]> = this.subject$.asObservable();
  listItems: Transporteur[] = [];

  @Input()
  columns: TableColumn<Transporteur>[] = [
    {
      label: 'NOM',
      property: 'nom',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    
    {
      label: 'NUM VÉHICULE',
      property: 'numVehicule',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    
    {
      label: 'GSM',
      property: 'gsm',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    
    {
      label: 'TÉLÉPHONE',
      property: 'tel',
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
    
    
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Transporteur>;
  selection = new SelectionModel<Transporteur>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  
  constructor(private service:TransporteurService, private serviceHttp:TransporteurHttpService, private dialog: MatDialog, private router:Router) {}
  
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  ngOnInit() {

    this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Transporteur[]>(Boolean)).subscribe((listItems) => {
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
    .open(TransporteurCreateUpdateComponent, {})
    .afterClosed()
    .subscribe((item: Transporteur) => {
      if (item) {
        this.listItems.unshift(new Transporteur(item));
        this.subject$.next(this.listItems);
      }
    });
  }

  update(item: Transporteur) {
    this.dialog
    .open(TransporteurCreateUpdateComponent, {
      data: item,
    })
    .afterClosed()
    .subscribe((updatedItem) => {
      if (updatedItem) {
        const index = this.listItems.findIndex(
          (existingItem) => existingItem._id === updatedItem._id
        );
        this.listItems[index] = new Transporteur(updatedItem);
        this.subject$.next(this.listItems);
      }
    });
  }

  delete(item: Transporteur) {
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

  deleteItems(listItems: Transporteur[]) {
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

  toggleColumnVisibility(column: TableColumn<Transporteur>, event: Event) {
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



