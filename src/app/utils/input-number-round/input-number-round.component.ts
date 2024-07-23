import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { UtilService } from '../UtilService.service';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'vex-input-number',
  templateUrl: './input-number-round.component.html',
  styleUrls: ['./input-number-round.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ]
})
export class InputNumberRoundComponent {

  @ViewChild('inputActive', { static: false }) inputActive!: ElementRef;
  
  @Input() parentForm:any;
  @Input() keyForm:string = "";

  showReadOnlyInput = true;

  constructor(public utilService:UtilService){}

  onInputFocus() {
    this.showReadOnlyInput = false;
    setTimeout(() => {
      this.inputActive.nativeElement.select()
    })
  }

  onInputBlur() {
    this.showReadOnlyInput = true;
  }
}
