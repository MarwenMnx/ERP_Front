import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';

import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter } from 'stream';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/utils/shared.module';
import { DocumentAchat } from '../../models/document-achat.model';
import { dateVaidator, getDateByForma, getDateInput, isObjectIdMongoose, notEqualToZero, roundmMontantString, showAlertError, showAlertSucess, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { TokenService } from 'src/app/services/token.service';
import { Lettrage, Reglement } from 'src/app/erp_params/reglements/models/reglement.model';
import { ReglementHttpService } from 'src/app/erp_params/reglements/services/reglement-http.service';
import { BanqueHttpService } from 'src/app/erp_params/banque/services/banque-http.service';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { Banque, IBanqueCollection } from 'src/app/erp_params/banque/models/banque.model';
import { CompteBancaires, ICompteBancaires } from 'src/app/erp_params/compteBancaires/models/compteBancaires.model';

@Component({
  selector: 'vex-code-barre-create-update',
  templateUrl: './reglements-create-update.component.html',
  styleUrls: ['./reglements.component.scss'],
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
    MatOptionModule,
    MatDatepickerModule,
    SharedModule,
    StandartAutocompleteComponent
  ],
  providers:
    [
      { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class ReglementsCreateUpdateComponent implements OnInit {

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  static id = 0
  form: FormGroup = this.fb.group({
    _id: [this.data?.reglement?._id || ReglementsCreateUpdateComponent.id++ + ''],
    numero: [this.data?.reglement?.numero || ''],
    // numero: [this.data?.reglement?.numero || 'Nouveau'] ,
    date: [this.data?.reglement?.date || new Date(), [Validators.required, dateVaidator]],
    fournisseur: [this.data?.document?.fournisseur || {}],
    client: [this.data?.document?.client || {}],
    modeReglement: [this.data?.reglement?.modeReglement || '1'],
    montant: [this.data?.reglement?.montant || this.data?.document?.resteAPayer, [notEqualToZero()]],
    dateEcheance: [this.data?.reglement?.dateEcheance || null, [dateVaidator]],
    compteBancaire: [this.data?.reglement?.compteBancaire || ''],
    agence: [this.data?.reglement?.agence || ''],
    banque: [this.data?.reglement?.banque || ''],
    numPiece: [this.data?.reglement?.numPiece || ''],
    titulaire: [this.data?.reglement?.titulaire || ''],
    note: [this.data?.reglement?.note || ''],
    exercice: [this.data?.reglement?.exercice || ''],
    code_societe: [this.data?.reglement?.code_societe || ''],
    code_exercice: [this.data?.reglement?.code_exercice || ''],
    code_depotpv: [this.data?.reglement?.code_depotpv || ''],
    depotpv: [this.data?.reglement?.depotpv || {}],
    sessionCaisse: [this.data?.reglement?.sessionCaisse || {}],
    lettrageReglement: [this.data?.reglement?.lettrageReglement || {}],
    utilisateur: [this.data?.reglement?.utilisateur || {}],
  });

  mode: 'create' | 'update' = 'create';

  changeModeReglement() {
    if (this.form.controls['modeReglement'].value != '1') {
      this.form.patchValue({
        dateEcheance: new Date(),
        compteBancaire: null,
        banque: null,
        numeroPiece: null,
        titulaire: null
      })
    } else {
      this.form.patchValue({
        dateEcheance: null,
        compteBancaire: '',
        banque: '',
        numeroPiece: '',
        titulaire: '',
      })
    }
  }

  getDateFormat(date: Date) {
    return getDateInput(date)
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any | undefined,
    private banqueServiceHttp: BanqueHttpService,
    private reglementHTTPService: ReglementHttpService,
    private dialogRef: MatDialogRef<ReglementsCreateUpdateComponent>,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {
    if (data.isDocumentAchat) {
      this.banqueServiceHttp.GetCollections().subscribe((res) => {
        if (res.OK) {
          this.allBanques = res.RESULTAT
          this.setCompteBancaires()
        }
      });
    } else {
      this.banqueServiceHttp.GetAll().subscribe((res) => {
        if (res.OK) {
          this.allBanques = res.RESULTAT
          // this.allBanques = this.banqueServiceHttp.getData(res.RESULTAT)
          //this.setCompteBancaires()
        }
      });
    }

  }

  newItemEvent(newValue: any) {
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }

    if (["banque"].includes(newValue[0]) && this.data.isDocumentAchat) {
      this.setCompteBancaires()
    }
  }

  allBanques: IBanqueCollection[] | Banque[] = []
  allCompteBancaires: CompteBancaires[] = []
  setCompteBancaires() {
    let idBanque = this.form.value.banque ? this.form.value.banque._id : null
    let idCompteBancaire = this.form.value.compteBancaire ? this.form.value.compteBancaire._id : null
    let banque: IBanqueCollection | undefined | Banque = this.allBanques.find((x: IBanqueCollection | Banque) => x._id == idBanque)
    if (!banque) {
      this.form.controls['banque'].setValue("")
      this.form.controls['compteBancaire'].setValue("")
      this.allCompteBancaires = []
      return
    }
    this.allCompteBancaires = (banque as IBanqueCollection).compteBancaires
    let compteBanque = this.allCompteBancaires.find((x: ICompteBancaires) => x._id == idCompteBancaire)
    if (!compteBanque) {
      this.form.controls['compteBancaire'].setValue("")
      return
    }
  }

  ngOnInit() {
    if (this.data?.reglement) {
      this.mode = 'update';
    } else {
      this.form.patchValue(
        {
          exercice: this.tokenService.getCodeExercice(),
          code_societe: this.tokenService.getCodeSociete(),
          code_exercice: this.tokenService.getCodeExercice(),
          code_depotpv: this.tokenService.getCodePointeVente(),
          depotpv: this.tokenService.pointVenteCourante,
          sessionCaisse: this.tokenService.sessionCaisseCourante,
          utilisateur: {
            _id: this.tokenService.user?._id,
            nom: this.tokenService.user?.nom,
            email: this.tokenService.user?.email,
          }
        }
      )
    }

    console.log(this.form.value.date);
    

    this.form.get('modeReglement')?.valueChanges.subscribe((value) => {
      this.changeModeReglement()
    });
  }

  save() {
    if (!this.form.valid) return
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    const item: Reglement = this.form.value;
    item.numero = undefined
    if (!isObjectIdMongoose(this.data?.document?._id)) {
      let lettrageReglement = {
        montant_lettre: item.montant as number,
        type: this.data?.type_doc as number
      }
      item.lettrageReglement = lettrageReglement
      this.dialogRef.close(item);
    } else {
      item._id = undefined
      let document = this.data?.document
      document.type = this.data?.type_doc
      let lettrageReglement:any = {
        "montant_lettre": item.montant,
        //"type": this.data?.type_doc,
        "documents": [document]
      }
      item.lettrageReglement = lettrageReglement
      item.tab_reg = this.data?.tab_reg
      showLoading()
      this.reglementHTTPService.AddNew(item).subscribe((res) => {
        if (res.OK === true) {
          this.dialogRef.close(res.RESULTAT);
          succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
        } else {
          showAlertError(res.MESSAGE, res.RESULTAT)
        }
      });
    }
  }

  update() {
    const item: any = this.form.value;

    let lettrageReglement = item.lettrageReglement
    if (!isObjectIdMongoose(this.data?.document?._id)) {
      lettrageReglement.montant_lettre = item.montant
      item.lettrageReglement = lettrageReglement
      this.dialogRef.close(item);
    } else {
      lettrageReglement.montant_lettre = item.montant
      item.lettrageReglement = lettrageReglement
      item.tab_reg = this.data.tab_reg
      showLoading()
      this.reglementHTTPService.update(item).subscribe((res) => {
        if (res.OK === true) {
          this.dialogRef.close(res.RESULTAT);
          succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
        } else {
          showAlertError(res.MESSAGE, res.RESULTAT)
        }
      });
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  getMontantString(nbr: number) {
    return roundmMontantString(nbr)
  }

  onBlur(event: any, dateInput: any) {
    event.stopPropagation();
    setTimeout(() => {
      dateInput.focus();
    });
  }

}