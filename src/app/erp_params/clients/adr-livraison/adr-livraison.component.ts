import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input, OnChanges, SimpleChanges,
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
// import { Product } from '../../products/models/product.model';
import { DocumentsComponent } from '../../products/documents/documents.component';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { ClientCreateUpdateComponent } from '../client-create-update/client-create-update.component';
import { aioClientData } from 'src/static-data/client-data';
import { Client } from '../models/client.model';
import { AdrModalComponent } from './adr-modal/adr-modal.component';
import { Output, EventEmitter } from '@angular/core';
import { AdresseLivraison } from '../models/adresse.model';


@Component({
  selector: 'vex-adr-livraison',
  templateUrl: './adr-livraison.component.html',
  styleUrls: ['./adr-livraison.component.scss'],
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
    DocumentsComponent,
   
  ]
})
export class AdrLivraisonComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "adresseLivraison"

  addChangeEvent() {
    this.newItemEvent.emit([this.keyOfForm, this.adresseLivraisons]);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.adresseLivraisons);
    }catch(e){}
  }

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<AdresseLivraison[]> = new ReplaySubject<AdresseLivraison[]>(1);
  data$: Observable<AdresseLivraison[]> = this.subject$.asObservable();
  @Input() adresseLivraisons: AdresseLivraison[] = [];
  
  @Input()
  columns: TableColumn<AdresseLivraison>[] = [
    {
      label: 'Titre',
      property: 'titre',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    { 
      label: 'Pays',
      property: 'pays',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium'] 
    },
    { 
      label: 'Gouvernorat',
      property: 'gouvernorat',
      type: 'image', 
      visible: true ,
      cssClasses: ['font-medium']
    },
    {
      label: 'Delegation',
      property: 'delegation',
      type: 'image',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Localite',
      property: 'localite',
      type: 'image',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Code postale',
      property: 'codePostale',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Adresse',
      property: 'adresse',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
   
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<AdresseLivraison>;
  selection = new SelectionModel<AdresseLivraison>(true, []);
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
    return of(aioClientData.map((product) => new AdresseLivraison(product)));
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<AdresseLivraison[]>(Boolean)).subscribe((listItems) => {
      this.adresseLivraisons = listItems;
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
    this.dialog
    .open(AdrModalComponent)
    .afterClosed()
    .subscribe((product: AdresseLivraison) => {
      if (product) {
        try{
          this.adresseLivraisons.unshift(new AdresseLivraison(product));
        }catch(e){
          this.adresseLivraisons = []
          this.adresseLivraisons.unshift(new AdresseLivraison(product));
        }
        this.subject$.next(this.adresseLivraisons);
        this.addChangeEvent()
      }
    });
  }

  updateProduct(product: AdresseLivraison) {
    this.dialog
      .open(AdrModalComponent, {
        data: product,
      })
      .afterClosed()
      .subscribe((updatedProduct) => {
        if (updatedProduct) {
          const index = this.adresseLivraisons.findIndex(
            (existingProduct) => existingProduct._id === updatedProduct._id
          );
          this.adresseLivraisons[index] = new AdresseLivraison(updatedProduct);
          this.subject$.next(this.adresseLivraisons);
          this.addChangeEvent()
        }
      });
  }

  deleteProduct(product: AdresseLivraison) {
    if(confirm('are you sure to delete ? '))
    this.adresseLivraisons.splice(
      this.adresseLivraisons.findIndex(
        (existingProduct) => existingProduct._id === product._id
      ),
      1
    );
    this.selection.deselect(product);
    this.subject$.next(this.adresseLivraisons);
    this.addChangeEvent()
  }

  deleteProducts(products: AdresseLivraison[]) {
    products.forEach((c) => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<AdresseLivraison>, event: Event) {
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

