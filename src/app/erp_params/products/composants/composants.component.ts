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
import { Product } from '../models/product.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../../static-data/aio-table-data';
import { ProductCreateUpdateComponent } from '../product-create-update/product-create-update.component';
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
import { DocumentsComponent } from '../documents/documents.component';
import { ComposantTable } from '../models/composant.model';
import { composantsTableData } from './composants-table-data';
import { ComposantCreateUpdateComponent } from './composant-create-update.component';
import { Output, EventEmitter } from '@angular/core';
import { log } from 'console';
import { hideLoading, roundmMontantNumber, roundmQuantiteNumber, roundmTauxNumber, showLoading } from 'src/app/global-functions';
import { ProductHttpServiceService } from '../services/product-http-service.service';


@Component({
  selector: 'vex-composants',
  templateUrl: './composants.component.html',
  styleUrls: ['./composants.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
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
    DocumentsComponent
  ],
})
export class ComposantsComponent implements OnInit, AfterViewInit {
  
  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "sousArticles"
  addChangeEvent() {
    this.newItemEvent.emit([this.keyOfForm, this.products]);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.products);
      this.inisialiserProducts()
    }catch(e){}
  }

  dataSource!: MatTableDataSource<ComposantTable>;

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ComposantTable[]> = new ReplaySubject<ComposantTable[]>(1);
  data$: Observable<ComposantTable[]> = this.subject$.asObservable();
  @Input() products: ComposantTable[] = [];
  @Input() allArticles: Product[] = [];

  inisialiserProducts(){
    let olds = this.products
    let news = []
    for(let old of olds){
      var article = this.allArticles ? this.allArticles.find(x => x._id == old.sousArticle) : null;
      let item = new ComposantTable({
        _id: old._id,
        sousArticle: old.sousArticle,
        reference: article ? article.reference: '',
        designation: article ? article.designation: '',
        prixAchat: article ? roundmMontantNumber(Number(article.prixAchat)): 0,
        tauxTVA: article ? roundmTauxNumber(Number(article.tauxTVA)): 0,
        prixHT: article ? roundmMontantNumber(Number(article.prixVenteHT)): 0,
        prixTTC: article ? roundmMontantNumber(Number(article.prixTTC)): 0,
        quantite: roundmQuantiteNumber(Number(old.quantite)),
        totalHT: article ? roundmMontantNumber(Number(article.prixVenteHT) * Number(old.quantite)): 0,
        totalTTC: article ? roundmMontantNumber(Number(roundmMontantNumber(Number(article.prixVenteHT) * Number(old.quantite))) * (1 + Number(article.tauxTVA) / 100) ): 0,
      })
      
      news.push(item)
    }
    this.products = news
    this.addChangeEvent()
    this.subject$.next(this.products)
  }

  @Input()
  columns: TableColumn<ComposantTable>[] = [
    {
      label: 'Reference',
      property: 'reference',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Designation',
      property: 'designation',
      type: 'text',
      visible: true,
    },
    {
      label: 'PrixAchat',
      property: 'prixAchat',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'TauxTVA',
      property: 'tauxTVA',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'PrixHT',
      property: 'prixHT',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'PrixTTC',
      property: 'prixTTC',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'Quantite',
      property: 'quantite',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'TotalHT',
      property: 'totalHT',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },
    {
      label: 'totalTTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ['right-number']
    },

    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  //dataSource!: MatTableDataSource<ComposantTable>;
  selection = new SelectionModel<ComposantTable>(true, []);
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, private serviceHttp:ProductHttpServiceService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  async ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<ComposantTable[]>(Boolean)).subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
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

  createComposantTable() {
    this.dialog
    .open(ComposantCreateUpdateComponent, {
      data:{
        allArticles:this.allArticles,
      }
    })
    .afterClosed()
    .subscribe((product: ComposantTable) => {
      if (product) {
        this.products.unshift(new ComposantTable(product));
        this.inisialiserProducts()
      }
    });
  }

  updateComposantTable(product: ComposantTable) {
    this.dialog
      .open(ComposantCreateUpdateComponent, {
        data:{
          allArticles:this.allArticles,
          composant:product
        }
      })
      .afterClosed()
      .subscribe((updatedProduct) => {
        if (updatedProduct) {
          const index = this.products.findIndex(
            (existingProduct) => existingProduct._id === updatedProduct._id
          );
          this.products[index] = new ComposantTable(updatedProduct);
          this.inisialiserProducts()
        }
      });
  }

  deleteProduct(product: ComposantTable) {
    this.products.splice(
      this.products.findIndex(
        (existingProduct) => existingProduct._id === product._id
      ),
      1
    );
    this.selection.deselect(product);
    this.subject$.next(this.products);
  }

  deleteProducts(products: ComposantTable[]) {
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

  toggleColumnVisibility(column: TableColumn<ComposantTable>, event: Event) {
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

  onLabelChange(change: MatSelectChange, row: ComposantTable) {
    const index = this.products.findIndex((c) => c === row);
    this.products[index].reference = change.value;
    this.subject$.next(this.products);
  }
}

