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
import { Product } from '../../erp_params/products/models/product.model';
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
import { Router } from '@angular/router';
import { Sessions_caisse } from './models/sessions-caisses.model';
import { SessionsCaissesService } from './services/sessions-caisses.service';
import { SessionsCaissesHttpService } from './services/sessions-caisses-http.service';
import { SessionsCaissesCreateUpdateComponent } from './sessions-caisses-create-update/sessions-caisses-create-update.component';
import { getDateByForma } from 'src/app/global-functions';
import {UtilService} from "../../utils/UtilService.service";
import {DocumentVente} from "../../erp_documents_vente/models/document-vente.model";
//import { getDateByForma,  getDateByFormatHeure } from 'src/app/global-functions';


@Component({
  selector: 'vex-sessions-caisses',
  templateUrl: './sessions-caisses.component.html',
  styleUrls: ['./sessions-caisses.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
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
  ]

})
export class SessionsCaissesComponent implements OnInit , AfterViewInit{

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Sessions_caisse[]> = new ReplaySubject<Sessions_caisse[]>(1);
  data$: Observable<Sessions_caisse[]> = this.subject$.asObservable();
  listItems: Sessions_caisse[] = [];

  @Input()
  columns: TableColumn<Sessions_caisse>[] = [
    {
      label: 'NUMÉRO',
      property: 'numero',
      type: 'text',
      visible: true
    },
/*
    {
      label: 'UTILISATEUR',
      property: 'utilisateur_caissier',
      type: 'image',
      visible: true
    },
*/
   {
      label: 'MACHINE CAISSE',
      property: 'nom_machine_caisse',
      type: 'text',
      visible: true
    },


    {
      label: 'D.OUVERTURE',
      property: 'date_ouverture',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },


    {
      label: 'ÉTAT SESSION',
      property: 'cloture',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'D.CLÔTURE',
      property: 'date_cloture',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'TOTAL VENTE ESPECE',
      property: 'totale_vente_espece',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'TOTAL TTC',
      property: 'totale_TTC_article',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    // {
    //   label: 'CAISSE',
    //   property: 'caisse',
    //   type: 'text',
    //   visible: true,
    //   cssClasses: ['font-medium']
    // },


   // {
    //   label: 'N° SESSION CAISSE',
    //   property: 'num_session_caisse',
    //   type: 'text',
    //   visible: true,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },


    {
      label: 'FOND CAISSE SUPERVISEUR',
      property: 'fond_caisse_superviseur',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'FOND CAISSE CAISSIER',
      property: 'fond_caisse_caissier',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
/*
    {
      label: 'TOTAL ENCAISSEMENT',
      property: 'total_encaissement',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'TOTAL DÉCAISSEMENT',
      property: 'totad_decaissement',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

*/
    {
      label: 'TOT.Ecart NEGATIF',
      property: 'totale_ecart_negatif',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
/*
    {
      label: 'TOTAL GAIN',
      property: 'total_gain',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
*/
    {
      label: 'NOTES',
      property: 'notes',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
     { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Sessions_caisse>;
  selection = new SelectionModel<Sessions_caisse>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private service:SessionsCaissesService, private serviceHttp:SessionsCaissesHttpService,
              public utilService: UtilService, private dialog: MatDialog, private router:Router) {}



  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
   getDateFormat(date:Date){
    return getDateByForma(date)
  }
  // }
  //  getDateFormat(date:Date){
  //   return getDateHeure(date)
  // }

  ngOnInit() {
    this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Sessions_caisse[]>(Boolean)).subscribe((listItems) => {
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

  createCommande() {
    this.dialog
      .open(SessionsCaissesCreateUpdateComponent)
      .afterClosed()
      .subscribe((item: Sessions_caisse) => {
   if (item) {
         this.listItems.unshift(new Sessions_caisse(item));
          this.subject$.next(this.listItems);
        }
      });
  }

  openImpressionPDF(item: Sessions_caisse){
    this.service.generatePdf(item)
  }

  updateCommande(commande: Sessions_caisse) {
    this.dialog
      .open(SessionsCaissesCreateUpdateComponent, {
        data: commande
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new Sessions_caisse(updatedItem);
          this.subject$.next(this.listItems);
        }
      });
  }

  delete(item: Sessions_caisse) {
    this.serviceHttp.delete(item._id).subscribe((res) => {
      if(!res.OK){
        alert(res.MESSAGE)
        return
      }
      this.listItems.splice(
        this.listItems.findIndex(
          (existingItem) => existingItem._id === item._id
        ),
        1
      );
      this.selection.deselect(item);
      this.subject$.next(this.listItems);
    });
  }

  deleteItems(listItems: Sessions_caisse[]) {
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

  toggleColumnVisibility(column: TableColumn<Sessions_caisse>, event: Event) {
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
