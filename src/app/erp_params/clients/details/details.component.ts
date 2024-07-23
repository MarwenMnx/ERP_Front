
import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormControl , FormsModule, FormGroup, AbstractControl} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, AsyncPipe, NgFor, NgIf} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StandartAutocompleteComponent } from '../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { onBlurInputMontant } from 'src/app/global-functions';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { DocumentsComponent } from '../../products/documents/documents.component';
import { Product } from '../../products/models/product.model';
import { FraisComponent } from '../../products/frais/frais.component';
import { Output, EventEmitter } from '@angular/core';
import { Client } from '../models/client.model';
import { UtilService } from 'src/app/utils/UtilService.service';


export interface CountryState{
  name: string,
  population: string,
  flag: string,
}

@Component({
  selector: 'vex-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],

  standalone: true,
  animations: [fadeInUp400ms],
  imports: [
    MatFormFieldModule, MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    CommonModule,
    FraisComponent,
    DocumentsComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe,
    StandartAutocompleteComponent,
 
  ]
})

//component DetailsCompoenent 


export class DetailsComponent  {
  // displayListForm!: FormGroup;
  // countries: any [];
  // states: any[];
  // cities: any [];
  @Input() displayOnlyAdress:Boolean = false
  listStatusProspections = this.utilService.parseEnumToObject("enum_statusProspection")
  listModeReglements = this.utilService.parseEnumToObject("enum_modeReglement")

  @Input() control: AbstractControl<any, any> | null = new FormControl();

  getControl(controlName: string): FormControl | null {
    if (this.parentForm && this.parentForm.get(controlName) instanceof FormControl) {
      return this.parentForm.get(controlName) as FormControl;
    } else {
      return null;
    }
   
  }

  @Input() parentForm:any = new FormControl();

  @Input() allPays:any[] = []
  @Input() gouvernoratsFiltree:any[] = []
  @Input() delegationsFiltree:any[] = []
  @Input() localitesFiltree:any[] = []
  @Input() defaults:any = new Client()

  constructor(private utilService:UtilService) {};

  @Output() newItemEvent = new EventEmitter<[string, Object]>();
  
  addChangeEvent(newValue:any) {
    //newValue[0]: key of form
    //newValue[1]: value of form
    this.newItemEvent.emit([newValue[0], newValue[1]]);
  }
  
  selectCtrl: UntypedFormControl = new UntypedFormControl();

  stateCtrl = new UntypedFormControl();

   // Event handler for the blur event (hover out)
  onBlur(event: any) {
    onBlurInputMontant(event)
  }

}
