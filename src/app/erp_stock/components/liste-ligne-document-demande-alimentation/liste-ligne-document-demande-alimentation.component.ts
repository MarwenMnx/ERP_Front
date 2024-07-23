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
  
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
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
  import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
  import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
  import { DocumentCasse, LigneDocumentCasse } from '../../boncasse/modeles/boncasse.model';
  import { LigneDocumentCasseService } from '../../services/ligne-document-casse.service';
  import { roundmQuantiteString } from 'src/app/global-functions';
  import { UtilService } from 'src/app/utils/UtilService.service';
import { DemandeAlimentation, LigneDocumentDemandeAlimentation } from '../../demande-alimentation-stock/models/demande_alimentation_stock.model';
import { LigneDocumentDemandeAlimentationService } from '../../services/ligne-document-demande-alimentation.service';
  
  @Component({
    selector: 'vex-liste-ligne-document-demande-alimentation',
    templateUrl: './liste-ligne-document-demande-alimentation.component.html',
    styleUrls: ['./liste-ligne-document-demande-alimentation.component.scss'],
    standalone: true,
    animations: [fadeInUp400ms, stagger40ms],
    imports: [  
        ListeLigneDocumentDemandeAlimentationComponent,
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
    ],
  })
  export class ListeLigneDocumentDemandeAlimentationComponent {
    dataSource!: MatTableDataSource<LigneDocumentDemandeAlimentation>;
  
    layoutCtrl = new UntypedFormControl('boxed');
  
    /**
     * Simulating a service with HTTP that returns Observables
     * You probably want to remove this and do all requests in a service with HTTP
     */
    subject$: ReplaySubject<LigneDocumentDemandeAlimentation[]> = new ReplaySubject<LigneDocumentDemandeAlimentation[]>(1);
    data$: Observable<LigneDocumentDemandeAlimentation[]> = this.subject$.asObservable();
    @Input() lignes:LigneDocumentDemandeAlimentation[] = []
    @Input() documentOriginal!:DemandeAlimentation
    @Input() allArticles:ArticleDepotPvs[] = []
  
    @Output() newItemEvent = new EventEmitter<[string, Object]>();
    keyOfForm:string = "lignes"
    addChangeEvent() {
      this.newItemEvent.emit([this.keyOfForm, this.lignes]);
    }
  
    ngOnChanges(changes: SimpleChanges) {
      try{
        this.dataSource.data = this.lignes;
        this.subject$.next(this.lignes);
      }catch(e){}
    }
  
    columns: TableColumn<LigneDocumentDemandeAlimentation>[] = [
     
      {
        label: 'NUMÉRO',
        property: 'numero',
        type: 'text',
        visible: true,
        cssClasses: ['font-medium', 'text']
      },
      {
        label: 'RÉFÉRENCE ',
        property: 'reference',
        type: 'image',
        visible: true,
        cssClasses: ['font-medium', 'text']
      },
      {
        label: 'DÉSIGNATION',
        property: 'designation',
        type: 'image',
        visible: true,
        cssClasses: ['font-medium', 'text']
      },
      {
        label: 'QUANTITÉ',
        property: 'quantiteUnite1',
        type: 'image',
        visible: true,
        cssClasses: ['font-medium']
      },
      {
        label: 'UNITÉ',
        property: 'unite1',
        type: 'image',
        visible: true,
        cssClasses: ['font-medium']
      },
  
      {
        label: 'MOTIF',
        property: 'notes',
        type: 'image',
        visible: true,
        cssClasses: ['font-medium']
      },
     { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  
    ];
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    //dataSource!: MatTableDataSource<LigneDocumentVente>;
    selection = new SelectionModel<LigneDocumentDemandeAlimentation>(true, []);
    searchCtrl = new UntypedFormControl();
  
    @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort?: MatSort;
  
    private readonly destroyRef: DestroyRef = inject(DestroyRef);
  
    constructor(private dialog: MatDialog, 
      private ligneDocumentDemandeAlimentationService:LigneDocumentDemandeAlimentationService,
      private service:ProductServiceService,
      public utilService:UtilService ) {
        utilService.roundmQuantiteString
      }
  
    get visibleColumns() {
      return this.columns
        .filter((column) => column.visible)
        .map((column) => column.property);
    }
  
    static _id=1
     ngOnInit() {
      this.dataSource = new MatTableDataSource();
      //mettre un ligne dans le table
      this.data$.pipe(filter<LigneDocumentDemandeAlimentation[]>(Boolean)).subscribe((lignes) => {
        this.lignes = lignes;
        this.dataSource.data = lignes;
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
  
    createEmplacementTable() {
    
    }
  
    getTextQuantites(qte:number){
      return roundmQuantiteString(qte)
    }
  
    updateEmplacementTable(product: LigneDocumentDemandeAlimentation) {
  
    }
  
    deleteProduct(item: LigneDocumentDemandeAlimentation) {
      this.lignes.splice(
        this.lignes.findIndex(
          (existingItem) => existingItem._id === item._id
        ),
        1
      );
      this.selection.deselect(item);
      this.subject$.next(this.lignes);
      this.addChangeEvent()
    }
  
  
    deleteProducts(lignes: LigneDocumentDemandeAlimentation[]) {
      lignes.forEach((c) => this.deleteProduct(c));
    }
  
    onFilterChange(value: string) {
      if (!this.dataSource) {
        return;
      }
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
    }
  
    toggleColumnVisibility(column: TableColumn<LigneDocumentDemandeAlimentation>, event: Event) {
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
  
  
    changeQuantite1(item: LigneDocumentDemandeAlimentation){
      item = this.ligneDocumentDemandeAlimentationService.changeQuantite1(item)
      this.changeTotals(item)
      this.checkQuantite(item)
    }
  
    changeQuantite2(item: LigneDocumentDemandeAlimentation){
      item = this.ligneDocumentDemandeAlimentationService.changeQuantite2(item)
      this.changeTotals(item)
      this.checkQuantite(item)
    }
  
    changeTotals(item: LigneDocumentDemandeAlimentation){
      if(item.isQte1 == true){
        item = this.ligneDocumentDemandeAlimentationService.changeTotals(item)
      }else{
        item = this.ligneDocumentDemandeAlimentationService.changeTotals(item, true)
      }
    }
  
    checkQuantite(item:LigneDocumentDemandeAlimentation){
      return this.ligneDocumentDemandeAlimentationService.checkQuantiteIsValide(this.documentOriginal, this.lignes, this.allArticles, undefined, item)
    }
  
  
  }
  
  