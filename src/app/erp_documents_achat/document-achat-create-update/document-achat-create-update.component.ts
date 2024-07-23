import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { getData, getDateByForma, hideLoading, isObjectIdMongoose, notEqualToZero, onBlurInputMontant, roundmMargeNumber, roundmMontantNumber, roundmTauxNumber, showAlertError, showConfirmationDialog, showConfirmationDialogAsync, showLoading } from 'src/app/global-functions';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/utils/shared.module';
import { ComposantsComponent } from 'src/app/erp_params/products/composants/composants.component';
import { StocksComponent } from 'src/app/erp_params/products/stocks/stocks.component';
import { CodebarreComponent } from 'src/app/erp_params/products/codebarre/codebarre.component';
import { PromotionremiseComponent } from 'src/app/erp_params/products/promotionremise/promotionremise.component';
import { Promotionremise2Component } from 'src/app/erp_params/products/promotionremise2/promotionremise2.component';
import { HistoriqueachatComponent } from 'src/app/erp_params/products/historiqueachat/historiqueachat.component';
import { FideliteComponent } from 'src/app/erp_params/products/fidelite/fidelite.component';
import { DocumentsComponent } from 'src/app/erp_params/products/documents/documents.component';
import { StandartAutocompleteComponent } from 'src/app/utils/autocompletes/standart-autocomplete/standart-autocomplete.component';
import { TestFormComponent } from 'src/app/erp_params/products/product-create-update/test-form.component';
import { Product } from 'src/app/erp_params/products/models/product.model';
import { ProductHttpServiceService } from 'src/app/erp_params/products/services/product-http-service.service';
import { CategorieHttpService } from 'src/app/erp_params/categories/services/categorie-http.service';
import { MarqueHttpService } from 'src/app/erp_params/marque/services/marque-http.service';
import { UniteHttpService } from 'src/app/erp_params/unite/services/unite-http.service';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { TauxTvaHttpService } from 'src/app/erp_params/taux-tva/services/taux-tva-http.service';
import { Famille } from 'src/app/erp_params/familles/models/famille.model';
import { SousFamille } from 'src/app/erp_params/sous-famille/models/sous-famille.model';
import { Unite } from 'src/app/erp_params/unite/modeles/unite.model';
import { Tauxtva } from 'src/app/erp_params/taux-tva/models/tauxTva.model';
import { EmplacementTable } from 'src/app/erp_params/products/models/emplacement.model';
import { FraisTable } from 'src/app/erp_params/products/models/frais.model';
import { FraisComponent } from 'src/app/erp_params/products/frais/frais.component';
import { DocumentAchat, LigneDocumentAchat } from '../models/document-achat.model';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { Fournisseur } from 'src/app/erp_params/fournisseurs/models/fournisseur.model';
import { LigneDocumentAchatComponent } from '../components/ligne-document-achat/ligne-document-achat.component';
import { ReglementsComponent } from '../components/reglements/reglements.component';

import { AppDateAdapter, APP_DATE_FORMATS } from '../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FournisseurHttpService } from 'src/app/erp_params/fournisseurs/services/fournisseur-http.service';
import { DocumentAchatHttpService } from '../services/document-achat-http.service';
import { DocumentAchatService } from '../services/document-achat.service';
import { TokenService } from 'src/app/services/token.service';
import { BanqueHttpService } from 'src/app/erp_params/banque/services/banque-http.service';
import { IBanqueCollection } from 'src/app/erp_params/banque/models/banque.model';
import { ArticlesDepotPvHttpService } from 'src/app/erp_params/article-depotpvs/services/articles-depot-pv-http.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { InputNumberRoundComponent } from 'src/app/utils/input-number-round/input-number-round.component';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { DataParamRoute } from 'src/app/erp_documents_vente/models/data.model';
import { Transporteur } from 'src/app/erp_flotte/transporteur/models/transporteur.model';
import { enum_type_transport } from 'src/app/global-enums';
import { ModalDocLignesComponent } from 'src/app/erp_documents_vente/components/modal-doc-lignes/modal-doc-lignes.component';
import { LigneDocumentAchatService } from '../services/ligne-document-achat.service';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import { ListeLigneAccordionComponent } from 'src/app/erp_documents_vente/components/liste-ligne-accordion/liste-ligne-accordion.component';
import { Reglement } from 'src/app/erp_params/reglements/models/reglement.model';

@Component({
  selector: 'vex-document-achat-create-update',
  templateUrl: './document-achat-create-update.component.html',
  styleUrls: ['./document-achat-create-update.component.scss'],
  standalone: true,
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    InputNumberRoundComponent,
    LigneDocumentAchatComponent,
    RouterLink,
    SharedModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgFor,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AsyncPipe,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
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
    ComposantsComponent,
    StocksComponent,
    CodebarreComponent,
    PromotionremiseComponent,
    Promotionremise2Component,
    HistoriqueachatComponent,
    FideliteComponent,
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
    TestFormComponent,
    ReglementsComponent,
    MatDatepickerModule,
    FiltreAutocompletSelectAllComponent,
    ListeLigneAccordionComponent
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
export class DocumentAchatCreateUpdateComponent {

  selectedTabIndex: number = 0;

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  showChauffeurIntern = true;
  showChauffeurInternFn() {
    this.form.value.type_transport == '1' ? this.showChauffeurIntern = true : this.showChauffeurIntern = false
  }

  downloadDocumentPrecedent() {
    if (!this.form.value.documentPrecedent || this.form.value.documentPrecedent.length === 0) {
      showAlertError("Aucun document précédent", "")
      return
    }
    let doc = JSON.parse(JSON.stringify(this.form.value.documentPrecedent))
    showConfirmationDialog('Comfirmation', 'Êtes-vous sûr de vouloir de télécharger la liste d\'articles " ' + doc[0].numero + ' " ?')
      .then((result) => {
        if (result.isConfirmed) {
          this.setDocument(this.form.value.documentPrecedent[0], false)
          if (this.isCreateMode()) {
            this.form.patchValue({ numero: "" })
            this.form.patchValue({ date: new Date() })
          } else {
            this.form.patchValue({ numero: this.defaults.numero })
            this.form.patchValue({ date: this.defaults.date })
          }
          this.form.patchValue({ isDownloadDocumentPrecedent: true })
          setTimeout(() => {
            this.form.patchValue({ documentPrecedent: doc })
          })
        } else {
          // User cancelled, handle accordingly
        }
      });
  }

  openModalDetailDocumentPrecedent() {
    if (!this.form.value.documentPrecedent || this.form.value.documentPrecedent.length === 0) {
      showAlertError("Aucun document précédent", "")
      return
    }
    let doc = JSON.parse(JSON.stringify(this.form.value.documentPrecedent))

    this.dialog
      .open(ModalDocLignesComponent, {
        data: {
          document: doc[0],
          withCheckQuantiteRestante: this.dataParams.withCheckQuantiteRestante
        },
      })
      .afterClosed()
      .subscribe((item: any) => {
        if (item) {
          this.downloadDocumentPrecedent()
        }
      });
  }

  set_SelectedList(event: any) {
    this.form.patchValue({ documentPrecedent: event })
  }

  async downloadDocumentPrecedentMultiple() {
    let docsPrecedents = this.form.value.documentPrecedent
    let ids: string[] = []

    docsPrecedents = docsPrecedents.forEach((x: DocumentAchat) => {
      x.table = this.dataParams.tableDocumentPrecedent
      ids.push(x._id)
    })

    this.form.patchValue({docsPrecedents:docsPrecedents})
    if (!ids || ids.length === 0) {
      showAlertError("Aucun document précédent", "")
      this.lignesVertualFacture = []
      this.form.patchValue({ lignes: [], isDownloadDocumentPrecedent: false })
      this.changeTotals()
      return
    }

    showLoading()
    let docsWithLignes = await this.getAllDocuementsPrecedentsWithLignes(ids)
    //let docsWithLignes:any = []
    //for(let id of ids){
    //  let resultat: DocumentAchat | null = await this.getDetails(id, this.dataParams.apiGetMultipleDocumentPrecedent)
    //  docsWithLignes.push(resultat)
    //}
    hideLoading()

    let regs:any = []

    docsWithLignes.forEach((x: DocumentAchat) => {
      x.reglements.forEach((y:any) => {
        regs = this.pushReglements(regs, y)
      })
    })
    //let docs = this.form.value.documentPrecedent
    let docs: DocumentAchat[] = docsWithLignes

    let items: LigneDocumentAchat[] = []
    if (docs.length > 0) {
      for (let i = 0; i < docs.length; i++) {
        docs[i].lignes.forEach((x: LigneDocumentAchat) => {
          x.numeroDateDoc = docs[i].numero + " - " + getDateByForma(docs[i].date)
          x.id_document_precedent = docs[i]._id
          items.push(x)
        })
      }
    }

    this.form.patchValue({ lignes: items, isDownloadDocumentPrecedent: items.length > 0 })
    this.lignesVertualFacture = JSON.parse(JSON.stringify(items))

    if(this.dataParams.withReglementDocPrecedent === true){
      this.form.patchValue({reglements:regs})
    }

    this.changeTotals()
  }

  pushReglements(regs:Reglement[], newReg:Reglement):Reglement[]{
    if(isObjectIdMongoose(newReg._id)){
      if(!this.form.value.reglements || this.form.value.reglements.findIndex((x:any) => x._id === newReg._id) == -1){
        regs.push(newReg)
      }   
    }
    return regs
  }

  avecRegroupementLignesFN(avecRegroupementLignes?: Boolean) {

    avecRegroupementLignes = avecRegroupementLignes ? avecRegroupementLignes : this.form.value.avecRegroupementLignes

    if (!this.form.value.lignes) {
      return
    }

    if (avecRegroupementLignes === false) {
      this.lignesVertualFacture = this.form.value.lignes
      return
    }
    let lignes = JSON.parse(JSON.stringify(this.form.value.lignes))

    this.lignesVertualFacture = this.ligneDocumentAchatService.regroupementLigneDocument(lignes)
  }

  async newItemEvent(newValue: any) {
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
    if (["lignes", "reglements"].includes(newValue[0])) {
      this.changeTotals()
    }
    if (["fournisseur"].includes(newValue[0])) {
      this.checkSoldeFournisseur()
      if (this.form.value.fournisseur && this.form.value.fournisseur._id && this.dataParams.withDocumentPrecedent) {
        showLoading()
        this.allDocsPrecedents = await this.getAllDocuementsPrecedentsByFournisseur(this.form.value.fournisseur._id)
        this.allDocsPrecedents = this.allDocsPrecedents.map(doc => ({
          ...doc,
          numeroDate: doc.numero + " - " + getDateByForma(doc.date)+ (doc.numeroDocFournisseur ? "("+doc.numeroDocFournisseur+")" : "")
        }));
        hideLoading()
      } else {
        this.allDocsPrecedents = []
      }
      this.form.patchValue({ documentPrecedent: [] })
      this.form.patchValue({ isDownloadDocumentPrecedent: false })
      this.form.patchValue({ lignes: [] })
      this.changeTotals()
    }
  }

  async selectDocumentPrecedent(newValue: any) {
    if (this.form.value.documentPrecedent && this.form.value.documentPrecedent.length > 0) {
      await showConfirmationDialogAsync('Comfirmation', 'Êtes-vous sûr de vouloir de changer la document ?')
        .then((result) => {
          if (result.isConfirmed) {
            this.confirmSelectDocumentPrecedent(newValue)
          } else {
            if (this.form.value.documentPrecedent && this.form.value.documentPrecedent.length > 0) {
              let doc = this.form.value.documentPrecedent
              this.form.patchValue({ documentPrecedent: [] })
              setTimeout(() => {
                doc[0].numeroDate = doc[0].numero + " - " + getDateByForma(doc[0].date)+ ( doc[0].numeroDocFournisseur ? "("+doc[0].numeroDocFournisseur+")" : "")
                this.form.patchValue({ documentPrecedent: doc })
              })
            }
          }
        });
    } else {
      await this.confirmSelectDocumentPrecedent(newValue)
    }
  }

  async confirmSelectDocumentPrecedent(newValue: any) {
    if (!newValue[1]) {
      this.form.patchValue({ documentPrecedent: [] })
      this.form.patchValue({ lignes: [] })
      this.form.patchValue({ isDownloadDocumentPrecedent: false })
      this.changeTotals()
      return
    }
    showLoading()
    let doc = await this.getDetails(newValue[1]._id, this.dataParams.apiGetDocumentsPrecedentByTier)
    this.form.patchValue({ isDownloadDocumentPrecedent: false })
    this.form.patchValue({ lignes: [] })
    if (doc) doc.table = this.dataParams.tableDocumentPrecedent
    this.form.patchValue({ documentPrecedent: [doc] })
    this.changeTotals()
    hideLoading()
  }

  changeTotals() {

    let totals: any = {
      totalRemise: 0,
      totalFodec: 0,
      totalDC: 0,
      totalRedevance: 0,
      totalHT: 0,
      totalNetHT: 0,
      totalBrutHT: 0,
      totalTVA: 0,
      totalTTC: 0,
      resteAPayer: 0,
      totalPayer: 0,
      timbreFiscale:0
    }

    let lignes = this.form.controls['lignes'].value ? this.form.controls['lignes'].value : []
    let reglements = this.form.controls['reglements'].value ? this.form.controls['reglements'].value : []
    try {

      for (let item of lignes) {
        for (let key in totals) {
          if(item[key])
          totals[key] += roundmMontantNumber(item[key])
        }
      }

      totals.resteAPayer = totals.totalTTC
      totals.totalPayer = 0

      for (let item of reglements) {
        totals.totalPayer += Number(item.montant)
      }
      
      if(this.dataParams?.withTimbreFiscal == true && this.tokenService.societeCourante.exemptTimbreFiscale == true){
        totals.timbreFiscale = this.tokenService.exerciceCourante?.timbreFiscale ? this.tokenService.exerciceCourante?.timbreFiscale : 0
        totals.totalTTC += Number(totals.timbreFiscale)
      }

      totals.resteAPayer = Number(totals.totalTTC) - Number(totals.totalPayer)

    } catch (e) {
      console.log(e);

    }
    for (let key in totals) {
      totals[key] = roundmMontantNumber(totals[key])
    }
    this.form.patchValue(totals)
    this.checkSoldeFournisseur()
    InputNumberChangeObservibalService.submitChangeInput()
  }

  form: FormGroup = this.fb.group({
    _id: '',
    numero: '',
    date: [new Date, Validators.required],
    fournisseur: ['', Validators.required],
    type_transport: enum_type_transport.INTERNE,
    chauffeur: [''],
    vehicule: [''],
    nom_chauffeur: [''],
    matricule_vehicule: [''],
    depotpv: '',
    sessionCaisse: '',
    utilisateur: '',
    totalRemise: 0,
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    totalGainCommerciale: 0,
    totalGainReel: 0,
    timbreFiscale: 0,
    totalBrutHT: 0,
    totalRedevance: 0,
    totalFodec: 0,
    totalDC: 0,
    resteAPayer: 0,
    exercice: '',
    bloque: false,
    totalNetHT: 0,
    totalPayer: 0,
    documentPrecedent: [],
    isDownloadDocumentPrecedent: false,
    documentSuivant: [],
    numeroDocFournisseur: ['', this.conditionallyRequiredValidator()],
    dateDocFournisseur: ['', this.conditionallyRequiredValidator()],
    pieceJointe: '',
    notes: '',
    code_societe: '',
    code_exercice: '',
    code_depotpv: false,
    lignes: [],
    reglements: [],
    avecRegroupementLignes: false
  });

  conditionallyRequiredValidator() {
    return (control:any) => {
      if (this.dataParams && this.dataParams.withControlDocEtDateFournisseur === true) {
        return Validators.required(control);
      } else {
        return null; // Return null if not required
      }
    };
  }

  isOpenPanelPlusDetails = false

  mode: 'create' | 'update' = 'create';

  public defaults: DocumentAchat = new DocumentAchat(null)
  private routeSub: Subscription;
  private id: string = ''

  dataParams: DataParamRoute = new DataParamRoute()

  constructor(
    private dialog: MatDialog,
    public  utilService: UtilService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private productServiceHttp: ProductHttpServiceService,
    private serviceHttp: DocumentAchatHttpService,
    private fournisseurServiceHttp: FournisseurHttpService,
    private service: DocumentAchatService,
    private route: ActivatedRoute,
    private articlesDepotPvHttpService: ArticlesDepotPvHttpService,
    private ligneDocumentAchatService: LigneDocumentAchatService,
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id']
        this.mode = 'update';
      }
    });

    this.route.data.subscribe((data: any) => {
      this.dataParams = data; // Accessing the 'title' from the route data
    });
  }

  allArticles: ArticleDepotPvs[] = [];
  allFournisseurs: Fournisseur[] = [];
  allTransporteurs: Transporteur[] = [];
  allVehicules: any[] = [];
  allDocsPrecedents: DocumentAchat[] = [];
  lignesVertualFacture: LigneDocumentAchat[] = []

  async getDetails(id: string, uriDocApi?: string): Promise<DocumentAchat | null> {
    return new Promise((resolve) => {
      this.serviceHttp.GetDetails(id, uriDocApi).subscribe((res) => {
        if (res.OK) {
          resolve(res.RESULTAT)
        } else {
          resolve(null)
          showAlertError(res.MESSAGE, res.RESULTAT);
        }
      });
    });
  }

  async setDocument(document: DocumentAchat | undefined | null, withChangeDocOriginal: boolean) {
    if (!document) return
    let resultat = document
    resultat.lignes.forEach((res: any) => {
      res.isQte1 = (!res.quantite || res.quantite && res.quantite == res.quantiteUnite1) ? true : false;
      res.isQte2 = (!res.quantite || res.quantite && res.quantite == res.quantiteUnite2) ? true : false;
    });

    if (withChangeDocOriginal === false) {
      resultat.documentPrecedent = []
      resultat.documentSuivant = []
      resultat.reglements = []
      resultat.totalPayer = 0
      resultat.resteAPayer = resultat.totalTTC
      resultat._id = ''
    }

    if (withChangeDocOriginal === true) {
      this.defaults = JSON.parse(JSON.stringify(resultat))
    }

    this.form.patchValue(resultat);
    if (this.defaults.documentPrecedent && this.defaults.documentPrecedent.length > 0) {
      let docs = this.form.value.documentPrecedent
      docs = docs.map( (x:any)=>{
        x.numero = !x.numeroDocFournisseur ? x.numero : x.numero+"("+x.numeroDocFournisseur+")"
      })    
      this.form.patchValue({ isDownloadDocumentPrecedent: true })
    }

    InputNumberChangeObservibalService.submitChangeInput()
    this.showChauffeurInternFn()
  }

  async getAllFournisseurs() {
    return new Promise((resolve) => {
      this.fournisseurServiceHttp.GetAll().subscribe((res) => {
        this.allFournisseurs = this.fournisseurServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getAllDocuementsPrecedentsByFournisseur(idFournisseur: string): Promise<DocumentAchat[]> {
    return new Promise((resolve) => {
      if (!this.dataParams.apiGetDocumentsPrecedentByTier) {
        resolve([])
        return
      }
      
      this.serviceHttp.GetAll(this.dataParams.apiGetDocumentsPrecedentByTier, idFournisseur, undefined, this.dataParams?.getDocPrecedentbloquante).subscribe((res) => {
        if (res.OK) {
          let allDocsPrecedents = this.serviceHttp.getData(res.RESULTAT);
          resolve(allDocsPrecedents)
        } else {
          resolve([])
        }
      });

    });
  }

  async getAllDocuementsPrecedentsWithLignes(ids: string[]): Promise<DocumentAchat[]> {
    return new Promise((resolve) => {
      this.serviceHttp.GetAllMultipleDocs(this.dataParams.apiGetMultipleDocumentPrecedent, ids).subscribe((res) => {
        if (res.OK) {
          let allDocsPrecedents = this.serviceHttp.getData(res.RESULTAT);
          resolve(allDocsPrecedents)
        } else {
          resolve([])
        }
      });
    });
  }

  async getAllArticlesByDepotPVPourDocumentAchat() {
    return new Promise((resolve) => {
      this.articlesDepotPvHttpService.getAllArticlesByDepotPVPourDocumentAchat(undefined, undefined, undefined, undefined, true).subscribe((res) => {
        this.allArticles = this.articlesDepotPvHttpService.getDataArticleDepotPvss(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async ngOnInit() {
    showLoading()
    if (this.id) {
      let resultat: DocumentAchat | null = await this.getDetails(this.id, this.dataParams.uriDocApi)
      if (!resultat) return
      this.setDocument(resultat, true)
      this.allDocsPrecedents = await this.getAllDocuementsPrecedentsByFournisseur(this.form.value.fournisseur._id)
      this.allDocsPrecedents = this.allDocsPrecedents.map(doc => ({
        ...doc,
        numeroDate: doc.numero + " - " + getDateByForma(doc.date)+ (doc.numeroDocFournisseur ? "("+doc.numeroDocFournisseur+")" : "")
      }));
      /*let docsPrecedents = this.form.value.documentPrecedent
      for(let i = 0; i < docsPrecedents.length; i++){
        let doc = this.allDocsPrecedents.find( y => y._id === docsPrecedents[i]._id)
        if(doc) docsPrecedents[i] = doc
      }

      this.form.patchValue({documentPrecedent:docsPrecedents})
      */
      let lignes = this.form.value.lignes
      let avecRegroupementLignes = true
      lignes.forEach((x: LigneDocumentAchat) => {
        if (isObjectIdMongoose(x.id_document_precedent)) {
          let doc = resultat?.documentPrecedent?.find(y => y._id === x.id_document_precedent)
          if (doc) {
            x.numeroDateDoc = doc.numero + " - " + getDateByForma(doc.date)
            avecRegroupementLignes = false
          }
        }
      })
      this.lignesVertualFacture = JSON.parse(JSON.stringify(lignes))
      this.form.patchValue({ lignes: lignes, avecRegroupementLignes: avecRegroupementLignes })
    } else {
      this.form.patchValue(
        {
          exercice: this.tokenService.getCodeExercice(),
          code_societe: this.tokenService.getCodeSociete(),
          code_exercice: this.tokenService.getCodeExercice(),
          code_depotpv: this.tokenService.getCodePointeVente(),
          depotpv: this.tokenService.pointVenteCourante,
          utilisateur: this.tokenService.user,
          sessionCaisse: this.tokenService.sessionCaisseCourante,
        }
      )
    }
    await this.getAllFournisseurs()
    await this.getAllArticlesByDepotPVPourDocumentAchat()
    hideLoading()
  }

  async restartAllArticles(){
    showLoading()
    await this.getAllArticlesByDepotPVPourDocumentAchat()
    hideLoading()
  }

  save() {
    if(this.dataParams.withBlockageIfExisteDocSuivante === true && this.form.value.documentSuivant && this.form.value.documentSuivant.length && this.form.value.documentSuivant.length > 0){
      showAlertError('Erreur!', 'On ne peut pas continuer car il existe un document suivant.');
      return
    }
    if (!this.checkSoldeFournisseur()) return

    if(this.dataParams.withControlDocEtDateFournisseur === true){
      if(!this.form.value.numeroDocFournisseur){
        showAlertError('Erreur!', 'Le numéro de document fournisseur est manquant.');
        return
      }else if(!this.form.value.dateDocFournisseur){
        showAlertError('Erreur!', 'Il manque la date du document fournisseur.');
        return
      }
    }

    if (!this.form.valid || this.form.controls['totalTTC'].value == 0) {
      StandartAutocompleteService.submitFormAutocomplete()
      if (!this.form.controls['fournisseur'].value) {
        showAlertError('Erreur!', 'Veuillez selectionner le fournisseur.');
      } else if (this.form.controls['totalTTC'].value == 0) {
        showAlertError('Erreur!', 'Veuillez remplir l\'article et la quantite puis clicker sur le button "Ajouter Ligne Article".');
      } else {
        showAlertError('Erreur!', 'Veuillez remplir correctement les champs obligatoires du formulaire.');
      }
      return
    }

    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {
    showLoading()
    const item = this.service.remove_id(this.form.value);

    let setdateReel = this.utilService.setDateReel(item.date)
    item.date = setdateReel

    this.serviceHttp.AddNew(item, this.dataParams.uriDocApi).subscribe((res) => {
      this.service.successCreate(res, this.dataParams.pageList)
    });
  }

  update() {
    showLoading()
    const item = this.service.remove_IdInSousList(this.form.value);

    let setdateReel = this.utilService.setDateReel(item.date)
    item.date = setdateReel

    this.serviceHttp.update(item, this.dataParams.uriDocApi).subscribe((res) => {
      this.service.successCreate(res, this.dataParams.pageList)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  // Event handler for the blur event (hover out)
  onBlur(event: any) {
    onBlurInputMontant(event)
  }

  imageData: string = '';
  image: any = null

  onFileSelect(event: Event) {
    let files: any = event.target as HTMLInputElement
    this.image = files?.files[0];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(this.image);

      this.form.patchValue({ image: this.image })
    }
  }

  getFournisseur(): Fournisseur | null {
    if (this.form.controls['fournisseur'].value) {
      let fournisseur = this.allFournisseurs.find(x => x._id === this.form.controls['fournisseur'].value._id)
      if (fournisseur)
        return fournisseur
    }
    return null
  }

  checkSoldeFournisseur() {
    if(this.dataParams.withCheckSolde == true){
      if(this.dataParams.withNotCheckSoldeIfWithDocPrecedent !== true || !this.form.value.documentPrecedent || (!this.form.value.documentPrecedent || !this.form.value.documentPrecedent.length || this.form.value.documentPrecedent.length === 0)){
        return this.service.checkSoldeFournisseur(this.getFournisseur(), this.defaults, this.form.value)
      }
    }
    return true
  }

}

