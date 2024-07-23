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
import { EmplacementTable } from '../models/emplacement.model';
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
import { CodeBarreCreateUpdateComponent } from './codebarre-create-update.component';
import { CodeBarreTable } from '../models/codeBarre.model';
import { Router } from '@angular/router';



@Component({
  selector: 'vex-codebarre',
  templateUrl: './codebarre.component.html',
  styleUrls: ['./codebarre.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [  
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
export class CodebarreComponent implements OnChanges {

  layoutCtrl = new UntypedFormControl('boxed');

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "colisage"
  addChangeEvent() {
    this.newItemEvent.emit([this.keyOfForm, this.listItems]);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.listItems);
    }catch(e){}
  }

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<CodeBarreTable[]> = new ReplaySubject<CodeBarreTable[]>(1);
  data$: Observable<CodeBarreTable[]> = this.subject$.asObservable();
  @Input() listItems: CodeBarreTable[] = [];

  @Input()
  columns: TableColumn<CodeBarreTable>[] = [
    {
      label: 'Libelle',
      property: 'libelleColi',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Code',
      property: 'codeBarreColi',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<CodeBarreTable>;
  selection = new SelectionModel<CodeBarreTable>(true, []);
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  
  constructor(private dialog: MatDialog, private router:Router) {}
  
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }


  ngOnInit() {

    /*this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });*/

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<CodeBarreTable[]>(Boolean)).subscribe((listItems) => {
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
    .open(CodeBarreCreateUpdateComponent, {})
    .afterClosed()
    .subscribe((item: CodeBarreTable) => {
      if (item) {
        this.listItems.unshift(new CodeBarreTable(item));
        this.subject$.next(this.listItems);
        this.addChangeEvent()
      }
    });
  }

  update(item: CodeBarreTable) {
    this.dialog
    .open(CodeBarreCreateUpdateComponent, {
      data: item,
    })
    .afterClosed()
    .subscribe((updatedItem) => {
      if (updatedItem) {
        const index = this.listItems.findIndex(
          (existingItem) => existingItem._id === updatedItem._id
        );
        this.listItems[index] = new CodeBarreTable(updatedItem);
        this.subject$.next(this.listItems);
        this.addChangeEvent()
      }
    });
  }

  delete(item: CodeBarreTable) {
    this.listItems.splice(
      this.listItems.findIndex(
        (existingItem) => existingItem._id === item._id
      ),
      1
    );
    this.selection.deselect(item);
    this.subject$.next(this.listItems);
    this.addChangeEvent()
  }

  deleteItems(listItems: CodeBarreTable[]) {
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

  toggleColumnVisibility(column: TableColumn<CodeBarreTable>, event: Event) {
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

  /*onLabelChange(change: MatSelectChange, row: CodeBarreTable) {
    const index = this.listItems.findIndex((c) => c === row);
    this.listItems[index].labels = change.value;
    this.subject$.next(this.products);
  }*/
}




