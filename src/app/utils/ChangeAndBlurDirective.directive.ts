import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[vexChangeAndBlur]'
})
export class ChangeAndBlurDirective {
  @Output() changeAndBlur: EventEmitter<any> = new EventEmitter();

  constructor() { }

  @HostListener('change', ['$event'])
  @HostListener('blur', ['$event'])
  onValueChangeOrBlur(event: Event) {
    console.log("onValueChangeOrBlur")
    this.changeAndBlur.emit(event);
  }
}