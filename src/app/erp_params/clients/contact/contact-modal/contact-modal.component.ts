import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
// import { Customer } from '../interfaces/customer.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { ClientService } from '../../services/client.service';
import { getPatternOfNumeroTelephone, hideLoading, isObjectIdMongoose, showAlertError, showLoading } from 'src/app/global-functions';
import { ClientHttpService } from '../../services/client-http.service';


@Component({
  selector: 'vex-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    StandartAutocompleteComponent,
    
  ]
})
export class ContactModalComponent implements OnInit {

  value = '';
  static id = 100;
  defaults:Contact = new Contact()
  client:any 

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
  }

  form:FormGroup = this.fb.group({
    _id: this.defaults?._id ? this.defaults._id : ContactModalComponent.id++ + "",
    typeContact :this.defaults?.typeContact || '',
    titre :[this.defaults?.titre || '', Validators.required],   
    civilite :[this.defaults?.civilite || 'Mr', Validators.required],  
    nomPrenom :[this.defaults?.nomPrenom || '', Validators.required],  
    telephone :[this.defaults?.telephone || '', [Validators.pattern(getPatternOfNumeroTelephone())]],  
    email :[this.defaults?.email || '', Validators.email], 
    remarque :this.defaults?.remarque || '', 
    mobile :[this.defaults?.mobile || '', [Validators.pattern(getPatternOfNumeroTelephone())]],  
  });
  
  mode: 'create' | 'update' = 'create';
  allTypeContact = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContactModalComponent>,
    private fb: FormBuilder,
    private service:ClientService,
    private serviceHttp:ClientHttpService
  ) {
    this.defaults = data.defaults
    this.client = data.client
    this.allTypeContact = this.service.allTypeContact
    this.service.allPaysObservable.subscribe(res => {
      this.allTypeContact = res
    })
  }

  ngOnInit() {
    if (isObjectIdMongoose(this.defaults._id)) {
      this.mode = 'update';
      this.form.patchValue(this.defaults);
    } else {
      this.defaults = new Contact(null);
    }

  }

  save() {
    if (!this.form.valid){
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }

    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    let contact:any = this.form.value;
    
    if(isObjectIdMongoose(this.client?._id)){
      contact.tiers = {_id:this.client?._id, raisonSociale:this.client?.raisonSociale} 
      showLoading()
      this.serviceHttp.AddNewContact(contact).subscribe((res) => {
        hideLoading()
        if(res.OK){
          this.dialogRef.close(res.RESULTAT);
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }else this.dialogRef.close(contact);

   
  }
  

  updateCustomer() {
    const contact = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'contact ID does not exist, this contact cannot be updated'
      );
    }

    contact._id = this.defaults._id;

    if(isObjectIdMongoose(this.client?._id)){
      contact.tiers = {_id:this.client?._id, raisonSociale:this.client?.raisonSociale} 
      showLoading()
      this.serviceHttp.updateContact(contact).subscribe((res) => {
        hideLoading()
        if(res.OK){
          this.dialogRef.close(res.RESULTAT);
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }else this.dialogRef.close(contact);

  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
