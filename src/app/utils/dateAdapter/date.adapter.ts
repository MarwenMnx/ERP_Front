
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDateFormats,MatNativeDateModule } from '@angular/material/core';
import {DatePipe, formatDate} from '@angular/common';

export class AppDateAdapter extends NativeDateAdapter {

  //private datePipe: DatePipe
     parse(value: any): Date | null {
       if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
          const str = value.split('/');
          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const date = Number(str[0]);
          return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
      }
   format(date: Date, displayFormat: string): string {
   // date = this.datePipe.transform(date.toDateString(), 'dd-MM-yyyy')
     console.log("-->1-*********format***********> "+date)
    let res_date = formatDate(date,"dd/MM/yyyy",'en')
     return res_date ;
    /*
     console.log("-->1-********************> "+dds)
     // console.log(date.toDateString()+"-->1-********************> "+displayFormat)
       if (displayFormat == "DD/MM/YYYY") {
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
         console.log("2-********************> "+this._to2digit(day) + '/' + this._to2digit(month) + '/' + year)
          return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
       } else if (displayFormat == "MM/YYYY") {
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          return  this._to2digit(month) + '/' + year;
       } else {
           return date.toDateString();
       }
       */
   }

   private _to2digit(n: number) {
       return ('00' + n).slice(-2);
   }
/// add date static
   static formatStatic(date: Date, displayFormat: string): string {
    // date = this.datePipe.transform(date.toDateString(), 'dd-MM-yyyy')

     let res_date = formatDate(date,"dd/MM/yyyy",'en')
      return res_date ;
   }
///// new date heure function

/*nouvelle methode afficher date avec heure*/
 formatDateHeure(date: Date, displayFormat: string): string {
    // date = this.datePipe.transform(date.toDateString(), 'dd-MM-yyyy')
    console.log("date est..." + date);
     let new_date = formatDate(date,"d MMM  y, h:mm:ss",'en')
     console.log("=========" + new_date);

      return new_date ;
   }


   static parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}

export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  }
