import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  SimpleChanges,
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
// import { Product } from '../../products/models/product.model';
import { DocumentsComponent } from '../../products/documents/documents.component';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { ClientCreateUpdateComponent } from '../client-create-update/client-create-update.component';
import { Contact } from '../models/contact.model';
import { aioContactData } from 'src/static-data/contact-data';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { Output, EventEmitter } from '@angular/core';
import { hideLoading, isObjectIdMongoose, showAlertError, showLoading } from 'src/app/global-functions';
import { ClientHttpService } from '../services/client-http.service';

// import { aioClientData } from 'src/static-data/client-data';
// import { Client } from '../models/client.model';



@Component({
  selector: 'vex-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
    DocumentsComponent
  ]
})
export class ContactComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  keyOfForm:string = "contact"

  addChangeEvent() {
    this.newItemEvent.emit([this.keyOfForm, this.contacts]);
  }

  ngOnChanges(changes: SimpleChanges) {
    try{
      this.subject$.next(this.contacts);
    }catch(e){}
  }

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);
  data$: Observable<Contact[]> = this.subject$.asObservable();
  @Input() contacts: Contact[] = [];

  @Input() client:any

  columns: TableColumn<Contact>[] = [
    {
      label: 'Type',
      property: 'typeContact',
      type: 'image',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Extension',
      property: 'titre',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    { label: 'Civilité',
     property: 'civilite',
      type: 'text',
      visible: true ,
      cssClasses: ['font-medium']
  },

    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Contact>;
  selection = new SelectionModel<Contact>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, private serviceHttp:ClientHttpService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Contact[]>(Boolean)).subscribe((contacts) => {
      this.contacts = contacts;
      this.dataSource.data = contacts;
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

  createProduct() {
    this.dialog
      .open(ContactModalComponent, {
        data: {defaults:new Contact(), client:this.client}
        //width: '100vw',
      })
      .afterClosed()
      .subscribe((product: any) => {
        if (product) {
          try{
            this.contacts.unshift(new Contact(product));
          }catch(e){
            this.contacts = []
            this.contacts.unshift(new Contact(product));
          }
          this.subject$.next(this.contacts);
          this.addChangeEvent()
        }
      });
  }

  updateProduct(product: Contact) {
    this.dialog
      .open(ContactModalComponent, {
        data: {defaults:product, client:this.client}
        //width: '100vw',
      })
      .afterClosed()
      .subscribe((updatedProduct) => {
        if (updatedProduct) {
          const index = this.contacts.findIndex(
            (existingProduct) => existingProduct._id === updatedProduct._id
          );
          this.contacts[index] = new Contact(updatedProduct);
          this.subject$.next(this.contacts);
          this.addChangeEvent()
        }
      });
  }

  deleteProduct(product: Contact) {
    if(confirm('are you sure to delete ?'))
    this.contacts.splice(
      this.contacts.findIndex(
        (existingProduct) => existingProduct._id === product._id
      ),
      1
    );
    this.selection.deselect(product);
    this.subject$.next(this.contacts);

    if(isObjectIdMongoose(this.client?._id)){
      showLoading()
      this.serviceHttp.deleteContact(product._id).subscribe((res) => {
        hideLoading()
        if(res.OK){
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }

    this.addChangeEvent()
  }

  deleteProducts(contacts: Contact[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    contacts.forEach((c) => this.deleteProduct(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Contact>, event: Event) {
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

