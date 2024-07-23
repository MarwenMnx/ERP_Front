import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
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
import { NgIf } from '@angular/common';
import { ParametrageImportationHttpServiceService } from './services/parametrage-importation-http-service.service';
import { ParametrageImportationServiceService } from './services/parametrage-importation-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {ArticlesDepotPvHttpService} from "../article-depotpvs/services/articles-depot-pv-http.service";
import {ArticleDepotPvs} from "../article-depotpvs/models/articleDepotPvs.model";
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { CommonModule, AsyncPipe, NgFor} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../products/models/product.model';
import { Client } from '../clients/models/client.model';
import { Fournisseur } from '../fournisseurs/models/fournisseur.model';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { enum_nomTable } from 'src/app/global-enums';
import { getData, hideLoading, isObjectIdMongoose, showAlertError, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { TokenService } from 'src/app/services/token.service';
import { IChampParametreImportation, ParametreImportation } from './models/parametrage-importation.model';


const ELEMENT_DATA: IChampParametreImportation[] = [];

const ELEMENT_DATA_SELECTED: IChampParametreImportation[] = [];

@Component({
  selector: 'vex-parametrage-importation',
  templateUrl: './parametrage-importation.component.html',
  styleUrls: ['./parametrage-importation.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    NgFor,
    MatOptionModule, 
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,MatCheckboxModule,MatTableModule,
    VexBreadcrumbsComponent,
    VexSecondaryToolbarComponent,
    CdkDropList, 
    CdkDrag
  ]
})
export class ParametrageImportationComponent {
  defaults: ParametreImportation = new ParametreImportation()
  form:FormGroup = this.fb.group({
    _id: [''],
    //libelle: [''],
    table: ['', Validators.required],
    champs: [null], 
    code_societe: this.tokenService.getCodeSociete()
  });

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  mode: 'create' | 'update' = 'create';

  async getDetails():Promise<ParametreImportation> {
    return new Promise((resolve) => {
      this.serviceHttp.getDetails(this.form.value).subscribe((res) => {
        if(res.OK){
          hideLoading()
          resolve(res.RESULTAT)
        }else{
          showAlertError(res.MESSAGE, res.RESULTAT)
          resolve(new ParametreImportation(null))
        }
      },(err) => {
        //showAlertError("Erreur", "")
        resolve(new ParametreImportation(null))
      });
    });
  }

  champsRequirement:string[] = []
  champsNotDisplayed:string[] = []

  async changeParametre(){
    let items:IChampParametreImportation[] = []
    let item:any = {}

    switch (this.form.value.table) {
      case enum_nomTable.K_articles:
        item = new Product()
        this.champsRequirement = ['margeAppliqueeSur', 'reference', 'designation', 'categorie', 'typeArticle', 'unite1', 'prixFourn', 'prixAchat', 'prixVenteHT']
        this.champsNotDisplayed = ['modeleLibelle', 'unite2Libelle', 'marqueLibelle', 'unite1Libelle', 'categorieLibelle', 'familleLibelle', 'sousFamilleLibelle']
        break;
      case enum_nomTable.K_clients:
        item = new Client()
        this.champsRequirement = ['raisonSociale']
        this.champsNotDisplayed =  ['code_societe']
        break;
      case enum_nomTable.K_fournisseurs:
        item = new Fournisseur()
        this.champsRequirement = ['raisonSociale']
        this.champsNotDisplayed =  ['code_societe']
        break;
      default:
        // Code to execute if libelle doesn't match any case
    }
    delete item["_id"]
    const objArray = Object.keys(item)
    for(let key of objArray){
      items.push({nom:key, ordre:1})
    }

    this.dataSource.data = items
    this.dataSource._updateChangeSubscription();
    showLoading()
    this.defaults = await this.getDetails()

    if (isObjectIdMongoose(this.defaults._id)) {
      this.mode = 'update';
      this.form.patchValue({champs:this.defaults.champs, _id:this.defaults._id});
    }else{
      this.defaults = new ParametreImportation() 
      this.form.patchValue({champs:[], _id:""});
    }
    this.dataSource_CHAMP.data = this.defaults ? this.defaults.champs : []
    this.dataSource_CHAMP._updateChangeSubscription();
    
    let champs:IChampParametreImportation[] = []
    for(let item of this.dataSource.data){
      let champ:IChampParametreImportation | undefined = this.defaults.champs.find(x => x.nom == item.nom)
      if(!champ){
        champs.push(item)
      }
    }
    this.dataSource.data = champs
    this.dataSource._updateChangeSubscription();

    this.checkChamps()
  }

  checkChamps(){
    let champs = this.dataSource.data
    let champsOld = this.dataSource.data
    let champsNew = this.dataSource_CHAMP.data
    champs.forEach(x => {
      if(this.champsRequirement.indexOf(x.nom) > -1){
        champsNew.push(x)
        champsOld = champsOld.filter(item => item.nom !== x.nom);
      }

      if(this.champsNotDisplayed.indexOf(x.nom) > -1){
        champsOld = champsOld.filter(item => item.nom !== x.nom);
      }
    })

    
    this.dataSource_CHAMP.data = champsNew
    this.dataSource_CHAMP._updateChangeSubscription();

    this.dataSource.data = champsOld
    this.dataSource._updateChangeSubscription()

    this.renisialiserOrdreOfData()

  }

  constructor(
     private fb: FormBuilder,
    private serviceHttp:ParametrageImportationHttpServiceService,
    private service:ParametrageImportationServiceService,
    private tokenService:TokenService
  ) {}

  displayedColumnsInit: string[] = ['select', 'libelle'];

  displayedColumns: string[] = ['select', 'libelle', 'ordre'];
  dataSource      = new MatTableDataSource(ELEMENT_DATA);
  dataSource_CHAMP = new MatTableDataSource(ELEMENT_DATA_SELECTED);
  selection       = new SelectionModel<IChampParametreImportation>(true, []);
  selection_CHAMP  = new SelectionModel<IChampParametreImportation>(true, []);

  set_parametres_to_init(){
    this.selection_CHAMP['_selected'].forEach((item:any, index:any) => {
      this.dataSource.data.push(item)
      //const indexArr =   this.dataSource_CHAMP.data.findIndex((itemA:any) => itemA._id === item._id);
      //this.dataSource_CHAMP.data.splice(indexArr, 1);
      this.dataSource_CHAMP.data = this.dataSource_CHAMP.data.filter(x => x.nom !== item.nom)
    });
    this.selection_CHAMP.clear()
    this.dataSource_CHAMP._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();
    this.renisialiserOrdreOfData()
    this.checkChamps()
  }

  set_init_to_parametres(){
    this.selection['_selected'].forEach((item:any, index:any) => {

      this.dataSource_CHAMP.data.push(item)
      //const indexArr =   this.dataSource.data.findIndex((itemA:any) => itemA._id === item._id);
      //this.dataSource.data.splice(indexArr, 1);
      this.dataSource.data = this.dataSource.data.filter(x => x.nom !== item.nom)
    });
    this.selection.clear()
    this.dataSource_CHAMP._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();
    this.renisialiserOrdreOfData()
    this.checkChamps()
  }

  move_parametres_top_bottom(pas:number){
    //this.dataSource.data.forEach(row => this.selection.select(row));
    let itemSelected:any = []
    this.selection_CHAMP['_selected'].forEach((item:any, index:any) => {
      itemSelected.push(item)
    });

    //let index = itemSelected[0]

    let tab:IChampParametreImportation[] = this.dataSource_CHAMP.data
    let index = tab.findIndex(x => x.nom === itemSelected[0].nom)
    if(index < 0) return

    if (pas === 1) {
      if (index < tab.length - 1) {
          // Move the item at the specified index one position down
          const itemSelected = tab[index];
          tab[index] = tab[index + 1];
          tab[index + 1] = itemSelected;
      }
    } else if (pas === -1) {
        if (index > 0) {
            // Move the item at the specified index one position up
            const itemSelected = tab[index];
            tab[index] = tab[index - 1];
            tab[index - 1] = itemSelected;
        }
    }

    this.dataSource_CHAMP.data = tab
    this.dataSource_CHAMP._updateChangeSubscription();
    this.renisialiserOrdreOfData()
  }

  renisialiserOrdreOfData(){
    let tab = this.dataSource_CHAMP.data
    let compteur = 0
    tab.forEach(x => {
      compteur++
      x.ordre = compteur
    })
    this.dataSource_CHAMP.data = tab
    this.dataSource_CHAMP._updateChangeSubscription();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows     = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelected_PLAN() {
    const numSelected = this.selection_CHAMP.selected.length;
    const numRows     = this.dataSource_CHAMP.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    //console.log("************SELECT ALLI***************masterToggle>>>> ")
  }

  masterToggle_PLAN() {
    this.isAllSelected_PLAN() ?
      this.selection_CHAMP.clear() :
      this.dataSource_CHAMP.data.forEach(row => this.selection_CHAMP.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IChampParametreImportation): string {
    //console.log("************checkboxLabel*************",row)
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return ""
    //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  checkboxLabel_PLAN(row?: IChampParametreImportation): string {
    if (!row) {
      return `${this.isAllSelected_PLAN() ? 'select' : 'deselect'} all`;
    }
    return ""
    //return `${this.selection_CHAMP.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter_PLAN(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_CHAMP.filter = filterValue.trim().toLowerCase();
  }

  enums:string[] = []
  
  ngOnInit() {
    //this.enums = getData(enum_nomTable)
    this.enums = [enum_nomTable.K_articles, enum_nomTable.K_clients, enum_nomTable.K_fournisseurs]
  }

  save() {
    if (!this.form.valid) return
    this.form.patchValue({champs:this.dataSource_CHAMP.data})
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as ParametreImportation;
    showLoading()
    this.serviceHttp.addNew(item).subscribe((res) => {
      succesAlerteAvecTimer('Vos informations ont été soumis avec succès.')
    });
  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    showLoading()
    this.serviceHttp.update(item).subscribe((res) => {
      succesAlerteAvecTimer('Vos informations ont été soumis avec succès.')
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
