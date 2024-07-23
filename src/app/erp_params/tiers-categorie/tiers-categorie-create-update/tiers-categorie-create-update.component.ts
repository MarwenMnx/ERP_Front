import { TiersCategorieHttpService } from './../services/tiers-categorie-http.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
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
import { tiers_categorie } from '../modeles/tiers-categorie.model';
import { TiersCategorieService } from '../services/tiers-categorie.service';
import { enum_typetiers } from 'src/app/global-enums';
import { MatSelectModule } from '@angular/material/select';
import { parseEnumToObject } from 'src/app/global-functions';

@Component({
  selector: 'vex-tiers-categorie-create-update',
  templateUrl: './tiers-categorie-create-update.component.html',
  styleUrls: ['./tiers-categorie-create-update.component.scss'],
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
    NgFor
  ]
})
export class TiersCategorieCreateUpdateComponent implements OnInit {

  selectedType: any = 1;

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required],
    typeTiers: [this.defaults?.typeTiers || '', Validators.required]
  });

  typeTiers = new FormControl();
  mode: 'create' | 'update' = 'create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: tiers_categorie | undefined,
    private dialogRef: MatDialogRef<TiersCategorieCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp: TiersCategorieHttpService,
    private service: TiersCategorieService
  ) {}
  Listtiers: any;
  ngOnInit() {
    this.Listtiers = parseEnumToObject(enum_typetiers);
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as tiers_categorie;
    }
console.log("*************" , +this.defaults.typeTiers  );

this.selectedType = this.defaults.typeTiers ;
    this.form.patchValue(this.defaults);
  }

  save() {
    if (!this.form.valid) return;
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item = this.form.value as tiers_categorie;
    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef);
    });
  }

  update() {
    const item: any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }
    this.serviceHttp.update(item).subscribe((res) => {
      console.log('-------------', item.typeTiers);
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
