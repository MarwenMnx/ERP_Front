import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { AsyncPipe,NgFor, NgIf } from '@angular/common';
import {UtilService} from "../../../UtilService.service";
@Component({
  selector: 'app-custom-range-panel',
  templateUrl: './custom-range-panel.component.html',
  styleUrls: ['./custom-range-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[
  //BrowserModule,
    AsyncPipe,NgFor, NgIf,
  //BrowserAnimationsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
]
})
export class CustomRangePanelComponent<D> {
  // list of range presets we want to provide:
  @Input() customPresets: any[] = [];

  @HostBinding('class.touch-ui')
  readonly isTouchUi = this.picker.touchUi;
  selectedRange = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private dateAdapter: DateAdapter<D>,
    private picker: MatDateRangePicker<D>,
    private calendar: MatCalendar<D>,
    public utilService: UtilService,
    cdr: ChangeDetectorRef
  ) {
    this.dateAdapter.setLocale('fr')
    calendar.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      cdr.markForCheck();
      this.loadSelectedRange();
    });
  }

  ngOnInit() {
    this.loadSelectedRange();
  }

  loadSelectedRange() {
    this.selectedRange = '';
    for (const preset of this.customPresets) {
      if (this.isSelectdeRange(preset.key)) {
        this.selectedRange = preset;
        break;
      }
    }
  }

  // called when user selects a range preset:
  selectRange(rangeName: string): void {
    // console.log("********selectRange************"+rangeName)
    if (rangeName === 'Custom') return;
    const [start, end] = this.calculateDateRange(rangeName);
    (this.calendar.selected as any).start = start;
    (this.calendar.selected as any).end = end;
    this.calendar.updateTodaysDate();
    this.calendar.activeDate = start;
    this.calendar.activeDate = end;
    //this.picker.select(start);
    //this.picker.select(end);
    //this.picker.close();
  }

  private calculateDateRange(rangeName: string): any {
    // console.log("********calculateDateRange************"+rangeName)
    const today = this.today;
    const year = this.dateAdapter.getYear(today);

    switch (rangeName) {

      case 'Today':
        return [today, today];

      case 'YesterdayAndToday': {
        const start = this.dateAdapter.addCalendarDays(today, -1);
        return [start, today];
      }

      case 'Yesterday': {
        const start = this.dateAdapter.addCalendarDays(today, -1);
        return [start, start];
      }

      case 'Last7Days': {
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [start, today];
      }

      case 'Last30Days': {
        const start = this.dateAdapter.addCalendarDays(today, -29);
        return [start, today];
      }

      case 'ThisMonth': { // mois en cours
        return this.calculateMonth(today);
      }

      case 'PreviousMonth': { //mois dernier
        const thisDayLastMonth = this.dateAdapter.addCalendarMonths(today, -1);
        return this.calculateMonth(thisDayLastMonth);
      }

      case 'ThisYear': { // année en cours
        const startA  = this.dateAdapter.createDate(new Date().getFullYear(),0,1)
        return [startA, today];
      }

      case 'PreviousYear': { //année derniere
        const startA  = this.dateAdapter.createDate(new Date().getFullYear()-1,0,1)
        const endA    =  this.dateAdapter.createDate(new Date().getFullYear()-1,11,31)
        return [startA, endA];
      }

      case 'Tomorrow': {
        const start = this.dateAdapter.addCalendarDays(today, 1);
        return [start, start];
      }

      case 'Next7Days': {
        const end = this.dateAdapter.addCalendarDays(today, 6);
        return [today, end];
      }

      case 'Next30Days': {
        const end = this.dateAdapter.addCalendarDays(today, 29);
        return [today, end];
      }

      case 'Custom': {
        const selectedRange: any = this.calendar.selected;
        return [selectedRange.start, selectedRange.end];
      }

    }
  }

  private calculateMonth(forDay: D): any {
    const year = this.dateAdapter.getYear(forDay);
    const month = this.dateAdapter.getMonth(forDay);
    const start = this.dateAdapter.createDate(year, month, 1);
    const end = this.dateAdapter.addCalendarDays(
      start,
      this.dateAdapter.getNumDaysInMonth(forDay) - 1
    );
    return [start, end];
  }

  private calculateWeek(forDay: D): any {
    const deltaStart =
      this.dateAdapter.getFirstDayOfWeek() -
      this.dateAdapter.getDayOfWeek(forDay);
    const start = this.dateAdapter.addCalendarDays(forDay, deltaStart);
    const end = this.dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  private get today(): any {
    const today = this.dateAdapter.today(); //.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
  get selectedDateRange() {
    const selectedRange: any = this.calendar.selected;
    let displayText = '';
    if (selectedRange.start !== null)
      displayText += new Date(String(selectedRange.start)).toLocaleDateString();
    if (selectedRange.end !== null)
      displayText +=
        ' - ' + new Date(String(selectedRange.end)).toLocaleDateString();
    return displayText;
  }

  ngOnDestroy() {
    this.destroy$.next(); // will trigger unsubscription in takeUntil
  }

  isSelectdeRange(rangeName: string) {
    // console.log("********isSelectdeRange************"+rangeName)
    const [start, end] = this.calculateDateRange(rangeName);
    const selectedRange: any = this.calendar.selected;
    return (
      selectedRange.start !== null &&
      selectedRange.end !== null &&
      new Date(String(selectedRange.start)).toDateString() ===
        new Date(String(start)).toDateString() &&
      new Date(String(selectedRange.end)).toDateString() ===
        new Date(String(end)).toDateString()
    );
  }
}
