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
import { FideliteTable } from '../models/fidelite.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter } from 'stream';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/utils/shared.module';
import { getDateByForma, notEqualToZero, roundmMargeNumber, roundmMontantNumber } from 'src/app/global-functions';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';



@Component({
  selector: 'vex-promotion-create-update',
  template: `
    <form (ngSubmit)="save()" [formGroup]="form">
      <div class="flex items-center" mat-dialog-title>
          
          <h2
            *ngIf="defaults?.carte"
            class="headline m-0 flex-auto">
            {{ defaults?.carte }}
          </h2>
          <h2
            *ngIf="!defaults?.carte"
            class="headline m-0 flex-auto">
            Ajouter
          </h2>
      
          <button
            class="text-secondary"
            mat-dialog-close
            mat-icon-button
            type="button">
            <mat-icon svgIcon="mat:close"></mat-icon>
          </button>
      </div>
  
      <mat-divider class="text-border"></mat-divider>
  
      <mat-dialog-content class="flex flex-col">

        <mat-form-field class="flex-auto">
          <mat-label>Carte</mat-label>
          <input cdkFocusInitial formControlName="carte" matInput />
          <mat-icon matIconPrefix svgIcon="mat:person"></mat-icon>
          <mat-error *ngIf="form.controls.carte.hasError('required')"
            >Veillez inserer votre Carte.
            </mat-error>
        </mat-form-field>

        <mat-form-field class="flex-auto">
          <mat-label>taux</mat-label>
          <input appMargeDecimaNumber cdkFocusInitial formControlName="taux" matInput class="right-aligned-input" />
          <mat-error *ngIf="form.controls.taux.hasError('notEqualToZero')"
          >Veillez inserer votre taux.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="flex-auto">
          <mat-label>nbPoint</mat-label>
          <input appMontantDecimaNumber cdkFocusInitial formControlName="nbPoint" matInput class="right-aligned-input" />
          <mat-error *ngIf="form.controls.nbPoint.hasError('notEqualToZero')"
            >Veillez inserer votre nbPoint.
            </mat-error>
        </mat-form-field>
          
      </mat-dialog-content>
  
      <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close type="button">Annuler</button>
          <button
            *ngIf="isCreateMode()"
            color="primary"
            mat-flat-button
            type="submit">
            Ajouter
          </button>
          <button
            *ngIf="isUpdateMode()"
            color="primary"
            mat-flat-button
            type="submit">
            Modifier                                                                                       
          </button>
      </mat-dialog-actions>
  
    </form>
    `,
  styleUrls: ['./fidelite.component.scss'],
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
    MatDatepickerModule,
    SharedModule
  ],
  providers:
    [
      { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class FideliteCreateUpdateComponent implements OnInit {

  static id = 0
  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    carte: [this.defaults?.carte || '', Validators.required],
    nbPoint: [this.defaults?.nbPoint || 0, [notEqualToZero()]],
    taux: [this.defaults?.taux || 0, [notEqualToZero()]],
  });

  mode: 'create' | 'update' = 'create';


  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: FideliteTable | undefined,
    private dialogRef: MatDialogRef<FideliteCreateUpdateComponent>,
    private fb: FormBuilder,
    private date_form: AppDateAdapter
  ) { }


  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = { _id: FideliteCreateUpdateComponent.id++ + '' } as FideliteTable;
    }

    this.form.patchValue(this.defaults);
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
    let item: any = this.form.value as FideliteTable;

    //item.dateDebut = this.date_form.format(item.dateDebut,"DD/MM/YYYY")
    //item.dateDebut = this.date_form.format(item.dateDebut,"DD/MM/YYYY")

    this.dialogRef.close(item);
  }

  update() {
    const item: any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.dialogRef.close(item);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  changeTauxRemise() {
    let article: any = this.form.value
    let prixF: number = roundmMontantNumber(roundmMontantNumber(article.ancienPrix) * roundmMargeNumber(article.tauxRemise) / 100)
    article.nouveauPrix = roundmMontantNumber(article.ancienPrix - prixF)
    this.form.patchValue(article);
  }

  changeNouveauPrix() {
    let article: any = this.form.value
    article.tauxRemise = roundmMargeNumber(100 * (1 - article.nouveauPrix / article.ancienPrix))
    this.form.patchValue(article);
  }

}