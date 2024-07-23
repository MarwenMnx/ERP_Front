import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import {formatDate} from "@angular/common";

@Directive({
  selector: "[appYearSelector]"
})
export class YearSelectorDirective {
  @HostListener("keyup", ["$event"]) onPress() {

    let res_date = formatDate(this.ngControl?.control?.value, "dd/MM/yyyy", 'en')
     console.log(this.ngControl?.control?.value,"***************", res_date)
   //this.ngControl?.control?.setValue(res_date);
   // this.ngControl?.control?.setValue(new Date());

   //  // this.cdr.detectChanges();
   //  const parsedDate = new Date(formatDate(this.ngControl?.control?.value._i,"DD/MM/YYYY",'en'));
   //  console.log("55555555555555555555555555555555555555555555" +parsedDate)
   //  console.log( this.ngControl?.control?.value._i)
   //
   //  this.ngControl?.control?.setValue(parsedDate);
   //  console.log("55555555555555555555555555555555555555555555" )
  }

  constructor(private ngControl: NgControl) {}
}
