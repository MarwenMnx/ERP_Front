import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateRangePickerService } from '../date-range-picker/date-range-picker.service';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CustomRangePanelComponent} from "./custom-range-panel/custom-range-panel.component";
import { AsyncPipe } from '@angular/common';
@Component({
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[
 // BrowserModule,
    AsyncPipe,
  //BrowserAnimationsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
    CustomRangePanelComponent
]
})
export class CustomHeaderComponent<D> implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private calendar: MatCalendar<D>, // calendar instance of picker
    cdr: ChangeDetectorRef,
    public pickerService: DateRangePickerService
  ) {
    // make sure your header stays in sync with the calendar:
    calendar.stateChanges
      .pipe(takeUntil(this.destroy$)) // unsubscribe when destroyed
      .subscribe(() => {
        cdr.markForCheck();
        setTimeout(() =>
          this.pickerService.applyDisabled.next(
            !(this.calendar.selected as any).start ||
              !(this.calendar.selected as any).end
          )
        );
      });
    //this.headerService.subj$.subscribe((res: string[]) => console.log(res));
  }
  ngOnDestroy(): void {
    this.destroy$.next(); // will trigger unsubscription in takeUntil
  }
}
