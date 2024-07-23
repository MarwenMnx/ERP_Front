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
import { PrixQteTable } from '../models/prixQte.model';
import { Router } from '@angular/router';
import { CodeBarreCreateUpdateComponent } from '../codebarre/codebarre-create-update.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { roundmMontantNumber, roundmMontantString, roundmQuantiteString, showAlertError } from 'src/app/global-functions';



@Component({
  selector: 'vex-promotionremise',
  templateUrl: './promotionremise.component.html',
  styleUrls: ['./promotionremise.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
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
export class PromotionremiseComponent {
  layoutCtrl = new UntypedFormControl('boxed');

  static id = 100

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "prixQte"
  addChangeEvent() {
    
    for(let i = 1; i < this.listItems.length; i++){
      if(Number(this.listItems[i-1].qteMin) > Number(this.listItems[i].qteMin) && Number(this.listItems[i].qteMin) != 0){
        showAlertError('Erreur!', "L'ordre de tableau est changeé.");
        this.listItems.sort((a, b) => a.qteMin - b.qteMin);
      }
    }

    for(let i = 1; i < this.listItems.length; i++){
      this.listItems[i-1].qteMax = this.listItems[i].qteMin
      this.listItems[i].qteMax = 0
    }

    if(this.listItems.length > 0) this.listItems[this.listItems.length - 1].qteMax = 0

    this.subject$.next(this.listItems);
    this.newItemEvent.emit([this.keyOfForm, this.listItems]);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.listItems);
    }catch(e){}
  }

  @Input() article!:Product

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<PrixQteTable[]> = new ReplaySubject<PrixQteTable[]>(1);
  data$: Observable<PrixQteTable[]> = this.subject$.asObservable();
  @Input() listItems: PrixQteTable[] = [];

  @Input()
  columns: TableColumn<PrixQteTable>[] = [
    {
      label: 'Quantité (>=)',
      property: 'qteMin',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Quantité (<)',
      property: 'qteMax',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Prix HT',
      property: 'prixHT',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Prix TTC',
      property: 'prixTTC',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },

    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  getRoundQuantiteString(prix:number){
    return roundmQuantiteString(prix)
  }

  getRoundMontantString(prix:number){
    return roundmMontantString(prix)
  }

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<PrixQteTable>;
  selection = new SelectionModel<PrixQteTable>(true, []);
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

    this.data$.pipe(filter<PrixQteTable[]>(Boolean)).subscribe((listItems) => {
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

    /*if (this.sort) {
      this.dataSource.sort = this.sort;
    }*/
  }

  create() {
    //this.listItems.unshift(new PrixQteTable());
    this.listItems.push(new PrixQteTable(
      {_id: PromotionremiseComponent.id+++"",
       prixHT:this.article.prixVenteHT,
       prixTTC:this.article.prixTTC
      }));
    this.subject$.next(this.listItems);
    this.addChangeEvent()
  }

  delete(item: PrixQteTable) {
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

  deleteItems(listItems: PrixQteTable[]) {
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

  toggleColumnVisibility(column: TableColumn<PrixQteTable>, event: Event) {
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

  /*onLabelChange(change: MatSelectChange, row: PrixQteTable) {
    const index = this.listItems.findIndex((c) => c === row);
    this.listItems[index].labels = change.value;
    this.subject$.next(this.products);
  }*/

  changeMontantTTC(row:any){
    let index = this.listItems.findIndex(item => item._id === row._id);
    if(this.article.prixVenteHT){
      let prixTTCSansTVA = roundmMontantNumber(this.listItems[index].prixTTC) - roundmMontantNumber(this.article.redevance)
      this.listItems[index].prixHT = roundmMontantNumber(roundmMontantNumber(prixTTCSansTVA) * 100 / (Number(this.article.tauxTVA) + 100))
      this.subject$.next(this.listItems);
    }
  }

  changeMontantHT(row:any){
    let index = this.listItems.findIndex(item => item._id === row._id);
    if(this.article.prixVenteHT){
      let montantTVAVente = roundmMontantNumber(this.listItems[index].prixHT * this.article.tauxTVA / 100)
      this.listItems[index].prixTTC = roundmMontantNumber(roundmMontantNumber(montantTVAVente) + roundmMontantNumber(this.article.prixVenteHT) + roundmMontantNumber(this.article.redevance))
      this.subject$.next(this.listItems);
    }
  }

  changeQteMin(_id:any){
    /*let index = this.listItems.findIndex(item => item._id === _id);
    if(index > 0){
      this.listItems[index-1].qteMax = Number(this.listItems[index].qteMin)
      this.subject$.next(this.listItems);
    }*/
  }

  selectedId = ""
  selecteRow(_id:any){
    this.selectedId = _id
    console.log(this.selectedId)
  }

}
