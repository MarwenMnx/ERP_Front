import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UtilService } from '../UtilService.service';
import { InputNumberChangeObservibalService } from './services/input-number-change-observibal.service';

@Directive({
  selector: '[appTauxDecimaNumber]',
})
export class TauxDecimaNumberDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];

  constructor(private el: ElementRef, private utilService: UtilService) {
    setTimeout(() =>{
      this.el.nativeElement.value = this.roundNumber();
    })
    InputNumberChangeObservibalService.submitChangeInputObservable.subscribe(res => {
      this.el.nativeElement.value = this.roundNumber();
    })
  } 

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key == 'Decimal' ? '.' : event.key,
      current.slice(position),
    ].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  @HostListener('change', ['$event'])
  onBlur(event: FocusEvent) {
    InputNumberChangeObservibalService.submitChangeInput()
    let value = this.el.nativeElement.value;
    const parsedValue = parseFloat(value);
    
    if (!isNaN(parsedValue)) {
      const formattedValue = this.roundNumber()
      this.el.nativeElement.value = formattedValue;

      // Update the FormControl value
      const formGroup = this.el.nativeElement.form;
      if (formGroup) {
        const inputControl = this.el.nativeElement.getAttribute('formControlName');
        const control = inputControl ? formGroup[inputControl] : null;
  
        if (control) {
          control.setValue(formattedValue); // Update FormControl value
        }
      }
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    // Select all text when the input field gains focus
    this.el.nativeElement.select();
  }

  roundNumber(){
    let value = this.el.nativeElement.value;
    return this.utilService.roundmTauxString(value);
  }
}
