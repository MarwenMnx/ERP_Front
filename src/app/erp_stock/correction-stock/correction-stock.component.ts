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
import { aioTableDataCorrection } from 'src/static-data/aio-table-data';
import { CorrectionStockCreateUpdateComponent } from './correction-stock-create-update/correction-stock-create-update.component';
import { DocumentCorrectionStock } from './models/correction-stock.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrectionStockHttpService } from './services/correction-stock-http.service';
import { hideLoading, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ImpressionPdfService } from 'src/app/impression/impression-pdf.service';


@Component({
  selector: 'vex-correction-stock',
  templateUrl: './correction-stock.component.html',
  styleUrls: ['./correction-stock.component.scss'],
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
export class CorrectionStockComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<DocumentCorrectionStock[]> = new ReplaySubject<DocumentCorrectionStock[]>(1);
  data$: Observable<DocumentCorrectionStock[]> = this.subject$.asObservable();
  correctionStocks: DocumentCorrectionStock[] = [];

  @Input()
  columns: TableColumn<DocumentCorrectionStock>[] = [

    // { label: 'Image', property: 'image', type: 'image', visible: true },
    {
      label: 'NUMÉRO',
      property: 'numero',
      type: 'text',
      visible: true
    },
    {
      label: 'DATE',
      property: 'dateString',
      type: 'text',
      visible: true
    },

    { label: 'UTILISATEUR',
     property: 'utilisateurNom',
     type: 'text',
     visible: true
    },
    {
      label: 'NOTES',
      property: 'Notes',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<DocumentCorrectionStock>;
  selection = new SelectionModel<DocumentCorrectionStock>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableDataCorrection;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public impressionPdfService: ImpressionPdfService,
    public utileService:UtilService,
    private route: ActivatedRoute, 
    private  serviceHttp:CorrectionStockHttpService,
    private router:Router) {
  }
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
    return of(aioTableDataCorrection.map((correctionStock) => new DocumentCorrectionStock(correctionStock)));
  }

  ngOnInit() {
    showLoading()
    this.serviceHttp.GetAll().subscribe((res:any) => {
      hideLoading()
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<DocumentCorrectionStock[]>(Boolean)).subscribe((correctionStocks) => {
      this.correctionStocks = correctionStocks;
      this.dataSource.data = correctionStocks;
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

  createCorrectionStock() {
    this.router.navigate(["correction-stock/new"]);
  }

  updateCorrectionStock(correctionStock: DocumentCorrectionStock) {
    this.router.navigate(["correction-stock/edit/"+correctionStock._id]);
  }

  deleteCorrectionStock(correctionStock: DocumentCorrectionStock) {
    showConfirmationDialog('Suppression', 'Êtes-vous sûr de vouloir supprimer " '+correctionStock.numero+' " ?')
    .then((result) => {
      if (result.isConfirmed) {
        this.correctionStocks.splice(
          this.correctionStocks.findIndex(
            (existingCorrectionStock) => existingCorrectionStock._id === correctionStock._id
          ),
          1
        );
        this.selection.deselect(correctionStock);
        this.subject$.next(this.correctionStocks);
        showLoading()
        this.serviceHttp.delete(correctionStock).subscribe((res:any) => {
          succesAlerteAvecTimer(res.MESSAGE);
        });

      } else {
        // User cancelled, handle accordingly
      }
    });
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    
  }

  deleteCorrectionStocks(correctionStocks: DocumentCorrectionStock[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    correctionStocks.forEach((c) => this.deleteCorrectionStock(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<DocumentCorrectionStock>, event: Event) {
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

  @ViewChild('TABLE') table!: ElementRef;
 
  ExportTOExcel(){
    this.impressionPdfService.ExportTOExcel(this.table, this.columns, "Liste Correction Stock");
  }

  exportToPdf(): void {
    this.impressionPdfService.exportToPdf(this.table, this.columns, "Liste Correction Stock");
  }

}