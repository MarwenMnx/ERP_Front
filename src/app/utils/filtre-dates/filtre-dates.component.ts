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
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf, formatDate } from '@angular/common';
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
import { roundmMontantNumber, roundmTauxNumber, roundmTauxString } from 'src/app/global-functions';


@Component({
  selector: 'vex-filtre-dates',
  templateUrl: './filtre-dates.component.html',
  styleUrls: ['./filtre-dates.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
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
export class FiltreDatesComponent {

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  @Input() day1:any = new Date 
  @Input() day2:any = new Date

  periode:string = "hier"

  @Input() modeEmpty = false

  @Output() setNewDates = new EventEmitter<any>();

  constructor() {
   
  }

  ngOnInit(): void {
    
    if(!this.modeEmpty){   
      this.day1 = new Date
      this.day2 = new Date
    }else{      
      //this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en') 
      //this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en') 
    }
  }

  getOption(event:any) {
    
    let ch = this.periode
    
    switch (ch) {
      case 'select':
        this.day1 = new Date()
        this.day1 = new Date(this.day1.getFullYear(), 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate());
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'aujourdhui':
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate());
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate());
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'hier':
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate() - 1);
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate() - 1);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'cetteSemaine':
        const now = new Date()
        this.day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
        this.day1 = new Date(now.getFullYear(), now.getMonth(), this.day2.getDate() + 6)
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'semaineDernière':
        const now2 = new Date()
        this.day2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate() - now2.getDay() - 6)
        this.day1 = new Date(now2.getFullYear(), now2.getMonth(), this.day2.getDate() + 6)
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisCi':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), this.day2.getMonth(), 1);
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), this.day1.getMonth() + 1, 0);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisFlottant':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), this.day2.getMonth() - 1, this.day2.getDate() - 1);
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate());
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisDernier':
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), this.day1.getMonth(), 0);
        this.day2 = new Date();
        this.day2 = new Date(this.day1.getFullYear(), this.day1.getMonth(), 1);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'cetteAnnée':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), 0, 1);
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'annéeDernière':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear() - 1, 0, 1);
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear() - 1, 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        break;
    }

    this.getArticles()
  }

  getArticles() {
    this.setNewDates.emit({ dateStart: formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en'), dateEnd: formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en') })
  }

  getDateStart(event:any) {
    this.day2 = event
    this.setNewDates.emit({ dateStart: this.day2, dateEnd: this.day1 })
  }

  getDateEnd(event:any) {
    this.day1 = event
    this.setNewDates.emit({ dateStart: this.day2, dateEnd: this.day1 })
  }
}
