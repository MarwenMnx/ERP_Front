
import { Component,Input } from '@angular/core';
import {  ReactiveFormsModule, UntypedFormControl , FormsModule, AbstractControl} from '@angular/forms';
import {

  MatDialogModule,

} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {  AsyncPipe, NgFor, NgIf} from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { onBlurInputMontant } from 'src/app/global-functions';
import { Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/utils/UtilService.service';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'vex-filtre-pays-gouv-deligation-localite',
  templateUrl: './filtre-pays-gouv-deligation-localite.component.html',
  styleUrls: ['./filtre-pays-gouv-deligation-localite.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms],
  imports: [
    MatFormFieldModule, MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    StandartAutocompleteComponent,
     ]

})
export class FiltrePaysGouvDeligationLocaliteComponent {


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

