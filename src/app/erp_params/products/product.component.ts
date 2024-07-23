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
import { Product } from './models/product.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../static-data/aio-table-data';
import { ProductCreateUpdateComponent } from './product-create-update/product-create-update.component';
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
import { DocumentsComponent } from './documents/documents.component';
import { Router } from '@angular/router';
import { ProductHttpServiceService } from './services/product-http-service.service';
import { RouterLink } from '@angular/router';
import { hideLoading, roundmMontantString, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { UtilService } from 'src/app/utils/UtilService.service';
import { IndexedDbService } from 'src/app/utils/indexedDB_PWA/indexeddb.service';
import { enum_colonnes_list } from 'src/app/global-enums';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';

@Component({
  selector: 'vex-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
    DocumentsComponent,
  ]
})
export class ProductComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);
  data$: Observable<Product[]> = this.subject$.asObservable();
  products: Product[] = [];

  @Input()
  columns: TableColumn<Product>[] = [
    {
      label: 'RÉFÉRENCE',
      property: 'reference',
      type: 'text',
      visible: true
    },
    {
      label: 'CODEBARRE',
      property: 'codeBarre',
      type: 'text',
      visible: true
    },
    {
      label: 'DÉSIGNATION',
      property: 'designation',
      type: 'text',
      visible: true
    },
    {
      label: 'Categorie',
      property: 'categorieLibelle',
      type: 'text',
      visible: true
    },
    {
      label: 'Famille',
      property: 'familleLibelle',
      type: 'text',
      visible: true
    },
    {
      label: 'SousFamille',
      property: 'sousFamilleLibelle',
      type: 'text',
      visible: true
    },
    {
      label: 'Marque',
      property: 'marqueLibelle',
      type: 'text',
      visible: true
    },
    {
      label: 'Modele',
      property: 'modeleLibelle',
      type: 'text',
      visible: true
    },
    {
      label: 'Unite1',
      property: 'unite1Libelle',
      type: 'text',
      visible: true
    },
    {
      label: 'Unite2',
      property: 'unite2Libelle',
      type: 'text',
      visible: true
    },
    {
      label: 'TYPE',
      property: 'typeArticle',
      type: 'text',
      visible: true
    },
    {
      label: 'QT.STOCK',
      property: 'qteEnStock',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'P_FOURNISSEUR',
      property: 'prixFourn',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'TVA',
      property: 'tauxTVA',
      type: 'text',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'P.A.HT',
      property: 'prixAchat',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'P.A.TTC',
      property: 'prixAchatTTC',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'P.V.HT',
      property: 'prixVenteHT',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"]
    },
    {
      label: 'P.V.TTC',
      property: 'prixTTC',
      type: 'image',
      visible: true,
      cssClasses: ["right-aligned-input"],
    },
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ]
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(public utilService:UtilService, 
    private serviceHttp:ProductHttpServiceService, 
    private dialog: MatDialog, private router:Router,
    private indexDB:IndexedDbService,
    public impressionPdfService:ImpressionPdfService
    ) {
     
      //columns
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getMontantRoundom(nbr:number){
    return roundmMontantString(nbr)
  }

  async ngOnInit() {
    
    showLoading()
    this.serviceHttp.GetAll().subscribe((res) => {
      hideLoading()
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Product[]>(Boolean)).subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  async ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    let colonnes:TableColumn<Product>[] = await this.indexDB.getIndexedDB(enum_colonnes_list.product) as TableColumn<Product>[]
    if(colonnes) this.columns = colonnes
  }

  createProduct() {
    this.router.navigate(['/products/new']);
  }

  updateProduct(product: Product) {
    this.router.navigate(['/products/edit/'+product._id]);
  }

  deleteProduct(product: Product) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer " '+product.reference+' " ?')
    .then((result) => {
      if (result.isConfirmed) {
        this.products.splice(
          this.products.findIndex(
            (existingProduct) => existingProduct._id === product._id
          ),
          1
        );
        this.selection.deselect(product);
        this.subject$.next(this.products);

        this.serviceHttp.delete(product._id).subscribe((res) => {
          succesAlerteAvecTimer(res.MESSAGE);
        });

      } else {
        // User cancelled, handle accordingly
      }
    });
  }

  deleteProducts(products: Product[]) {
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

  async toggleColumnVisibility(column: TableColumn<Product>, event: Event) {
    console.log(column);
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
    console.log(column);
    await this.indexDB.putIndexedDB(enum_colonnes_list.product, this.columns, 0)
  }

  async saveColumnVisibility() {
    console.log("column");
    await this.indexDB.putIndexedDB(enum_colonnes_list.product, this.columns, 0)
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
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Articles");
  }

  exportToPdf(): void {
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Articles");
  }
  
}

