import { CompteBancaires } from './../models/compteBancaires.model';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';

import { SelectionModel } from '@angular/cdk/collections';
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
import { CompteBancaireService } from '../services/compte-bancaire.service';
import { CompteBancaireHttpService } from '../services/compte-bancaire-http.service';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { CompteBancaireCreateUpdateComponent } from '../compte-bancaire-create-update/compte-bancaire-create-update.component';
@Component({
  selector: 'vex-compte-bancaire',
  templateUrl: './compte-bancaire.component.html',
  styleUrls: ['./compte-bancaire.component.scss'],
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
export class CompteBancaireComponent {

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<CompteBancaires[]> = new ReplaySubject<CompteBancaires[]>(1);
  data$: Observable<CompteBancaires[]> = this.subject$.asObservable();
  listItems: CompteBancaires[] = [];

  @Input()
  columns: TableColumn<CompteBancaires>[] = [
  
  
    {
      label: 'LIBELLE',
      property: 'libelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'BANQUE',
      property: 'banque',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'NUMÉRO COMPTE',
      property: 'numeroCompte',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'RIB',
      property: 'rib',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'AGENCE',
      property: 'agence',
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
      label: 'IBAN',
      property: 'iban',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'BIC_SWIFT',
      property: 'bic_swift',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
 

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<CompteBancaires>;
  selection = new SelectionModel<CompteBancaires>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  
  constructor(private service:CompteBancaireService, private serviceHttp:CompteBancaireHttpService, private dialog: MatDialog, private router:Router) {}
  
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

    this.data$.pipe(filter<CompteBancaires[]>(Boolean)).subscribe((listItems) => {
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
    .open(CompteBancaireCreateUpdateComponent, {})
    .afterClosed()
    .subscribe((item: CompteBancaires) => {
      if (item) {
        this.listItems.unshift(new CompteBancaires(item));
        this.subject$.next(this.listItems);
      }
    });
  }

  update(item: CompteBancaires) {
    this.dialog
      .open(CompteBancaireCreateUpdateComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new CompteBancaires(updatedItem);
          this.subject$.next(this.listItems);
        }
      });
  }

  delete(item: CompteBancaires) {
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

  deleteItems(listItems: CompteBancaires[]) {
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

  toggleColumnVisibility(column: TableColumn<CompteBancaires>, event: Event) {
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


