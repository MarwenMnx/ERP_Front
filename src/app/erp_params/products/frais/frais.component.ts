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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { DocumentsComponent } from '../documents/documents.component';

import { composantsTableData } from '../data/composants-table-data';
import { FraisTable } from '../models/frais.model';
import { depotsTableData } from '../data/depots-table-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { FideliteComponent } from '../fidelite/fidelite.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Output, EventEmitter } from '@angular/core';
import { SharedModule } from 'src/app/utils/shared.module';
import { hideLoading, roundmMontantNumber, roundmTauxNumber, roundmTauxString, showLoading } from 'src/app/global-functions';
import { ProductHttpServiceService } from '../services/product-http-service.service';



@Component({
  selector: 'vex-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [  
    SharedModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    ReactiveFormsModule,
    NgFor,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AsyncPipe,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    CommonModule,
    FideliteComponent,
    DocumentsComponent,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    VexHighlightDirective,
    AsyncPipe,
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
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    DocumentsComponent
  ],
})
export class FraisComponent {

  dataSource!: MatTableDataSource<FraisTable>;

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<FraisTable[]> = new ReplaySubject<FraisTable[]>(1);
  data$: Observable<FraisTable[]> = this.subject$.asObservable();
  @Input() frais:FraisTable[] = []
 
  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "frais"
  addChangeEvent() {
    this.newItemEvent.emit([this.keyOfForm, this.frais]);
  }
  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.frais);
    }catch(e){}
  }

  columns: TableColumn<FraisTable>[] = [
    {
      label: 'frais',
      property: 'fraisLibelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'montantHT',
      property: 'montantHT',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'tauxTVA',
      property: 'tauxTVA',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'montantTTC',
      property: 'montantTTC',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  //dataSource!: MatTableDataSource<FraisTable>;
  selection = new SelectionModel<FraisTable>(true, []);
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

    this.data$.pipe(filter<FraisTable[]>(Boolean)).subscribe((frais) => {
      this.frais = frais;
      this.dataSource.data = frais;
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

  getTextTauxTVA(taux:number){
    return roundmTauxString(taux)
  }

  createEmplacementTable() {
  
  }

  updateEmplacementTable(product: FraisTable) {

  }

  deleteProduct(product: FraisTable) {

  }

  changeMontantHT(item:FraisTable){
    let montantTVAVente = roundmMontantNumber(item.montantHT * item.tauxTVA / 100)
    item.montantTTC = roundmMontantNumber(roundmMontantNumber(montantTVAVente) + roundmMontantNumber(item.montantHT))
  }

  changeMontantTTC(item:FraisTable){
    item.montantHT = roundmMontantNumber(roundmMontantNumber(item.montantTTC) * 100 / (Number(item.tauxTVA) + 100))
    this.changeMontantHT(item)
  }

  deleteProducts(frais: FraisTable[]) {
    frais.forEach((c) => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<FraisTable>, event: Event) {
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

