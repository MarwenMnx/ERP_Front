import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
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
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { parseEnumToObject } from 'src/app/global-functions';
import { type_piece_jointe } from '../modeles/type-pj.model';
import { TypePieceJointeHttpService } from '../services/type-piece-jointe-http.service';
import { TypePieceJointeService } from '../services/type-piece-jointe.service';
import { enum_table_piecejointe } from 'src/app/global-enums';
import { UtilService } from 'src/app/utils/UtilService.service';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';


@Component({
  selector: 'vex-type-piece-jointe-create-update',
  templateUrl: './type-piece-jointe-create-update.component.html',
  styleUrls: ['./type-piece-jointe-create-update.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    FiltreAutocompletSelectAllComponent
  ]
})
export class TypePieceJointeCreateUpdateComponent implements OnInit {
  selectCtrl: UntypedFormControl = new UntypedFormControl();

  dataTypeDocument  = this.utilService.parseEnumToObject('enum_table_piecejointe');
  labelTextBC       = 'Type Document';
  selectedKeyBq     = 'value';//'key';
  selectedValBq     = 'key';//'value';
  preSelectedBq: any = [];

  selectedListDoc: any;

  set_SelectedList(p_SelectedList: any) {
    var resultList        = this.utilService.listStringOfArrayObject(p_SelectedList,'value')
    this.selectedListDoc  = resultList;
  }

  selectedType: any = 1;

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required],
    // tables_associer: [this.defaults?.tables_associer || '', Validators.required],
 });

  tables_associer = new FormControl();
  mode: 'create' | 'update' = 'create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: type_piece_jointe | undefined,
    private dialogRef: MatDialogRef<TypePieceJointeCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp: TypePieceJointeHttpService,
    private service: TypePieceJointeService,
   public utilService: UtilService,
  ) {}

  Listtypepiece: any;

  ngOnInit() {

    this.Listtypepiece = parseEnumToObject(enum_table_piecejointe);
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as type_piece_jointe;
    }

    let listSelectedPJ:any = []

    if(this.defaults.tables_associer!=undefined){
      for (const itemPj of this.defaults.tables_associer) {
        let keyPJ = this.utilService.getEnumKeyByValue('enum_table_piecejointe',itemPj)
        listSelectedPJ.push({key:keyPJ, value: itemPj})
      }
    }

     this.preSelectedBq = listSelectedPJ

    this.form.patchValue(this.defaults);
  }

  save() {

    if (!this.form.valid || this.selectedListDoc==undefined || this.selectedListDoc.length==0  ) return;
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {

    const item = this.form.value as type_piece_jointe;
    item.tables_associer = this.selectedListDoc
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef);
    });
  }

  update() {
    const item: any = this.form.value;
    item.tables_associer = this.selectedListDoc
      if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      console.log('-------------', item.tables_associer);
      this.service.successUpdate(res, this.dialogRef);
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}

