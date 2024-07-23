import {Component, Inject, OnInit, SimpleChanges} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { Depot } from '../models/depot.model';
import { DepotService } from '../services/depot.service';
import { DepotHttpService } from '../services/depot-http.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { enum_typeDepotPV } from 'src/app/global-enums';
import {hideLoading, parseEnumToObject, showAlertError, showLoading} from 'src/app/global-functions';
import { MatSelectModule } from '@angular/material/select';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { UtilService } from 'src/app/utils/UtilService.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {ArticleDepotPvs} from "../../article-depotpvs/models/articleDepotPvs.model";
import {ArticlesDepotPvHttpService} from "../../article-depotpvs/services/articles-depot-pv-http.service";
import {ProductHttpServiceService} from "../../products/services/product-http-service.service";
import {Product} from "../../products/models/product.model";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {EmplacementTable} from "../../products/models/emplacement.model";
import {TokenService} from "../../../services/token.service";

export interface PeriodicElement {
  _id:          string;
  reference:    string;
  designation:  string;
  categorieLibelle:    string;
  article:ArticleDepotPvs
}

//const ELEMENT_DATA: PeriodicElement[] = [];
const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'vex-depot-create-update',
  templateUrl: './depot-create-update.component.html',
  styleUrls: ['./depot-create-update.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    StandartAutocompleteComponent,
    FiltreAutocompletSelectAllComponent,
    MatCheckboxModule,MatTableModule,
    MatSlideToggleModule,
  ]
})
export class DepotCreateUpdateComponent implements OnInit {
  //initialiser variable de type Depot pour contenir les données de getAllDepot
  dataDepot: Depot[] = [];
  labelTextBC = 'Dépôt/Point de Vente';
  selectedKeyDepot = '_id';
  selectedValDepot = 'libelle';
  preSelectedItems:any = ""

  selectedType: any = 1;

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required],
    responsable: [this.defaults?.responsable || '', Validators.required],
    telephone: [this.defaults?.telephone || '', Validators.required],
    email: [this.defaults?.email || '', Validators.required],
    type: [this.defaults?.type || '', Validators.required],
    notes: [this.defaults?.notes || '', Validators.required],
    est_actif: [this.defaults?.est_actif || true],
    //lignes:[this.defaults?.lignes]
  });

  type = new FormControl();
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Depot | undefined,
    private dialogRef: MatDialogRef<DepotCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttDepot: DepotHttpService,
    private service: DepotService,
    public utilService: UtilService,
    private articlesHttpService:ProductHttpServiceService,
    private articleDeopPvHttpService:ArticlesDepotPvHttpService,
    private tokenService:TokenService
  ) {}

  displayedColumns: string[] = ['select', 'reference', 'designation' , 'categorieLibelle' , 'enVenteDepot' ,'enVente'];
  dataSource      = new MatTableDataSource(ELEMENT_DATA);
  selection       = new SelectionModel<Product>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows     = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    //console.log("************SELECT ALLI***************masterToggle>>>> ")
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    //console.log("************checkboxLabel*************",row)
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedListFromFiltre: any;
  set_SelectedList(p_SelectedList: any) {
    this.selectedListFromFiltre = p_SelectedList;
  }

  //declarer une methode pour ajouter les depots cochés
  getDataDepot(items: any) {
    let newItems = [];
    for (let key of Object.keys(items)) {
      newItems.push(new Depot(items[key]));
    }
    return newItems;
  }

  Listtiers: any;
  ngOnInit() {
    //get all depot list form getallDepot service
    this.serviceHttDepot.GetAll().subscribe((res) => {
      this.dataDepot = this.getDataDepot(res.RESULTAT);
    });

    this.Listtiers = parseEnumToObject(enum_typeDepotPV);
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Depot;
    }

    this.preSelectedItems = this.defaults.ayant_acces

    this.selectedType = this.defaults.type;

    this.form.patchValue(this.defaults);

    this.articlesHttpService.GetAll().subscribe((res) => {

      this.articleDepotPvss = this.getDataArticleDepotPvss(res.RESULTAT) ;
      this.dataSource.data  = this.articleDepotPvss
      this.dataSource._updateChangeSubscription();
      if(this.isCreateMode() && this.defaults ){
        this.defaults.code_unique = this.tokenService.getCodePointeVente()
      }

      this.articleDeopPvHttpService.getAllArticlesByDepotPVCode(0,0,this.defaults?.code_unique).subscribe((res) => {
        let newItems:any = []
        for (let key of Object.keys(res.RESULTAT)){
          newItems.push({_id:res.RESULTAT[key].article._id , reference:res.RESULTAT[key].article.reference , designation:res.RESULTAT[key].article.designation ,
            categorieLibelle:res.RESULTAT[key].article.categorie.libelle ,
            enVente:res.RESULTAT[key].article.enVente , enVenteDepot:res.RESULTAT[key].article.enVente })

          this.articleDepotPvssEnVente.push(newItems)
          const selectedState =  this.articleDepotPvss.findIndex(state =>
            state._id.toLowerCase()==res.RESULTAT[key].article._id.toLowerCase());
          if (selectedState>-1) {
            this.articleDepotPvss[selectedState].enVenteDepot = true
            this.selection.select( this.articleDepotPvss[selectedState])
          }

        }

      });

    });

  }

  articleDepotPvssEnVente: any[]     = [];
  articleDepotPvss: any[]     = [];
  getDataArticleDepotPvss(items:any) {
    let newItems:any = []
    for (let key of Object.keys(items)){
      // newItems.push(new Product(items[key])) /// tombe sur error
      newItems.push({_id:items[key]._id , reference:items[key].reference , designation:items[key].designation ,
        categorieLibelle:items[key].categorie.libelle , enVente:items[key].enVente  , enVenteDepot: false })
    }
    return newItems
  }

  save() {
    if (!this.form.valid) {
      StandartAutocompleteService.submitFormAutocomplete();
      showAlertError(
        'Erreur!',
        'Veuillez remplir correctement tous les champs du formulaire.'
      );
      return;
    }

    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    showLoading()
    const item        = this.form.value as Depot;
    item.ayant_acces  = this.selectedListFromFiltre
    item.lignes       = this.selection["_selected"]
      this.serviceHttDepot.AddNew(item).subscribe((res) => {
        this.service.successCreate(res, this.dialogRef);
      });
    hideLoading()
  }

  update() {
    showLoading()
    const item: any   = this.form.value;
    item.ayant_acces  = this.selectedListFromFiltre
    item.lignes       = this.selection["_selected"]
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttDepot.update(item).subscribe((res) => {
      this.service.successUpdate(res, this.dialogRef);
    });
    hideLoading()
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  newItemEvent(event: any) {}

}
