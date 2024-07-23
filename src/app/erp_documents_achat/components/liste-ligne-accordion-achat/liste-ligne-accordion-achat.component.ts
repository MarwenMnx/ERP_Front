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
import {
  aioTableData,
  aioTableLabels
} from '../../../../static-data/aio-table-data';
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
import { roundmMontantNumber, roundmMontantString, roundmQuantiteString, roundmTauxNumber, roundmTauxString } from 'src/app/global-functions';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { ActivatedRoute } from '@angular/router';
import { People } from './sample-data';
import people from './sample-data';
import { LigneDocumentAchat } from '../../models/document-achat.model';
export class Group {
  level: number = 0;
  parent?: Group;
  expanded: boolean = true;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}

@Component({
  selector: 'vex-liste-ligne-accordion-achat',
  templateUrl: './liste-ligne-accordion-achat.component.html',
  styleUrls: ['./liste-ligne-accordion-achat.component.scss'],
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
export class ListeLigneAccordionAchatComponent {

  displayedColumns: string[] = ['numeroDateDoc', 'quantiteUnite1', 'quantiteUnite2'];
  public dataSource = new MatTableDataSource<LigneDocumentAchat | Group>([]);
  
  layoutCtrl = new UntypedFormControl('fullwidth');
  selection = new SelectionModel<LigneDocumentAchat>(true, []);
  searchCtrl = new UntypedFormControl();

  subject$: ReplaySubject<LigneDocumentAchat[]> = new ReplaySubject<LigneDocumentAchat[]>(1);
  data$: Observable<LigneDocumentAchat[]> = this.subject$.asObservable();
  
  @Input() lignes:LigneDocumentAchat[] = []
  @Input() columns: TableColumn<LigneDocumentAchat>[] = [
    {
      label: 'N°',
      property: 'numero',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium', 'text']
    },
    {
      label: 'Réference ',
      property: 'reference',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium', 'text']
    },
    {
      label: 'Désignation',
      property: 'designation',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium', 'text']
    },
    {
      label: 'Quantité-livré',
      property: 'quantiteLivre',
      type: 'text',
      visible: false,
      cssClasses: ['font-medium']
    },
    {
      label: 'Quantité-Restante',
      property: 'quantiteRestante',
      type: 'text',
      visible: false,
      cssClasses: ['font-medium']
    },
    {
      label: 'Quantité-1',
      property: 'quantiteUnite1',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Unité-1',
      property: 'unite1',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Quantité-2',
      property: 'quantiteUnite2',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Unité-2',
      property: 'unite2',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Dépot',
      property: 'depot',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Prix Vente HT',
      property: 'prixVenteBrutHT',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'total_BrutHT',
      property: 'totalBrutHT',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Taux_Remise',
      property: 'tauxremise',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Remise Par-Montant',
      property: 'remiseMontant',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_Remise',
      property: 'totalRemise',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Taux_Fodec',
      property: 'tauxFodec',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_Fodec',
      property: 'totalFodec',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Taux_DC',
      property: 'tauxDC',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_DC',
      property: 'totalDC',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_HT',
      property: 'totalHT',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_NetHT',
      property: 'totalNetHT',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Taux_TVA (%)',
      property: 'tauxTVA',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_TVA',
      property: 'totalTVA',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_TTC',
      property: 'totalTTC',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Redevance',
      property: 'redevance',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Total_Redevance',
      property: 'totalRedevance',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Prix-U-Net-HT',
      property: 'prixVenteUnitaireNetHT',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'P.U-TTC',
      property: 'prixVenteUnitaireTTC',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
  
  ];

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  deleteProducts(lignes: LigneDocumentAchat[]) {
    lignes.forEach((c) => this.deleteProduct(c));
  }

  deleteProduct(item: LigneDocumentAchat) {
    this.lignes.splice(
      this.lignes.findIndex(
        (existingItem) => existingItem._id === item._id
      ),
      1
    );
    this.selection.deselect(item);
    this.subject$.next(this.lignes);
    //this.addChangeEvent()
  }

  //groupByColumns: string[] = ['department', 'salary'];
  groupByColumns: string[] = ['numeroDateDoc'];

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(public utilService:UtilService) {
    utilService.roundmMontantString()
  }

  ngOnChanges(changes: SimpleChanges) {
    try{
      setTimeout(()=>{
        this.dataSource.data = this.addGroups(this.lignes, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
      })
    }catch(e){}
  }

  customFilterPredicate(data: LigneDocumentAchat | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: LigneDocumentAchat): boolean {
    const groupRows = this.dataSource.data.filter(
      (row:any) => {
        if (!(row instanceof Group)) return false;
        
        let match = true;
        this.groupByColumns.forEach(
          (column:string) => {
            if ( !(row as any)[column] || !(data as any)[column] || (row as any)[column] !== (data as any)[column]) match = false;
          }
        );
        return match;
      }
    );

    if (groupRows.length === 0) return true;
    if (groupRows.length > 1) throw "Data row is in more than one group!";
    const parent = <Group>groupRows[0];  // </Group> (Fix syntax coloring)

    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row:any) {
    row.expanded = !row.expanded
    this.dataSource.filter = performance.now().toString();  // hack to trigger filter refresh
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    var rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    // Recursive function, stop when there are no more levels. 
    if (!data) return []
    if (level >= groupByColumns.length)
      return data;
    
    var groups = this.uniqueBy(
      data.map(
        row => {
          var result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (var i = 0; i <= level; i++)
          (result as any)[groupByColumns[i]] = row[groupByColumns[i]];
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];

    var subGroups: any[] = [];
    groups.forEach((group: Group) => {
      let rowsInGroup = data.filter(row => (group as any)[currentColumn] === row[currentColumn])
      let subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    })
    return subGroups;
  }

  uniqueBy(a:any, key:any) {
    var seen = {};
    return a.filter(function (item:any) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : ((seen as any)[k] = true);
    })
  }

  isGroup(index:any, item:any): boolean {
    return item.level;
  }

  toggleColumnVisibility(column: TableColumn<LigneDocumentAchat>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
}
