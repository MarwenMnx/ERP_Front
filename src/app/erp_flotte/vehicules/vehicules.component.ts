import {
  Component,
  DestroyRef,
  inject,
  Input,
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Vehicule } from './models/vehicule.model';
import { VehiculeCreateUpdateComponent } from './vehicule-create-update/vehicule-create-update.component';
import { VehiculeService } from './services/vehicule.service';
import { VehiculeHttpService } from './services/vehicule-http.service';
import {UtilService} from "../../utils/UtilService.service";


@Component({
  selector: 'vex-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss'],
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
    DatePipe
  ]
})
export class VehiculesComponent {
  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Vehicule[]> = new ReplaySubject<Vehicule[]>(1);
  data$: Observable<Vehicule[]> = this.subject$.asObservable();
  listItems: Vehicule[] = [];

  @Input()
  columns: TableColumn<Vehicule>[] = [
    {
      label: 'LIBELLE',
      property: 'libelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'IMMATRICULE',
      property: 'immatricule',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'MARQUE',
      property: 'marque',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'TYPE VÉHICULE',
      property: 'type vehicule',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'SOUS TYPE VÉHICULE',
      property: 'sous type vehicule',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'MODÈLE VÉHICULE',
      property: 'modele vehicule',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'LEASING',
      property: 'leasing',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'N°CHASSIS',
      property: 'num_chassis',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'TYPE PLATEAU',
      property: 'type_plateau',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'CHARGE TOTAL',
      property: 'charge_total',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'ESSIEU',
      property: 'essieu',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'NBR CHEVEAUX',
      property: 'nbre_cheveaux',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'POIDS VIDE',
      property: 'poid_vide',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'CHARGE UTILE',
      property: 'charge_utile',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'NB.DE PLACE',
      property: 'nb_places',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'D.MISE CIRCULATION',
      property: 'date_mise_circulation',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'D.ACHAT',
      property: 'date_achat',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'D.MAIN LEVE LEASING',
      property: 'date_main_leve_leasing',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    {
      label: 'BASCULANTE',
      property: 'basculante',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    {
      label: 'VALEUR ACHAT',
      property: 'valeur_achat',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'TYPE CONTEUR',
      property: 'type_conteur',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'NBR KM ACTUELLE',
      property: 'nombre_km_actuelle',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'NOTES',
      property: 'notes',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },

    { label: 'ACTIONS', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Vehicule>;
  selection = new SelectionModel<Vehicule>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private service: VehiculeService,
    private serviceHttp: VehiculeHttpService,
    private dialog: MatDialog,
    private router: Router,
    public utilService:UtilService
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next(this.serviceHttp.getData(res.RESULTAT));
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Vehicule[]>(Boolean)).subscribe((listItems) => {
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
      .open(VehiculeCreateUpdateComponent, {})
      .afterClosed()
      .subscribe((item: Vehicule) => {
        if (item) {
          this.listItems.unshift(new Vehicule(item));
          this.subject$.next(this.listItems);
        }
      });
  }

  update(item: Vehicule) {
    this.dialog
      .open(VehiculeCreateUpdateComponent, {
        data: item
      })
      .afterClosed()
      .subscribe((updatedItem) => {
        if (updatedItem) {
          const index = this.listItems.findIndex(
            (existingItem) => existingItem._id === updatedItem._id
          );
          this.listItems[index] = new Vehicule(updatedItem);
          this.subject$.next(this.listItems);
        }
      });
  }

  delete(item: Vehicule) {
    this.serviceHttp.delete(item._id).subscribe((res) => {
      if (!res.OK) {
        alert(res.MESSAGE);
        return;
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

  deleteItems(listItems: Vehicule[]) {
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

  toggleColumnVisibility(column: TableColumn<Vehicule>, event: Event) {
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
