import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatDateRangePicker} from '@angular/material/datepicker';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { DateRangePickerService } from './date-range-picker.service';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { AsyncPipe ,NgIf } from '@angular/common';
import {UtilService} from "../../UtilService.service";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../dateAdapter/date.adapter";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import { list_date_range_label} from "../../../global-enums";

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  providers: [DateRangePickerService,
    { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
    // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ],
  standalone: true,
  imports:[
  //BrowserModule,
    AsyncPipe,
  //BrowserAnimationsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,NgIf
]
})
export class DateRangePickerComponent {

 @Input() labelTextRange: string = 'Enter a date range';
 @Output() selectedDateRange = new EventEmitter<any>();

 //@Input() customPresets: string[] = [];

  customPresets: any[]   = this.utilService.parseEnumToObject('list_date_range_label');
  // customPresets: string[] = Object.values(list_date_range_label);

  //console.log(valuesWithLabels);

  /*
  customPresets: string[] = [
    'Today',

    'Yesterday and today',

    'Yesterday',

    'Last 7 days',

    'Last 30 days',

    'This month',

    'Previous month',

    'Tomorrow',

    'Next 7 days',

    'Next 30 days',

    'Custom',
  ]
*/
  CustomHeaderComponent = CustomHeaderComponent;
  range =   new FormGroup({
    start:  new FormControl(),
    end:    new FormControl(),
  });

  isTouchUIActivated = false;

  constructor(public pickerService: DateRangePickerService,public utilService: UtilService) {}

  ngOnInit() {
    this.pickerService.customPresets = this.customPresets;

    this.range.setValue({
      start:  new Date(),
      end:    new Date()
    });

  }

  applySelectedDate(picker: MatDateRangePicker<Date>) {

    this.range.setValue({
      start: (picker.datepickerInput as any).value.start,
      end: (picker.datepickerInput as any).value.end
    });
    //
    //let dateStart_loc =  new Date(new Date(this.range.controls['start'].value).toLocaleString())
    //let dateEnd_loc   =  new Date(new Date(this.range.controls['end'].value).toLocaleString())
    let dateStart_loc :any  =   new Date(this.range.controls['start'].value).toDateString()
    let dateEnd_loc :any    =   new Date(this.range.controls['end'].value)
    let end_date_check      =   new Date(dateEnd_loc).setHours(23,59,59)

    this.selectedDateRange.emit({
      dateStart:  new Date(dateStart_loc).toString() , //this.range.controls['start'].value , //new Date(this.range.controls['start'].value),
      dateEnd:    new Date(end_date_check).toString() //this.range.controls['end'].value , //new Date(this.range.controls['end'].value)
    })

    picker.close();
  }

  public checkDateInRange(picker?: MatDateRangePicker<Date>): boolean {

    if(picker){
      let dateStart_loc =  new Date(this.range.controls['start'].value)
      let dateEnd_loc   =  new Date(this.range.controls['end'].value)

      let dateCheck          = dateStart_loc+" - "+dateEnd_loc
      const dates = dateCheck.split('-').map(date => date.trim());
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);

      let dateStart_loc2 :any =  new Date(this.range.controls['start'].value).toDateString()
      let dateEnd_loc2 :any   =  new Date(this.range.controls['end'].value).toDateString()
      let end_date_check      = new Date(dateEnd_loc2).setHours(23,59,59)

      this.selectedDateRange.emit({
        dateStart:  new Date(dateStart_loc2).toString() , //this.range.controls['start'].value , //new Date(this.range.controls['start'].value),
        dateEnd:   new Date(end_date_check).toString()// new Date(dateEnd_loc2).toString() //this.range.controls['end'].value , //new Date(this.range.controls['end'].value)
      })

      if (this.isValidDate(new Date(dateStart_loc).toLocaleString()) || this.isValidDate(new Date(dateEnd_loc).toLocaleString()) || startDate > endDate) {
        return false;
      }else{
        if(dateStart_loc <= dateEnd_loc){
          // console.log('the date : ', dateStart_loc, ' is more than', dateEnd_loc);
          return true;
        } else {

          return false;
        }
      }
    }else{
      return true
    }


  }

  isValidDate(dateString: string): boolean {
    // Parse the date string
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in Date object
    const year = parseInt(parts[2], 10);

    // Create a new Date object
    const date = new Date(year, month, day);

    // Check if the Date object is valid
    // - If the date string is in a valid format
    // - If the date values extracted from the string represent a valid date
    return (
      parts.length === 3 &&
      !isNaN(date.getTime()) &&
      date.getDate() === day &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  }


}
