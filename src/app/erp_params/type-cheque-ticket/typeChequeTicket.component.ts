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
import { typeChequeTicket } from './models/typeChequeTicket.model';
import { typeChequeTicketService } from './services/typeChequeTicket.service';
import { TypeChequeTicketHttpService } from './services/typeChequeTicket-http.service';
import { typeChequeTicketCreateUpdateComponent } from './typechequeticket-create-update/typechequeticket-create-update.component';


@Component({
  selector: 'vex-ticket',
  templateUrl: './typeChequeTicket.component.html',
  styleUrls: ['./typeChequeTicket.component.scss'],
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
export class TypeChequeTicketComponent {
  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<typeChequeTicket[]> = new ReplaySubject<typeChequeTicket[]>(1);
  data$: Observable<typeChequeTicket[]> = this.subject$.asObservable();
  listItems: typeChequeTicket[] = [];

  @Input()
  columns: TableColumn<typeChequeTicket>[] = [
    {
      label: 'LIBELLE',
      property: 'libelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },


    {
      label: 'CODE',
      property: 'code',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },


    {
      label: 'MONTANT TICKET',
      property: 'montant_ticket',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },


    {
      label: 'TAUX DÉDUCTION',
      property: 'taux_deduction',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },



    {
      label: 'MONTANT DÉDUCTION',
      property: 'montant_deduction',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },


    {
      label: 'VALEUR TICKET',
      property: 'valeur_ticket',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<typeChequeTicket>;
  selection = new SelectionModel<typeChequeTicket>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private service:typeChequeTicketService, private serviceHttp:TypeChequeTicketHttpService, private dialog: MatDialog, private router:Router) {}

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

    this.data$.pipe(filter<typeChequeTicket[]>(Boolean)).subscribe((listItems) => {
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
    .open(typeChequeTicketCreateUpdateComponent, {})
    .afterClosed()
    .subscribe((item: typeChequeTicket) => {
      if (item) {
        this.listItems.unshift(new typeChequeTicket(item));
        this.subject$.next(this.listItems);
      }
    });
  }

  update(item: typeChequeTicket) {
    this.dialog
    .open(typeChequeTicketCreateUpdateComponent, {
      data: item,
    })
    .afterClosed()
    .subscribe((updatedItem) => {
      if (updatedItem) {
        const index = this.listItems.findIndex(
          (existingItem) => existingItem._id === updatedItem._id
        );
        this.listItems[index] = new typeChequeTicket(updatedItem);
        this.subject$.next(this.listItems);
      }
    });
  }

  delete(item: typeChequeTicket) {
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

  deleteItems(listItems: typeChequeTicket[]) {
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

  toggleColumnVisibility(column: TableColumn<typeChequeTicket>, event: Event) {
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

