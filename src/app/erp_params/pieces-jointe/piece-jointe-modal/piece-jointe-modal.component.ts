import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { getPatternOfNumeroTelephone, hideLoading, isObjectIdMongoose, showAlertError, showLoading } from 'src/app/global-functions';
import {TypePieceJointeHttpService} from "../../type-piece-jointe/services/type-piece-jointe-http.service";
import {enum_table_piecejointe} from "../../../global-enums";
import {TokenService} from "../../../services/token.service";
import {PiecesJointesHttpService} from "../services/pieces-jointes-http.service";
import {PiecesJointe} from "../models/piecesJointe.model";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from "sweetalert2";


@Component({
  selector: 'vex-piece-jointe-modal',
  templateUrl: './piece-jointe-modal.component.html',
  styleUrls: ['./piece-jointe-modal.component.scss'],
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
    MatProgressBarModule
  ]
})
export class PieceJointeModalComponent implements OnInit {

  defaults:PiecesJointe = new PiecesJointe()
  @Input() client:any

  newItemEvent(newValue:any){
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
  }

  form:FormGroup = this.fb.group({
    _id: this.defaults?._id ? this.defaults._id : undefined,
    titre :[this.defaults?.titre || '', Validators.required],
    fichier_content :[this.defaults?.fichier_content || ''],
    filename  :[this.defaults?.fichier_content || ''],
    mimetype :[this.defaults?.mimetype || ''],
    type_piecejointe :[this.defaults?.type_piecejointe || '', Validators.required]
  });

  mode: 'create' | 'update' = 'create';
  allTypeContact:any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PieceJointeModalComponent>,
    private fb: FormBuilder,  private serviceHttpTypePJ:TypePieceJointeHttpService,
    private serviceHttpPJ:PiecesJointesHttpService, private tokenService:TokenService
  ) {
    this.defaults = data.defaults
    this.client   = data.client

    let client_table = enum_table_piecejointe.CLIENT
    this.serviceHttpTypePJ.GetType_Pj_ByTable(client_table).subscribe(res => {
      this.allTypeContact =this.serviceHttpTypePJ.getData(res.RESULTAT);
    })
  }

  public obj: any = {};
  isUploadOpen = false;
  selectedFile: File | null = null ;
  file_name:any = '';
  file_type:any = '';
  file_size:any = '';
  file_content:any = '';

  async onFileSelect(input:any) {
    showLoading()
    this.isUploadOpen = true

    var extension = input.files[0].name.substr(input.files[0].name.lastIndexOf('.'));
    console.log("***********extension111111111********************")
    console.log(extension)
    console.log("***********extension22222222222********************")
    if (
      (extension.toLowerCase() == ".pdf") || (extension.toLowerCase() == ".txt") ||
      (extension.toLowerCase() == ".xlsx") || (extension.toLowerCase() == ".xls") ||
      (extension.toLowerCase() == ".doc") || (extension.toLowerCase() == ".docx") ||
      (extension.toLowerCase() == ".png") || (extension.toLowerCase() == ".jpg")
    ){
      setTimeout(() => {
        //this.selectedFile = <File>event.target.files[0];
        console.log(input.files[0]);
        const nameType: string[] = input.files[0].name.split('.');
        this.file_name = nameType[0];
        this.file_type = nameType[1] ; //input.files[0].type
        this.file_size = input.files[0].size
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e: any) => {
            console.log('Got here: ', e.target.result);
            this.file_content = e.target.result;
            // file_content = e.target.result.split(',')[1];
            this.obj.photoUrl = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
        }

        if(this.file_size > 0 && this.file_content != ""){
          this.file_content = this.file_content.split(',')[1];
          this.form.controls["filename"].setValue(this.file_name)
          this.form.controls["fichier_content"].setValue(this.file_content)
          this.form.controls["mimetype"].setValue(this.file_type)
        }

        hideLoading()

      }, 3000);

    }
    else{
      Swal.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        icon: 'error',
        //timerProgressBar,
        timer: 5000,
        title: 'Could not allow to upload this.file'
      })
    }

    this.isUploadOpen = false
  }

  ngOnInit() {

    if (isObjectIdMongoose(this.defaults._id)) {
      this.mode = 'update';
      this.form.patchValue(this.defaults);
    } else {
      this.defaults = new PiecesJointe(null);
    }

  }

  save() {
    if (!this.form.valid){
      showAlertError('Erreur!', 'Veuillez remplir correctement tous les champs du formulaire.');
      return
    }

    if (this.mode === 'create') {
      this.createPieceJointe();
    } else if (this.mode === 'update') {
      this.updatePieceJointe();
    }
  }

  createPieceJointe() {

    let set_PJ= this.form.value;

    if(isObjectIdMongoose(this.client?._id)){

      this.file_content = this.file_content.split(',')[1];

      let set_fileUpload:any = {
        "_id": this.client?._id , //"660d30f4fb544d3880beab69",
        "code_societe": this.tokenService.getCodeSociete() , //"s02",
        "groupe": "MAZRAA",
        "table": enum_table_piecejointe.CLIENT , //"clients",
        "piecejointes": {
          "titre": set_PJ.titre,
          "type_piecejointe": {
            "_id": set_PJ.type_piecejointe._id ,
            "libelle": set_PJ.type_piecejointe.libelle
          },
          "filename": this.file_name , //"passport",
          "mimetype": this.file_type , //"docx",
          "fichier_content": this.file_content , //"base64"
        }
        };
      console.log('Got herezzzzzzzzzzzzzzzzzzzzzz: ', set_fileUpload);
      showLoading()
      this.serviceHttpPJ.upload_file(set_fileUpload).subscribe((res) => {
        hideLoading()
        if(res.OK){
          this.dialogRef.close(res.RESULTAT);
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }else this.dialogRef.close(set_PJ);


  }

  updatePieceJointe() {
    // const contact = this.form.value;
    //
    // if (!this.defaults) {
    //   throw new Error(
    //     'contact ID does not exist, this contact cannot be updated'
    //   );
    // }
    //
    // contact._id = this.defaults._id;
    //
    // if(isObjectIdMongoose(this.client?._id)){
    //   contact.tiers = {_id:this.client?._id, raisonSociale:this.client?.raisonSociale}
    //   showLoading()
    //   this.serviceHttp.updateContact(contact).subscribe((res:any) => {
    //     hideLoading()
    //     if(res.OK){
    //       this.dialogRef.close(res.RESULTAT);
    //     }else{
    //       showAlertError('Erreur!', res.RESULTAT);
    //     }
    //   });
    // }else this.dialogRef.close(contact);

  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
