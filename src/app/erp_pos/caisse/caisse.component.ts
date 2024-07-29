import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChildren,
  ElementRef,
  ViewChild,
  NgModule,
  inject, SimpleChanges, NgZone
} from '@angular/core';

import { stagger80ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatIconModule } from '@angular/material/icon';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule, NgFor, NgIf, DOCUMENT, DatePipe } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component';
import { MatCardModule } from '@angular/material/card';
import { PanierComponent, PeriodicElement } from './panier/panier.component';
import { Categorie } from "../../erp_params/categories/models/categorie.model";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule, UntypedFormControl, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormArray } from "@angular/forms";
import { document } from "postcss";
import { Banque } from "../../erp_params/banque/models/banque.model";
import { debounceTime, distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
import { BanqueHttpService } from "../../erp_params/banque/services/banque-http.service";
import { Observable, of, ReplaySubject } from 'rxjs';
import { typeChequeTicket } from "../../erp_params/type-cheque-ticket/models/typeChequeTicket.model";
import { TypeChequeTicketHttpService } from "../../erp_params/type-cheque-ticket/services/typeChequeTicket-http.service";
import { ProductHttpServiceService } from "../../erp_params/products/services/product-http-service.service";
import { PlanHttpServiceService } from "../../erp_params/plan/services/plan-http-service.service";
import { Plan } from "../../erp_params/plan/models/plan.model";
import { MatTableDataSource, MatTableModule, MatTable } from "@angular/material/table";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../utils/dateAdapter/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  notEqualToZero,
  dateVaidator,
  roundmMontantNumber,
  showLoading,
  hideLoading,
  parseNumberArround
} from "../../global-functions";
import { SharedModule } from 'src/app/utils/shared.module';
import { SessionsCaissesHttpService } from "../../erp_caisse/sessions-caisses/services/sessions-caisses-http.service";
import { Sessions_caisse } from "../../erp_caisse/sessions-caisses/models/sessions-caisses.model";
import { Product } from "../../erp_params/products/models/product.model";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "../../services/token.service";
import { IndexedDbService } from "../../utils/indexedDB_PWA/indexeddb.service";
import { Client } from "../../erp_params/clients/models/client.model";
import { ClientHttpService } from "../../erp_params/clients/services/client-http.service";
import { ArticlesDepotPvHttpService } from "../../erp_params/article-depotpvs/services/articles-depot-pv-http.service";
import { ArticleDepotPvs } from "../../erp_params/article-depotpvs/models/articleDepotPvs.model";
import { UtilService } from "../../utils/UtilService.service";
import { LigneDocumentVenteService } from "../../erp_documents_vente/services/ligne-document-vente.service";
import Swal from "sweetalert2";
import { TicketHttpService } from "../../erp_params/ticket/services/ticket-http.service";
// import { Balance } from "../../erp_params/balance-plu/models/balance.model";
// import { BalanceHttpService } from "../../erp_params/balance-plu/services/balance-http.service";
import { SessionsCaissesService } from "../../erp_caisse/sessions-caisses/services/sessions-caisses.service";
import { UsersHttpService } from "../../erp_params/users/services/users-http.service";
import { User } from "../../erp_params/users/models/user.model";
import { VexPopoverRef } from "@vex/components/vex-popover/vex-popover-ref";
import { ToolbarUserDropdownComponent } from "../../layouts/components/toolbar/toolbar-user/toolbar-user-dropdown/toolbar-user-dropdown.component";
import { RouterLink } from '@angular/router';
import {Ticket} from "../../erp_params/ticket/models/ticket.model";
import {RoleHttpService} from "../../erp_params/role_users/services/role-http.service";
import {enum_status_paiement} from "../../global-enums";
import {PrintService, UsbDriver, WebPrintDriver} from "ng-thermal-print";

import {PrintDriver} from "ng-thermal-print/lib/drivers/PrintDriver";
import {ReglementAvanceComponent} from "../reglementsAvance/reglement-avance/reglement-avance.component"; //add this line

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

export interface set_ModePayement {
  _id:string;
  type_pay: string;
  montant_pay: number;
  montant_Billet: number; // le montant reel que le client donne au caissier main à main
  num_pay: string;
  qte_pay: number;
  banque_pay: string;
  titulaire_pay: string;
  date_echeance_pay: string;
  type_ticket_pay: string;
  total_pay: number;
  ecartEspeceNegatif: number;
}

export interface rowOperation {
  type_pay: string,
  montant_pay: number,
  num_pay: string,
  qte_pay: number,
  banque_pay: string,
  titulaire_pay: string,
  date_echeance_pay: string,
  type_ticket_pay: string,
  total_pay: number
}

@Component({
  selector: 'vex-invoice',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    VexPageLayoutContentDirective,
    MatGridListModule, MatTabsModule, VexHighlightDirective,
    MatExpansionModule, MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule, MatDialogModule,
    AsyncPipe, MatPaginatorModule, MatTableModule, MatCardModule,
    PanierComponent, FormsModule, CommonModule, ReactiveFormsModule, SharedModule
  ]
})

export class CaisseComponent implements OnInit {

  clavierString: string = ""
  clavierStringInc: number = 0
  deleteArticle: boolean = false;
  deleteVente: boolean = false;
  validVenteSansPayement: any = null;
  validVenteAvecsPayement: any = null;
  set_Article_Plan: any = null;
  set_focus_init: boolean = false;

  clickDeleteArticle(act: any) {
    this.deleteArticle = !this.deleteArticle
  }
  clickDeleteVente(act: any) {
    this.deleteVente = !this.deleteVente
  }

  clickClavier(act: any) {

    this.clavierString = ''
    this.clavierString = act
    this.clavierStringInc++

    // console.log("--------------------------",this.selectedArticlePan)
  }


  async clotureCaisse() {
    let iPanier: any = 111
    // console.log((this.idPanier)+" ----**"+iPanier)

    const { value: code_badge } = await Swal.fire({
      title: 'Clôture du session caisse<br>Confirmation avec badge?',
      input: "password",
      inputPlaceholder: 'Saisir de login',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      //confirmButtonText: `<i class="fa fa-fw fa-pencil"></i>`,
      // confirmButtonAriaLabel: "Thumbs up, great!",
      // cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
      //cancelButtonAriaLabel: "Thumbs down",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "1234") {
            resolve();
          } else {
            resolve("Code badge erroné");//fa-ban // fa-reply
            const inputRange = Swal.getInput()
            inputRange!.value = ''
          }
        });
      }
    });
    if (code_badge) {

      this.set_clotureCaisse()
      Swal.fire({
        //toast: true,
        //position: 'top',
        showConfirmButton: false,
        icon: 'success',
        //timerProgressBar,
        timer: 1000,
        title: 'Session caisse cloturée'
      })

      setTimeout(() => {
        console.log("****************")
      }, 1500);

    }



  }

  set_clotureCaisse() {

    let item_sess = new Sessions_caisse()
    let id_sess = this.tokenService.sessionCaisseCourante._id
    let id_user = this.tokenService.user?._id
    let nom_user = this.tokenService.user?.nom as string

    let us_clo = new User(item_sess.utilisateur_cloture)
    us_clo._id = id_user
    us_clo.nom = nom_user
    item_sess._id = id_sess
    item_sess.utilisateur_cloture = us_clo

    let bb = {
      "_id": "65ae6ed6d7ad1c1ad4154a35",
      "numero": 1,
      "nom_machine_caisse": "Machine1",
      "date_ouverture": "2024-01-22T00:00:00.000Z",
      "cloture": true,
      "date_cloture": "2024-03-28T07:24:36.716Z",
      "fond_caisse_superviseur": 100,
      "fond_caisse_caissier": 100,
      "total_vente": null,
      "total_encaissement": null,
      "montant_ecart": 0,
      "total_gain": null,
      "notes": "Ouverture du fond caisse par 100 DT",
      "utilisateur": {
        "_id": "6569d909e54c20448510a684",
        "nom": "TestAdmin"
      },
      "code_societe": "s01",
      "code_exercice": "24",
      "code_depotpv": "pv01",
      "deleted": false,
      "addition_note": {
        "date": "2024-01-22T13:34:14.777Z"
      },
      "detail_reglement": [
        {
          "_id": "2",
          "totalMontantaccepter": 2554,
          "nbr": 7,
          "totalMontantretour": 0,
          "totalecartEspeceNegatif": 0,
          "totalSolde": 2554
        },
        {
          "_id": "6",
          "totalMontantaccepter": 142.052,
          "nbr": 5,
          "totalMontantretour": 0,
          "totalecartEspeceNegatif": 0,
          "totalSolde": 142.052
        },
        {
          "_id": "3",
          "totalMontantaccepter": 14500,
          "nbr": 1,
          "totalMontantretour": 0,
          "totalecartEspeceNegatif": 0,
          "totalSolde": 14500
        },
        {
          "_id": "7",
          "totalMontantaccepter": 0.6,
          "nbr": 1,
          "totalMontantretour": 0,
          "totalecartEspeceNegatif": 0,
          "totalSolde": 0.6
        },
        {
          "_id": "1",
          "totalMontantaccepter": 40702.023,
          "nbr": 31,
          "totalMontantretour": 0,
          "totalecartEspeceNegatif": 0,
          "totalSolde": 40702.023
        }
      ],
      "modification_notes": [],
      "__v": 0,
      "listearticles": [
        {
          "article": {
            "_id": "65afbb5a478a7e9aeb98402f",
            "reference": "CPA KAIROUAN",
            "designation": "CPA KR"
          },
          "vendu": 3093,
          "retour": 0,
          "totalTTC": 11709.515050000002,
          "_id": "66051b34166b67dc81b55eb5"
        },
        {
          "article": {
            "_id": "65ad2d640e866e29e2499c58",
            "reference": "FSC15/25",
            "designation": "CADRE FER 15/25"
          },
          "vendu": 6,
          "retour": 0,
          "totalTTC": 3.6,
          "_id": "66051b34166b67dc81b55eb6"
        },
        {
          "article": {
            "_id": "65ad31190e866e29e2499ce6",
            "reference": "PCIVGR1CH",
            "designation": "PARTERRE CARTHAGO INT 40*40 VINTO GRIS 1CH 1,57 B"
          },
          "vendu": 2.0700000000000003,
          "retour": 0,
          "totalTTC": 19.778,
          "_id": "66051b34166b67dc81b55eb7"
        },
        {
          "article": {
            "_id": "65afde6e7567eb88333680c8",
            "reference": "REF1001",
            "designation": "ARTICLE TEST 202020"
          },
          "vendu": 4,
          "retour": 0,
          "totalTTC": 582.414,
          "_id": "66051b34166b67dc81b55eb8"
        },
        {
          "article": {
            "_id": "65b8ba9982666b7c6d1dae60",
            "reference": "TEST ART 30-01",
            "designation": "TEST ARTICLE 30 JANVIER"
          },
          "vendu": 2,
          "retour": 0,
          "totalTTC": 57.602,
          "_id": "66051b34166b67dc81b55eb9"
        },
        {
          "article": {
            "_id": "65bba9a9105071da7873259a",
            "reference": "h19",
            "designation": "h19"
          },
          "vendu": 4,
          "retour": 0,
          "totalTTC": 9.995999999999999,
          "_id": "66051b34166b67dc81b55eba"
        },
        {
          "article": {
            "_id": "65ad21a80e866e29e2499ab3",
            "reference": "BH16",
            "designation": "BRIQUE HORDIS 16"
          },
          "vendu": 1.3000000000000007,
          "retour": 0,
          "totalTTC": 2.498,
          "_id": "66051b34166b67dc81b55ebb"
        },
        {
          "article": {
            "_id": "65ad22510e866e29e2499aca",
            "reference": "BH19",
            "designation": "BRIQUE HORDIS 19"
          },
          "vendu": 2,
          "retour": 0,
          "totalTTC": 3.5,
          "_id": "66051b34166b67dc81b55ebc"
        },
        {
          "article": {
            "_id": "65c1fe440378ee5bb6530bdd",
            "reference": "H16",
            "designation": "BRIQUE 16"
          },
          "vendu": 1,
          "retour": 0,
          "totalTTC": 0.95,
          "_id": "66051b34166b67dc81b55ebd"
        },
        {
          "article": {
            "_id": "65cb868159afb47823054f77",
            "reference": "سكالوب",
            "designation": "دجاج"
          },
          "vendu": 1,
          "retour": 0,
          "totalTTC": 3.3,
          "_id": "66051b34166b67dc81b55ebe"
        },
        {
          "article": {
            "_id": "65ad1e1a0e866e29e2499a1d",
            "reference": "B12",
            "designation": "BRIQUE 12"
          },
          "vendu": 3902,
          "retour": 0,
          "totalTTC": 3017.6090000000004,
          "_id": "66051b34166b67dc81b55ebf"
        },
        {
          "article": {
            "_id": "65ad1fed0e866e29e2499a85",
            "reference": "B6",
            "designation": "BRIQUE 6"
          },
          "vendu": 2,
          "retour": 0,
          "totalTTC": 0.7,
          "_id": "66051b34166b67dc81b55ec0"
        }
      ],
      "listtickets": [
        {
          "_id": 3,
          "nombre": 7
        },
        {
          "_id": 4,
          "nombre": 44
        },
        {
          "_id": 0.052,
          "nombre": 1
        }
      ],
      "montant_en_espece": 40802.023,
      "totale_TTC_article": 15411.462050000004,
      "totale_vente_espece": 40702.023
    };

    //this.serviceSessionCaisse.generatePdf(bb)

    this.serviceHttpSessionCaisse.ClotureCaisse(item_sess).subscribe((res) => {
      this.serviceSessionCaisse.generatePdf(res.RESULTAT)
    });

  }


  result?: string;
  totalPanierCaisse: any = 0;
  panierCaisseEnCours: any = 0;
  set_paiement: set_ModePayement[];

  set_synchronizData(p_synchronizData: boolean = false) {
    this.miseAjourIndexDB(p_synchronizData)
  }

  set_totalPanierCaisse(p_totalPanierCaisse: any) {
    this.totalPanierCaisse = p_totalPanierCaisse;
  }

  set_PanierCaisseEnCours(p_PanierCaisseEnCours: any) {
    this.panierCaisseEnCours = p_PanierCaisseEnCours;
  }

  selectedArticlePan: any = null
  set_SelectedArticle(p_SelectedArticle: any) {

    this.clavierStringInc = 0
    this.clavierString    = ''

    this.selectedArticlePan = null
    if(p_SelectedArticle!=null){
      this.selectedArticlePan = p_SelectedArticle.article;
      //  console.log("*********set_SelectedArticle1***************")
      // // console.log(p_SelectedArticle)
      // console.log("************set_SelectedArticle2************")
      if (p_SelectedArticle.isModifUnitePrice == true) {
        this.openDialogUnitePrice()
      }
    }

  }

  isAccordionClientOpen = false;
  isAccordionParamsOpen = false;
  isAccordionPaveeOpen  = this.roleService.checkPrivilegeAccess('pos_pavee_num') ; //true;
  typePayment = 'ESPECE';
  panelOpenState = false;

  /****PRINT : BEGIN***/
  status: boolean = false;
  usbPrintDriver: UsbDriver;
  webPrintDriver!: WebPrintDriver;
  ip: string = '';
  /****END : BEGIN***/

  constructor(private dialog: MatDialog,
    private serviceHttpPlan: PlanHttpServiceService,
    private indexedDb: IndexedDbService,
    private serviceHttpProduct: ProductHttpServiceService,
    private serviceHttpProductDepotPV: ArticlesDepotPvHttpService,
    private serviceHttpClient: ClientHttpService,
    // private serviceHttpBalance: BalanceHttpService,
    private serviceHttpTicket: TicketHttpService,
    public utilService: UtilService, private tokenService: TokenService,
    private serviceHttpSessionCaisse: SessionsCaissesHttpService,
    private serviceSessionCaisse: SessionsCaissesService,private printService: PrintService,
              private ngZone: NgZone,
  public roleService:RoleHttpService) {

    this.set_paiement = [];

      /****PRINT : BEGIN***/
      //this.webPrintDriver = new WebPrintDriver('localhost',false);
      this.usbPrintDriver = new UsbDriver();
    this.printService.isConnected.subscribe(result => {

      this.status = result;
      if (result) {
        console.log('Connected to printer!!!');
      } else {
        console.log('Not connected to printer.');
      }
    });
      /****PRINT : END***/

      this.ngZone.runOutsideAngular(() => {
        this.incrementCounter()
      });
  }


  counterInterval: any;
  incrementCounter(): void {
    this.counterInterval = setInterval(() => {
      console.log("DEBUT ---> Synchronisation en cours .."+ new Date());
        this.set_synchronizData(true)
      console.log("FIN --->Synchronisation .."+new Date());

    }, 600000); //20000 --> 20s   // 90000 --->90s --> 3m ///600000 ---> 10mn
  }

  /****PRINT : BEGIN***/

  requestPrinter() {
    try{
      this.usbPrintDriver.requestUsb().subscribe((result) => {
        let language = (result.vendorId === 4070) ? 'StarPRNT' : 'ESC/POS';
        // localStorage.setItem('printer-device', JSON.stringify({ vendorId: result.vendorId, productId: result.productId }));
        this.printService.setDriver(new UsbDriver(4070, 33054), 'ESC/POS');
      });
    }catch (e) {
      console.log("************eeeexxxx***********"+e)
    }

  }

  requestUsb() {

    this.requestPrinter()
    // this.usbPrintDriver.requestUsb().subscribe(result => {
    //   this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    // });
  }

  connectToWebPrint() {
    this.webPrintDriver = new WebPrintDriver(this.ip);
    this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
  }

  print(driver?: PrintDriver) {
    this.printService.init()
      .setBold(true)
      .writeLine('Hello World!')
      .setBold(false)
      .feed(4)
      .cut('full')
  }

  /****PRINT : END***/


    articleDepotPvss: ArticleDepotPvs[] = [];
  products: Product[] = [];
  clients: Client[] = [];
  // balances: Balance[] = [];
  palns_list: Plan[] = [];

  ticket_list: Ticket[] = [];
  subjectPlan$: ReplaySubject<Plan[]> = new ReplaySubject<Plan[]>();
  dataPlan$: Observable<Plan[]> = this.subjectPlan$.asObservable();


  getDataPlans(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Plan(items[key]))
    // }
    return items
  }

  getDataTickets(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Ticket(items[key]))
    // }
    return items
  }

  list_Products_Plan: any = []
  getList_Products(cur_plan: any) {
    // console.log("***************DEBUT cur_plan*****************************")
    // console.log(JSON.stringify(cur_plan))
    this.list_Products_Plan = cur_plan.articles
    // console.log("***************FIN cur_plan*****************************")
  }
  set_Product_to_panier(cur_prdct: any) {

    let newArticl = {
      _id: cur_prdct._id,
      unite1: cur_prdct.unite1 == undefined ? "" : cur_prdct.unite1,
      unite2: cur_prdct.unite2 == undefined ? "" : cur_prdct.unite2,
      unite: cur_prdct.unite1 == undefined ? "" : cur_prdct.unite1,
      article: cur_prdct,
      depotpv: this.tokenService.pointVenteCourante, // cur_prdct.depotpv
      reference: cur_prdct.reference, //evt.source.value,
      designation: String(cur_prdct.designation),
      quantite: Number(1),
      pu_ht: Number(cur_prdct.prixVenteHT),
      pu_ht1: Number(cur_prdct.prixVenteHT),
      pu_ht2: Number(cur_prdct.coefficient) > 0 ? Number(cur_prdct.prixVenteHT) / Number(cur_prdct.coefficient) : Number(cur_prdct.prixVenteHT),
      totalHT: Number(cur_prdct.prixVenteHT),
      pu_ttc: Number(cur_prdct.prixTTC),
      pu_ttc1: Number(cur_prdct.prixTTC),
      pu_ttc2: Number(cur_prdct.coefficient) > 0 ? Number(cur_prdct.prixTTC) / Number(cur_prdct.coefficient) : Number(cur_prdct.prixTTC),
      total: Number(cur_prdct.prixTTC),
      totalTTC: Number(1) * Number(cur_prdct.prixTTC),
      quantiteUnite1: 1,
      quantiteUnite2: Number(cur_prdct.coefficient) > 0 ? Number(1) * Number(cur_prdct.coefficient) : 1,
      remise: 0,
      remiseMontant: 0,
      totalRemise: 0,
      montant_Total_DC: 0,
      montant_Total_FODEC: 0,
      totalBrutHT: 0,
      totalNetHT: 0,
      taux_TVA_Applique: cur_prdct.tauxTVA,
      montant_unitaire_TVA: cur_prdct.montantTVAVente,
      montant_Total_TVA: 0,
      totalRedevance: 0,
      gain_unitaire: 0,
      gain_Total: 0,
      isModifierTypeUnite: null ,

    }
    this.set_Article_Plan = newArticl
  }

  ///*******************DEBUT GETSION DES INDEX*********************

  getDataProduct(items: any) {
    // let newItems: any = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Product(items[key]))
    // }
    return items
  }

  getDataArticleDepotPvss(items: any) {
    // let newItems: any = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new ArticleDepotPvs(items[key]))
    //   //console.log("***************getDataProduct***********************"+items[key])
    //   //console.log(items[key])
    //   //console.log("***************getDataProduct***********************"+items[key])
    // }
    return items
  }

  getDataClient(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Client(items[key]))
    // }
    return items
  }
  getDataBalance(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Balance(items[key]))
    // }
    return items
  }
  clearIndexedDB() {
    this.result = 'processing...';
    this.indexedDb.clear('mystore')
      .subscribe(
        x => this.result = `CLEAR: ${JSON.stringify(x)}`,
        err => {
          console.log(`ERROR: ${err}`);
        }
      );
  }

  putIndexedDB(set_key: any, set_value: any, set_ttl: any) {
    this.result = 'processing...';
    this.indexedDb.put('mystore', { key: set_key, value: set_value, ttl: set_ttl })
      .subscribe(
        x => this.result = `STORED: ${JSON.stringify(x)}`,
        err => {
          console.log(`ERROR: ${err}`);
        }
      );
  }

  async getIndexedDB(set_key: any) {
    return new Promise((resolve) => {

      //this.result_db = ''
      this.indexedDb.get('mystore', set_key)
        .subscribe(
          x => {

            if (x?.value != null) {

              const itemsData = JSON.parse(JSON.stringify(x?.value));
              const keys = Object.keys(itemsData);

              /*     keys.forEach(key=>{
                     this.products.push(employeeData[key]);
                    // console.log(employeeData[key]);
                   });

               */
              //if(set_key=='ARTICLES'){this.products = itemsData;}
              if (set_key == 'ARTICLES_DEPOT_PV') { this.articleDepotPvss = itemsData; }
              if (set_key == 'ARTICLES_PLAN') { this.palns_list = itemsData; }
              if (set_key == 'TICKETS_CLIENTS') { this.ticket_list = itemsData; }
              if (set_key == 'CLIENTS') { this.clients = itemsData; }
              // if (set_key == 'BALANCES') { this.balances = itemsData; }

            } else {

              if (this.result == undefined) {
                // console.log(set_key+"*************MAJ this.resul******---------*************",JSON.stringify(this.result))
                if (set_key == 'ARTICLES_DEPOT_PV') {
                  this.serviceHttpProductDepotPV.getAllArticlesByDepotPV_ENVente().subscribe((res) => {
                    this.articleDepotPvss = this.getDataArticleDepotPvss(res.RESULTAT);
                    this.putIndexedDB("ARTICLES_DEPOT_PV", this.articleDepotPvss, 0);
                  });
                }
                if (set_key == 'ARTICLES_PLAN') {
                  this.serviceHttpPlan.GetCollectionPlan().subscribe((res) => {
                    //this.subjectPlan$.next(this.getDataPlans(res.RESULTAT));
                    this.palns_list = this.getDataPlans(res.RESULTAT);
                    this.putIndexedDB("ARTICLES_PLAN", this.palns_list, 0);
                  });
                }

                if (set_key == 'TICKETS_CLIENTS') {
                  let data = {
                    code_societe:   this.tokenService.getCodeSociete(),
                    code_exercice:  this.tokenService.getCodeExercice(),
                    code_depotpv:   this.tokenService.getCodePointeVente(),
                    payee:          enum_status_paiement.tous,
                    bloque:         false,
                  }
                  this.serviceHttpTicket.GetFiltreTickets(data).subscribe((res) => {
                    this.ticket_list = this.getDataTickets(res.RESULTAT);
                    this.putIndexedDB("TICKETS_CLIENTS", this.ticket_list, 0);
                  });
                }

                if (set_key == 'ARTICLES') {
                  this.serviceHttpProduct.GetAll().subscribe((res) => {
                    this.products = this.getDataProduct(res.RESULTAT);
                    this.putIndexedDB("ARTICLES", this.products, 0);

                  });
                }

                if (set_key == 'CLIENTS') {
                  this.serviceHttpClient.GetAll().subscribe((res) => {
                    this.clients = this.getDataClient(res.RESULTAT);
                    // console.log("-****CLIENTSCLIENTS*******---",JSON.stringify(res.RESULTAT))
                    this.putIndexedDB("CLIENTS", this.clients, 0);

                  });
                }

                // if (set_key == 'BALANCES') {
                //   this.serviceHttpBalance.GetAll().subscribe((res) => {
                //     this.balances = this.getDataBalance(res.RESULTAT);
                //     // console.log("-****balancesbalances*******---",JSON.stringify(res.RESULTAT))
                //     this.putIndexedDB("BALANCES", this.balances, 0);

                //   });
                // }

              }
              //console.log("-***********---"+this.result)
            }
            resolve(null)
            return this.result;
          },
          err => {
            this.result = `ERROR: ${err}`;
            console.log("--------------------" + this.result)
            return this.result;
          }
        );

    });

    /*
    this.resultDB = 'storing...';
    let result_db = '';
    this.indexedDb.get('mystore', set_key)
      .subscribe(
        x => {
          this.resultDB = `FOUND: ${JSON.stringify(x)}`;
          result_db = JSON.stringify(x!=null ? JSON.stringify(x.value) : '');
        },
        err => {
          this.resultDB = `ERROR: ${err}`;
          console.log(set_key+ " >>>>> Errrr Indexed ->>>> "+`ERROR: ${err}`)
        }
      );
    console.log(set_key+ " >>>>> Indexed ->>>> "+this.resultDB)
    return result_db;
*/
  }

  async miseAjourIndexDB(set_maj: any) {

    if (set_maj == true) {
      this.clearIndexedDB()
      this.result = undefined


      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: 'success',
        //timerProgressBar:1000,
        timer: 2000,
        title: 'Synchronisation en cours ..'
      })
      //showLoading("Chargement des articles en cours ..")

      await this.getIndexedDB("ARTICLES_DEPOT_PV")
      await this.getIndexedDB("ARTICLES_PLAN")
      await this.getIndexedDB("TICKETS_CLIENTS")
      await this.getIndexedDB("CLIENTS")
      await this.getIndexedDB("BALANCES")

      //hideLoading()
/*
      setTimeout(() => {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          //timerProgressBar,
          timer: 5000,
          title: 'Synchronisation terminée avec succes'
        })
      }, 1000);
*/

    } else {
      await this.getIndexedDB("ARTICLES_DEPOT_PV")
      await this.getIndexedDB("ARTICLES_PLAN")
      await this.getIndexedDB("TICKETS_CLIENTS")
      await this.getIndexedDB("CLIENTS")
      await this.getIndexedDB("BALANCES")
    }


  }
  ///********************FIN GETSION DES INDEX********************

  ngOnInit() {

    this.serviceHttpPlan.GetCollectionPlan().subscribe((res) => {
      this.subjectPlan$.next(this.getDataPlans(res.RESULTAT));
    });

    this.dataPlan$.pipe(filter<Plan[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.palns_list = listItems;

    });

    // console.log("****************************************")
    this.miseAjourIndexDB(false)
    // console.log( this.getIndexedDB("ARTICLES"))
    // this.getIndexedDB("ARTICLES_DEPOT_PV")
    // this.getIndexedDB("CLIENTS")
    // this.getIndexedDB("BALANCES")
    // console.log("****************************************")
    this.openDialogSessionCaisse()

  }

  tabs: number[] = [1, 2, 3];//[1,2,3];
  indexSelectPanier: number = 1;

  labelName: string = '';
  get_currentPanier(event: any) {
    // console.log(e+" >>>>>>>>>>>tab length >>>>>>>>> "+this.tabs.length);
    this.indexSelectPanier = event.tab.textLabel;
    this.selectedArticlePan = null
  }

  openDialogReglementAvance(typePaymentAff: any) {
    this.dialog
      .open(ReglementAvanceComponent, {
        data: { selectedArticleDiag: this.selectedArticlePan },
        disableClose: true,
        //width: '400px'
      })
      .afterClosed()
      .subscribe((result) => {
        // if(result!='-1'){
        // this.selectedArticlePan = result;
        // // }else{this.selectedArticlePan=null}

      });
  }

  openDialogValidPanier(typePaymentAff: any) {
    this.validVenteAvecsPayement = !this.validVenteAvecsPayement //"VALIDER_AVEC_PAYEMENT"
  }
  openDialog(typePaymentAff: any) {

    this.typePayment = typePaymentAff;

    if (typePaymentAff == 'VALIDER_SANS_PAIEMENT') {
      if (Number(this.panierCaisseEnCours.totalPayement) > 0) {
        Swal.fire({
          //toast: true,
          //position: 'top',
          showConfirmButton: false,
          icon: 'warning',
          //timerProgressBar,
          timer: 5000,
          title: 'Vous avez déjà un payement avec montant ' + this.utilService.formatMontant(this.panierCaisseEnCours.totalPayement)
        })
      } else {
        this.dialog
          .open(DemoDialogComponent, {
            data: { totalPanierCaisse: this.totalPanierCaisse, typePayment: this.typePayment, panierCaisseEnCours: this.panierCaisseEnCours },
            disableClose: true,
            //width: '400px'
          })
          .afterClosed()
          .subscribe((result) => {

            if (result != '-1') {
              if (result == "VALIDER_SANS_PAIEMENT") {
                this.validVenteSansPayement = !this.validVenteSansPayement
              } else {
                this.set_paiement = result;
              }

            }

          });
      }
    } else {
      if (Number(this.panierCaisseEnCours.totalReste) == 0) {
        let msgW = 'Aucun reste a payé '
        if (Number(this.panierCaisseEnCours.totalRendu) > 0) {
          msgW = 'Vous avez déjà un rendu avec montant ' + this.utilService.formatMontant(this.panierCaisseEnCours.totalRendu)
        }
        Swal.fire({
          //toast: true,
          //position: 'top',
          showConfirmButton: false,
          icon: 'warning',
          //timerProgressBar,
          timer: 5000,
          title: msgW
        })

      } else {
        this.dialog
          .open(DemoDialogComponent, {
            data: { totalPanierCaisse: this.totalPanierCaisse, typePayment: this.typePayment, panierCaisseEnCours: this.panierCaisseEnCours },
            disableClose: true,
            //width: '400px'
          })
          .afterClosed()
          .subscribe((result) => {

            if (result != '-1') {
              if (result == "VALIDER_SANS_PAIEMENT") {
                this.validVenteSansPayement = !this.validVenteSansPayement
              } else {
                this.set_paiement = result;
              }

            }

          });

      }
    }


  }

  sessionCaisses: Sessions_caisse[] = []
  openDialogSessionCaisse() {

    this.serviceHttpSessionCaisse.Filter().subscribe((res) => {
      this.sessionCaisses = res.RESULTAT;

      const toSelect = this.sessionCaisses.find((c:any) => c._id == this.sessionCaisses[0]._id);
      // console.log("************toSelect11**********")
      //console.log(this.sessionCaisses.length == 1 )
      let current_sess:any = this.tokenService.getSessionCaisse()
      if (this.sessionCaisses.length == 1 && (current_sess?._id ==this.sessionCaisses[0]._id)) {
         this.tokenService.saveSessionCaisseCourante(this.sessionCaisses[0])
      }else{
        this.dialog
          .open(DialogSessionCaisseComponent, {
            data: { typSession: "Session caisse" },
            disableClose: true,
            //width: '400px'
          })
          .afterClosed()
          .subscribe((result) => {
            this.result = result;
            this.set_focus_init = true
          });
      }

    });


  }

  openDialogUnitePrice() {

    if (this.selectedArticlePan != null) {
      if (this.selectedArticlePan.article != null) {

        this.selectedArticlePan.pu_ttc1 = parseNumberArround(Number(this.selectedArticlePan.pu_ttc1))
        this.selectedArticlePan.pu_ttc2 = parseNumberArround(Number(this.selectedArticlePan.pu_ttc2))

        this.dialog
          .open(DialogUnitePriceComponent, {
            data: { selectedArticleDiag: this.selectedArticlePan },
            disableClose: true,
            //width: '400px'
          })
          .afterClosed()
          .subscribe((result) => {
            // if(result!='-1'){
            this.selectedArticlePan = result;
            // }else{this.selectedArticlePan=null}

          });
      }
    }

  }

}

/*************Type Payement MOdal***************/
@Component({
  selector: 'vex-components-overview-demo-dialog',
  template: `
    <div mat-dialog-title class="flex items-center justify-between">
        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container">
           <span style="text-align: center; font-size: x-large;">Type de paiement : <b>{{getDetailsPanier.typePayment}}</b></span>
        </div>
    </div>

    <mat-dialog-content>            
        
            <div class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 container">
                <span style="float:left; font-size: x-large;color: red">Total CMD : <b>{{utilService.formatMontant(totalPanier)}}</b></span>
                
            </div>
       
        <div class="card overflow-hidden flex-auto">
            <div class="px-6 py-4 border-b flex items-center" style="justify-content: space-between;">
                <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
                    <span style="font-size: large;display: flex; align-items: center;">Paiement : </span>
                    <span style="font-size: large;display: flex; align-items: center;"> <b>{{utilService.formatMontant(set_total_payement)}}</b></span>
                </div>
                <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
                    <span style="font-size: large;display: flex; align-items: center;">Rendu : </span>
                    <span style="font-size: large;display: flex; align-items: center;"> <b>{{utilService.formatMontant(set_rendu_payement)}}</b></span>
                </div>
                <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
                    <span style="font-size: large;display: flex; align-items: center;">Reste : </span>
                    <span style="font-size: large;display: flex; align-items: center;"> <b>{{utilService.formatMontant(set_rest_payement)}}</b></span>
                </div>
            </div>
            
            <div class="px-6 py-4 flex flex-col">

               
                <!-- *************ESPECE************ -->
                <form class="example-form" [formGroup]="especeValidations"  
                        *ngIf="getDetailsPanier.typePayment == 'ESPECE' || getDetailsPanier.typePayment == 'CARTE_BANCAIRE'">
                    <mat-form-field appearance="outline" class="col-sm-6">
                        <mat-label>Montant</mat-label>
                        <input style="text-align: right; padding-right: 1px !important;" matInput 
                               formControlName="especeNumber"    onClick="this.select();"
                               appMontantDecimaNumber     (keyup)="calcul_rendu($event)" placeholder="Montant en dinars (15.250)">
                        <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                        <mat-error *ngIf="especeValidations.get('especeNumber').hasError('notEqualToZero')">
                            Le montant ne doit pas être à Zero.
                        </mat-error> 
                    </mat-form-field>
                </form>
                <!-- *************TICKET************ -->
                <form class="example-form" [formGroup]="ticketValidations"  *ngIf="getDetailsPanier.typePayment == 'TICKET'">
                    <div    class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 container"
                     *ngIf="getDetailsPanier.typePayment == 'TICKET'">
                    <!-- get Type Ticket -->
                        <mat-form-field>
                            <mat-label>Numéro ticket</mat-label>
                            <input  onClick="this.select();" matInput
                                    formControlName="referenceTck"  placeholder="numéro de ticket"
                                    (change)="onEnterTicketScan($event)"   />
                            <mat-icon matIconPrefix svgIcon="mat:straighten"></mat-icon>
                            <mat-error *ngIf="ticketValidations.get('referenceTck').hasError('required')">
                                Le numéro de ticket ne doit pas être vide
                            </mat-error>
                        </mat-form-field>
                    <mat-form-field style="width: inherit; flex: content;" (click)="set_list_ticket()">
                        <mat-icon class="icon-sm"  matIconPrefix svgIcon="mat:account_balance"></mat-icon>
                        <input #stateInputTicket  [matAutocomplete]="autoTicket"  [formControl]="ticketCtrl" (focus)="set_list_ticket()"
                               formControlName="ticketType"  required   onClick="this.select();" matInput placeholder="Type ticket"  />
                        <mat-error *ngIf="ticketValidations.get('ticketType').hasError('required')">
                            Sélectionner le type de ticket.
                        </mat-error>
                        <mat-autocomplete #autoTicket="matAutocomplete"  >
                            <mat-option *ngFor="let stateCL of filteredTicket$ | async" [value]="stateCL.libelle"
                                          (onSelectionChange)="stateInputTicket.value !=undefined && onEnterTicket($event,stateCL)">
                               <span class="flex items-center">
                                    <img [src]="" class="align-middle mr-4 shadow-lg h-6 inline-block" />
                                    <span class="flex flex-col">
                                    <span class="body-1 leading-snug">{{ stateCL.libelle }}</span>
                                    <span class="caption text-secondary leading-none">Code : {{ stateCL.code }}</span>
                                </span>
                                </span>
                            </mat-option>
                        </mat-autocomplete>
                        
                        <button class="text-secondary" mat-icon-button matIconSuffix type="button">
                            <mat-icon svgIcon="mat:arrow_drop_down"></mat-icon>
                        </button>
                    </mat-form-field>
                    <mat-form-field   appearance="outline" class="col-md-4">
                        <mat-label>Montant</mat-label>
                        <input  onClick="this.select();" matInput style="text-align: right; padding-right: 1px !important;"
                               formControlName="montantTck"  placeholder="Montant" appMontantDecimaNumber />
                        <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                        <mat-error *ngIf="ticketValidations.get('montantTck').hasError('required')">
                            Le montant ne dot pas être à Zero.
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field >
                        <mat-label>Quantité</mat-label>
                        <input type="number" onClick="this.select();" matInput formControlName="quantiteTck" placeholder="quantité"  
                          min="1"     required  />
                        <mat-icon matIconPrefix svgIcon="mat:plus_one"></mat-icon>
                        <mat-error *ngIf="ticketValidations.get('quantiteTck').hasError('required')">
                            La quantité ne dot pas être à Zero.
                        </mat-error>
                    </mat-form-field>                    
                    
                    
                    <button (click)="addTableTicket()"  [disabled]="!ticketValidations.valid" color="primary" mat-icon-button type="button" > <mat-icon svgIcon="mat:add"></mat-icon> </button>
                </div>
                </form>
                <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 container" *ngIf="getDetailsPanier.typePayment == 'TICKET' ">
                    <table [dataSource]="dataSourceOp" mat-table matSort class="mat-elevation-z8">

                        <ng-container matColumnDef="type_ticket_pay" *ngIf="getDetailsPanier.typePayment == 'TICKET' " >
                            <th mat-header-cell *matHeaderCellDef> Type ticket</th>
                            <td mat-cell *matCellDef="let element"> {{element.type_ticket_pay.libelle}} </td>
                        </ng-container>
                        
                        <!-- Position Column -->
                        <ng-container matColumnDef="num_pay">
                            <th mat-header-cell *matHeaderCellDef> N° ticket</th>
                            <td mat-cell *matCellDef="let element"> {{element.num_pay}} </td>
                        </ng-container>

                        <!-- Name Column -->
                        <ng-container matColumnDef="montant_pay">
                            <th mat-header-cell *matHeaderCellDef> Montant</th>
                            <td mat-cell *matCellDef="let element"> {{utilService.formatMontant(element.montant_pay)}} </td>
                        </ng-container>

                        <!-- Name Column -->
                        <ng-container matColumnDef="qte_pay">
                            <th mat-header-cell *matHeaderCellDef> Quantié</th>
                            <td mat-cell *matCellDef="let element"> {{element.qte_pay}} </td>
                        </ng-container>

                        <!-- Weight Column -->
                        <ng-container matColumnDef="banque_pay" *ngIf="getDetailsPanier.typePayment == 'CHEQUE' " >
                            <th mat-header-cell *matHeaderCellDef> Banque</th>
                            <td mat-cell *matCellDef="let element"> {{element.banque_pay}} </td>
                        </ng-container>

                        <!-- Symbol Column -->
                        <ng-container matColumnDef="date_echeance_pay" *ngIf="getDetailsPanier.typePayment == 'CHEQUE' " >
                            <th mat-header-cell *matHeaderCellDef> Date échenace</th>
                            <td mat-cell *matCellDef="let element">
                                {{utilService.formatDate(element.date_echeance_pay,'DD/MM/AAAA')}}
                            </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="titulaire_pay" *ngIf="getDetailsPanier.typePayment == 'CHEQUE' " >
                            <th mat-header-cell *matHeaderCellDef> Titulaire</th>
                            <td mat-cell *matCellDef="let element"> {{element.titulaire_pay}} </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="total_pay">
                            <th mat-header-cell *matHeaderCellDef> Total</th>
                            <td mat-cell *matCellDef="let element"> {{utilService.formatMontant(element.total_pay)}} </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="deel">
                            <th mat-header-cell *matHeaderCellDef> </th>
                            <td mat-cell *matCellDef="let element ; let i = index">
                                <button (click)="deleteRowTicket(i,element)" color="primary" mat-icon-button
                                        type="button">
                                    <mat-icon svgIcon="mat:remove"></mat-icon>
                                </button>
                            </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns_TK ; sticky:true ; "  ></tr>
                        <tr mat-row *matRowDef="let row;let idx=index; let even=even; columns: displayedColumns_TK;"
                            [style.border-bottom]="'2px solid red'" ></tr>
                    </table>
                </div>

                <!-- *************CHEQUE & TRAITE************ -->
                <form class="example-form" [formGroup]="chTrValidations"  
                      *ngIf="getDetailsPanier.typePayment == 'CHEQUE' || getDetailsPanier.typePayment == 'TRAITE'">
                    <div class="p-1 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-1 container"
                         *ngIf="getDetailsPanier.typePayment == 'CHEQUE' || getDetailsPanier.typePayment == 'TRAITE'">
                        <mat-form-field>
                            <mat-label>Numéro de {{getDetailsPanier.typePayment}}</mat-label>
                            <input type="number" onClick="this.select();" matInput formControlName="referenceCh_TR" required placeholder="Numéro"  />
                            <mat-icon matIconPrefix svgIcon="mat:straighten"></mat-icon>
                            <mat-error *ngIf="chTrValidations.get('referenceCh_TR').hasError('required')">
                                Numéro de {{getDetailsPanier.typePayment}} est obligatoire.
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field>
                            <mat-label>Montant</mat-label>
                            <input style="text-align: right; padding-right: 1px !important;"
                                   appMontantDecimaNumber   onClick="this.select();" 
                               required    matInput  formControlName="montantCh_TR" 
                                    placeholder="Montant" />
                            <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                            <mat-error *ngIf="chTrValidations.get('montantCh_TR').hasError('required')">
                                Le montant ne dot pas être à Zero.
                            </mat-error>
                        </mat-form-field>
                        <!-- get Banque -->
                        <mat-form-field style="width: inherit; flex: content;" (click)="set_list_banque()">
                            <mat-icon class="icon-sm"  matIconPrefix svgIcon="mat:account_balance"></mat-icon>
                            <input #stateInputBanque [formControl]="banqueCtrl" [matAutocomplete]="autoBanque" (focus)="set_list_banque()"
                                   formControlName="banqueCh_TR"  onClick="this.select();" matInput placeholder="Banque"  />
                            <mat-autocomplete #autoBanque="matAutocomplete" >
                                <mat-option *ngFor="let stateCL of filteredBanque$ | async" [value]="stateCL.libelle"
                                            (onSelectionChange)="stateInputBanque.value !=undefined && onEnterBanque($event,stateCL)">
                               <span class="flex items-center">
                                    <img [src]="" class="align-middle mr-4 shadow-lg h-6 inline-block" />
                                    <span class="flex flex-col">
                                    <span class="body-1 leading-snug">{{ stateCL.abreviation }}</span>
                                    <span class="caption text-secondary leading-none">{{ stateCL.libelle }}</span>
                                </span>
                                </span>
                                </mat-option>
                            </mat-autocomplete>

                            <button class="text-secondary" mat-icon-button matIconSuffix type="button">
                                <mat-icon svgIcon="mat:arrow_drop_down"></mat-icon>
                            </button>
                        </mat-form-field>
 
                        
                        <mat-form-field>
                            <mat-label>Date écheance</mat-label>
                            <input required appYearSelector [matDatepicker]="picker" matInput
                                   onClick="this.select();"    formControlName="date_echeance_Ch_TR"   />
                            <mat-datepicker-toggle [for]="picker" matIconSuffix></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                            <mat-hint>JJ/MM/AAAA</mat-hint>
                            <mat-error *ngIf="!chTrValidations.get('date_echeance_Ch_TR').hasError('dateVaidator')">
                                Date non valide.
                            </mat-error>
                            <mat-error *ngIf="!chTrValidations.get('date_echeance_Ch_TR').hasError('required')">
                                Date vide.
                            </mat-error>
                            
                        </mat-form-field>
                        <mat-form-field >
                            <mat-label>Titulaire</mat-label>
                            <input type="text" onClick="this.select();" matInput  formControlName="titulaire_Ch_TR"  placeholder="Titulaire" />
                            <mat-icon matIconPrefix svgIcon="mat:person"></mat-icon>
                        </mat-form-field>
                        <button (click)="addTableChequeTraite()" [disabled]="!chTrValidations.valid"  color="primary" mat-icon-button type="button" > <mat-icon svgIcon="mat:add"></mat-icon> </button>
                    </div>
                </form>


                <!-- start of the table  -->
                <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 container" *ngIf="getDetailsPanier.typePayment == 'CHEQUE' || getDetailsPanier.typePayment == 'TRAITE'">
                    <table [dataSource]="dataSourceOp" mat-table matSort class="mat-elevation-z8">

                        <ng-container matColumnDef="type_ticket_pay">
                            <th mat-header-cell *matHeaderCellDef> Type ticket</th>
                            <td mat-cell *matCellDef="let element"> {{element.type_ticket_pay}} </td>
                        </ng-container>
                        
                        <!-- Position Column -->
                        <ng-container matColumnDef="num_pay">
                            <th mat-header-cell *matHeaderCellDef> N° pièce</th>
                            <td mat-cell *matCellDef="let element"> {{element.num_pay}} </td>
                        </ng-container>

                        <!-- Name Column -->
                        <ng-container matColumnDef="montant_pay">
                            <th mat-header-cell *matHeaderCellDef> Montant</th>
                            <td mat-cell *matCellDef="let element"> {{element.montant_pay}} </td>
                        </ng-container>

                        <!-- Name Column -->
                        <ng-container matColumnDef="qte_pay">
                            <th mat-header-cell *matHeaderCellDef> Quantié</th>
                            <td mat-cell *matCellDef="let element"> {{element.qte_pay}} </td>
                        </ng-container>

                        <!-- Weight Column -->
                        <ng-container matColumnDef="banque_pay">
                            <th mat-header-cell *matHeaderCellDef> Banque</th>
                            <td mat-cell *matCellDef="let element"> {{element.banque_pay.libelle}} </td>
                        </ng-container>

                        <!-- Symbol Column -->
                        <ng-container matColumnDef="date_echeance_pay">
                            <th mat-header-cell *matHeaderCellDef> Date échenace</th>
                            <td mat-cell *matCellDef="let element">
                                {{utilService.formatDate(element.date_echeance_pay,'DD/MM/AAAA')}}
                            </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="titulaire_pay">
                            <th mat-header-cell *matHeaderCellDef> Titulaire</th>
                            <td mat-cell *matCellDef="let element"> {{element.titulaire_pay}} </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="total_pay">
                            <th mat-header-cell *matHeaderCellDef> Total</th>
                            <td mat-cell *matCellDef="let element"> {{utilService.formatMontant(element.total_pay)}} </td>
                        </ng-container>

                        <!-- Total Column -->
                        <ng-container matColumnDef="deel">
                            <th mat-header-cell *matHeaderCellDef> </th>
                            <td mat-cell *matCellDef="let element ; let i = index">
                                <button (click)="deleteRowChequeTraite(i,element)" color="primary" mat-icon-button
                                        type="button">
                                    <mat-icon svgIcon="mat:remove"></mat-icon>
                                </button>
                            </td>
                        </ng-container>
                        
                        <tr mat-header-row *matHeaderRowDef="displayedColumns_CH_TR ; sticky:true ; "  ></tr>
                        <tr mat-row *matRowDef="let row;let idx=index; let even=even; columns: displayedColumns_CH_TR;"
                            [style.border-bottom]="'2px solid red'" ></tr>
                    </table>
                </div>
                
            </div>
        </div>
               
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close('-1')">Non</button>
      <button  *ngIf="getDetailsPanier.typePayment == 'ESPECE' || getDetailsPanier.typePayment == 'CARTE_BANCAIRE'" mat-button color="primary" (click)="close('Yes')" [disabled]="!especeValidations.valid">VALIDER</button>
      <button  *ngIf="getDetailsPanier.typePayment == 'TICKET'" mat-button color="primary" (click)="close('Yes')" >VALIDER</button>
      <button  *ngIf="getDetailsPanier.typePayment == 'CHEQUE' || getDetailsPanier.typePayment == 'TRAITE'" mat-button color="primary" (click)="close('Yes')" >VALIDER</button>
      <button  *ngIf="getDetailsPanier.typePayment == 'VALIDER_SANS_PAIEMENT'"   mat-button color="primary" (click)="close('Yes')" >VALIDER</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, CommonModule, MatInputModule, SharedModule,
    MatDatepickerModule, FormsModule, MatOptionModule, MatAutocompleteModule, ReactiveFormsModule, MatTableModule]
  ,
  providers:
    [
      { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class DemoDialogComponent {

  set_rest_payement = 0;
  set_rendu_payement = 0;
  set_total_payement = 0;
  totalPanier = 0;
  set_total_payement_org = 0;

  especeValidations: any;//FormGroup;
  ticketValidations: any;//FormGroup;
  chTrValidations: any;//FormGroup;

  referenceTck: string = '';
  ticketType: string = '';
  ticketTypeObj: any = '';
  montantTck: number = 0;
  quantiteTck: number = 1;

  referenceCh_TR: string = '';
  montantCh_TR: number = 0;
  quantiteCh_TR: number = 1;
  banqueCh_TR: string = '';
  banqueCh_TR_Obj: string = '';
  titulaire_Ch_TR: string = '';
  date_echeance_Ch_TR: Date = new Date();

  banqueCtrl = new UntypedFormControl();
  ticketCtrl = new UntypedFormControl();

  banques: Banque[] = [];
  tickets: typeChequeTicket[] = [];

  subjectBanque$: ReplaySubject<Banque[]> = new ReplaySubject<Banque[]>();
  subjectTicket$: ReplaySubject<typeChequeTicket[]> = new ReplaySubject<typeChequeTicket[]>();

  dataBanque$: Observable<Banque[]> = this.subjectBanque$.asObservable();
  dataTicket$: Observable<typeChequeTicket[]> = this.subjectTicket$.asObservable();

  filteredBanque$ = this.banqueCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((banque) => (banque ? this.filterBanques(banque).slice(0, 500) : this.banques.slice(0, 500)))

  );

  set_list_banque() {
    this.filteredBanque$ = this.banqueCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((banque) => (banque ? this.filterBanques(banque).slice(0, 500) : this.banques.slice(0, 500)))

    );
  }

  set_list_ticket() {
    this.filteredTicket$ = this.ticketCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((ticket) => (ticket ? this.filterTickets(ticket).slice(0, 500) : this.tickets.slice(0, 500)))
    );
  }

  filteredTicket$ = this.ticketCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((ticket) => (ticket ? this.filterTickets(ticket).slice(0, 500) : this.tickets.slice(0, 500)))
  );

  row_existeTicket: boolean = false;
  onEnterTicket(evt: any, typeTCK: any) {

    //this.ticketType = evt.source.value ;
    this.ticketValidations.patchValue({ ticketTypeObj: typeTCK })
    this.ticketValidations.patchValue({ ticketType: evt.source.value })
    this.row_existeTicket = false;
    const selectedState = this.dataSourceTicket.data.find(state =>
      state.libelle.toLowerCase() == evt.source.value.toLowerCase());
    if (evt.source.selected) {

      this.dataSourceTicket._updateChangeSubscription();

      /*
            if(selectedState) {
              setTimeout(()=>{
                console.log("xxxxxxxxxxxx : "+this.categoryCtrl.patchValue(selectedState.reference));
              }, 0);
            }
      */
    }
  }

  row_existeBanque: boolean = false;
  onEnterBanque(evt: any, typeBq: any) {

    //this.ticketType = evt.source.value ;

    this.row_existeBanque = false;
    const selectedState = this.dataSourceBanque.data.find(state =>
      state.libelle.toLowerCase() == evt.source.value.toLowerCase());
    if (evt.source.selected) {

      this.chTrValidations.patchValue({ banqueCh_TR_Obj: typeBq })
      this.chTrValidations.patchValue({ banqueCh_TR: evt.source.value })
      this.dataSourceBanque._updateChangeSubscription();
    }



  }

  panelOpenBanque = false;
  dataSourceBanque = new MatTableDataSource<Banque>();
  dataSourceTicket = new MatTableDataSource<typeChequeTicket>();

  constructor(@Inject(MAT_DIALOG_DATA) public getDetailsPanier: any, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DemoDialogComponent>, private date_form: AppDateAdapter
    , private serviceHttpBanque: BanqueHttpService, private serviceHttpTypeChequeTicket: TypeChequeTicketHttpService
    , public utilService: UtilService, private ticketHttpService: TicketHttpService) {

    //this.date_form.setLocale("en-in"); // DD/MM/YYYY
    this.set_Payement = [];
  }

  getDataBanque(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Banque(items[key]))
    // }
    return items
  }
  getDataTicket(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new typeChequeTicket(items[key]))
    // }
    return items
  }

  filterBanques(name: string) {
    return this.banques.filter(
      (banque) => banque.libelle.concat(banque.abreviation).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  filterTickets(name: string) {
    return this.tickets.filter(
      (ticket) => ticket.libelle.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  ngOnInit() {

    this.especeValidations = this.formBuilder.group({
      especeNumber: [0, [notEqualToZero()]]
    });
    this.ticketValidations = this.formBuilder.group({
      montantTck: [0, [notEqualToZero()]],
      referenceTck: ['', [Validators.required,]],
      ticketType: ['', [Validators.required]],
      ticketTypeObj: [''],
      quantiteTck: [1, [Validators.required,]],
    });
    this.chTrValidations = this.formBuilder.group({
      montantCh_TR: [0, [notEqualToZero()]],
      quantiteCh_TR: [1, [notEqualToZero()]],
      referenceCh_TR: ['', [Validators.required,]],
      banqueCh_TR: ['', [Validators.required,]],
      banqueCh_TR_Obj: [''],
      // date_echeance_Ch_TR: [new Date(), [Validators.pattern("/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$/"),  ]],
      date_echeance_Ch_TR: [new Date(), Validators.compose([Validators.required, dateVaidator])],
      titulaire_Ch_TR: [''],
    });
    // console.log(" ----***OPEN  >>>>>>>>> panierCaisseEnCours*******---- : ",JSON.stringify(this.getDetailsPanier));

    this.serviceHttpBanque.GetAll().subscribe((res) => {
      this.subjectBanque$.next(res.RESULTAT);
      // this.subjectBanque$.next(this.getDataBanque(res.RESULTAT));
    });
    this.serviceHttpTypeChequeTicket.GetAll().subscribe((res) => {
      this.subjectTicket$.next(this.getDataTicket(res.RESULTAT));
    });

    this.dataBanque$.pipe(filter<Banque[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.banques = listItems;
    });
    this.dataTicket$.pipe(filter<typeChequeTicket[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.tickets = listItems;
    });

    this.set_rest_payement = this.getDetailsPanier.panierCaisseEnCours.totalReste;
    this.set_rendu_payement = this.getDetailsPanier.panierCaisseEnCours.totalRendu;
    this.set_total_payement = this.getDetailsPanier.panierCaisseEnCours.totalPayement;
    this.set_total_payement_org = this.getDetailsPanier.panierCaisseEnCours.totalPayement;
    this.totalPanier = this.getDetailsPanier.totalPanierCaisse;

    if(this.getDetailsPanier.typePayment == 'ESPECE' || this.getDetailsPanier.typePayment == 'CARTE_BANCAIRE' ){ /// aficher le reste directement dans le popup en cas d'espece
      this.especeValidations.controls['especeNumber'].setValue(this.set_rest_payement)
      this.montantRecuEspece = this.set_rest_payement
      this.updateEntetPaiement('espece',this.set_rest_payement)
    }

  }

  displayedColumns_CH_TR: string[] = ['num_pay', 'montant_pay', 'banque_pay', 'date_echeance_pay', 'titulaire_pay', 'qte_pay', 'total_pay', 'deel'];
  displayedColumns_TK: string[] = ['num_pay', 'montant_pay', 'type_ticket_pay', 'qte_pay', 'total_pay', 'deel'];
  dataSourceOp = new MatTableDataSource<set_ModePayement>();

  addTableChequeTraite() {

    //console.log(this.montantTck+"--------------- "+this.set_date_form.format(new Date(),"DD/MM/YYYY"));
    this.montantRecuEspece = Number(this.montantRecuEspece) + Number(this.montantCh_TR * this.quantiteCh_TR)

    const obj = {
      _id: '',
      num_pay: this.chTrValidations.controls['referenceCh_TR'].value, //this.referenceCh_TR,
      type_ticket_pay: "",
      ecartEspeceNegatif: 0,
      montant_pay: this.chTrValidations.controls['montantCh_TR'].value, //this.montantCh_TR,
      montant_Billet: this.chTrValidations.controls['montantCh_TR'].value, //this.montantCh_TR,
      qte_pay: this.chTrValidations.controls['quantiteCh_TR'].value, //this.quantiteCh_TR,
      total_pay: this.chTrValidations.controls['montantCh_TR'].value, //Number(this.montantCh_TR),
      type_pay: this.getDetailsPanier.typePayment,
      banque_pay: this.chTrValidations.controls['banqueCh_TR_Obj'].value, //this.banqueCh_TR,
      titulaire_pay: this.chTrValidations.controls['titulaire_Ch_TR'].value, //this.titulaire_Ch_TR,
      date_echeance_pay: this.chTrValidations.controls['date_echeance_Ch_TR'].value, //this.date_form.format(this.date_echeance_Ch_TR,"DD/MM/YYYY")
      //date_echeance_pay:  this.date_form.format(this.chTrValidations.controls['date_echeance_Ch_TR'].value,"DD/MM/YYYY")
    }

    let lig_trouvee = false
    this.dataSourceOp.data.forEach((item: any, index: any) => {
      if (item.num_pay == this.chTrValidations.controls['referenceCh_TR'].value) { lig_trouvee = true }
    });
    // this.getDetailsPanier.panierCaisseEnCours.listPayements.forEach((item: any, index: any) => {
    //   if (item.num_pay == this.chTrValidations.controls['referenceCh_TR'].value) { lig_trouvee = true }
    // });

    if (lig_trouvee == false) {
      this.updateEntetPaiement('add', Number(this.chTrValidations.controls['montantCh_TR'].value));
      this.dataSourceOp.data.unshift(obj)
      this.dataSourceOp._updateChangeSubscription();
    } else {
      Swal.fire({
        //toast: true,
        //position: 'top',
        showConfirmButton: false,
        icon: 'warning',
        //timerProgressBar,
        timer: 5000,
        title: 'N° pièce ' + this.chTrValidations.controls['referenceCh_TR'].value + ' existe déjà'
      })
    }

  }
  deleteRowChequeTraite(x: any, elem: any) {

    var delBtn = confirm(" Voulez vous supprimer ce mode de paiement ?");
    if (delBtn == true) {
      this.updateEntetPaiement('del', Number(elem.total_pay));
      this.dataSourceOp.data.splice(x, 1);
      this.dataSourceOp._updateChangeSubscription();
    }
  }

  addTableTicket() {

    this.getDetailsPanier.panierCaisseEnCours.totalPayement += Number(Number(this.montantTck) * this.quantiteTck)
    this.getDetailsPanier.panierCaisseEnCours.totalReste = (Number(this.getDetailsPanier.panierCaisseEnCours.totalAchat) - this.getDetailsPanier.panierCaisseEnCours.totalPayement) < 0 ? 0 : (Number(this.getDetailsPanier.panierCaisseEnCours.totalAchat) - this.getDetailsPanier.panierCaisseEnCours.totalPayement)
    this.getDetailsPanier.panierCaisseEnCours.totalRendu = (Number(this.getDetailsPanier.panierCaisseEnCours.totalAchat) - this.getDetailsPanier.panierCaisseEnCours.totalPayement) < 0 ? (this.getDetailsPanier.panierCaisseEnCours.totalPayement - Number(this.getDetailsPanier.panierCaisseEnCours.totalAchat)) : 0
    let newHbp = this.ticketValidations.value
    // console.log("addTableTicket >>>>>>>>>>>>>>>>>>>>>>  "+this.ticketValidations.controls['referenceTck'].value);
    // console.log(JSON.stringify(newHbp));
    let totLigne = Number(this.ticketValidations.controls['montantTck'].value * this.ticketValidations.controls['quantiteTck'].value)
    const obj = {
      _id: '',
      num_pay: this.ticketValidations.controls['referenceTck'].value, //this.referenceTck,
      type_ticket_pay: this.ticketValidations.controls['ticketTypeObj'].value,//this.ticketType,
      ecartEspeceNegatif: 0,
      montant_pay: this.ticketValidations.controls['montantTck'].value,//this.montantTck,
      montant_Billet: this.ticketValidations.controls['montantTck'].value,//this.montantTck,
      qte_pay: this.ticketValidations.controls['quantiteTck'].value,//this.quantiteTck,
      total_pay: totLigne,
      type_pay: this.getDetailsPanier.typePayment,
      banque_pay: "",
      titulaire_pay: "",
      date_echeance_pay: ""
    }

    let lig_trouvee = false
    const selectedState = this.dataSourceOp.data.findIndex(state =>
      state.num_pay.toLowerCase() == this.ticketValidations.controls['referenceTck'].value.toLowerCase());
    if (selectedState > -1) {
      lig_trouvee = true
    }
    this.getDetailsPanier.panierCaisseEnCours.listPayements.forEach((item: any, index: any) => {
      if (item.num_pay == this.ticketValidations.controls['referenceTck'].value) { lig_trouvee = true }
    });

    if (lig_trouvee == false) {

      this.updateEntetPaiement('add', totLigne);

      this.dataSourceOp.data.unshift(obj)
    } else {
      Swal.fire({
        //toast: true,
        //position: 'top',
        showConfirmButton: false,
        icon: 'warning',
        //timerProgressBar,
        timer: 5000,
        title: 'N° ticket ' + this.ticketValidations.controls['referenceTck'].value + ' existe déjà'
      })
    }

    this.dataSourceOp._updateChangeSubscription();
    this.ticketValidations.patchValue({ referenceTck: "" })
  }
  deleteRowTicket(x: any, elem: any) {

    var delBtn = confirm(" Voulez vous supprimer ce mode de paiement ?");
    if (delBtn == true) {
      this.updateEntetPaiement('del', Number(elem.total_pay));
      this.dataSourceOp.data.splice(x, 1);
      this.dataSourceOp._updateChangeSubscription();
    }

  }

  updateEntetPaiement(modeOperation: any = '', totLigne: any = 0) {

    if (modeOperation == 'add') {
      this.set_total_payement = Number(this.set_total_payement) + Number(totLigne)
    }

    if (modeOperation == 'del') {
      this.set_total_payement = Number(this.set_total_payement) - Number(totLigne)
    }

    if (modeOperation == 'espece') {
      this.set_total_payement = Number(this.set_total_payement_org) + Number(totLigne)
    }

    let restRendu = this.totalPanier - this.set_total_payement

    if (restRendu == 0) {
      this.set_rest_payement = 0;
      this.set_rendu_payement = 0;
    }
    if (restRendu < 0) {
      this.set_rest_payement = 0;
      this.set_rendu_payement = this.set_total_payement - this.totalPanier;
    }

    if (restRendu > 0) {
      this.set_rest_payement = this.totalPanier - this.set_total_payement;
      this.set_rendu_payement = 0;
    }

  }

  montantRecuEspece: number = 0;
  set_Payement: set_ModePayement[];

  calcul_rendu(event: any) { //// A verifier
    this.montantRecuEspece = event.target.value
    this.updateEntetPaiement('espece', Number(event.target.value))
  }

  close(answer: string) {
    if (answer != "-1") {
      if (this.getDetailsPanier.typePayment == 'ESPECE' || this.getDetailsPanier.typePayment == 'CARTE_BANCAIRE') {

        let lig_trouvee = false
        this.getDetailsPanier.panierCaisseEnCours.listPayements.forEach((item: any, index: any) => {

          if (item.type_pay == this.getDetailsPanier.typePayment && item._id == '') {
            lig_trouvee = true;
            Swal.fire({
              //toast: true,
              //position: 'top',
              showConfirmButton: false,
              icon: 'warning',
              //timerProgressBar,
              timer: 5000,
              title: 'Paiement par ' + this.getDetailsPanier.typePayment + ' a été déjà effectué avec montant <br>' + this.utilService.formatMontant(item.montant_pay)
            })
          }
        });
        if (lig_trouvee == false) {
          this.set_Payement.push({
            _id:'',
            type_pay: this.getDetailsPanier.typePayment, ecartEspeceNegatif: 0,
            montant_pay: this.montantRecuEspece, montant_Billet: this.montantRecuEspece,
            num_pay: "", qte_pay: 1, banque_pay: '', titulaire_pay: '', date_echeance_pay: '', type_ticket_pay: '', total_pay: this.montantRecuEspece
          })
        } else {
          this.dialogRef.close(-1);
        }

      } else {

        if (this.getDetailsPanier.typePayment == 'VALIDER_SANS_PAIEMENT') {
          //this.validPanier()
          //this.validVenteSansPayement = !this.validVenteSansPayement
          //this.set_Payement= "VALIDER_SANS_PAIEMENT" ;
        } else {
          this.set_Payement = this.dataSourceOp.data
        }

      }
      if (this.getDetailsPanier.typePayment == 'VALIDER_SANS_PAIEMENT') {
        this.dialogRef.close("VALIDER_SANS_PAIEMENT");
      } else {
        this.dialogRef.close(this.set_Payement);
      }

    } else {
      this.dialogRef.close(-1);
    }

  }

  validPanier___old() {

    let checkPanier: string = "-1";
    if (Number(this.getDetailsPanier.panierCaisseEnCours.totalAchat) == 0 || Number(this.getDetailsPanier.panierCaisseEnCours.totalTTC) == 0) {
      checkPanier = "Panier est vide ! <br>"
    }

    if (checkPanier !== "-1") {

      Swal.fire({
        title: checkPanier,
        text: '',
        icon: "error",
        timer: 5000,
        showConfirmButton: false,
      }).then((result) => {
        return - 1
      });

    } else {

      Swal.fire({
        title: "Impression du ticket",
        //text: "Impression du ticket",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        //cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log("*************validPaniervalidPanier1111****************************")
          // console.log(JSON.stringify(this.getDetailsPanier.panierCaisseEnCours))
          // console.log("****************validPaniervalidPanier222*************************")

          this.ticketHttpService.AddNew(this.getDetailsPanier.panierCaisseEnCours).subscribe((res) => {
            console.log(" ----***validPanier resresresresres*******---- : ", JSON.stringify(res));
            if (res['OK'] == true) {
              // this.set_OnePanier[this.idPanier].numero = res['RESULTAT'].numero
              // this.generatePdf('','print')
            }
            //this.ticketHttpBanque.successCreate(res, this.dialogRef)
            //generatePdf('','print')
          });
          Swal.fire({
            title: "Panier validé",
            text: "",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then((result) => {
            setTimeout(() => {

              //this.stateInputProduct.nativeElement.focus();

            }, 1000);
          });


        }
      });

    }

  }

  onEnterTicketScan(evt: any) {
    let get_clt = evt.target.value;
    evt.target.value = ''; // vider le champs

    if (get_clt) {
      //this.tickets
      let prefixTck = get_clt.substring(0, 3);
      let mntTck = get_clt.substring(3, 9).toString();
      let formattedNumber1 = (mntTck.toString() / 1000).toFixed(3);
      let dateTck = get_clt.substring(9, 11);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      let curDate = currentYear.toString().substring(2, 4)

      if (dateTck === curDate) {
        let selectedState = this.tickets.find(state => state.code.toLowerCase() == prefixTck.toLowerCase());
        if (selectedState != undefined) {
          let montant_deduction = ((Number(selectedState.taux_deduction) * Number(formattedNumber1)) / 100)
          let valueTKT = Number(formattedNumber1) - Number(montant_deduction)
          this.ticketValidations.patchValue({ montantTck: roundmMontantNumber(valueTKT) })

          this.ticketValidations.patchValue({ referenceTck: get_clt })
          this.ticketValidations.patchValue({ ticketType: selectedState.libelle })

          selectedState.montant_ticket = Number(formattedNumber1)
          selectedState.montant_deduction = Number(montant_deduction)
          selectedState.valeur_ticket = roundmMontantNumber(valueTKT)


          this.ticketValidations.patchValue({ ticketTypeObj: selectedState })
          //this.referenceTck = get_clt
          this.addTableTicket();
        } else {
          Swal.fire({
            //toast: true,
            //position: 'top',
            showConfirmButton: false,
            icon: 'warning',
            //timerProgressBar,
            timer: 5000,
            title: 'Inavlid Ticket N° ' + get_clt
          })
        }
      } else {
        Swal.fire({
          //toast: true,
          //position: 'top',
          showConfirmButton: false,
          icon: 'warning',
          //timerProgressBar,
          timer: 5000,
          title: 'Date Ticket N° ' + get_clt + '<br>' + 'expirée !'
        })
      }

    }
  }

}

/*************Type Session CAISSE MOdal***************/
@Component({
  selector: 'vex-components-overview-dialogSessionCaisse',
  template: `
    <div mat-dialog-title class="flex items-center justify-between">
        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container">
           <span style="text-align: center; font-size: x-large;"><b>{{typSession.typSession}}</b></span>
        </div>
    </div>
    <mat-dialog-content>

        <div class="px-6 py-4 flex flex-col">
            
                <form class="example-form" [formGroup]="sessionCaisseValidations">
                    <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-3 container">
                    <mat-form-field (click)="set_list_focus()">
                        <mat-icon class="icon-sm"  matIconPrefix svgIcon="mat:search"></mat-icon>
                        <input #stateInputSessionCaisse [formControl]="sessionCaisseCtrl" [matAutocomplete]="autoSessionCaisse"
                           (change)="onEnterSessionCaisseScan($event)"  required (focus)="set_list_focus()"
                               formControlName="set_session_caisse"     onClick="this.select();"  matInput placeholder="Session Caisse"/>
                        <mat-autocomplete #autoSessionCaisse="matAutocomplete"    >
                            <mat-option *ngFor="let state of filteredSessionCaisse$ | async" [value]="state.nom_machine_caisse"
                                            (onSelectionChange)="stateInputSessionCaisse.value !=undefined && onEnterSessionCaisse($event)">
                                <span class="flex items-center">
                                        <img [src]="" class="align-middle mr-4 shadow-lg h-6 inline-block" />
                                        <span class="flex flex-col">
                                            <span class="body-1 leading-snug">{{ state.nom_machine_caisse }}</span>
                                            <span class="caption text-secondary leading-none">Fond: {{ state.fond_caisse_caissier }}</span>
                                        </span>
                                </span>
                            </mat-option>
                        </mat-autocomplete>
                        <button class="text-secondary" mat-icon-button matIconSuffix type="button">
                            <mat-icon svgIcon="mat:arrow_drop_down"></mat-icon>
                        </button>
                        <mat-error *ngIf="sessionCaisseValidations.get('set_session_caisse').hasError('required')">
                            Fond de caisse est obligatoire.
                        </mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="outline" class="col-sm-6">
                        <mat-label>Fond de caisse</mat-label>
                        <input style="text-align: right; padding-right: 1px !important;" matInput
                            required   formControlName="set_fond_caisse"       onClick="this.select();"
                               appMontantDecimaNumber     placeholder="Fond de caisse">
                        <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                        <mat-error *ngIf="sessionCaisseValidations.get('set_fond_caisse').hasError('notEqualToZero')">
                            Le montant ne doit pas être à Zero.
                        </mat-error>
                    </mat-form-field>
                    </div>
                </form>
               
            
        </div>
        
    </mat-dialog-content>

    <mat-dialog-actions style="justify-content:space-between">
      <a (click)="closeSession()" [routerLink]="['/login']" color="primary" mat-button >
          <mat-icon class="ltr:-ml-1 rtl:-mr-1 ltr:mr-2 rtl:ml-2" svgIcon="mat:close"></mat-icon>
          Déconnecter
      </a>
      <button mat-button  [disabled]="!sessionCaisseValidations.valid" color="primary" (click)="close('Yes')">VALIDER</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, CommonModule, MatInputModule, SharedModule,
    MatDatepickerModule, FormsModule, MatOptionModule, MatAutocompleteModule, ReactiveFormsModule, MatTableModule, RouterLink]
})
export class DialogSessionCaisseComponent {

  sessionCaisseValidations: any;//FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public typSession: any, private serviceHttpSessionCaisse: SessionsCaissesHttpService
    , private dialogRef: MatDialogRef<DialogSessionCaisseComponent>, public utilService: UtilService,
    private formBuilder: FormBuilder, private tokenService: TokenService) { }

  sessionCaisseCtrl = new UntypedFormControl();
  session_caisse_list: Sessions_caisse[] = [];
  subjectSessionCaisse$: ReplaySubject<Sessions_caisse[]> = new ReplaySubject<Sessions_caisse[]>();
  sessionCaisses: Sessions_caisse[] = []

  dataSessionCaisse$: Observable<Sessions_caisse[]> = this.subjectSessionCaisse$.asObservable();

  filteredSessionCaisse$ = this.sessionCaisseCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((sessioncaisse) => (sessioncaisse ? this.filterSessionCaisses(sessioncaisse) : this.sessionCaisses.slice()))
  );

  set_list_focus() {
    this.filteredSessionCaisse$ = this.sessionCaisseCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((sessioncaisse) => (sessioncaisse ? this.filterSessionCaisses(sessioncaisse) : this.sessionCaisses.slice()))
    );
  }

  getDataSessionCaisses(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Sessions_caisse(items[key]))
    // }
    return items
  }
  filterSessionCaisses(name: string) {
    return this.sessionCaisses.filter(
      (sessionCaisse) => sessionCaisse.nom_machine_caisse ? sessionCaisse.nom_machine_caisse.toLowerCase().indexOf(name.toLowerCase()) >= 0 : ""
    );
  }

  set_session_caisse?: Sessions_caisse
  set_fond_caisse: number = 0

  onEnterSessionCaisseScan(evt: any) { ///a tester
    let get_clt = evt.target.value;
    evt.target.value = ''; // vider le champs
    this.sessionCaisseValidations.patchValue({ set_session_caisse: get_clt })
  }

  row_existe: boolean = false;
  onEnterSessionCaisse(evt: any) {

    const selectedState = this.sessionCaisses.find(state =>
      state.nom_machine_caisse ? state.nom_machine_caisse.toLowerCase() == evt.source.value.toLowerCase() : "");
    if (selectedState != undefined) {

      this.set_session_caisse = selectedState
      this.sessionCaisseValidations.patchValue({ set_session_caisse: evt.source.value })

      this.sessionCaisseValidations.get('set_fond_caisse').setValue(selectedState.fond_caisse_caissier);
      this.sessionCaisseValidations.get('set_session_caisse').setValue(evt.source.value);
      this.sessionCaisseValidations.get('set_session_caisseOBJ').setValue(evt.source.value);

    }

    this.row_existe = false;

  }

  closeSession() {
    this.dialogRef.close();
  }
  @ViewChild('stateInputSessionCaisse') stateInputSessionCaisse!: ElementRef;

  ngOnInit() {

    this.sessionCaisseValidations = this.formBuilder.group({
      set_session_caisse: ['', [Validators.required]],
      set_session_caisseOBJ: ['', [Validators.required]],
      set_fond_caisse: [0, [Validators.required, notEqualToZero()]]
    });

    this.dataSessionCaisse$.pipe(filter<Sessions_caisse[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.sessionCaisses = listItems;
    });

    this.serviceHttpSessionCaisse.Filter().subscribe((res) => {
      this.sessionCaisses = this.getDataSessionCaisses(res.RESULTAT);

      const toSelect = this.sessionCaisses.find(c => c._id == this.sessionCaisses[0]._id);
      // console.log("************toSelect11**********")
      //console.log(this.sessionCaisses.length == 1 )
      if (this.sessionCaisses.length == 1) {
        this.set_session_caisse = this.sessionCaisses[0]
        this.sessionCaisseValidations.get('set_fond_caisse').setValue(this.sessionCaisses[0].fond_caisse_caissier);

        this.sessionCaisseValidations.get('set_session_caisse').setValue(toSelect?.nom_machine_caisse);
        this.sessionCaisseValidations.get('set_session_caisseOBJ').setValue(toSelect?.nom_machine_caisse);
      }
      // console.log("***********toSelect222***********")


      //this.subjectSessionCaisse$.next(this.getDataSessionCaisses(res.RESULTAT));
      this.subjectSessionCaisse$.next(this.sessionCaisses);

    });

    setTimeout(() => {

      this.stateInputSessionCaisse.nativeElement.focus();

    }, 2500);

  }

  close(answer: string) {
    this.tokenService.saveSessionCaisseCourante(this.set_session_caisse)
    this.dialogRef.close(answer);
  }


}

/*************Type UNITE MOdal***************/
@Component({
  selector: 'vex-components-overview-dialogUnitePrice',
  template: `
    <div mat-dialog-title class="flex items-center justify-between">
        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container">
           <span style="text-align: center; font-size: x-large;">Equivalence unités</span>
           <span hidden style="text-align: center; font-size: large;">(1 unité = coefficient X unité 2)</span>
        </div>
    </div>

    <mat-dialog-content>            
        
            <div class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 container">
                <span style="float:left; font-size: x-large;color: red">Prix unitaire TTC initial : 
                    <b>{{utilService.formatMontant(selectedArticleDiag.selectedArticleDiag.pu_ttc1)}} </b>
                </span>
                <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container">
                    <span style="float:right; font-size: large;color: blue ; text-align: right;">Coefficient: 
                    <b>{{selectedArticleDiag.selectedArticleDiag.article.coefficient}} </b>
                </span>
                    <span style="float:right; font-size: large;color: blue ; text-align: right;">Total TTC: 
                    
                    <b>{{utilService.formatMontant(unitePriceValidations.controls['totalTTC'].value)}} </b>
                </span>
                </div>
            </div>
       
        <div class="card overflow-hidden flex-auto">
            <div class="px-6 py-4 border-b flex items-center" style="justify-content: space-between;">
                <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
                    <span style="font-size: large;display: flex; align-items: center;">Référence : </span>
                    <span style="font-size: large;display: flex; align-items: center;"> <b>{{selectedArticleDiag.selectedArticleDiag.article.reference}} </b></span>
                </div>
                <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
                    <span style="font-size: large;display: flex; align-items: center;">Désigantion : </span>
                    <span style="font-size: large;display: flex; align-items: center;"> <b>{{selectedArticleDiag.selectedArticleDiag.article.designation}}</b></span>
                </div>
            </div>
            
            <div class="px-6 py-4 flex flex-col">

               
                <!-- *************Unite TTC************ -->
                <form class="example-form" [formGroup]="unitePriceValidations" >
                    <div class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1 container"  style="display: inline-flex;max-width: fit-content;">
                        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 container"  style="max-width: fit-content;">
                            <mat-radio-group class="flex gap-4" color="accent" style="flex: inherit;"  style="max-width: fit-content;"
                                            formControlName="selectedGRP"         (change)="onRadioButtonChange($event)"  >
                                <div class="p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container" style="display: grid;">
                                    <mat-radio-button color="primary" value="2"   style="max-width: fit-content;"
                                                      [disabled]="sans_unite2"  >
                                        {{selectedArticleDiag.selectedArticleDiag.unite2.libelle}}
                                    </mat-radio-button>
                                    <mat-radio-button color="warn"    value="1"  style="max-width: fit-content;">
                                        {{selectedArticleDiag.selectedArticleDiag.unite1.libelle}}
                                    </mat-radio-button>
                                </div>
                            </mat-radio-group>
                        </div>                        
                        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 container">
                            <div class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1 container">

                                <mat-form-field appearance="outline" class="col-sm-6">
                                    <mat-label>Quantite unité</mat-label>
                                    <input style="text-align: right; padding-right: 1px !important;" matInput
                                           formControlName="quantiteUnite2"    onClick="this.select();"
                                           appMontantDecimaNumber
                                           [readonly]="isVisibleUnite"
                                           (keyup)="calcul_reciproque_qt2($event)" >
                                    <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                                    <mat-error *ngIf="unitePriceValidations.get('quantiteUnite2').hasError('notEqualToZero')">
                                        Le montant ne doit pas être à Zero.
                                    </mat-error>
                                </mat-form-field>
                                <mat-form-field appearance="outline" class="col-sm-6">
                                    <mat-label>Prix U.ttc</mat-label>
                                    <input style="text-align: right; padding-right: 1px !important;" matInput
                                           formControlName="pu_ttc2"    onClick="this.select();"
                                           appMontantDecimaNumber
                                           [readonly]="isVisibleUnite"
                                           (keyup)="calcul_reciproque_prix2($event)" >
                                    <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                                    <mat-error *ngIf="unitePriceValidations.get('pu_ttc2').hasError('notEqualToZero')">
                                        Le montant ne doit pas être à Zero.
                                    </mat-error>
                                </mat-form-field>

                            </div>
                            <div class="p-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-1 container">

                                <mat-form-field appearance="outline" class="col-sm-6">
                                    <mat-label>Quantite unité</mat-label>
                                    <input style="text-align: right; padding-right: 1px !important;" matInput
                                           formControlName="quantiteUnite1"    onClick="this.select();"
                                           appMontantDecimaNumber
                                           [readonly]="!isVisibleUnite"
                                           (keyup)="calcul_reciproque_qt1($event)"  >
                                    <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                                    <mat-error *ngIf="unitePriceValidations.get('quantiteUnite1').hasError('notEqualToZero')">
                                        Le montant ne doit pas être à Zero.
                                    </mat-error>
                                </mat-form-field>
                                <mat-form-field appearance="outline" class="col-sm-6">
                                    <mat-label>Prix U.ttc</mat-label>
                                    <input style="text-align: right; padding-right: 1px !important;" matInput
                                           formControlName="pu_ttc1"    onClick="this.select();"
                                           appMontantDecimaNumber
                                           [readonly]="!isVisibleUnite"
                                           (keyup)="calcul_reciproque_prix1($event)" >
                                    <mat-icon matIconPrefix svgIcon="mat:money"></mat-icon>
                                    <mat-error *ngIf="unitePriceValidations.get('pu_ttc').hasError('notEqualToZero')">
                                        Le montant ne doit pas être à Zero.
                                    </mat-error>
                                </mat-form-field>

                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
        
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close('-1')">Non</button>
      <button   mat-button color="primary" (click)="close('1')" [disabled]="!unitePriceValidations.valid">VALIDER</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, CommonModule, MatInputModule, SharedModule,
    MatDatepickerModule, FormsModule, MatOptionModule, MatAutocompleteModule, ReactiveFormsModule, MatTableModule, MatRadioModule]
  ,
  providers:
    [
      { provide: AppDateAdapter, useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class DialogUnitePriceComponent {

  unitePriceValidations: any;//FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedArticleDiag: any, private formBuilder: FormBuilder,
    private dialogUnitePrice: MatDialogRef<DialogUnitePriceComponent>, private date_form: AppDateAdapter
    , public utilService: UtilService, private ligneDocumentVenteService: LigneDocumentVenteService) {

  }

  isVisibleUnite: boolean = false

  onRadioButtonChange(event: any) {

    this.isVisibleUnite = false
    if (event.value == 1) { this.isVisibleUnite = true }
    this.calcul_reciproque_qt1(false)
    this.calcul_reciproque_qt2(false)
  }
  sans_unite2:boolean=false
  ngOnInit() {

    // console.log("************DialogUnitePriceComponent*************");
    // console.log(this.selectedArticleDiag.selectedArticleDiag);
    // console.log("************DialogUnitePriceComponent*************");

    if(this.selectedArticleDiag.selectedArticleDiag.unite2=='' || this.selectedArticleDiag.selectedArticleDiag.unite2==null){
      this.sans_unite2 = true
    }else{this.sans_unite2 = false ;}

    let selectedUNT = this.selectedArticleDiag.selectedArticleDiag.isModifierTypeUnite == true ||
                        this.sans_unite2==true ? '1' : '2'

    this.unitePriceValidations = this.formBuilder.group({
      // pu_ttc: [0, [notEqualToZero()]],
      // pu_ttc2: [0, [notEqualToZero()]],
      // quantiteUnite1: [0, [notEqualToZero()]],
      // quantiteUnite2: [0, [notEqualToZero()]],
      _idLigne:'',
      _id: null,
      unite1: null,
      unite2: null,
      unite: null,
      article: null,
      depotpv: null,
      reference: '',
      designation: '',
      quantite: 0,
      pu_ht: 0,
      pu_ht1: 0,
      pu_ht2: 0,
      totalHT: 0,
      pu_ttc: 0,
      pu_ttc1: 0,
      pu_ttc2: 0,
      totalTTC: 0,
      quantiteUnite1: 0,
      quantiteUnite2: 0,
      remise: 0,
      totalRemise: 0,
      montant_Total_DC: 0,
      montant_Total_FODEC: 0,
      totalBrutHT: 0,
      totalNetHT: 0,
      taux_TVA_Applique: 0,
      montant_unitaire_TVA: 0,
      montant_Total_TVA: 0,
      totalRedevance: 0,
      gain_unitaire: 0,
      gain_Total: 0,
      isModifierTypeUnite: null, // a ne pas toucher
      selectedGRP: selectedUNT ,
      //////
      //////
      prixAchatUnitaireHT:  0,
      prixVenteBrutHT:      0,
      tauxremise:           0,
      remiseMontant:        0,
      prixVenteUnitaireHT:  0,
      isFodec:              0,
      tauxFodec:            0,
      montantFodec:         0,
      isDC:                 0,
      tauxDC:               0,
      montantDC:            0,
      prixVenteUnitaireNetHT: 0,
      tauxTVA:              0,
      montantTVA:           0,
      redevance:            0,
      prixVenteUnitaireTTC: 0,
      totalFodec:           0,
      timbreFiscale:        0,
      gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
      gainCommercialTotal:  0, // (quantite * (PV TTC - Prix Achat TTC))
      gainReelUnitaire:     0, // (PV TTC - Prix revient TTC)
      gainReelTotal:        0, // (quantite * (PV TTC - Prix revient TTC))
      isQte1:               0,
      isQte2:               0,
      prixVenteHT:          0,
      isFodecV:             0,
      remiseFVente:         0,
      remiseMontantVente:   0,
      isDCVente:            0,
      tauxDCVente:          0,
      isRedevanceVente:     0,
      quantiteLivre:       0,
      quantiteRestante:    0,

    });

    this.unitePriceValidations.patchValue(this.selectedArticleDiag.selectedArticleDiag)
    if (this.selectedArticleDiag.selectedArticleDiag.isModifierTypeUnite == true || this.sans_unite2 == true) {
      this.isVisibleUnite = true
    } else { this.isVisibleUnite = false }

    this.calcul_reciproque_qt1(false)
    this.calcul_reciproque_qt2(false)
  }

  calcul_reciproque_qt1(event: any) {
    if (this.isVisibleUnite == true) {
      let newArt = this.ligneDocumentVenteService.changeQuantite1(this.unitePriceValidations.value)
      newArt.quantite = newArt.quantiteUnite1
      this.unitePriceValidations.patchValue(newArt)
      this.calcul_reciproque_prix1()
    }
  }

  calcul_reciproque_prix1(event?: any) {
    if (this.isVisibleUnite == true) {
      let ligneArt = this.unitePriceValidations.value
      ligneArt.prixVenteUnitaireTTC = this.unitePriceValidations.controls['pu_ttc1'].value
      //ligneArt.prixVenteUnitaireTTC     = this.unitePriceValidations.controls['pu_ttc'].value
      ligneArt.pu_ttc2    = this.unitePriceValidations.controls['article'].value.coefficient > 0 ? roundmMontantNumber(this.unitePriceValidations.controls['pu_ttc1'].value / this.unitePriceValidations.controls['article'].value.coefficient) : this.unitePriceValidations.controls['pu_ttc1'].value
      ligneArt.pu_ht2     = roundmMontantNumber(ligneArt.pu_ttc2  / (1+ this.unitePriceValidations.controls['taux_TVA_Applique'].value /100))
      ligneArt.pu_ht1     = roundmMontantNumber(ligneArt.pu_ttc1  / (1+ this.unitePriceValidations.controls['taux_TVA_Applique'].value /100))
      ligneArt.pu_ht      = ligneArt.pu_ht1
      ligneArt.pu_ttc     = this.unitePriceValidations.controls['pu_ttc1'].value
      ligneArt.redevance  = this.unitePriceValidations.controls['article'].value.redevance
      this.calculTotalsLigne(ligneArt)
    }
  }

  calcul_reciproque_qt2(event: any) {
    if (this.isVisibleUnite == false) {
      let newArt = this.ligneDocumentVenteService.changeQuantite2(this.unitePriceValidations.value)
      newArt.quantite = newArt.quantiteUnite2
      this.unitePriceValidations.patchValue(newArt)
      this.calcul_reciproque_prix2()
    }
  }
  calcul_reciproque_prix2(event?: any) {
    if (this.isVisibleUnite == false) {
      let ligneArt = this.unitePriceValidations.value
      ligneArt.prixVenteUnitaireTTC = this.unitePriceValidations.controls['pu_ttc2'].value
      ligneArt.pu_ttc1    = this.unitePriceValidations.controls['article'].value.coefficient > 0 ? roundmMontantNumber(this.unitePriceValidations.controls['pu_ttc2'].value * this.unitePriceValidations.controls['article'].value.coefficient) : this.unitePriceValidations.controls['pu_ttc2'].value
      ligneArt.pu_ht1     = roundmMontantNumber(ligneArt.pu_ttc1  / (1+ this.unitePriceValidations.controls['taux_TVA_Applique'].value /100))
      ligneArt.pu_ht2     = roundmMontantNumber(ligneArt.pu_ttc2  / (1+ this.unitePriceValidations.controls['taux_TVA_Applique'].value /100))
      ligneArt.pu_ht      = ligneArt.pu_ht2
      ligneArt.pu_ttc     = this.unitePriceValidations.controls['pu_ttc2'].value
      ligneArt.redevance  = this.unitePriceValidations.controls['article'].value.coefficient > 0 ? roundmMontantNumber(this.unitePriceValidations.controls['article'].value.redevance / this.unitePriceValidations.controls['article'].value.coefficient) : this.unitePriceValidations.controls['article'].value.redevance

      this.calculTotalsLigne(ligneArt, true)
    }

  }

  calculTotalsLigne(ligneArt: any, isQte2?: any) {
    ligneArt.tauxremise = this.unitePriceValidations.controls['remise'].value
    ligneArt.remiseMontant = this.unitePriceValidations.controls['remiseMontant'].value
    let newArt = this.ligneDocumentVenteService.changePrixUnitaireTTC(ligneArt)
    newArt = this.ligneDocumentVenteService.changePrixUnitaireHT(ligneArt)
    newArt = this.ligneDocumentVenteService.changeTotals(newArt, isQte2)
    // console.log("************calcul_reciproque_prix1*************");
    // console.log(newArt);
    // console.log("************calcul_reciproque_prix1*************");

    newArt.totalRemise = newArt.totalRemise
    newArt.montant_Total_DC = newArt.totalDC
    newArt.totalBrutHT = newArt.totalBrutHT
    newArt.totalNetHT = newArt.totalNetHT
    newArt.montant_Total_TVA = newArt.totalTVA
    newArt.totalRedevance = newArt.totalRedevance
    newArt.gain_unitaire = newArt.gainReelUnitaire
    newArt.gain_Total = newArt.gainReelTotal
    newArt.quantite = this.isVisibleUnite == false ? newArt.quantiteUnite2 : newArt.quantiteUnite1
    newArt.unite = this.isVisibleUnite == false ? newArt.unite2 : newArt.unite1
    newArt.totalTTC = this.isVisibleUnite == false ? newArt.quantite * newArt.pu_ttc2 : newArt.quantite * newArt.pu_ttc
    this.unitePriceValidations.patchValue(newArt)
  }

  close(answer: string) {
    if (answer == '-1') {
      this.unitePriceValidations.patchValue({ isModifierTypeUnite: -1 })
      //this.unitePriceValidations.patchValue({isModifierTypeUnite:this.isVisibleUnite})
      this.dialogUnitePrice.close(this.unitePriceValidations.value);
    } else {
      this.unitePriceValidations.patchValue({ isModifierTypeUnite: this.isVisibleUnite })
      this.dialogUnitePrice.close(this.unitePriceValidations.value);
    }

  }

}

