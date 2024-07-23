import {
    AfterViewInit,
    Component,
    DestroyRef,
    Inject,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
  } from '@angular/core';
  import { Observable, of, ReplaySubject } from 'rxjs';
  import { filter } from 'rxjs/operators';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
  import { TableColumn } from '@vex/interfaces/table-column.interface';
  
  import { SelectionModel } from '@angular/cdk/collections';
  import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
  import { stagger40ms } from '@vex/animations/stagger.animation';
  import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
    Validators
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
  import { CodeBarreTable } from '../models/codeBarre.model';
  import { MatDividerModule } from '@angular/material/divider';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { EventEmitter } from 'stream';
  
  

@Component({
    selector: 'vex-test-form',
    template: `
    <form [formGroup]="parentForm">
        <mat-form-field class="flex-auto">
          <mat-label>Categorie</mat-label>
          <input  formControlName="categorie" matInput />
          <mat-error *ngIf="parentForm.controls && parentForm.controls['categorie'].hasError('required')"
            >Veillez inserer votre Référence.
          </mat-error>
        </mat-form-field>
    </form>
    `,
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
      MatInputModule
    ]
  })
  export class TestFormComponent implements OnInit {
    
    @Input() parentForm:any = new FormControl();

    constructor() {}
  
  
    ngOnInit() {
    }
  
   
    
  }