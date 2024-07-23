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
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { getDateByForma, hideLoading, isObjectIdMongoose, roundmMontantString, showAlertError, showAlertInfoHTML, showAlertSucess, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from 'src/app/utils/filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { DocumentAchatHttpService } from 'src/app/erp_documents_achat/services/document-achat-http.service';
import { Depot } from '../depot/models/depot.model';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TokenService } from 'src/app/services/token.service';
import { DepotHttpService } from '../depot/services/depot-http.service';
import { ArticlesDepotPvHttpService } from '../article-depotpvs/services/articles-depot-pv-http.service';
import { SharedModule } from 'src/app/utils/shared.module';
import { ArticleDepotPvs } from '../article-depotpvs/models/articleDepotPvs.model';
import { QuantiteInitial, QuantiteInitialLigne } from './models/quantiteInitiale.model'
import { ExerciceHttpService } from '../exercices/services/exercice-http.service'
import { Excercice } from '../exercices/models/exercice.model';
import { QuantiteInitialHttpService } from './services/quantite-initial-http.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UtilService } from 'src/app/utils/UtilService.service';

@Component({
  selector: 'vex-quantite-initiale',
  templateUrl: './quantite-initiale.component.html',
  styleUrls: ['./quantite-initiale.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    SharedModule,
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
    StandartAutocompleteComponent,
    MatDatepickerModule
  ],
  providers:
  [
     { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
   // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class QuantiteInitialeComponent {
  layoutCtrl = new UntypedFormControl('boxed');

  subject$: ReplaySubject<QuantiteInitialLigne[]> = new ReplaySubject<QuantiteInitialLigne[]>(1);
  data$: Observable<QuantiteInitialLigne[]> = this.subject$.asObservable();
  products: QuantiteInitialLigne[] = [];

  @Input()
  columns: TableColumn<QuantiteInitialLigne>[] = [
    {
      label: 'Référence',
      property: 'reference',
      type: 'text',
      visible: true
    },
    {
      label: 'Designation',
      property: 'designation',
      type: 'text',
      visible: true
    },
    {
      label: 'Categorie',
      property: 'categorie',
      type: 'text',
      visible: true
    },
    {
      label: 'Famille',
      property: 'famille',
      type: 'text',
      visible: true
    },
    {
      label: 'Sous famille',
      property: 'sousFamille',
      type: 'text',
      visible: true
    },
    {
      label: 'Quantite',
      property: 'quantite_initial',
      type: 'text',
      visible: true
    },
  ]
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<QuantiteInitialLigne>;
  selection = new SelectionModel<QuantiteInitialLigne>(true, []);
  searchCtrl = new UntypedFormControl();
  labels = aioTableLabels;

  allDepots:Depot[] = []
  depotSelected:Depot | undefined

  allExercices:Excercice[] = []

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  quantiteInitial:QuantiteInitial = new QuantiteInitial()
  oldQuantiteInitial:QuantiteInitial = new QuantiteInitial()

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, 
    private serviceHttp:QuantiteInitialHttpService, 
    private dialog: MatDialog, 
    private router:Router,
    private tokenService:TokenService,
    private serviceHttDepot: DepotHttpService,
    private articlesDepotPvHttpService:ArticlesDepotPvHttpService,
    private exerciceServiceHttp:ExerciceHttpService, 
    public utileService:UtilService
  ) {
  }
  
  newItemEventDepot(newValue:any){
    this.depotSelected = newValue[1]
    this.quantiteInitial = new QuantiteInitial()
    this.subject$.next(this.quantiteInitial?.quantiteArticles);
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getMontantRoundom(nbr:number){
    return roundmMontantString(nbr)
  }

  getDateFormat(date:Date){
    return getDateByForma(date)
  }

  ngOnInit() {
    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.allDepots = this.serviceHttDepot.getData(res.RESULTAT);
    });
    
    this.exerciceServiceHttp.GetAll().subscribe((res) => {
      this.allExercices = this.exerciceServiceHttp.getData(res.RESULTAT);
    });

    this.dataSource = new MatTableDataSource();

    this.subject$.subscribe((data: QuantiteInitialLigne[]) => {
      this.products = data;
      this.dataSource.data = data;
    });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  clickBloquerImportation(){
    if(!this.quantiteInitial.bloquerImportation){
      this.oldQuantiteInitial.bloquerImportation = false
    }
  }

  importQuantiteInitial(){
    if(!this.depotSelected) {
      this.alertDepotRequired()
      return
    }

    showLoading()
    this.serviceHttp.GetAll(this.depotSelected).subscribe((res) => {
      hideLoading()
      let items = this.serviceHttp.getData(res.RESULTAT)

      if(items && items.length > 0){
        this.quantiteInitial = new QuantiteInitial(items[0])
        this.oldQuantiteInitial = new QuantiteInitial(items[0])
        let lignes:QuantiteInitialLigne[] = []
        this.quantiteInitial?.quantiteArticles.forEach( (res:QuantiteInitialLigne) => {
          lignes.push(new QuantiteInitialLigne(res))
        }) 
        this.subject$.next(lignes);
      }else{
        this.quantiteInitial = new QuantiteInitial()
        this.subject$.next(this.quantiteInitial?.quantiteArticles);
      }
    });
  }

  saveQuantiteInitial(){
    if(!isObjectIdMongoose(this.quantiteInitial?._id)){
      this.newQuantiteInitial() 
    }else{
      this.putQuantiteInitial()
    }
  }
  

  newQuantiteInitial(){
    if(!this.depotSelected) {
      this.alertDepotRequired()
      return
    }

    this.quantiteInitial!.quantiteArticles = this.products

    showLoading()
    this.serviceHttp.AddNew(this.depotSelected, this.quantiteInitial).subscribe((res) => {
      this.responseSave(res)
    });
  }

  putQuantiteInitial(){
    if(!this.depotSelected) {
      this.alertDepotRequired()
      return
    }

    this.quantiteInitial!.quantiteArticles = this.products

    showLoading()
    this.serviceHttp.update(this.depotSelected, this.quantiteInitial).subscribe((res) => {
      this.responseSave(res)
    });
  }

  responseSave(res:any){
    if(res.OK){
      this.oldQuantiteInitial = new QuantiteInitial(res.RESULTAT)
      this.quantiteInitial = new QuantiteInitial(res.RESULTAT)
      succesAlerteAvecTimer('Vos quantités ont été soumises avec succès.')
    }else{
      this.tokenService.handleErrorWithParams(res)
    }
  }

  alertDepotRequired(){
    showAlertError('Erreur', 'On ne peut pas trouver le dépôt.')
  }

  importExercicePrecedent(){
    if(!this.depotSelected) {
      this.alertDepotRequired()
      return
    }

    let exercicePrecedent = Number(this.tokenService.exerciceCourante?.annee_exercice) - 1
    if(!exercicePrecedent) {
      showAlertError('Erreur', 'On ne peut pas trouver l\'exercice courant.')
      return
    }
    let exercice = this.allExercices.find(res => res.annee_exercice == exercicePrecedent+"")
    if(!exercice){
      showAlertInfoHTML('Information', 'Pas de données à importer de l\'exercice précédent.')
      return
    }
    this.downloadQuantitesEnStock(exercice)
  }

  downloadQuantitesEnStock(exercice:Excercice){
    showLoading()
    this.articlesDepotPvHttpService.getAllArticlesByDepotPVPourDocumentAchat(undefined, undefined, this.depotSelected, exercice).subscribe((res) => {
      hideLoading()
      let articles = this.articlesDepotPvHttpService.getDataArticleDepotPvss(res.RESULTAT)
      let quantitesInitialLignes:QuantiteInitialLigne[] = []
      
      articles.forEach( (res:ArticleDepotPvs) => {
        quantitesInitialLignes.push(new QuantiteInitialLigne({
          _id:undefined,
          quantite_initial: res.quantite, 
          article:{
            _id: res.article._id,
            reference: res.article.reference,
            codeBarre: res.article.codeBarre,
            designation: res.article.designation,
            categorie: res.article.categorie,
            famille: res.article.famille,
            sousFamille: res.article.sousFamille,
          }
        }))
      }) 
      this.quantiteInitial = new QuantiteInitial()
      this.quantiteInitial._id = undefined
      this.quantiteInitial.utilisateur = {_id:this.tokenService.user?._id, nom:this.tokenService.user?.nom}
      this.quantiteInitial.quantiteArticles = quantitesInitialLignes
      this.quantiteInitial.code_societe = this.tokenService.getCodeSociete(),
      this.quantiteInitial.code_exercice = this.tokenService.exerciceCourante?.code_unique,
      this.quantiteInitial.code_depotpv = this.depotSelected?.code_unique
      this.quantiteInitial.dateImportation = new Date()
      this.subject$.next(quantitesInitialLignes);
    });
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
  }

  updateProduct(product: QuantiteInitial) {
  }

  deleteProduct(item: QuantiteInitial) {
  }

  deleteProducts(products: QuantiteInitial[]) {
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

  toggleColumnVisibility(column: TableColumn<QuantiteInitial>, event: Event) {
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
