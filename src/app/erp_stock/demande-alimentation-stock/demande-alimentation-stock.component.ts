import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  ViewChild
} from '@angular/core';
import { filter, Observable, of, ReplaySubject } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
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
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { getDateByForma, hideLoading, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { DemandeAlimentation } from './models/demande_alimentation_stock.model';
import { DemandeAlimentationStockHttpService } from './services/demande-alimentation-stock-http.service';

@Component({
  selector: 'vex-demande-alimentation-stock',
  templateUrl: './demande-alimentation-stock.component.html',
  styleUrls: ['./demande-alimentation-stock.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    FiltreCatgFamilleSousFamilleComponent,
    FiltreDatesComponent,
    RouterLink,
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
export class DemandeAlimentationStockComponent {
  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<DemandeAlimentation[]> = new ReplaySubject<DemandeAlimentation[]>(1);
  data$: Observable<DemandeAlimentation[]> = this.subject$.asObservable();
  products: DemandeAlimentation[] = [];

  @Input()
  columns: TableColumn<DemandeAlimentation>[] = [
    {
      label: 'NUMÉRO',
      property: 'numero',
      type: 'text',
      visible: true
    },
    {
      label: 'DATE',
      property: 'date',
      type: 'image',
      visible: true
    },
    {
      label: 'NOTES',
      property: 'notes',
      type: 'text',
      visible: true
    },
    {
      label: 'DÉPÔT',
      property: 'depotpv',
      type: 'image',
      visible: true
    },
    {
      label: 'NOM',
      property: 'nom',
      type: 'text',
      visible: true
    },
   
  
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<DemandeAlimentation>;
  selection = new SelectionModel<DemandeAlimentation>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, 
    private  serviceHttp:DemandeAlimentationStockHttpService,
     private dialog: MatDialog,
      private router:Router) {
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  getDateFormat(date:Date){
    return getDateByForma(date)
  }

  ngOnInit() {
    showLoading()
    this.serviceHttp.GetAll().subscribe((res:any) => {
      hideLoading()
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<DemandeAlimentation[]>(Boolean)).subscribe((products) => {
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

  createProduct() {
    this.router.navigate(["demande_alimentation/new"]);
  }

  updateProduct(product: DemandeAlimentation) {
    this.router.navigate(["demande_alimentation/edit/"+product._id]);
  }

  deleteProduct(item: DemandeAlimentation) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer " '+item.numero+' " ?')
    .then((result) => {
      if (result.isConfirmed) {
        this.products.splice(
          this.products.findIndex(
            (existingProduct) => existingProduct._id === item._id
          ),
          1
        );
        this.selection.deselect(item);
        this.subject$.next(this.products);

        this.serviceHttp.delete(item).subscribe((res:any) => {
          succesAlerteAvecTimer(res.MESSAGE);
        });

      } else {
        // User cancelled, handle accordingly
      }
    });
  }

  deleteProducts(products: DemandeAlimentation[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
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

  toggleColumnVisibility(column: TableColumn<DemandeAlimentation>, event: Event) {
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

