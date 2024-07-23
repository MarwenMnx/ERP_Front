import { NgModule } from '@angular/core';
import { MontantDecimaNumberDirective } from './directives-input-numbers/MontantDecimaNumberDirective.directive';
import { MargeDecimaNumberDirective } from './directives-input-numbers/MargeDecimaNumberDirective.directive';
import { QuantiteDecimaNumberDirective } from './directives-input-numbers/QuantiteDecimaNumberDirective.directive';
import { TauxDecimaNumberDirective } from './directives-input-numbers/TauxDecimaNumberDirective.directive';
import { FiltreDatesComponent } from './filtre-dates/filtre-dates.component';
import { FiltreCatgFamilleSousFamilleComponent } from './filtre-catg-famille-sous-famille/filtre-catg-famille-sous-famille.component';
import { ChipsAutocompleteComponent } from './filtre-catg-famille-sous-famille/chips-autocomplete/chips-autocomplete.component';
import { ChangeAndBlurDirective } from './ChangeAndBlurDirective.directive';
import {YearSelectorDirective} from "./year-selector.directive";
import { CustomRangePanelComponent } from '../utils/date-range-picker/custom-header/custom-range-panel/custom-range-panel.component';
import { CustomHeaderComponent } from '../utils/date-range-picker/custom-header/custom-header.component';
import { DateRangePickerComponent } from '../utils/date-range-picker/date-range-picker/date-range-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {SafePipe} from "./safe.pipe";

@NgModule({
  declarations: [
    MontantDecimaNumberDirective,
    MargeDecimaNumberDirective,
    QuantiteDecimaNumberDirective,
    TauxDecimaNumberDirective,
    ChangeAndBlurDirective,
    YearSelectorDirective,
    SafePipe,
  ],
  exports: [
    MontantDecimaNumberDirective,
    MargeDecimaNumberDirective,
    QuantiteDecimaNumberDirective,
    TauxDecimaNumberDirective,
    ChangeAndBlurDirective,
    YearSelectorDirective,// Declare the directive here
    SafePipe
  ]

})
export class SharedModule { }
