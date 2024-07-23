import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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

import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
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
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { getData, hideLoading, showConfirmationDialog, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { FiltreDatesComponent } from 'src/app/utils/filtre-dates/filtre-dates.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { CategorieHttpService } from 'src/app/erp_params/categories/services/categorie-http.service';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { Output, EventEmitter } from '@angular/core';
import { FiltreAutocompletSelectAllComponent } from '../filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';

@Component({
  selector: 'vex-filtre-catg-famille-sous-famille',
  templateUrl: './filtre-catg-famille-sous-famille.component.html',
  styleUrls: ['./filtre-catg-famille-sous-famille.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FiltreCatgFamilleSousFamilleComponent,
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
    ChipsAutocompleteComponent,
    FiltreAutocompletSelectAllComponent
  ]
})
export class FiltreCatgFamilleSousFamilleComponent {

  constructor(
    private categorieServiceHttp:CategorieHttpService,
    private articleServiceHttp:ProductHttpServiceService
  ) {}

  allCategories:any = []
  categories:any = []

  allFamilles:any = []
  familles:any = []

  allSousFamilles:any = []
  sousFamilles:any = []

  allAllArticles:any = []
  allArticles:any = []
  articles:any = []

  ngOnInit() {
    this.categorieServiceHttp.GetAllWithFamilleAndSousFamille().subscribe((res) => {
      this.allCategories = getData(res.RESULTAT);
    });

    this.articleServiceHttp.GetAll().subscribe((res) => {
      let newItems = []
      for (let key of Object.keys(res.RESULTAT)){
        res.RESULTAT[key].reference = res.RESULTAT[key].reference + " "+res.RESULTAT[key].designation
        newItems.push(res.RESULTAT[key])
      }
      this.allAllArticles = newItems;
      this.allArticles    = this.allAllArticles
    });
  }

  newCategories(newValue:any){
    this.categories = newValue
    setTimeout(() => {
      this.filtrerCategorieFamilleSousFamilleArticles()
      this.filtrer()
    })
  }

  newFamilles(newValue:any){
    this.familles = newValue
    setTimeout(() => {
      this.filtrerCategorieFamilleSousFamilleArticles()
      this.filtrer()
    })
  }

  newSousFamilles(newValue:any){
    this.sousFamilles = newValue
    setTimeout(() => {
      this.filtrerCategorieFamilleSousFamilleArticles()
      this.filtrer()
    })
  }

  newArticles(newValue:any){
    this.articles = newValue
    setTimeout(() => {
      this.filtrer()
    })
  }

  newItemEvent(newValue:any){

    switch ( newValue[0] ) {
      case 'categorie':
          this.categories = newValue[1]
          this.filtrerCategorieFamilleSousFamilleArticles()
          this.filtrer()
          break;
      case 'famille':
          this.familles = newValue[1]
          this.filtrerCategorieFamilleSousFamilleArticles()
          this.filtrer()
          break;
      case 'sousFamille':
          this.sousFamilles = newValue[1]
          this.filtrerCategorieFamilleSousFamilleArticles()
          this.filtrer()
          break;
      default:
          this.filtrer()
          break;
    }

  }

  @Output() filtrerEvent = new EventEmitter<Object>();
  filtrer() {

    let lists = {
      categories:this.categories,
      familles:this.familles,
      sousFamilles:this.sousFamilles,
      articles:this.articles
    }
    this.filtrerEvent.emit(lists);
  }

  filtrerCategorieFamilleSousFamilleArticles(){
    this.allFamilles = []
    this.allSousFamilles = []
    this.allArticles = []

    for(let itemCatg of this.categories){
      let items = itemCatg.familles ? itemCatg.familles : []
      this.allFamilles.push(...items);
    }

    let familles = this.familles

    for(let itemFamille of this.familles){
      let famille = this.allFamilles.find((x:any) => x._id == itemFamille._id)
      if(!famille){
        familles.splice(
          familles.findIndex(
            (existingItem:any) => existingItem._id === itemFamille._id
          ),
          1
        );
      }
    }

    this.familles = familles

    for(let itemFamille of this.familles){
      let items = itemFamille.sous_familles ? itemFamille.sous_familles : []
      this.allSousFamilles.push(...items)
    }

    let sousFamilles = JSON.parse(JSON.stringify(this.sousFamilles))

    for(let itemSousFamille of this.sousFamilles){
      let sousFamille = this.allSousFamilles.find((x:any) => x._id == itemSousFamille._id)
      if(!sousFamille){
        sousFamilles.splice(
          sousFamilles.findIndex(
            (existingItem:any) => existingItem._id === itemSousFamille._id
          ),
          1
        );
      }
    }

    this.sousFamilles = sousFamilles

    this.allArticles = []

    for(let itemArticle of this.allAllArticles){
      let catg = this.categories.find((x:any) => x._id == itemArticle?.categorie?._id)
      let famille = this.familles.find((x:any) => x._id == itemArticle?.famille?._id)
      let sousFamille = this.sousFamilles.find((x:any) => x._id == itemArticle?.sousFamille?._id)
      if(catg || famille || sousFamille){
        this.allArticles.push(itemArticle)
      }
    }

    let articles = this.articles
    // console.log(this.categories.length);

    if(this.categories.length === 0){
      this.allArticles = this.allAllArticles
      this.articles = []
      return
    }

    for(let itemArticle of this.articles){
      let article = this.allArticles.find((x:any) => x._id == itemArticle._id)
      if(!article){
        articles.splice(
          articles.findIndex(
            (existingItem:any) => existingItem._id === itemArticle._id
          ),
          1
        );
      }
    }

    this.articles = articles

  }


}
