import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { CountryState } from '../../../../forms/form-elements/form-elements.component';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UtilService } from '../UtilService.service';

@Component({
  selector: 'vex-libelle',
  templateUrl: './libelle.component.html',
  styleUrls: ['./libelle.component.scss'],
  standalone: true,
  imports: [
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe
  ]
})
export class LibelleComponent {
  @Input() value: number = 0;
  @Input() libelle: string = "";

  constructor(private fb: FormBuilder, public utilService:UtilService){
    
  }
}
