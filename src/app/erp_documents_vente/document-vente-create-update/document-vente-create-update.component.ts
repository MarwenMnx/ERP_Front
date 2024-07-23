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
import {CommonModule, AsyncPipe, NgFor, NgIf, formatDate} from '@angular/common';
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
import { getData, getDateByForma, hideLoading, isObjectIdMongoose, notEqualToZero, onBlurInputMontant, roundmMargeNumber, roundmMontantNumber, roundmMontantString, roundmQuantiteNumber, roundmTauxNumber, showAlertError, showConfirmationDialog, showConfirmationDialogAsync, showLoading } from 'src/app/global-functions';
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
import { DataParamRoute } from '../models/data.model';

import { AppDateAdapter, APP_DATE_FORMATS } from '../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ClientHttpService } from 'src/app/erp_params/clients/services/client-http.service';
import { DocumentVente, LigneDocumentVente } from '../models/document-vente.model';
import { LigneDocumentVenteComponent } from '../components/ligne-document-vente/ligne-document-vente.component';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { ReglementsComponent } from 'src/app/erp_documents_achat/components/reglements/reglements.component';
import { DocumentVenteHttpService } from '../services/document-vente-http.service';
import { TokenService } from 'src/app/services/token.service';
import { DocumentVenteService } from '../services/document-vente.service';
import { ArticlesDepotPvHttpService } from 'src/app/erp_params/article-depotpvs/services/articles-depot-pv-http.service';
import { TransporteurHttpService } from 'src/app/erp_flotte/transporteur/services/transporteur-http.service';
import { Transporteur } from 'src/app/erp_flotte/transporteur/models/transporteur.model';
import { VehiculeHttpService } from 'src/app/erp_flotte/vehicules/services/vehicule-http.service';
import { StandartAutocompleteService } from 'src/app/utils/autocompletes/standart-autocomplete.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { InputNumberChangeObservibalService } from 'src/app/utils/directives-input-numbers/services/input-number-change-observibal.service';
import { LigneDocumentVenteService } from '../services/ligne-document-vente.service';
import { enum_type_transport, enum_type_document, enum_nomTable } from 'src/app/global-enums';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { ModalDocLignesComponent } from '../components/modal-doc-lignes/modal-doc-lignes.component';
import { FiltreAutocompletSelectAllComponent } from 'src/app/utils/filtre-autocomplet-select-all/filtre-autocomplet-select-all.component';
import data from './fakedata';
import { ListeLigneAccordionComponent } from '../components/liste-ligne-accordion/liste-ligne-accordion.component';
import { Reglement } from 'src/app/erp_params/reglements/models/reglement.model';
import {TicketHttpService} from "../../erp_params/ticket/services/ticket-http.service";

@Component({
  selector: 'vex-document-vente-create-update',
  templateUrl: './document-vente-create-update.component.html',
  styleUrls: ['./document-vente-create-update.component.scss'],
  standalone: true,
  imports: [
    ListeLigneAccordionComponent,
    MatGridListModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexPageLayoutContentDirective,
    LigneDocumentVenteComponent,
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
    FiltreAutocompletSelectAllComponent
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
export class DocumentVenteCreateUpdateComponent {
  selectedTabIndex: number = 0;

  layoutCtrl = new UntypedFormControl('fullwidth');
  selectCtrl: UntypedFormControl = new UntypedFormControl();

  isModal: Boolean = false

  enum_bon_livraison: string = enum_type_document.BON_LIVRAISON + "";
  enum_reglement_client: string = enum_type_document.REGLEMENT_CLIENT + "";

  showChauffeurIntern = true;
  showChauffeurInternFn() {
    this.form.value.type_transport == '1' ? this.showChauffeurIntern = true : this.showChauffeurIntern = false
  }

  downloadDocumentPrecedent() {
    if (!this.form.value.documentPrecedent || this.form.value.documentPrecedent.length === 0){
      showAlertError("Aucun document précédent", "")
      return
    }
    let doc = JSON.parse(JSON.stringify(this.form.value.documentPrecedent))
    showConfirmationDialog('Comfirmation', 'Êtes-vous sûr de vouloir de télécharger la liste d\'articles " ' + doc[0].numero + ' " ?')
      .then((result) => {
        if (result.isConfirmed) {
          this.setDocument(this.form.value.documentPrecedent[0], false)
          //return
          if (this.isCreateMode()) {
            this.form.patchValue({ date: new Date(), numero: "" })
            if (this.dataParams.withQuantiteRestante) {
              let lignes = this.form.value.lignes
              lignes.forEach((x: LigneDocumentVente) => {
                if(this.dataParams.withQuantiteRestante == true){
                  x.quantiteUnite1 = x.quantiteRestante || x.quantiteRestante == 0 ? x.quantiteRestante : 0
                  x.quantiteUnite2 = roundmQuantiteNumber(x.unite2 && x.article.coefficient > 0 ? x.quantiteUnite1 * x.article.coefficient : 0)
                  x.quantiteRestante = 0
                  x.quantiteLivre = 0
                }
                if(x.isQte1)
                  x.quantite = x.quantiteUnite1
                else
                  x.quantite = x.quantiteUnite2
                //x.isQte1 = (!x.quantite || x.quantite && x.quantite == x.quantiteUnite1) ? true : false;
                //x.isQte2 = (!x.quantite || x.quantite && x.quantite == x.quantiteUnite2) ? true : false;
                let x_l : any = this.changeTotalsLignes(x)
                x = x_l
              })
              this.form.patchValue({ lignes: lignes })

              this.form.patchValue(this.changeTotals(this.form.value))
              this.checkSoldeClient()
              InputNumberChangeObservibalService.submitChangeInput()

            }
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
    docsPrecedents = docsPrecedents.forEach((x: DocumentVente) => {
      x.table = this.dataParams.tableDocumentPrecedent
      ids.push(x._id)
    })

    this.form.patchValue({docsPrecedents:docsPrecedents})
    if (!ids || ids.length === 0) {
      showAlertError("Aucun document précédent", "")
      this.lignesVertualFacture = []
      this.form.patchValue({ lignes: [], isDownloadDocumentPrecedent: false })
      this.form.patchValue(this.changeTotals(this.form.value))
      return
    }

    showLoading()
    let docsWithLignes = await this.getAllDocuementsPrecedentsWithLignes(ids)
    hideLoading()

    let regs:any = []

    docsWithLignes.forEach((x: DocumentVente) => {
      x.reglements.forEach((y:any) => {
        regs = this.pushReglements(regs, y)
      })
    })

    //let docs = this.form.value.documentPrecedent
    let docs: DocumentVente[] = docsWithLignes.map((item: any) => item as DocumentVente);

    let items: LigneDocumentVente[] = []
    if (docs.length > 0) {
      for (let i = 0; i < docs.length; i++) {
        docs[i].lignes.forEach((x: LigneDocumentVente) => {
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

    this.form.patchValue(this.changeTotals(this.form.value))
  }

  pushReglements(regs:Reglement[], newReg:Reglement):Reglement[]{
    if(isObjectIdMongoose(newReg._id)){
      if(!this.form.value.reglements || this.form.value.reglements.findIndex((x:any) => x._id === newReg._id) == -1){
        regs.push(newReg)
      }
    }
    return regs
  }

  changeTotalsLignes(item: LigneDocumentVente){
    if(item.isQte1 == true){
      item = this.ligneDocumentVenteService.changeTotals(item)
    }else{
      item = this.ligneDocumentVenteService.changeTotals(item, true)
    }
    return item
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

    this.lignesVertualFacture = this.ligneDocumentVenteService.regroupementLigneDocument(lignes)
  }

  async newItemEvent(newValue: any) {
    if (this.form.contains(newValue[0])) {
      this.form.controls[newValue[0] as string].setValue(newValue[1])
    }
    if (["lignes", "reglements"].includes(newValue[0])) {
      this.form.patchValue(this.changeTotals(this.form.value))
    }
    if (["client"].includes(newValue[0])) {
      this.checkSoldeClient()
      if (this.dataParams.withDocumentPrecedent == true && this.form.value.client && this.form.value.client._id) {
        showLoading()
        this.allDocsPrecedents = await this.getAllDocuementsPrecedentsByClient(this.form.value.client._id)
        this.allDocsPrecedents = this.allDocsPrecedents.map(doc => ({
          ...doc,
          numero: !doc.numeroDocClient ? doc.numero : doc.numero+"("+doc.numeroDocClient+")",
          numeroDate: doc.numero + " - " + getDateByForma(doc.date)
        }));
        hideLoading()
      } else {
        this.allDocsPrecedents = []
      }
      this.form.patchValue({ documentPrecedent: [] })
      this.form.patchValue({ isDownloadDocumentPrecedent: false })
      this.form.patchValue({ lignes: [] })
      this.form.patchValue(this.changeTotals(this.form.value))
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
                //doc[0].numero = !doc.numeroDocClient ? doc.numero : doc.numero+"("+doc.numeroDocClient+")",
                //doc[0].numeroDate = doc.numero + " - " + getDateByForma(doc.date)
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
      this.form.patchValue(this.changeTotals(this.form.value))
      return
    }
    showLoading()
    let doc:any = await this.getDetails(newValue[1]._id, this.dataParams.apiGetDocumentsPrecedentByTier)
    if(this.dataParams.estDocumentPrecedentTicket && this.dataParams.estDocumentPrecedentTicket == true){
      doc = this.service.adaptationTicketDocument(doc, this.allArticles, this.dataParams)
    }
    this.form.patchValue({ isDownloadDocumentPrecedent: false })
    this.form.patchValue({ lignes: [] })
    if (doc) doc.table = this.dataParams.tableDocumentPrecedent
    doc.numero = !doc.numeroDocClient ? doc.numero : doc.numero+"("+doc.numeroDocClient+")",
    doc.numeroDate = doc.numero + " - " + getDateByForma(doc.date)
    this.form.patchValue({ documentPrecedent: [doc] })
    this.form.patchValue(this.changeTotals(this.form.value))
    hideLoading()
  }

  changeTotals(document:DocumentVente) {
    return this.service.changeTotals(document, this.allClients, this.dataParams)
  }

  form: FormGroup = this.fb.group({
    _id: '',
    numero: '',
    date: [new Date, Validators.required],
    numeroDocClient: '',
    dateDocClient: null,
    client: ['', Validators.required],
    type_transport: enum_type_transport.INTERNE,
    chauffeur: [''],
    vehicule: [''],
    nom_chauffeur: [''],
    matricule_vehicule: [''],
    depotpv: null,
    sessionCaisse: null,
    utilisateur: null,
    totalBrutHT: 0,
    totalRemise: 0,
    totalHT: 0,
    totalFodec: 0,
    totalDC: 0,
    totalNetHT: 0,
    totalTVA: 0,
    totalRedevance: 0,
    timbreFiscale: 0,
    totalTTC: 0,
    totalGainCommerciale: 0,
    totalGainReel: 0,
    totalPayer: 0,
    resteAPayer: 0,
    documentPrecedent: [],
    isDownloadDocumentPrecedent: false,
    documentSuivant: [],
    notes: '',
    lignes: [],
    reglements: [],
    code_societe: '',
    code_exercice: '',
    code_depotpv: '',
    avecRegroupementLignes: false
  });

  isOpenPanelPlusDetails = false

  mode: 'create' | 'update' = 'create';
  public defaults: DocumentVente = new DocumentVente(null)
  private routeSub: Subscription;
  private id: string = ''
  dataParams: DataParamRoute = new DataParamRoute()

  constructor(
    private dialog: MatDialog,
    public utilService: UtilService,
    private transporteurHttpService: TransporteurHttpService,
    private vehiculeHttpService: VehiculeHttpService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private serviceHttp: DocumentVenteHttpService,
    private serviceHttpTicket: TicketHttpService,
    private clientServiceHttp: ClientHttpService,
    private service: DocumentVenteService,
    private route: ActivatedRoute,
    private serviceHttpProductDepotPV: ArticlesDepotPvHttpService,
    private ligneDocumentVenteService: LigneDocumentVenteService,
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

  allArticles: any[] = [];
  allClients: Client[] = [];
  allTransporteurs: Transporteur[] = [];
  allVehicules: any[] = [];
  allDocsPrecedents: DocumentVente[] = [];
  lignesVertualFacture: LigneDocumentVente[] = []

  async getDetails(id: string, uriDocApi?: string): Promise<DocumentVente | null> {
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

  async setDocument(document: DocumentVente | undefined | null, withChangeDocOriginal: boolean) {
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
    if (this.form.value.documentPrecedent && this.form.value.documentPrecedent.length > 0) {
      let docs = this.form.value.documentPrecedent
      docs = docs.map( (x:any)=>{
        x.numero = !x.numeroDocClient ? x.numero : x.numero+"("+x.numeroDocClient+")"
      })
      this.form.patchValue({ isDownloadDocumentPrecedent: true })
    }

    InputNumberChangeObservibalService.submitChangeInput()
    this.showChauffeurInternFn()
  }

  async getAllClients() {
    return new Promise((resolve) => {
      this.clientServiceHttp.GetAll().subscribe((res) => {
        this.allClients = this.clientServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getAllDocuementsPrecedentsByClient(idClient: string): Promise<DocumentVente[]> {
    return new Promise((resolve) => {
      if(!this.dataParams.apiGetDocumentsPrecedentByTier){
        resolve([])
        return
      }

      if(this.dataParams.apiGetDocumentsPrecedentByTier=='/ticket'){
        let clnt_s:any = []
        clnt_s.push(idClient)
         let req:any = {
          bloque:false ,
           code_societe:   this.tokenService.getCodeSociete(),
           code_exercice:  this.tokenService.getCodeExercice(),
           code_depotpv:   this.tokenService.getCodePointeVente(),
           client:clnt_s
        }
        this.serviceHttpTicket.GetAll(req).subscribe((res) => {
          if (res.OK) {
            let allDocsPrecedents = this.serviceHttp.getData(res.RESULTAT);
            resolve(allDocsPrecedents)
          } else {
            resolve([])
          }
        });
      }else{
        this.serviceHttp.GetAll(this.dataParams.apiGetDocumentsPrecedentByTier, idClient, undefined, this.dataParams?.getDocPrecedentbloquante).subscribe((res) => {
          if (res.OK) {
            let allDocsPrecedents = this.serviceHttp.getData(res.RESULTAT);
            resolve(allDocsPrecedents)
          } else {
            resolve([])
          }
        });
      }

    });
  }

  async getAllDocuementsPrecedentsWithLignes(ids: string[]): Promise<DocumentVente[]> {
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

  async getAllArticlesByDepotPV() {
    return new Promise((resolve) => {
      this.serviceHttpProductDepotPV.getAllArticlesByDepotPV(undefined, undefined, true).subscribe((res) => {
        let articles = this.serviceHttpProductDepotPV.getDataArticleDepotPvss(res.RESULTAT);
        this.allArticles = articles
        resolve(null)
      });
    });
  }

  async ngOnInit() {
    showLoading()
    if (this.id) {
      let resultat: DocumentVente | null = await this.getDetails(this.id, this.dataParams.uriDocApi)
      if (!resultat) return
      this.setDocument(resultat, true)

      this.allDocsPrecedents = await this.getAllDocuementsPrecedentsByClient(this.form.value.client._id)
      if (this.form.value.documentPrecedent && this.form.value.documentPrecedent.length > 0) {
        this.form.value.documentPrecedent.forEach((x: any) => {
            if (this.allDocsPrecedents.filter((z: DocumentVente) => z._id === x._id).length === 0) {
                this.allDocsPrecedents.unshift(x);
            }
        });
      }

      this.allDocsPrecedents = this.allDocsPrecedents.map(doc => ({
        ...doc,
        numeroDate: doc.numero + " - " + getDateByForma(doc.date),
        numero: !doc.numeroDocClient ? doc.numero : doc.numero+"("+doc.numeroDocClient+")",
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
      lignes.forEach((x: LigneDocumentVente) => {
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
    await this.getAllClients()
    if(this.form.value.client){
      let client = this.allClients.find(x => x._id === this.form.value.client._id)
      if(client) this.form.patchValue({client:client})
    }

    await this.getAllArticlesByDepotPV()

    hideLoading()
    /*this.transporteurHttpService.GetAll().subscribe((res) => {
      this.allTransporteurs = this.transporteurHttpService.getData(res.RESULTAT) ;
    });
    this.vehiculeHttpService.GetAll().subscribe((res) => {
      this.allVehicules = this.vehiculeHttpService.getData(res.RESULTAT) ;
    });*/
  }

  async restartAllArticles(){
    showLoading()
    await this.getAllArticlesByDepotPV()
    hideLoading()
  }

  save() {
    if(this.dataParams.withBlockageIfExisteDocSuivante === true && this.form.value.documentSuivant && this.form.value.documentSuivant.length && this.form.value.documentSuivant.length > 0){
      showAlertError('Erreur!', 'On ne peut pas continuer car il existe un document suivant.');
      return
    }
    if (!this.checkSoldeClient()) return
    if (!(this.form.value.isDownloadDocumentPrecedent === true && this.dataParams.withCheckMultipleDocumentPrecedent === true) && this.dataParams.withCheckQuantiteStock) {
      if (!this.ligneDocumentVenteService.checkAllLigneQuantiteIsValid(this.defaults, this.form.value.lignes, this.allArticles)) return
    }
    if(this.dataParams.withCheckQuantiteRestante === true && this.form.value.documentPrecedent && this.form.value.documentPrecedent.length > 0 && (this.form.value.documentPrecedent[0].table == enum_nomTable.K_bonCommandeClients || this.form.value.documentPrecedent[0].table == enum_nomTable.K_bonLivraisons))
      if (!this.ligneDocumentVenteService.checkAllLigneQuantiteRestante(this.defaults, this.form.value, this.form.value.lignes, this.allArticles)) return

    if (!this.form.valid || this.form.controls['totalTTC'].value == 0) {
      StandartAutocompleteService.submitFormAutocomplete()
      if (!this.form.controls['client'].value) {
        showAlertError('Erreur!', 'Veuillez selectionner le client.');
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
    const item = this.service.remove_id(this.form.value);
    showLoading()

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

  getClient(): Client | null {
    if (this.form.controls['client'].value) {
      let client = this.allClients.find(x => x._id === this.form.controls['client'].value._id)
      if (client)
        return client
    }
    return null
  }

  checkSoldeClient(){
    if(this.dataParams.withCheckSolde == true){
      if(this.dataParams.withNotCheckSoldeIfWithDocPrecedent !== true || !this.form.value.documentPrecedent || (!this.form.value.documentPrecedent || !this.form.value.documentPrecedent.length || this.form.value.documentPrecedent.length === 0)){
        return this.service.checkSoldeClient(this.getClient(), this.defaults, this.form.value)
      }
    }
    return true
  }

}


