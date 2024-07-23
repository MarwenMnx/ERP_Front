import { AfterViewInit, Component, DestroyRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
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

import { Banque } from './models/banque.model';
import { BanqueService } from './services/banque.service';
import { BanqueHttpService } from './services/banque-http.service';
import { BanqueCreateUpdateComponent } from './banque-create-update/banque-create-update.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'vex-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss'],
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
    TranslateModule
  ]
})
export class BanqueComponent implements OnInit, AfterViewInit {

  layoutCtrl = new UntypedFormControl('boxed');

  subject$: ReplaySubject<Banque[]> = new ReplaySubject<Banque[]>(1);
  data$: Observable<Banque[]> = this.subject$.asObservable();
  listItems: Banque[] = [];

  private languageChange$ = new BehaviorSubject<string>(localStorage.getItem('selectedLanguage') || 'en');

  @Input()
  columns: TableColumn<Banque>[] = [];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Banque>;
  selection = new SelectionModel<Banque>(true, []);
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private service: BanqueService,
    private serviceHttp: BanqueHttpService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {}

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);

    this.languageChange$.pipe(
      switchMap(lang => this.translate.get(['LIBELLE', 'ABBRÉVIATION', 'ACTIONS']))
    ).subscribe(translations => {
      this.columns = [
        {
          label: translations['LIBELLE'],
          property: 'libelle',
          type: 'text',
          visible: true,
          cssClasses: ['font-medium']
        },
        {
          label: translations['ABBRÉVIATION'],
          property: 'abreviation',
          type: 'text',
          visible: true,
          cssClasses: ['font-medium']
        },
        {
          label: translations['ACTIONS'],
          property: 'actions',
          type: 'button',
          visible: true
        }
      ];
    });

    this.serviceHttp.GetAll().subscribe((res) => {
      this.subject$.next(res.RESULTAT);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Banque[]>(Boolean)).subscribe((listItems) => {
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
    this.dialog.open(BanqueCreateUpdateComponent, {}).afterClosed().subscribe((item: Banque) => {
      if (item) {
        this.listItems.unshift(new Banque(item));
        this.subject$.next(this.listItems);
      }
    });
  }

  update(item: Banque) {
    this.dialog.open(BanqueCreateUpdateComponent, { data: item }).afterClosed().subscribe((updatedItem) => {
      if (updatedItem) {
        const index = this.listItems.findIndex((existingItem) => existingItem._id === updatedItem._id);
        this.listItems[index] = new Banque(updatedItem);
        this.subject$.next(this.listItems);
      }
    });
  }

  delete(item: Banque) {
    this.serviceHttp.delete(item._id).subscribe((res) => {
      if (!res.OK) {
        alert(res.MESSAGE);
        return;
      }
      this.listItems.splice(this.listItems.findIndex((existingItem) => existingItem._id === item._id), 1);
      this.selection.deselect(item);
      this.subject$.next(this.listItems);
    });
  }

  deleteItems(listItems: Banque[]) {
    listItems.forEach((c) => this.delete(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Banque>, event: Event) {
    event.stopPropagation();
    column.visible = !column.visible;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }


}
