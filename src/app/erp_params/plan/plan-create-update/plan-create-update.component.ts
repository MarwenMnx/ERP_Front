import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Plan } from '../models/plan.model';
import { PlanHttpServiceService } from '../services/plan-http-service.service';
import { PlanServiceService } from '../services/plan-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {ArticlesDepotPvHttpService} from "../../article-depotpvs/services/articles-depot-pv-http.service";
import {ArticleDepotPvs} from "../../article-depotpvs/models/articleDepotPvs.model";
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';


export interface PeriodicElement {
  ordre: number;
  reference: string;
  designation: string;
  _id: string;
  article:ArticleDepotPvs
}

const ELEMENT_DATA: PeriodicElement[] = [];

const ELEMENT_DATA_PLAN: PeriodicElement[] = [];

@Component({
  selector: 'vex-plan-create-update',
  templateUrl: './plan-create-update.component.html',
  styleUrls: ['./plan-create-update.component.scss'],
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
    MatInputModule,MatCheckboxModule,MatTableModule,
  ]

})
export class PlanCreateUpdateComponent implements OnInit {

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    couleur_fond: [this.defaults?.couleur_fond || '', Validators.required] ,
    couleur_text: [this.defaults?.couleur_text || '', Validators.required] ,
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Plan | undefined,
    private dialogRef: MatDialogRef<PlanCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:PlanHttpServiceService,
    private service:PlanServiceService,
    private articlesDepotPvHttpService:ArticlesDepotPvHttpService
  ) {}

  displayedColumns: string[] = ['select', 'ordre','reference', 'designation' ];
  dataSource      = new MatTableDataSource(ELEMENT_DATA);
  dataSource_PLAN = new MatTableDataSource(ELEMENT_DATA_PLAN);
  selection       = new SelectionModel<PeriodicElement>(true, []);
  selection_PLAN  = new SelectionModel<PeriodicElement>(true, []);


  set_article_to_init(){
    //this.dataSource.data.forEach(row => this.selection.select(row));

    this.selection_PLAN['_selected'].forEach((item:any, index:any) => {

      this.dataSource.data.push(item)
      const indexArr =   this.dataSource_PLAN.data.findIndex((itemA:any) => itemA._id === item._id);
      this.dataSource_PLAN.data.splice(indexArr, 1);

    });

    this.selection_PLAN.clear()
    this.dataSource_PLAN._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();
  }

  set_article_to_plan(){
    //this.dataSource.data.forEach(row => this.selection.select(row));

    this.selection['_selected'].forEach((item:any, index:any) => {

      this.dataSource_PLAN.data.push(item)
      const indexArr =   this.dataSource.data.findIndex((itemA:any) => itemA._id === item._id);
      this.dataSource.data.splice(indexArr, 1);

    });
    this.selection.clear()
    this.dataSource_PLAN._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows     = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelected_PLAN() {
    const numSelected = this.selection_PLAN.selected.length;
    const numRows     = this.dataSource_PLAN.data.length;
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
      this.selection_PLAN.clear() :
      this.dataSource_PLAN.data.forEach(row => this.selection_PLAN.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    //console.log("************checkboxLabel*************",row)
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  checkboxLabel_PLAN(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected_PLAN() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection_PLAN.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyFilter_PLAN(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_PLAN.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Plan;
    }

    this.form.patchValue(this.defaults);

    this.articlesDepotPvHttpService.getAllArticlesByCurrentDepotPV().subscribe((res) => {
      this.articleDepotPvss = this.getDataArticleDepotPvss(res.RESULTAT) ;
      this.dataSource.data= this.articleDepotPvss
      this.dataSource._updateChangeSubscription();

      this.dataSource_PLAN.data = []
      this.dataSource_PLAN._updateChangeSubscription();

    });

  }

  //articleDepotPvss: ArticleDepotPvs[]     = [];
  articleDepotPvss: any[]     = [];
  getDataArticleDepotPvss(items:any) {
    let newItems:any = []
    for (let key of Object.keys(items)){
      // newItems.push(new ArticleDepotPvs(items[key]))
      newItems.push({
        ordre: 1,
        reference:      items[key].article.reference,
        designation:    items[key].article.designation,
        _id:            items[key]._id,
        article:        items[key].article
      })
    }
    return newItems
  }

  save() {
    if (!this.form.valid) return
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as Plan;

    let articlesP:any = []
    this.dataSource_PLAN.data.forEach((item:any, index:any) => {
      articlesP.push({
        _id: item.article._id, ordre:index , couleur_fond: '' , couleur_text: ''
      })
    });
    item.articles = articlesP
    item.ordre = 1
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });

  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    let articlesP:any = []
    this.dataSource_PLAN.data.forEach((item:any, index:any) => {
      articlesP.push({
        _id: item.article._id, ordre:index , couleur_fond: '' , couleur_text: ''
      })
    });
    item.articles = articlesP
    this.serviceHttp.update(item).subscribe((res) => {
      this.service.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
