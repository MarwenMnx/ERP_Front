import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Inject,
  HostListener,
  OnInit,ElementRef,Renderer2
} from '@angular/core';
import {fadeInUp400ms} from "@vex/animations/fade-in-up.animation";
import {VexPageLayoutComponent} from "@vex/components/vex-page-layout/vex-page-layout.component";
import {VexSecondaryToolbarComponent} from "@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import {VexBreadcrumbsComponent} from "@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import {MatButtonModule} from "@angular/material/button";
import {VexPageLayoutContentDirective} from "@vex/components/vex-page-layout/vex-page-layout-content.directive";
import {MatGridListModule} from "@angular/material/grid-list";
import {AsyncPipe, NgFor, NgIf , CommonModule ,DOCUMENT  } from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {VexHighlightDirective} from "@vex/components/vex-highlight/vex-highlight.directive";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule,MatTable } from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AbstractControl, FormBuilder, ReactiveFormsModule, UntypedFormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Categorie} from "../../../erp_params/categories/models/categorie.model";
import {CategorieService} from "../../../erp_params/categories/services/categorie.service";
import {CategorieHttpService} from "../../../erp_params/categories/services/categorie-http.service";
import {ClientHttpService} from "../../../erp_params/clients/services/client-http.service";
import {ProductHttpServiceService} from "../../../erp_params/products/services/product-http-service.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { Observable, of, ReplaySubject } from 'rxjs';
import {tableSalesData} from "../../../../static-data/table-sales-data";
import {Client} from "../../../erp_params/clients/models/client.model";
import {Product} from "../../../erp_params/products/models/product.model";
import { FormsModule } from '@angular/forms';
import {document} from "postcss";
import {Banque} from "../../../erp_params/banque/models/banque.model";
import {BanqueHttpService} from "../../../erp_params/banque/services/banque-http.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Margins, StyleDictionary, TDocumentDefinitions, PageSize, Alignment, PageOrientation} from 'pdfmake/interfaces';
import { BrowserModule } from '@angular/platform-browser';
import {DateTime} from "luxon";
import { IndexedDbService } from '../../../utils/indexedDB_PWA/indexeddb.service';
import Swal from "sweetalert2";

import {TicketHttpService} from "../../../erp_params/ticket/services/ticket-http.service";
import {Depot} from "../../../erp_params/depot/models/depot.model";
import {TokenService} from "../../../services/token.service";
import {LEFT_ARROW, RIGHT_ARROW} from "@angular/cdk/keycodes";
import {nodeNameForError} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";
import {ArticleDepotPvs} from "../../../erp_params/article-depotpvs/models/articleDepotPvs.model";
import { UtilService } from '../../../utils/UtilService.service';
import { SharedModule } from 'src/app/utils/shared.module';
import {Lettrage, Reglement, Ticket_Local} from "../../../erp_params/reglements/models/reglement.model";
import {User} from "../../../erp_params/users/models/user.model";
import {Sessions_caisse} from "../../../erp_caisse/sessions-caisses/models/sessions-caisses.model";
import {enum_etatDocument, enum_modeReglement, enum_type_document, enum_types_vente , enum_nomTable} from "../../../global-enums";
import {CompteBancaires} from "../../../erp_params/compteBancaires/models/compteBancaires.model";
import {
  getPatternOfNumeroTelephone,
  notEqualToZero, parseNumberArround,
  roundmMontantNumber, showAlertError,
  succesAlerteAvecTimer
} from "../../../global-functions";
import {LigneDocumentVenteService} from "../../../erp_documents_vente/services/ligne-document-vente.service";
import {ClientService} from "../../../erp_params/clients/services/client.service";
import {TicketService} from "../../../erp_params/ticket/services/ticket.service";
import {DocumentVente} from "../../../erp_documents_vente/models/document-vente.model";
import {DocumentVenteHttpService} from "../../../erp_documents_vente/services/document-vente-http.service";
import {DocumentVenteService} from "../../../erp_documents_vente/services/document-vente.service";
import {DataParamRoute} from "../../../erp_documents_vente/models/data.model";
import {ImpressionPdfService} from "../../../impression/impression-pdf.service";
/////RAPPORT TICKET PDF////////
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { paramBonLivraison } from "../../../erp_documents_vente/parametres-vente";
import {RoleHttpService} from "../../../erp_params/role_users/services/role-http.service";
import {ReglementHttpService} from "../../../erp_params/reglements/services/reglement-http.service";
import {Ticket} from "../../../erp_params/ticket/models/ticket.model";

export interface PeriodicElement {
  article :             Product;
  depotpv :             Depot;
  reference:            string;
  designation:          string;
  quantite:             number;
  pu_ttc:               number;
  pu_ttc1:              number;
  pu_ttc2:              number;
  totalTTC:             number;
  pu_ht:                number;
  pu_ht1:               number;
  pu_ht2:               number;
  quantiteUnite1:       number;
  quantiteUnite2:       number;
  remise:               string;
  totalRemise:         number;
  totalDC:              number;
  montant_Total_FODEC : number;
  totalBrutHT:        number;
  totalNetHT:         number;
  taux_TVA_Applique:    number;
  montant_unitaire_TVA: number;
  totalTVA:             number;
  totalRedevance:      number;
  unite :               string;
  unite1 :              string;
  unite2 :              string;
  isModifierTypeUnite : string;
  ticketPLU:            boolean;
///////
  prixAchatUnitaireHT:  number;
  prixVenteBrutHT:      number;
  tauxremise:           number;
  remiseMontant:        number;
  prixVenteUnitaireHT:  number;
  isFodec:              boolean;
  tauxFodec:            number;
  montantFodec:         number;
  isDC:                 boolean;
  tauxDC:               number;
  montantDC:            number;
  prixVenteUnitaireNetHT: number;
  tauxTVA:              number;
  montantTVA:           number;
  redevance:            number;
  prixVenteUnitaireTTC: number;
  totalHT:              number;
  totalFodec:           number;
  timbreFiscale:        number;
  gainCommercialUnitaire: number; //(PV TTC - Prix Achat TTC)
  gainCommercialTotal:  number; // (quantite * (PV TTC - Prix Achat TTC))
  gainReelUnitaire:     number; // (PV TTC - Prix revient TTC)
  gainReelTotal:        number; // (quantite * (PV TTC - Prix revient TTC))
  isQte1:               boolean;
  isQte2:               boolean;
  prixVenteHT:          number;
  isFodecV:             boolean;
  remiseFVente:         number;
  remiseMontantVente:   number;
  isDCVente:            boolean;
  tauxDCVente:          number;
  isRedevanceVente:     boolean;
  quantiteLivre?:       number;
  quantiteRestante?:    number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  // {reference: "1", designation: 'Hydrogen',   quantite: 1,  pu_ttc: '202.2' , total:1.0079},
  // {reference: "2", designation: 'Helium',     quantite: 4,  pu_ttc: '15.0',   total:1.0079},
  // {reference: "3", designation: 'Lithium',    quantite: 6,  pu_ttc: '1110',   total:1.0079},
  // {reference: "4", designation: 'Beryllium',  quantite: 9,  pu_ttc: '6.32',   total:1.0079},
];

// type list_Paniers = Array<{ id: number; name: string }>;
export interface reglementTicket {
  libelle: string
  panier_reglement:any
  isReglee:boolean
}

export interface listPaniers {
  lignes:PeriodicElement[];//listArticle:PeriodicElement[];
  client:         any;
  sessionCaisse:  any;
  totalAchat:     number;
  totalTTC:       number;
  totalHT:        number;
  totalPayement:  number;
  totalRendu:     number;
  totalReste:     number;
  listPayements:  set_ModePayement[];
  reglements:     any;
  numero:         string;
  date:           Date;
  id_Ticket:      string;
  id_BL:          string;

  totalBrutHT:    number;
  totalRemise:    number;
  totalDC:        number;
  totalFodec:     number;
  totalNetHT:     number;
  totalTVA:       number;
  totalRedevance: number;
  timbreTicket:   number;
  totalPayer:     number;
  resteAPayer:    number;
  montantRendu:   number;

  totalGainCommerciale: number;
  totalGainReel: number;
}

export interface set_ModePayement {
  _id:                string;
  type_pay:           string;
  montant_pay:        number;
  montant_Billet:     number; // le montant reel que le client donne au caissier main à main
  num_pay:            string;
  qte_pay:            number;
  banque_pay:         string;
  titulaire_pay:      string;
  date_echeance_pay:  string;
  type_ticket_pay:    string;
  total_pay:          number;
  ecartEspeceNegatif: number;
}

export interface list_tickets   {
  nombre:             number,
  code_barre:         string ,
  montant_ticket:     number,
  taux_deduction:     number,
  montant_deduction:  number,
  valeur_ticket:      number,
}

export interface plu_Product {
  article: Product,
  code_art:string,
  type:string, //poids ou price // poids_price
  poids:string,
  price:string
}

@Component({
  selector: 'vex-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [ VexPageLayoutComponent,
    FormsModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    VexPageLayoutContentDirective,
    MatGridListModule, NgFor, MatTabsModule, VexHighlightDirective,
    MatExpansionModule,MatIconModule,
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
    MatCheckboxModule,MatDialogModule,SharedModule,
    AsyncPipe, MatPaginatorModule,MatTableModule,MatCardModule,ReactiveFormsModule,CommonModule
  ]
})

export class PanierComponent  implements OnChanges{
  //@ViewChild(MatTableModule ,{static:true}) table: MatTable<any>;

  result?: string;
  resultDB?: string;

  @HostListener('window:keyup.+', ['$event']) w(e: KeyboardEvent) {
    if(this.rowClicked!=undefined){

      this.articles.forEach((item:any, index:any) => {
        if(index==this.rowClicked){
          this.updateQuantity(item, index , "add");
        }
      });
    }

  }
  @HostListener('window:keyup.-', ['$event']) sw(e: KeyboardEvent) {
    if(this.rowClicked!=undefined){

      this.articles.forEach((item:any, index:any) => {
        if(index==this.rowClicked){
          this.updateQuantity(item, index , "del");
        }
      });
    }
  }


  @Input() selectedArticleUnitePrice:any = null;
  @Output() selectedArticle = new EventEmitter<any>();
  rowClicked:any;
  changeTableRowColor(idx: any , art:any ) {

    if(this.idPanier == this.idPanier_current){
      if(this.rowClicked === idx) {
        this.rowClicked = -1;
        this.selectedArticle.emit({article:null,isModifUnitePrice:false});
      } else{
        this.rowClicked = idx;
        this.selectedArticle.emit({article:art,isModifUnitePrice:false});
      }
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    try{

      if(changes['set_focus_init']){

        setTimeout(() => {
          this.stateInputProduct.nativeElement.focus();
        }, 1500);
      }

      if(changes['set_Article_Plan']){

        if(this.idPanier == this.idPanier_current){
          // console.log("************************DEBut set_Article_Plan*************************************")
          // console.log(this.set_Article_Plan)
          // console.log("************************FIN set_Article_Plan*************************************")
          this.onEnterProductFromPlan(this.set_Article_Plan)

          setTimeout(() => {
            this.stateInputProduct.nativeElement.focus();
          }, 1500);

        }

      }
      if(changes['selectedArticleUnitePrice']){

        if(this.idPanier == this.idPanier_current){
           console.log("************************selectedArticleUnitePrice1*************************************")
           console.log(this.selectedArticleUnitePrice)
           console.log("************************selectedArticleUnitePrice2*************************************")
          this.onEnterProductFromCaisse(this.selectedArticleUnitePrice)

        }

      }

      if(changes['productsFromCaisse']){
          this.articleDepotPvss = this.productsFromCaisse;
      }
      if(changes['clientsFromCaisse']){
        this.clients = this.clientsFromCaisse;

        this.set_default_client()
        // console.log("***********1111111111111***************")
        // console.log(JSON.stringify( this.clientsFromCaisse))
        // this.filteredClient$ = this.clientsFromCaisse

        // console.log("*********222222222222*****************")
      }

      if(changes['ticketsClientFromCaisse']){
        this.ticketsClientFromCaisse = this.ticketsClientFromCaisse;

        //  console.log("***********ticketsClientFromCaisse1111111111111***************")
        // console.log(JSON.stringify( this.clientsFromCaisse))
        // this.filteredClient$ = this.clientsFromCaisse

         // console.log("*********ticketsClientFromCaisse222222222222*****************")
      }

      if (changes['set_paiement'])
      {
        // console.log("************************set_paiement*************************************")
        if(this.idPanier == this.idPanier_current){ /////////  a ne pas toucher ni changer ni modifier

          let nbrTicket   = 0
          let totalTicket = 0
          this.set_paiement.forEach((item:any, index:any) => {
            // this.set_total_payement  = Number(this.set_total_payement)+Number(item.montant_pay*item.qte_pay)
            this.set_total_payement  = Number(this.set_total_payement)+Number(item.montant_Billet*item.qte_pay)

            //je verifie l'ecart negatif
            let restRendu__loc             = (Number(this.totalPanier ) - this.set_total_payement)
            if(restRendu__loc==0){
              item.montant_pay = Number(item.montant_Billet ) == this.set_total_payement
                ? Number(this.totalPanier ) : Number(item.montant_pay )///////dhia
            }
            if(restRendu__loc<0){ // il y a rendu qui sera en (-)
              if(item.type_pay=='ESPECE'){item.montant_pay = Number(item.montant_Billet ) + Number(restRendu__loc)}
              else{
                item.montant_pay        = Number(item.montant_Billet )
                item.ecartEspeceNegatif = 0 - Number(restRendu__loc) //// juste ici pour envoyer le montant sans -
              }
            }

             this.set_listPay.splice(0,0,item)

            if(item.type_pay=='TICKET'){
              nbrTicket = Number(nbrTicket) + Number(item.qte_pay) ;
              totalTicket = Number(totalTicket) + Number(item.montant_pay) ;

              this.list_Ticket.push({
                nombre:             item.qte_pay,
                montant_ticket:     item.type_ticket_pay.montant_ticket, //item.montant_pay,
                taux_deduction:     item.type_ticket_pay.taux_deduction,
                montant_deduction:  item.type_ticket_pay.montant_deduction,
                valeur_ticket:      item.type_ticket_pay.valeur_ticket,
              })

            }else{

              let itemReglment=
                {
                  _id:                undefined,
                  numero:             "",
                  date:               this.utilService.setDateReel(new Date()), //new Date () ,
                  montant:            item.montant_pay,
                  montant_Billet:     item.montant_Billet,
                  ecartEspeceNegatif: item.ecartEspeceNegatif,
                  utilisateur :       {_id:this.tokenService.user?._id , nom:this.tokenService.user?.nom},
                  sessionCaisse :       {_id:this.tokenService.sessionCaisseCourante?._id , numero:this.tokenService.sessionCaisseCourante?.numero},
                  client:             this.clientPanier,
                  fournisseur:        null,
                  modeReglement:      this.utilService.getEnumKeyByValue('enum_modeReglement' , item.type_pay),//item.type_pay,

                  //ticket:             Ticket_Local,//[Ticket_Local];
                  numPiece:           item.num_pay,
                  dateEcheance:       item.date_echeance_pay,
                  titulaire:          item.titulaire_pay,
                  banque:             item.banque_pay,
                  //compteBancaire :    CompteBancaires,
                  //statut:             0,//enum_etatDocument;
                  //note:               "",
                  lettrageReglement: {montant_lettre: item.montant_pay, type: enum_type_document.TICKET } ,//Lettrage[],

                  code_societe  : this.tokenService.getCodeSociete(),
                  code_exercice : this.tokenService.getCodeExercice(),
                  code_depotpv  : this.tokenService.getCodePointeVente(),
                  //depotpv : this.tokenService.pointVenteCourante

                };

              this.list_Reglement.splice(0,0,itemReglment)
            }

          });

          if(nbrTicket > 0){
            let itemReglmentTK={
                _id:                undefined,
                numero:             "",
                date:               this.utilService.setDateReel(new Date()),//new Date () ,
                montant:            totalTicket,
                montant_Billet:     totalTicket,
                ecartEspeceNegatif: 0,
                utilisateur :       {_id:this.tokenService.user?._id , nom:this.tokenService.user?.nom},
                sessionCaisse :       {_id:this.tokenService.sessionCaisseCourante?._id , nom:this.tokenService.sessionCaisseCourante?.numero},
                client:             this.clientPanier,
                fournisseur:        null,
                modeReglement:      this.utilService.getEnumKeyByValue('enum_modeReglement' , 'TICKET') , //'TICKET',

                ticket:             this.list_Ticket, //Ticket_Local,//[Ticket_Local];
                numPiece:           '',
                dateEcheance:       '',
                titulaire:          '',
                banque:             '',
                //compteBancaire :    CompteBancaires,
                //statut:             0,//enum_etatDocument;
                //note:               "",
                lettrageReglement: {montant_lettre: totalTicket, type: enum_type_document.TICKET },

                code_societe  : this.tokenService.getCodeSociete(),
                code_exercice : this.tokenService.getCodeExercice(),
                code_depotpv  : this.tokenService.getCodePointeVente(),
                //depotpv : this.tokenService.pointVenteCourante

              }
            this.list_Reglement.splice(0,0,itemReglmentTK)
          }

          let restRendu             = (Number(this.totalPanier ) - this.set_total_payement)
          if(restRendu==0){
            this.set_rest_payement = 0;
            this.set_rendu_payement = 0;
          }
          if(restRendu<0){
            this.set_rest_payement = 0;
            this.set_rendu_payement = this.set_total_payement - this.totalPanier  ;
          }

          if(restRendu>0){
            this.set_rest_payement = this.totalPanier - this.set_total_payement  ;
            this.set_rendu_payement = 0 ;
          }
          // this.set_rest_payement   = (this.totalPanier -  this.set_total_payement) < 0 ? 0 : (this.totalPanier -  this.set_total_payement)
          // this.set_rendu_payement  = (this.totalPanier -  this.set_total_payement) < 0 ? ( this.set_total_payement-this.totalPanier) : 0

          //this.set_listPay.with(0,this.set_paiement)
          //this.set_listPay.splice(0,0,this.set_paiement[0])
          this.set_detailsPanier()
        }

      }

        if(changes['deleteArticle']){
          if(this.idPanier == this.idPanier_current){
            if(this.rowClicked!=undefined && this.rowClicked!= null && this.dataSourceProduct.data.length>0){
              this.delRecord(this.rowClicked)
            }
          }

        }
        if(changes['deleteVente']){

          if(this.idPanier == this.idPanier_current){

            if(this.rowClicked!=undefined && this.rowClicked!= null && this.dataSourceProduct.data.length>0){
              this.delPanier(this.rowClicked)
            }
          }

        }

        if(changes['validVenteAvecsPayement']){
          if(this.idPanier == this.idPanier_current){
            console.log("************************validVenteAvecsPayement 111*************************************"+this.validVenteAvecsPayement)
            console.log(JSON.stringify(this.set_OnePanier[this.idPanier]))
            if(this.validVenteAvecsPayement!= null && this.set_OnePanier[this.idPanier].sessionCaisse != null && this.set_OnePanier[this.idPanier].totalAchat > 0){
                this.validPanier(true) // avec payement
            }
            console.log("************************validVenteAvecsPayement 2222*************************************"+this.validVenteSansPayement)

          }
        }

        if(changes['validVenteSansPayement']){

          if(this.idPanier == this.idPanier_current){
           console.log("************************validVenteSansPayement 111*************************************"+this.validVenteSansPayement)
         console.log(JSON.stringify(this.set_OnePanier[this.idPanier]))
            if(this.validVenteSansPayement!= null && this.set_OnePanier[this.idPanier].sessionCaisse != null && this.set_OnePanier[this.idPanier].totalAchat > 0){
                this.validPanier(false) // sans payement
            }
           console.log("************************validVenteSansPayement 2222*************************************"+this.validVenteSansPayement)

          }

        }

        if (changes['clavierStringInc'])
        {
          console.log("************************clavierStringInc*************************************"+this.clavierStringInc)
          this.changeClavierString()
        }

        if (changes['idPanier'] && this.idPanier_current == this.idPanier){

          if(this.idPanier == this.idPanier_current){

            let data_tot= this.set_OnePanier[this.idPanier] ? this.set_OnePanier[this.idPanier].totalAchat : 0;
            // console.log("data1", this.set_OnePanier[this.idPanier])
            if(data_tot || JSON.stringify(this.set_OnePanier[this.idPanier])==undefined){

              if(this.set_OnePanier[this.idPanier]==undefined){this.set_detailsPanier()}
              this.set_totalPanierCaisse.emit(this.set_OnePanier[this.idPanier].totalAchat)
              this.set_PanierCaisseEnCours.emit(this.set_OnePanier[this.idPanier])

            }else{
              this.msgToSib()
              this.msgToPanier()
              this.set_totalPanierCaisse.emit(0)
            }

            setTimeout(() => {
              this.stateInputProduct.nativeElement.focus();
            }, 1500);

          }


        }

     }catch(e){
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : "+e)
      this.set_totalPanierCaisse.emit(0)
    }
  }


  @Input() set_paiement:set_ModePayement[]=[];
  set_total_payement: number = 0;
  set_rest_payement:  number = 0;
  set_rendu_payement: number = 0;
  set_listPay:set_ModePayement [] = [];

  @Input() clavierString            = '';
  @Input() clavierStringInc         = 0;
  @Input() deleteArticle            = false;
  @Input() deleteVente              = false;
  @Input() validVenteAvecsPayement  = null;
  @Input() validVenteSansPayement   = null;
  @Input() set_Article_Plan         = null;
  @Input() set_focus_init           = false;

  // set_ControlNewQuantite:any  = 0;
  //set_onFocusQuantite:any     = 0;
  // set_onFocusRow:any;
  onFocusQuantite___old(rowD:any,event:any){

    // if(this.idPanier == this.idPanier_current){
    //   //this.set_onFocusQuantite    = event
    //   // this.set_onFocusRow         = rowD
    //   // console.log("*****1111111111***")
    //   // console.log(this.set_onFocusRow)
    //   // console.log("******222222222222**")
    //   //this.set_ControlNewQuantite = 0
    // }

  }

  /////*****par touches clavier *****/////
  onFocusOutQuantite(event:any,row:any,i:any){
    try {

      if(this.idPanier == this.idPanier_current){
        ////////////////this.clavierString = event.target.value;
         ////console.log(" :--------->>>>>>>>>>>>>>>>onFocusOutQuantite<<<<<<<<<<<<<-------------->",event)
      //  this.updateQuantity(this.set_onFocusRow,this.set_onFocusQuantite,'new')
        setTimeout(()=>{
          // console.log(event.target.value+" :--------->>>>>>>>>>>>>>>>onFocusOutQuantite<<<<<<<<<<<<<-------------->"+this.set_onFocusQuantite)
          row.quantite = event.target.value
          this.updateQuantity(row,i,'new')
        }, 2000);
      }


    }catch (e) {
      console.log(event.target.value+" : catcherrror--------->>>>>>>>>>>>>>>>onFocusOutQuantite<XXXXXXXXXX<<<<<-------------->")

    }


  }

  /////*****par touches tactil*****/////14
  changeClavierString(){

    if(this.idPanier == this.idPanier_current){

      if(this.clavierString!=''){
        if(this.clavierStringInc<2){this.articles[this.rowClicked].quantite = 0}
        let qte = this.articles[this.rowClicked].quantite.toString()+this.clavierString
        this.articles[this.rowClicked].quantite = qte
        this.updateQuantity(this.articles[this.rowClicked],this.rowClicked ,'new','-1')
      }

    }

  }

  selected_unite:any = "2"
  onChangePrixTTC___old(event:any,indexx:any,prdct:any){
    // try {
    //
    //   this.updateQuantity(this.set_onFocusRow,this.set_onFocusQuantite,'new')
    //
    // }catch (e) {
    //   console.log(event.target.value+" : catcherrror--------->>>>>>>>>>>>>>>>onChangePrixTTC<>>>>>>>>>>>>>>>>>")
    //
    // }
    }

  @Input() idPanier:number            = 1;
  @Input() idPanier_current:number    = 1;
  @Input() productsFromCaisse:any     = [];
  @Input() clientsFromCaisse:any      = [];
  @Input() balancesFromCaisse:any     = [];
  @Input() ticketsClientFromCaisse:any= [];



  isAccordionClientOpen     = false;
  isVisibleCategory         = false;
  totalPanier:any           = 0;
  totalHT:any               = 0;
  totalPayement:any         = 0;
  totalRendu:any            = 0;
  totalReste:any            = 0;
  clientPanier:any          = "";

  ///BL
  totalBrutHT      = 0
  totalRemise      = 0
  totalFodec       = 0
  totalDC          = 0
  totalNetHT       = 0
  totalTVA         = 0
  totalRedevance   = 0
  totalGainCommerciale  = 0
  totalGainReel         = 0
  timbreTicket    = this.tokenService.exerciceCourante.timbreTicket

  @Output() set_PanierCaisseEnCours = new EventEmitter<any>();
  msgToPanier(){
    if(this.idPanier == this.idPanier_current){ /////////  a ne pas toucher ni changer ni modifier
      this.set_PanierCaisseEnCours.emit(this.set_OnePanier[this.idPanier])

    }else{
      //console.log("msgToSib >>>>>>> Total : xxxxxxxx");
      this.set_PanierCaisseEnCours.emit("")
    }
  }

  @Output() set_synchronizData = new EventEmitter<any>();

  @Output() set_totalPanierCaisse = new EventEmitter<any>();
  msgToSib() {
    //console.log("msgToSib >>>total>>>>>>>> "+JSON.stringify(this.set_OnePanier[this.idPanier]))
    if(this.idPanier == this.idPanier_current){
      if(!this.set_OnePanier[this.idPanier].totalAchat==false){
        this.set_totalPanierCaisse.emit(this.set_OnePanier[this.idPanier].totalAchat)
      }else{
        //console.log("msgToSib >>>>>>> Total : xxxxxxxx");
        this.set_totalPanierCaisse.emit(true)
      }
    }

  }

  colorTablePanier  = 'rgba(192, 169, 255, 0.9)'//'#6d6f6c0d';//'green';
  heightTablePanier = '1px';

  set_OnePanier:listPaniers[];
  reglementTicketClient: reglementTicket[] =[]
  //details client
  clientCode:any            = "0";
  clientCredit:any          = "0";
  clientCarteFedilite:any   = "0";
  clientTel:any             = "0";
  clientPlafondSolde:any    = "0";
  clientSolde:any           = "0";

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  //categoryCtrl  = new UntypedFormControl();
  clientCtrl    = new UntypedFormControl();
  productCtrl   = new UntypedFormControl();
  ticketsClientCtrl   = new UntypedFormControl();
  // banqueCtrl    = new UntypedFormControl();

  articles:any        = []
  list_Reglement :any = []
  list_Ticket :any    = []

  //categorys:      Categorie[]   = [];
  clients:          Client[]              = [];
  products:         Product[]             = [];
  articleDepotPvss: ArticleDepotPvs[]     = [];
  // banques:        Banque[]      = [];

  //subject$: ReplaySubject<Categorie[]>        = new ReplaySubject<Categorie[]>(1);
  subjectClient$: ReplaySubject<Client[]>             = new ReplaySubject<Client[]>();
  subjectProduct$: ReplaySubject<ArticleDepotPvs[]>   = new ReplaySubject<ArticleDepotPvs[]>();
  subjectTicket$: ReplaySubject<Ticket[]>             = new ReplaySubject<Ticket[]>();
  //subjectProduct$: ReplaySubject<Product[]>   = new ReplaySubject<Product[]>();
  // subjectBanque$: ReplaySubject<Banque[]>     = new ReplaySubject<Banque[]>();

  //  data$: Observable<Categorie[]>          = this.subject$.asObservable();
  dataClient$: Observable<Client[]>               = this.subjectClient$.asObservable();
  dataProduct$: Observable<ArticleDepotPvs[]>     = this.subjectProduct$.asObservable();
  dataTicket$: Observable<Ticket[]>               = this.subjectTicket$.asObservable();
  //  dataProduct$: Observable<Product[]>     = this.subjectProduct$.asObservable();
  //  dataBanque$: Observable<Banque[]>       = this.subjectBanque$.asObservable();
/*
  filteredCategorys$ = this.categoryCtrl.valueChanges.pipe(
    startWith(''),
    map((category) => (category ? this.filterCategorys(category) : this.categorys.slice()))
  );
*/

  set_foc_Ticket(){
    this.filteredTicketsClients$ = this.ticketsClientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((ticket) => (ticket ? this.filterTicketsClients(ticket).slice(0, 0) : this.ticketsClientFromCaisse.slice(0, 0)))
    );
  }
  set_foc(){
    this.filteredProduct$ = this.productCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((product) => (product ? this.filterProducts(product).slice(0, 0) : this.articleDepotPvss.slice(0, 0)))
    );
  }

  set_focus_list(){
    this.filteredProduct$ = this.productCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((product) => (product ? this.filterProducts(product).slice(0, 500) : this.articleDepotPvss.slice(0, 500)))
      //map((product) => (product ? this.filterProducts(product).slice(0, 500) : this.products.slice(0, 500)))
    );
  }
  set_focus_TICKET(){
    this.filteredTicketsClients$ = this.ticketsClientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((ticket) => (ticket ? this.filterTicketsClients(ticket).slice(0, 500) : this.ticketsClientFromCaisse.slice(0, 500)))
    );
  }

  set_foc_client(){
    this.filteredClient$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((client) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) ))
    );
  }
  set_default_client(){
    let clientDef:string = this.pos_default_client.code +' '+this.pos_default_client.raisonSociale
    this.filteredClient$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map(value => typeof value === 'string' ? value : value.code),
      map((client) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) )),
      tap(() => this.clientCtrl.setValue(clientDef))
    );
    let evv:any ={target:{value:this.pos_default_client.code}}
    this.onEnterClientScan(evv)
    this.isAccordionClientOpen = false
  }

  set_focus_list_client(){
    this.filteredClient$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((client) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) ))
    );

  }

  filteredClient$ = this.clientCtrl.valueChanges.pipe(
     startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((client) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) ))
  );

  filteredProduct$ = this.productCtrl.valueChanges.pipe(
   startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((product) => (product ? this.filterProducts(product).slice(0, 500) : this.articleDepotPvss.slice(0, 500)))
    //map((product) => (product ? this.filterProducts(product).slice(0, 500) : this.products.slice(0, 500)))
  );

  filteredTicketsClients$ = this.ticketsClientCtrl.valueChanges.pipe(
   startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((ticket) => (ticket ? this.filterTicketsClients(ticket).slice(0, 500) : this.ticketsClientFromCaisse.slice(0, 500)))
    //map((product) => (product ? this.filterProducts(product).slice(0, 500) : this.products.slice(0, 500)))
  );
/*
  filteredProduct$ = this.productCtrl.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((product) => (product ? this.filterProducts(product) : this.products.slice()))
  );
*/
/*
  filteredBanque$ = this.banqueCtrl.valueChanges.pipe(
    startWith(''),
    map((banque) => (banque ? this.filterProducts(banque) : this.banques.slice()))
  );

  row_existeBanque: boolean = false;
  onEnterBanque(evt: any){
    console.log("----------- : "+evt.source.value);
    this.row_existeBanque = false;
    const selectedState =  this.dataSource.data.find(state =>
      state.reference.toLowerCase()==evt.source.value.toLowerCase());
    if (evt.source.selected) {
      console.log("////////Banque ------ : "+selectedState);

      this.dataSourceBanque._updateChangeSubscription();

    }
  }
*/

  set_first_clientTicket:any =null
  getDetailsTicketClient(_id_ticket:any){

    if(this.idPanier == this.idPanier_current){

     //
// let newReglementTicket:any ={libelle: "Valider", panier_reglement :"", isReglee:false}
//       this.reglementTicketClient[this.idPanier].isReglee = false

      this.reinitialiserTicket(this.idPanier)

      this.ticketHttpService.GetTicketByID(_id_ticket).subscribe((res) => {

              res.RESULTAT.lignes.forEach((item: any, index: any) => {
                /// this.set_OnePanier.lignes.push(item)
                let typeUnite:any = null
                if(item.unite1 && item.unite._id==item.unite1._id && item.unite2 == ''){typeUnite=true}
                if(item.unite2 && item.unite._id==item.unite2._id){typeUnite=false}
                let newArticl = {
                  _idLigne:     item._id,
                  _id:          item._id,
                  unite1:       item.article.unite1 ==undefined ? "" : item.article.unite1,
                  unite2:       item.article.unite2 ==undefined ? "" : item.article.unite2,
                  unite:        item.unite          ==undefined ? "" : item.unite,
                  article:      item.article,
                  depotpv:      item.depotpv ,//this.tokenService.pointVenteCourante ,
                  reference:    item.article.reference,
                  designation:  String(item.article.designation)  ,
                  quantite:     Number(item.quantite) ,
                  pu_ht:        item.quantite==item.quantiteUnite1 ? Number(item.pu_ht1) : Number(item.pu_ht2),///Number(item.pu_ht) ,
                  pu_ht1:       Number(item.pu_ht1) ,
                  pu_ht2:       Number(item.pu_ht2) ,
                  totalHT:      Number(item.totalHT) ,
                  pu_ttc:       Number(item.pu_ttc)     ,
                  pu_ttc1:      Number(item.pu_ttc1)     ,
                  pu_ttc2:      Number(item.pu_ttc2)    ,
                  total:        Number(item.totalTTC) , //Number(selectedState.article.prixTTC) ,
                  totalTTC:     Number(item.totalTTC) , //Number(1) * Number(selectedState.article.prixTTC) ,
                  quantiteUnite1: item.quantiteUnite1,
                  quantiteUnite2: item.quantiteUnite2, //Number(item.article.coefficient) > 0 ? Number(1) * Number(item.article.coefficient) : 1   ,
                  remise:         Number(item.remise) ,
                  totalRemise:     Number(item.totalRemise),
                  totalDC:               Number(item.totalDC) ,
                  montant_Total_FODEC : 0,//Number(item.montant_Total_FODEC),
                  totalBrutHT:           Number(item.article.prixVenteHT) *   Number(item.quantite) ,
                  totalNetHT:            Number(item.totalNetHT),
                  taux_TVA_Applique:     item.tauxTVA,
                  montant_unitaire_TVA:  0,//item.montantTVAVente,
                  totalTVA:               item.totalTVA ,
                  totalRedevance:         item.totalRedevance,
                  gainReelUnitaire:       item.gainReelUnitaire,
                  gainReelTotal :         item.gainReelTotal ,
                  isModifierTypeUnite:  typeUnite , //item.unite._id==item.unite1._id  ? true : false,
                 // ticketPLU: articleFromBalancePL!=null ? true : false,

                  prixAchatUnitaireHT:  	item.article.prixAchat 			          ,
                  prixVenteBrutHT:      	item.totalNetHT     	            ,
                  tauxremise:           	Number(item.remiseMontant)    ,
                  remiseMontant:        	Number(item.remiseMontant)       	            ,
                  prixVenteUnitaireHT:  	item.article.prixVenteHT	            ,
                  isFodec:              	item.article.isFodecV             	    ,
                  tauxFodec:            	item.article.tauxFodec , //== true ? item.article.prixFodecV : 0   , // Mohamed verif
                  montantFodec:         	0,//item.prixFodecV        	       ,
                  isDC:                 	item.isDC                	       ,
                  tauxDC:               	item.tauxDC              	       ,
                  montantDC:            	0,//item.montantDC           	       ,
                  prixVenteUnitaireNetHT: 	item.prixNetVenteHT   ,
                  tauxTVA:              	item.article.tauxTVA             	       ,
                  montantTVA:           	0,//item.article.montantTVA          	       ,
                  redevance:            	0,//item.article.redevance           	       ,
                  prixVenteUnitaireTTC: 	 Number(item.pu_ttc)       ,
                  totalFodec:           	 0,//item.article.prixFodecV          	       ,
                  timbreFiscale:        	0 ,
                  gainCommercialUnitaire: 	item.gainCommercialUnitaire   ,
                  gainCommercialTotal:  	item.gainCommercialTotal 	       ,
                  isQte1:               	item.quantite==item.quantiteUnite1 ? true : false,//item.isQte1              	       ,
                  isQte2:               	item.quantite==item.quantiteUnite2 ? true : false,//item.isQte2              	       ,
                  prixVenteHT:          	item.pu_ht,//item.article.prixVenteHT         	       ,
                  isFodecV:             	0,//item.article.isFodecV            	       ,
                  remiseFVente:         	0,//item.remiseFVente        	       ,
                  remiseMontantVente:   	0,//item.remiseMontantVente  	       ,
                  isDCVente:            	0,//item.article.isDCVente           	       ,
                  tauxDCVente:          	0,//item.article.tauxDCVente         	       ,
                  isRedevanceVente:     	0,//item.article.isRedevanceVente    	       ,
                  quantiteLivre:        	0,//item.quantiteLivre       	       ,
                  quantiteRestante:     	0,//item.quantiteRestante    	       ,
                  coefficient:            item.article.coefficient,
                  plafondRemise:          item.article.plafondRemise,
                }
               // let newArticlAffect = this.rectificationTotauxArticle(newArticl)
                this.articles.unshift(newArticl);

                this.updateQuantity(newArticl, 0 , "new");
                //this.updateQuantity(newArticl, null , "new");

              });

       //this.dataSourceProduct.data  =   res.RESULTAT[0].lignes ; //this.set_OnePanier.lignes;
       // this.dataSourceProduct._updateChangeSubscription();

        ////******ATTENTION , Garder ce traitement avant le traitement cidessous du reglement & payement*********/////////
        let ev:any = {
          source:{
            value: res.RESULTAT.client.code.concat(' ',res.RESULTAT.client.raisonSociale),
            selected:true
          }
        }
        this.onEnterClient(ev,false)

        this.set_first_clientTicket = res.RESULTAT.client
        this.set_OnePanier[this.idPanier].listPayements  = []
        this.set_OnePanier[this.idPanier].reglements     = []
        console.log("********res.RESULTAT.reglements111111********")
        console.log( res.RESULTAT.reglements)
        console.log("********res.RESULTAT.reglements2222222********")
              res.RESULTAT.reglements.forEach((item: any, index: any) => {
                let typ_oper:string = (this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement) as string)
                const obj = {
                  _id:                item._id,
                  num_pay :           item.numPiece , //this.referenceTck,
                  type_ticket_pay :   item.modeReglement ,//this.ticketType,
                  montant_pay:        item.montant,//this.montantTck,
                  montant_Billet:     item.montant_Billet,//this.montantTck,
                  qte_pay:            item.ticket.length > 0 ? item.ticket.length : 1 ,//this.quantiteTck,
                  total_pay:          Number(1 * item.montant_Billet),
                  type_pay:           typ_oper,//typ_oper=='TICKET' ? typ_oper+' ('+item.ticket.length+') ' : typ_oper ,
                  // type_pay:         this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement),
                  banque_pay:         item.banque == undefined ? '' :item.banque  ,
                  titulaire_pay:      item.titulaire,
                  date_echeance_pay:  item.dateEcheance == undefined ? '' :item.dateEcheance  ,
                  ecartEspeceNegatif: item.ecartEspeceNegatif,

                  code_societe  : item.code_societe,
                  code_exercice : item.code_exercice,
                  code_depotpv  : item.code_depotpv,

                  sessionCaisse :     {_id:item.sessionCaisse?._id , nom:item.sessionCaisse?.numero , cloture:item.sessionCaisse?.cloture},
                }

                let itemReglmentTK={
                  _id:                item._id,
                  numero:             item.numero,
                  date:               item.date,//new Date () ,
                  montant:            item.montant,
                  montant_Billet:     item.montant_Billet,
                  ecartEspeceNegatif: item.ecartEspeceNegatif,
                  utilisateur :       {_id:item.utilisateur?._id , nom:item.utilisateur?.nom},
                  sessionCaisse :     {_id:item.sessionCaisse?._id , nom:item.sessionCaisse?.numero, cloture:item.sessionCaisse?.cloture},
                  client:             item.client,
                  fournisseur:        null,
                  modeReglement:      item.modeReglement,

                  ticket:             this.list_Ticket, //Ticket_Local,//[Ticket_Local];
                  numPiece:           item.numPiece,
                  dateEcheance:       item.dateEcheance == undefined ? '' :item.dateEcheance  ,
                  titulaire:          item.titulaire,
                  banque:             item.banque,
                  //compteBancaire :    CompteBancaires,
                  statut:             item.statut,//enum_etatDocument;
                  //note:               "",
                  lettrageReglement: item.lettrageReglement ,

                  code_societe  : item.code_societe,
                  code_exercice : item.code_exercice,
                  code_depotpv  : item.code_depotpv,
                  //depotpv : this.tokenService.pointVenteCourante

                }

                this.totalPayement      += Number( Number(1 * item.montant_Billet))
                this.set_total_payement  = Number(this.set_total_payement)+Number( Number(1 * item.montant_Billet))
                //this.set_OnePanier[this.idPanier].listPayements.push(obj)
                //this.set_OnePanier[this.idPanier].reglements.push(itemReglmentTK)
                this.set_listPay.push(obj)
                this.list_Reglement.push(itemReglmentTK)
                this.set_OnePanier[this.idPanier].listPayements = this.set_listPay //.push(obj)
                this.set_OnePanier[this.idPanier].reglements    = this.list_Reglement//.push(itemReglmentTK)

              });

                this.set_OnePanier[this.idPanier].totalAchat    =  res.RESULTAT.totalTTC
                this.set_OnePanier[this.idPanier].totalHT       =  res.RESULTAT.totalHT
                this.set_OnePanier[this.idPanier].client        =  res.RESULTAT.client
                this.set_OnePanier[this.idPanier].sessionCaisse =  res.RESULTAT.sessionCaisse
                this.set_OnePanier[this.idPanier].id_Ticket     =  res.RESULTAT._id
                this.set_OnePanier[this.idPanier].id_BL         =  ""
                this.set_OnePanier[this.idPanier].date          =  res.RESULTAT.date

              let restRendu             = (Number(this.set_OnePanier[this.idPanier].totalAchat ) - this.totalPayement)
              if(restRendu==0){
                this.set_OnePanier[this.idPanier].totalReste = 0;
                this.set_OnePanier[this.idPanier].totalRendu = 0;
                this.set_rest_payement  = 0;
                this.set_rendu_payement = 0;
              }
              if(restRendu<0){
                this.set_OnePanier[this.idPanier].totalReste = 0;
                this.set_OnePanier[this.idPanier].totalRendu = this.totalPayement- Number(this.set_OnePanier[this.idPanier].totalAchat)  ;
                this.set_rest_payement  = 0;
                this.set_rendu_payement = this.set_total_payement - this.totalPanier  ;
              }

              if(restRendu>0){
                this.set_OnePanier[this.idPanier].totalReste = Number(this.set_OnePanier[this.idPanier].totalAchat ) - this.totalPayement  ;
                this.set_OnePanier[this.idPanier].totalRendu = 0 ;
                this.set_rest_payement  = this.totalPanier - this.set_total_payement  ;
                this.set_rendu_payement = 0 ;
              }

              this.set_OnePanier[this.idPanier].numero          = res.RESULTAT.numero
              this.set_OnePanier[this.idPanier].totalPayement   = this.totalPayement
              this.set_OnePanier[this.idPanier].id_Ticket       = res.RESULTAT._id
              this.set_OnePanier[this.idPanier].sessionCaisse   = res.RESULTAT.sessionCaisse

              this.dataSourceProduct.data = this.articles;

              this.reglementTicketClient = [];
              this.reglementTicketClient.push({
                libelle           :"Valider" ,
                panier_reglement  :this.set_OnePanier[this.idPanier] ,
                isReglee          :true
              } )
      });

    }

  }

  row_existeTicketClient: boolean = false;
  onEnterTicketClient(evt: any,tkt:any){

    this.row_existeTicketClient = false;

    const indexArr =  this.ticketsClientFromCaisse.filter(
      (clt:any) => clt._id.toLowerCase().indexOf(tkt._id.toLowerCase()) >= 0
    );
    // const indexArr =  this.ticketsClientFromCaisse.filter(
    //   (clt:any) => clt._id.toLowerCase().indexOf(evt.source.value.toLowerCase()) >= 0
    // );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined

    if (evt.source.selected) {

      if(selectedState !=undefined){

        this.articles.splice(0, this.articles.length);

        // this.articles.splice(0, this.dataSourceProduct.data.length);

        this.getDetailsTicketClient(selectedState._id)

        // this.clientCode            = String(selectedState.code);
        // this.clientCredit          = String(selectedState.enCours);
        // this.clientCarteFedilite   = String(selectedState.plafondEnCours);
        // this.clientTel             = String(selectedState.telephone);
        // this.clientPlafondSolde   = String(selectedState.plafondSolde);
        // this.clientSolde           = String(selectedState.solde);
        //
        // // this.clientPanier = [{code:this.clientCode,matriculeFiscale:String(selectedState.matriculeFiscale)}];
        // this.clientPanier = selectedState;
        //
        // this.list_Reglement.forEach((item: any, index: any) => {
        //   this.list_Reglement[index].client = this.clientPanier
        // });
        //
        // this.set_detailsPanier();
        // setTimeout(() => {
        //   this.stateInputProduct.nativeElement.focus();
        //
        // }, 1500);
      }

      //this.dataSource._updateChangeSubscription();
      /*
            if(selectedState) {
              setTimeout(()=>{
                console.log("xxxxxxxxxxxx : "+this.categoryCtrl.patchValue(selectedState.reference));
              }, 0);
            }
      */
    }

  }
  onEnterTicketClientScan(evt: any,tkt:any){
    let get_clt = evt.target.value ;
    //evt.target.value = ''; // vider le champs
    this.row_existeTicketClient = false;
    // const selectedState =  this.clients.find(state =>
    //   state.code.concat(state.raisonSociale,state.matriculeFiscale).toLowerCase()==get_clt.toLowerCase());

    const indexArr =  this.ticketsClientFromCaisse.filter(
      (clt:any) => clt._id.toLowerCase().indexOf(get_clt.toLowerCase()) >= 0
    );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined

    if (get_clt) {

      if(selectedState !=undefined){
        // this.clientCode            = String(selectedState.code);
        // this.clientCredit          = String(selectedState.enCours);
        // this.clientCarteFedilite   = String(selectedState.plafondEnCours);
        // this.clientTel             = String(selectedState.telephone);
        // this.clientPlafondSolde   = String(selectedState.plafondSolde);
        // this.clientSolde           = String(selectedState.solde);
        //
        // //this.clientPanier = [{code:this.clientCode,matriculeFiscale:String(selectedState.matriculeFiscale)}];
        // this.clientPanier = selectedState;
        //
        // this.list_Reglement.forEach((item: any, index: any) => {
        //   this.list_Reglement[index].client = this.clientPanier
        // });
        //
        // this.set_detailsPanier();
        // this.isAccordionClientOpen = true
        // setTimeout(() => {
        //
        //   this.stateInputProduct.nativeElement.focus();
        //
        // }, 1500);

      }

    }
  }

  affectClientPanier(objClient:any){

    let get_val:any = objClient.code.concat(' ',objClient.raisonSociale)

    this.clientCode            = String(objClient.code);
    this.clientCredit          = String(objClient.enCours);
    this.clientCarteFedilite   = String(objClient.plafondEnCours);
    this.clientTel             = String(objClient.telephone);
    this.clientPlafondSolde    = String(objClient.plafondSolde);
    this.clientSolde           = String(objClient.solde);

    // this.clientPanier = [{code:this.clientCode,matriculeFiscale:String(selectedState.matriculeFiscale)}];
    this.clientPanier = objClient;

    this.list_Reglement.forEach((item: any, index: any) => {
      this.list_Reglement[index].client = this.clientPanier
    });

    this.stateInputClient.nativeElement.value = get_val ; //juste ce code liée à modif ticket ==> getDetailsTicketClient

    this.set_detailsPanier();
    setTimeout(() => {
      this.stateInputProduct.nativeElement.focus();
    }, 1500);
  }

  row_existeClient: boolean = false;
  onEnterClient(evt: any , type:boolean){

    this.row_existeClient = false;
    // const selectedState =  this.clients.find(state =>
    //   state.code.toLowerCase()==evt.source.value.toLowerCase());
    let get_val:string =evt.source.value
    const indexArr =  this.clients.filter(
      (clt) => clt.code.concat(' ',clt.raisonSociale).toLowerCase().indexOf(get_val.toLowerCase()) >= 0
    );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined

    if (evt.source.selected) {

      if(selectedState !=undefined){

        if(type==false){ // cas normal
          this.affectClientPanier(selectedState)
        }else{ // cas check client payement
          if(this.idPanier == this.idPanier_current){
            if(this.set_OnePanier[this.idPanier].numero!= ""){
              if(this.set_OnePanier[this.idPanier].client){
                if(this.set_OnePanier[this.idPanier].client._id != selectedState._id){
                  Swal.fire({
                    title: "ATTENTION" ,
                    text: "Les règlement seront tranférés de client "
                      +this.set_OnePanier[this.idPanier].client.raisonSociale+" vers le client "+selectedState.raisonSociale+" ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    //cancelButtonColor: "#d33",
                    confirmButtonText: "Oui",
                    cancelButtonText: "Non",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.affectClientPanier(selectedState)
                      console.log("*****************enterClient1111************",this.set_OnePanier[this.idPanier])
                    }else{
                      let ev:any = {
                        source:{
                          value: this.set_OnePanier[this.idPanier].client.code.concat(' ',this.set_OnePanier[this.idPanier].client.raisonSociale),
                          selected:true
                        }
                      }
                      // this.onEnterClient(ev)
                      this.stateInputClient.nativeElement.value = ev.source.value ;
                      console.log("*****************enterClient22************",this.set_OnePanier[this.idPanier])
                    }

                  });
                }
              }
            }
          }
        }

      }

    }

  }
  onEnterClientScan(evt: any){
    let get_clt = evt.target.value ;
    //evt.target.value = ''; // vider le champs
    this.row_existeClient = false;
    // const selectedState =  this.clients.find(state =>
    //   state.code.concat(state.raisonSociale,state.matriculeFiscale).toLowerCase()==get_clt.toLowerCase());

    const indexArr =  this.clients.filter(
      (clt) => clt.code.concat(clt.raisonSociale,clt.matriculeFiscale).toLowerCase().indexOf(get_clt.toLowerCase()) >= 0
    );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined

    if (get_clt) {

      if(selectedState !=undefined){
        this.clientCode            = String(selectedState.code);
        this.clientCredit          = String(selectedState.enCours);
        this.clientCarteFedilite   = String(selectedState.plafondEnCours);
        this.clientTel             = String(selectedState.telephone);
        this.clientPlafondSolde   = String(selectedState.plafondSolde);
        this.clientSolde           = String(selectedState.solde);

        //this.clientPanier = [{code:this.clientCode,matriculeFiscale:String(selectedState.matriculeFiscale)}];
        this.clientPanier = selectedState;

        this.list_Reglement.forEach((item: any, index: any) => {
          this.list_Reglement[index].client = this.clientPanier
        });

        this.set_detailsPanier();
        this.isAccordionClientOpen = true
        setTimeout(() => {

          this.stateInputProduct.nativeElement.focus();

        }, 1500);

      }

    }
  }

  row_existeProductPlan: boolean = false;
  onEnterProductFromPlan(prdct:any,){

    if(this.idPanier == this.idPanier_current){

      if(prdct){


        this.row_existeProductPlan  =  false;
        let selectedState     =  prdct ;//this.articles.find(state => state.article.reference.toLowerCase()==evt.source.value.toLowerCase());
        const selectedPrdctPLU     =  this.articleDepotPvss.find((productp:any) => productp.article.reference.toLowerCase()==prdct.article.reference.toLowerCase());
        if(selectedPrdctPLU!= undefined){
          selectedState = selectedPrdctPLU
        }
        let NotStock  = this.controleStockArticle(selectedState)
        if(NotStock==false){
          // const selectedState     =  prdct;
          console.log("*********************DATE DEBUT >>> onEnterProduct11111111***********************")
          // console.log(JSON.stringify(selectedState))
          let unt1 = prdct.article.unite1
          let unt2 = prdct.article.unite2
          // console.log(unt._id)
          // console.log("*********************DATE DEBUT >>> onEnterProduct22222222***********************")

          if(  (unt2==null) || (unt2==undefined) || (unt2=="") ||  (unt1._id == unt2._id))
          {
            //

            //console.log("WWWWWWW : "+selectedState);
            if(selectedState !=undefined){
              // console.log(Object.keys(selectedState));

              this.articles.forEach((item:any, index:any) => {
                // if(item.article._id==prdct._id && item.depotpv._id == prdct.depotpv._id ){
                if (item._id == prdct._id || (item.article._id == prdct.article._id && item.depotpv._id == prdct.depotpv._id  )) {

                  this.updateQuantity(item, index , "add");
                  this.row_existeProductPlan = true;
                }
              });

              if(this.row_existeProductPlan==false){
                let newArticl = {
                  _id:          selectedState._id,
                  unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                  unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                  unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                  article:      selectedState.article,
                  depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                  reference:    selectedState.article.reference , //evt.source.value,
                  designation:  String(selectedState.article.designation)  ,
                  quantite:     Number(1) ,
                  pu_ht:        Number(selectedState.article.prixNetVenteHT) ,
                  pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                  pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                  totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                  pu_ttc:       Number(selectedState.article.prixTTC)     ,
                  pu_ttc1:      Number(selectedState.article.prixTTC)     ,
                  pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                  total:        Number(selectedState.article.prixTTC) ,
                  totalTTC:     Number(1) * Number(selectedState.article.prixTTC) ,
                  quantiteUnite1:1,
                  quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                  remise: 0,
                  totalRemise:0,
                  totalDC: 0 ,
                  montant_Total_FODEC : 0,
                  totalBrutHT:0,
                  totalNetHT:0,
                  taux_TVA_Applique:    selectedState.article.tauxTVA,
                  montant_unitaire_TVA: selectedState.article.montantTVAVente,
                  totalTVA:  0 ,
                  totalRedevance:    0,
                  isModifierTypeUnite:null,
                  ticketPLU:false ,

                  prixAchatUnitaireHT:  0,
                  prixVenteBrutHT:      0,
                  tauxremise:           0,
                  remiseMontant:        0,
                  prixVenteUnitaireHT:  0,
                  isFodec:              false ,
                  tauxFodec:            0,
                  montantFodec:         0,
                  isDC:                 false ,
                  tauxDC:               0,
                  montantDC:            0,
                  prixVenteUnitaireNetHT: selectedState.article.prixNetVenteHT,
                  tauxTVA:              selectedState.article.tauxTVA,
                  montantTVA:           0,
                  redevance:            0,
                  prixVenteUnitaireTTC: 0,
                  totalFodec:           0,
                  timbreFiscale:        0,
                  gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
                  gainCommercialTotal:  0, // (quantite * (PV TTC - Prix Achat TTC))
                  gainReelUnitaire:     0, // (PV TTC - Prix revient TTC)
                  gainReelTotal:        0, // (quantite * (PV TTC - Prix revient TTC))
                  isQte1:               false ,
                  isQte2:               false ,
                  prixVenteHT:          0,
                  isFodecV:             false ,
                  remiseFVente:         0,
                  remiseMontantVente:   0,
                  isDCVente:            false ,
                  tauxDCVente:          0,
                  isRedevanceVente:     false ,
                  quantiteLivre:       0,
                  quantiteRestante:    0,
                }
                this.articles.unshift(newArticl);

                this.updateQuantity(newArticl, null , "new");

                /********DEBUT : test panier ***********/

                this.dataSourceProduct.data = this.articles;
                this.set_detailsPanier();
                /********END : test panier ***********/


              }
            }

            this.dataSourceProduct.data = this.articles;
            this.dataSourceProduct._updateChangeSubscription();


          }else{
            this.selectedArticle.emit({article:{
                _id:          selectedState._id,
                unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                article:      selectedState.article,
                depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                reference:    selectedState.article.reference , //evt.source.value,
                designation:  String(selectedState.article.designation)  ,
                quantite:     1,
                pu_ht:        Number(selectedState.article.prixNetVenteHT) ,
                pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                pu_ttc:       Number(selectedState.article.prixTTC)     ,
                pu_ttc1:      Number(selectedState.article.prixTTC)     ,
                pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                total:        Number(selectedState.article.prixTTC) ,
                quantiteUnite1:1,
                quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                remise: 0,
                remiseMontant : 0 ,
                totalRemise:0,
                totalDC: 0 ,
                montant_Total_FODEC : 0,
                totalBrutHT:0,
                totalNetHT:0,
                taux_TVA_Applique:    selectedState.article.tauxTVA,
                montant_unitaire_TVA: selectedState.article.montantTVAVente,
                totalTVA:  0 ,
                totalRedevance:    0,
                gainReelUnitaire:      0,
                gainReelTotal :        0 ,
                isModifierTypeUnite:null,
              },isModifUnitePrice:true}
            ) ;

          }

        }

      }

    }

  }

  row_existeProduct: boolean = false;
  onEnterProduct(evt: any,prdct:any){

    // console.log(evt)
    if(this.idPanier == this.idPanier_current){
      // console.log("******onEnterProductonEnterProductonEnterProductonEnterProduct***********************",evt)
      if(evt.source.value.length > -1 && evt.source._selected){

        this.row_existeProduct  =  false;
        const selectedState     =  prdct ;//this.articles.find(state => state.article.reference.toLowerCase()==evt.source.value.toLowerCase());

        let NotStock  = this.controleStockArticle(selectedState)
        if(NotStock==false){

          // const selectedState     =  prdct;
          // console.log("*********************DATE DEBUT >>> onEnterProduct11111111***********************")
          // console.log(JSON.stringify(selectedState))
          let unt1 = prdct.article.unite1
          let unt2 = prdct.article.unite2
          // console.log(unt._id)
          // console.log("*********************DATE DEBUT >>> onEnterProduct22222222***********************")

          if(  (unt2==null) || (unt2==undefined) || (unt2=="") ||  (unt1._id == unt2._id))
          {
            //
            if (evt.source.selected) {

              //console.log("WWWWWWW : "+selectedState);
              if(selectedState !=undefined){
                // console.log(Object.keys(selectedState));

                this.articles.forEach((item:any, index:any) => {
                  // if(item._id==prdct._id){
                  if (item._id == prdct._id || (item.article._id == prdct.article._id && item.depotpv._id == prdct.depotpv._id  )) {
                    this.updateQuantity(item, index , "add");
                    this.row_existeProduct = true;
                  }
                });

                if(this.row_existeProduct==false){
                  let newArticl = {
                    _id:          selectedState._id,
                    unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                    unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                    unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                    article:      selectedState.article,
                    depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                    reference:    selectedState.article.reference , //evt.source.value,
                    designation:  String(selectedState.article.designation)  ,
                    quantite:     Number(1) ,
                    pu_ht:        Number(selectedState.article.prixNetVenteHT) ,
                    pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                    pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                    totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                    pu_ttc:       Number(selectedState.article.prixTTC)     ,
                    pu_ttc1:      Number(selectedState.article.prixTTC)     ,
                    pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                    total:        Number(selectedState.article.prixTTC) ,
                    totalTTC:     Number(1) * Number(selectedState.article.prixTTC) ,
                    quantiteUnite1:1,
                    quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                    remise:         Number(selectedState.article.remiseMontant) ,
                    totalRemise:    0 , //Number(selectedState.totalRemise),
                    totalDC:              0, //Number(selectedState.totalDC) ,
                    montant_Total_FODEC : Number(selectedState.article.prixFodecV),
                    totalBrutHT:          Number(selectedState.article.prixNetVenteHT) *  Number(1)  ,
                    totalNetHT:           0 , //Number(selectedState.totalNetHT),
                    taux_TVA_Applique:    selectedState.article.tauxTVA,
                    montant_unitaire_TVA: selectedState.article.montantTVAVente,
                    totalTVA:               0 , //selectedState.totalTVA ,
                    totalRedevance:         0 , //selectedState.totalRedevance,
                    gainReelUnitaire:       0 , //selectedState.gainReelUnitaire,
                    gainReelTotal :         0 , //selectedState.gainReelTotal ,
                    isModifierTypeUnite: null,
                    ticketPLU:false ,

                    prixAchatUnitaireHT:  	selectedState.article.prixAchat 			          ,
                    prixVenteBrutHT:      	selectedState.article.prixNetVenteHT     	            ,
                    tauxremise:           	Number(selectedState.article.remiseMontant)    ,
                    remiseMontant:        	Number(selectedState.article.remiseMontant)       	            ,
                    prixVenteUnitaireHT:  	selectedState.article.prixNetVenteHT	            ,
                    isFodec:              	selectedState.article.isFodecV             	    ,
                    tauxFodec:            	selectedState.article.isFodecV == true ? selectedState.article.prixFodecV : 0   , // Mohamed verif
                    montantFodec:         	selectedState.article.prixFodecV        	       ,
                    isDC:                 	selectedState.article.isDC                	       ,
                    tauxDC:               	selectedState.article.tauxDC              	       ,
                    montantDC:            	0 , //selectedState.montantDC           	       ,
                    prixVenteUnitaireNetHT: 	selectedState.article.prixNetVenteHT   ,
                    tauxTVA:              	selectedState.article.tauxTVA             	       ,
                    montantTVA:           	selectedState.article.montantTVA          	       ,
                    redevance:            	selectedState.article.redevance           	       ,
                    prixVenteUnitaireTTC: 	 Number(selectedState.article.prixTTC)       ,
                    totalFodec:           	 selectedState.article.prixFodecV          	       ,
                    timbreFiscale:        	0 ,
                    gainCommercialUnitaire: 	0, //selectedState.gainCommercialUnitaire   ,
                    gainCommercialTotal:  	0 , //selectedState.gainCommercialTotal 	       ,
                    isQte1:               	selectedState.isQte1              	       ,
                    isQte2:               	selectedState.isQte2              	       ,
                    prixVenteHT:          	selectedState.article.prixVenteHT         	       ,
                    isFodecV:             	selectedState.article.isFodecV            	       ,
                    remiseFVente:         	0,//selectedState.remiseFVente        	       ,
                    remiseMontantVente:   	0,//selectedState.remiseMontantVente  	       ,
                    isDCVente:            	selectedState.article.isDCVente           	       ,
                    tauxDCVente:          	selectedState.article.tauxDCVente         	       ,
                    isRedevanceVente:     	selectedState.article.isRedevanceVente    	       ,
                    quantiteLivre:        	0,//selectedState.quantiteLivre       	       ,
                    quantiteRestante:     	0    	       ,
                  }
                  let newArticlAffect = this.rectificationTotauxArticle(newArticl)
                  this.articles.unshift(newArticlAffect);

                  this.updateQuantity(newArticlAffect, null , "new");

                  /********DEBUT : test panier ***********/

                  this.dataSourceProduct.data = this.articles;
                  this.set_detailsPanier();
                  /********END : test panier ***********/


                }
              }

              this.dataSourceProduct.data = this.articles;
              this.dataSourceProduct._updateChangeSubscription();
              evt.source.value = ''
            }

          }else{
            this.selectedArticle.emit({article:{
                _id:          selectedState._id,
                unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                article:      selectedState.article,
                depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                reference:    selectedState.article.reference , //evt.source.value,
                designation:  String(selectedState.article.designation)  ,
                quantite:     1,
                pu_ht:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,

                pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                pu_ttc:       Number(selectedState.article.prixTTC)     ,
                pu_ttc1:      Number(selectedState.article.prixTTC)     ,
                pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                total:        Number(selectedState.article.prixTTC) ,
                quantiteUnite1:1,
                quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                remise: 0,
                remiseMontant : 0 ,
                totalRemise:0,
                totalDC: 0 ,
                montant_Total_FODEC : 0,
                totalBrutHT:0,
                totalNetHT:0,
                taux_TVA_Applique:    selectedState.article.tauxTVA,
                montant_unitaire_TVA: selectedState.article.montantTVAVente,
                totalTVA:  0 ,
                totalRedevance:    0,
                gainReelUnitaire:      0,
                gainReelTotal :        0 ,
                isModifierTypeUnite:null,
              },isModifUnitePrice:true}
            ) ;
            evt.source.value = ''
          }

        }

      }

    }

  }

  onEnterProductFromCaisse(prdct:any){
    if(this.idPanier == this.idPanier_current){

      this.row_existeProduct  =  false;
      if(prdct){

        if(prdct.isModifierTypeUnite == true || prdct.isModifierTypeUnite == false  ) {
          const selectedPDCT= prdct;//this.articles.find(state => state.article.reference.toLowerCase()==evt.source.value.toLowerCase());

            this.articles.forEach((item: any, index: any) => {
              if (item._id == selectedPDCT._id || (item.article._id == selectedPDCT.article._id && item.depotpv._id == selectedPDCT.depotpv._id  )) {

                this.updateQuantity(selectedPDCT, index, "updtUnitePrice");
                this.row_existeProduct = true;
              }
            });

            if (this.row_existeProduct == false) {

              this.articles.unshift(selectedPDCT);

              this.updateQuantity(selectedPDCT, null, "newUnitePrice");
              // this.updateQuantity(this.articles, null, "newUnitePrice");

              /********DEBUT : test panier ***********/
              this.dataSourceProduct.data = this.articles;
              this.set_detailsPanier();
              /********END : test panier ***********/

            }

            this.dataSourceProduct.data = this.articles;
            this.dataSourceProduct._updateChangeSubscription();

            //prdct.isModifierTypeUnite = null; //reinitiliser pour empecher l'ajout une autre fois


        }

      }
    }

  }

  onEnterProductScan(evt: any){

    if(this.idPanier == this.idPanier_current){
      if(evt.target.value.length > 2){

        let get_prod = evt.target.value ;
        evt.target.value = ''; // vider le champs
        this.row_existeProduct  =  false;
        let articleFromBalancePL:any  = this.getProdcut_PLU(get_prod, this.articleDepotPvss)
        let selectedState       = null

        let articleBalance_quantite        = 1
        let articleBalance_quantiteUnite1  = 1
        let articleBalance_prixTTC         = 0

        if(articleFromBalancePL==null){
          ////////DEBUT - Rechercher si un article est existe sur plusieurs Depot_PV//////////
          const indexArr =  this.articleDepotPvss.filter(
            (productS) => productS.article.reference.concat(productS.article.codeBarre,productS.article.designation).toLowerCase().indexOf(get_prod.toLowerCase()) >= 0
          );
          if(indexArr.length> 1) return -1

          if(selectedState !=undefined){
            selectedState           = indexArr[0]
            articleBalance_prixTTC  = selectedState.article.prixTTC
          }
          ////////FIN - Rechercher si un article est existe sur plusieurs Depot_PV//////////
        }else{
          selectedState                  = articleFromBalancePL
          articleBalance_quantite        = articleFromBalancePL.quantiteBL
          articleBalance_quantiteUnite1  = articleFromBalancePL.quantiteUnite1BL
          articleBalance_prixTTC         = articleFromBalancePL.article.prixTTCBL
        }

        //let selectedState  =  indexArr[0]
        let prdct:any      =  selectedState

        if (get_prod) {


          if(selectedState !=undefined){

            if(this.idPanier == this.idPanier_current){

              let NotStock  = this.controleStockArticle(selectedState)
              if(NotStock==false){

                this.row_existeProduct  =  false;

                let unt1 = prdct.article.unite1
                let unt2 = prdct.article.unite2

                if(  (unt2==null) || (unt2==undefined) || (unt2=="") ||  (unt1._id == unt2._id))
                {
                  //

                  //console.log("WWWWWWW : "+selectedState);
                  if(selectedState !=undefined){
                    // console.log(Object.keys(selectedState));

                    if(articleFromBalancePL==null){ /// SI l'article ne vient pas du balance
                      this.articles.forEach((item:any, index:any) => {
                        // if(item._id==prdct._id){
                        if (item._id == prdct._id || (item.article._id == prdct.article._id && item.depotpv._id == prdct.depotpv._id  )) {
                          if(item.ticketPLU==false){
                            this.updateQuantity(item, index , "add");
                            this.row_existeProduct = true;
                          }
                        }
                      });
                    }

                    if(this.row_existeProduct==false || articleFromBalancePL!=null){
                      let newArticl = {
                        _id:          selectedState._id,
                        unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                        unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                        unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                        article:      selectedState.article,
                        depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                        reference:    selectedState.article.reference,
                        designation:  String(selectedState.article.designation)  ,
                        quantite:     Number(articleBalance_quantite) ,
                        pu_ht:        selectedState.isQte1 == true ? Number(selectedState.pu_ht1) : Number(selectedState.pu_ht2),//Number(selectedState.article.prixVenteHT) ,
                        pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                        pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                        totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                        pu_ttc:       Number(articleBalance_prixTTC ) , //Number(selectedState.article.prixTTC)     ,
                        pu_ttc1:      Number(articleBalance_prixTTC ) , //Number(selectedState.article.prixTTC)     ,
                        pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                        total:        Number(articleBalance_prixTTC ) , //Number(selectedState.article.prixTTC) ,
                        totalTTC:     Number(articleBalance_quantite) * Number(articleBalance_prixTTC ) , //Number(1) * Number(selectedState.article.prixTTC) ,
                        quantiteUnite1: articleBalance_quantiteUnite1,
                        quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                        remise:         Number(selectedState.article.remiseMontant) ,
                        totalRemise:    0 , //Number(selectedState.totalRemise),
                        totalDC:              0, //Number(selectedState.totalDC) ,
                        montant_Total_FODEC : Number(selectedState.article.prixFodecV),
                        totalBrutHT:          Number(selectedState.article.prixVenteHT) *  Number(1)  ,
                        totalNetHT:           0 , //Number(selectedState.totalNetHT),
                        taux_TVA_Applique:    selectedState.article.tauxTVA,
                        montant_unitaire_TVA: selectedState.article.montantTVAVente,
                        totalTVA:               0 , //selectedState.totalTVA ,
                        totalRedevance:         0 , //selectedState.totalRedevance,
                        gainReelUnitaire:       0 , //selectedState.gainReelUnitaire,
                        gainReelTotal :         0 , //selectedState.gainReelTotal ,
                        isModifierTypeUnite:  null,
                        ticketPLU: articleFromBalancePL!=null ? true : false,

                        prixAchatUnitaireHT:  	selectedState.article.prixAchat 			          ,
                        prixVenteBrutHT:      	selectedState.article.prixNetVenteHT     	            ,
                        tauxremise:           	Number(selectedState.article.remiseMontant)    ,
                        remiseMontant:        	Number(selectedState.article.remiseMontant)       	            ,
                        prixVenteUnitaireHT:  	selectedState.article.prixVenteHT	            ,
                        isFodec:              	selectedState.article.isFodecV             	    ,
                        tauxFodec:            	selectedState.article.isFodecV == true ? selectedState.article.prixFodecV : 0   , // Mohamed verif
                        montantFodec:         	selectedState.article.prixFodecV        	       ,
                        isDC:                 	selectedState.article.isDC                	       ,
                        tauxDC:               	selectedState.article.tauxDC              	       ,
                        montantDC:            	0 , //selectedState.montantDC           	       ,
                        prixVenteUnitaireNetHT: 	selectedState.article.prixNetVenteHT   ,
                        tauxTVA:              	selectedState.article.tauxTVA             	       ,
                        montantTVA:           	selectedState.article.montantTVA          	       ,
                        redevance:            	selectedState.article.redevance           	       ,
                        prixVenteUnitaireTTC: 	 Number(selectedState.article.prixTTC)       ,
                        totalFodec:           	 selectedState.article.prixFodecV          	       ,
                        timbreFiscale:        	0 ,
                        gainCommercialUnitaire: 	0, //selectedState.gainCommercialUnitaire   ,
                        gainCommercialTotal:  	0 , //selectedState.gainCommercialTotal 	       ,
                        isQte1:               	selectedState.isQte1              	       ,
                        isQte2:               	selectedState.isQte2              	       ,
                        prixVenteHT:          	selectedState.article.prixVenteHT         	       ,
                        isFodecV:             	selectedState.article.isFodecV            	       ,
                        remiseFVente:         	selectedState.remiseFVente        	       ,
                        remiseMontantVente:   	selectedState.remiseMontantVente  	       ,
                        isDCVente:            	selectedState.article.isDCVente           	       ,
                        tauxDCVente:          	selectedState.article.tauxDCVente         	       ,
                        isRedevanceVente:     	selectedState.article.isRedevanceVente    	       ,
                        quantiteLivre:        	selectedState.quantiteLivre       	       ,
                        quantiteRestante:     	selectedState.quantiteRestante    	       ,
                      }
                      let newArticlAffect = this.rectificationTotauxArticle(newArticl)
                      this.articles.unshift(newArticlAffect);

                      this.updateQuantity(newArticlAffect, null , "new");

                      /********DEBUT : test panier ***********/

                      this.dataSourceProduct.data = this.articles;
                      this.set_detailsPanier();
                      /********END : test panier ***********/


                    }
                  }

                  this.dataSourceProduct.data = this.articles;
                  this.dataSourceProduct._updateChangeSubscription();
                  evt.target.value = ''


                }else{
                  this.selectedArticle.emit({article:{
                      _id:          selectedState._id,
                      unite1:       selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                      unite2:       selectedState.article.unite2 ==undefined ? "" : selectedState.article.unite2,
                      unite:        selectedState.article.unite1 ==undefined ? "" : selectedState.article.unite1,
                      article:      selectedState.article,
                      depotpv:      selectedState.depotpv ,//this.tokenService.pointVenteCourante ,
                      reference:    selectedState.article.reference,
                      designation:  String(selectedState.article.designation)  ,
                      quantite:     1,
                      pu_ht:        Number(selectedState.article.prixNetVenteHT) ,
                      pu_ht1:       Number(selectedState.article.prixNetVenteHT) ,
                      pu_ht2:       Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixNetVenteHT)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixNetVenteHT)    ,
                      totalHT:      Number(selectedState.article.prixNetVenteHT) ,
                      pu_ttc:       Number(selectedState.article.prixTTC)     ,
                      pu_ttc1:      Number(selectedState.article.prixTTC)     ,
                      pu_ttc2:      Number(selectedState.article.coefficient) > 0 ? Number(selectedState.article.prixTTC)/ Number(selectedState.article.coefficient) : Number(selectedState.article.prixTTC)    ,
                      total:        Number(selectedState.article.prixTTC) ,
                      quantiteUnite1:1,
                      quantiteUnite2: Number(selectedState.article.coefficient) > 0 ? Number(1) * Number(selectedState.article.coefficient) : 1   ,
                      remise: 0,
                      remiseMontant : 0 ,
                      totalRemise:0,
                      totalDC: 0 ,
                      montant_Total_FODEC : 0,
                      totalBrutHT:0,
                      totalNetHT:0,
                      taux_TVA_Applique:    selectedState.article.tauxTVA,
                      montant_unitaire_TVA: selectedState.article.montantTVAVente,
                      totalTVA:  0 ,
                      totalRedevance:    0,
                      isModifierTypeUnite:null,
                      ticketPLU:false ,

                      prixAchatUnitaireHT:  0,
                      prixVenteBrutHT:      0,
                      tauxremise:           0,
                      prixVenteUnitaireHT:  0,
                      isFodec:              false ,
                      tauxFodec:            0,
                      montantFodec:         0,
                      isDC:                 false ,
                      tauxDC:               0,
                      montantDC:            0,
                      prixVenteUnitaireNetHT: selectedState.article.prixNetVenteHT,
                      tauxTVA:              selectedState.article.tauxTVA,
                      montantTVA:           0,
                      redevance:            0,
                      prixVenteUnitaireTTC: 0,
                      totalFodec:           0,
                      timbreFiscale:        0,
                      gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
                      gainCommercialTotal:  0, // (quantite * (PV TTC - Prix Achat TTC))
                      gainReelUnitaire:     0, // (PV TTC - Prix revient TTC)
                      gainReelTotal:        0, // (quantite * (PV TTC - Prix revient TTC))
                      isQte1:               false ,
                      isQte2:               false ,
                      prixVenteHT:          0,
                      isFodecV:             false ,
                      remiseFVente:         0,
                      remiseMontantVente:   0,
                      isDCVente:            false ,
                      tauxDCVente:          0,
                      isRedevanceVente:     false ,
                      quantiteLivre:       0,
                      quantiteRestante:    0,
                    },isModifUnitePrice:true}
                  ) ;
                  evt.target.value = ''
                }

              }

            }

          }


        }

      }

    }
    }

  getProdcut_PLU(get_clt:any,listArts:any ){

    let articleBalancePL:any = null
    if(this.idPanier == this.idPanier_current){

      let prefixTck = get_clt.substring(0,2);
      const selectedState     =  this.balancesFromCaisse.find((stas:any) => stas.code_PLU.prefixe.toLowerCase()==prefixTck.toLowerCase());
      if(selectedState!= undefined){
        let get_code    = get_clt.substring(Number(selectedState.code_PLU.position_code)-1,(Number(selectedState.code_PLU.position_code)-1+Number(selectedState.code_PLU.longeur_code))).toString();
        let get_poid    = get_clt.substring(Number(selectedState.code_PLU.position_poids)-1,(Number(selectedState.code_PLU.longeur_poids)-1+Number(selectedState.code_PLU.position_poids))).toString();
        let get_prix    = get_clt.substring(Number(selectedState.code_PLU.position_prix)-1,(Number(selectedState.code_PLU.longeur_prix)-1+Number(selectedState.code_PLU.position_prix))).toString();


        const selectedPrdctPLU     =  listArts.find((productp:any) => productp.code_balance.toLowerCase()==get_code.toLowerCase());
        if(selectedPrdctPLU!= undefined){

          articleBalancePL = selectedPrdctPLU
          if(Number(get_poid)>0 && selectedPrdctPLU.article.venduPar==enum_types_vente.PD){articleBalancePL.quantiteBL = Number(get_poid)/1000 }
          if(Number(get_poid)>0 && selectedPrdctPLU.article.venduPar==enum_types_vente.PD){articleBalancePL.quantiteUnite1BL = Number(get_poid)/1000 }
          if(Number(get_poid)>0 && selectedPrdctPLU.article.venduPar!=enum_types_vente.PD){articleBalancePL.quantiteBL = Number(get_poid) }
          if(Number(get_poid)>0 && selectedPrdctPLU.article.venduPar!=enum_types_vente.PD){articleBalancePL.quantiteUnite1BL= Number(get_poid)}
          if(Number(get_prix)>0){articleBalancePL.article.prixTTCBL = Number(get_prix) }
          if(Number(get_prix)==0){articleBalancePL.article.prixTTCBL = Number(articleBalancePL.article.prixTTC) }
        }
      }

    }

    return articleBalancePL

  }

  controleStockArticle(prdct:any){
      let respBloq = false
      if(prdct!=undefined){

       if(prdct.venteStockNegatif==false && Number(prdct.quantite)==0){
         Swal.fire({
           //toast: true,
           //position: 'top',
           showConfirmButton: false,
           icon: 'warning',
           //timerProgressBar,
           timer: 5000,
           title: 'Article '+prdct.article.reference+' épuisé en stock !'
         })

         respBloq = true
       }
      }
      return respBloq
  }

///////**********BEGIN : CALCUL UNITE**************/////
  calcul_reciproque_qt1(art:any){
    if(this.idPanier == this.idPanier_current){

      if(art.isModifierTypeUnite == true){
        let newArt =  this.ligneDocumentVenteService.changeQuantite1(art)
        art = newArt
        art = this.calcul_reciproque_prix1(art)
      }
    }
    return art ;
  }

  calcul_reciproque_prix1(art?:any){
    if(this.idPanier == this.idPanier_current){
      if(art.isModifierTypeUnite == true){
        let ligneArt                      = art
        ligneArt.prixVenteUnitaireTTC     = art.pu_ttc1 //art.pu_ttc //nadd modif
        ligneArt.pu_ttc2                  = art.article.coefficient > 0 ? roundmMontantNumber(art.pu_ttc  / art.article.coefficient ): art.pu_ttc
        ligneArt.pu_ht2                   = art.article.coefficient > 0 ? roundmMontantNumber(art.pu_ht  / art.article.coefficient ): art.pu_ht
        ligneArt.pu_ht                    = art.pu_ht1/////nadd ajouter
        ligneArt.pu_ttc                   = art.pu_ttc1/////nadd ajouter
        ligneArt.redevance                = art.article.redevance
        art = this.calculTotalsLigne(ligneArt,false)
      }
    }
    return art ;
  }

  calcul_reciproque_qt2(art:any){
    if(this.idPanier == this.idPanier_current){
      if(art.isModifierTypeUnite == false){
        let newArt =  this.ligneDocumentVenteService.changeQuantite2(art)
        art = newArt
        art = this.calcul_reciproque_prix2(art)
      }
    }
    return art ;
  }

  calcul_reciproque_prix2(art?:any){
    if(this.idPanier == this.idPanier_current){
      if(art.isModifierTypeUnite == false){
        let ligneArt                  = art
        ligneArt.prixVenteUnitaireTTC = art.pu_ttc2
        ligneArt.pu_ttc1              = art.article.coefficient > 0 ? roundmMontantNumber(art.pu_ttc2 * art.article.coefficient) : art.pu_ttc2
        ligneArt.pu_ht1               = art.article.coefficient > 0 ? roundmMontantNumber(art.pu_ht2 * art.article.coefficient) : art.pu_ht2
        ligneArt.pu_ht                = art.pu_ht2
        ligneArt.pu_ttc               = art.pu_ttc2
        ligneArt.redevance            = art.article.coefficient > 0 ? roundmMontantNumber(art.article.redevance / art.article.coefficient) : art.article.redevance
        art = this.calculTotalsLigne(ligneArt, true)
      }
    }
    return art ;
  }

  calcul_reciproque_prix2___old(art?:any){
    if(this.idPanier == this.idPanier_current){
      if(art.isModifierTypeUnite == false){
        let ligneArt                      = art
        ligneArt.prixVenteUnitaireTTC     = art.pu_ttc2
        ligneArt.pu_ttc                   = art.article.coefficient > 0 ? roundmMontantNumber(art.pu_ttc2  * art.article.coefficient) : art.pu_ttc2
        ligneArt.redevance                = art.article.coefficient > 0 ? roundmMontantNumber(art.article.redevance / art.article.coefficient) : art.article.redevance
        art = this.calculTotalsLigne(ligneArt,true)
      }
    }
    return art ;
  }

  calculTotalsLigne(ligneArt:any , isQte2?:any){
    // ligneArt.tauxremise           = this.unitePriceValidations.controls['remise'].value
    // ligneArt.remiseMontant        = this.unitePriceValidations.controls['remiseMontant'].value
    let newArt                    =  this.ligneDocumentVenteService.changePrixUnitaireTTC(ligneArt)
    newArt                        =  this.ligneDocumentVenteService.changePrixUnitaireHT(ligneArt)
    newArt                        =  this.ligneDocumentVenteService.changeTotals(newArt,isQte2)
    // console.log("************calcul_reciproque_prix1*************");
    // console.log(newArt);
    // console.log("************calcul_reciproque_prix1*************");

    newArt.totalRemise       = newArt.totalRemise
    newArt.totalDC   = newArt.totalDC
    newArt.totalBrutHT      = newArt.totalBrutHT
    newArt.totalNetHT       = newArt.totalNetHT
    newArt.totalTVA  = newArt.totalTVA
    newArt.totalRedevance    = newArt.totalRedevance
    newArt.gainReelUnitaire      = newArt.gainReelUnitaire
    newArt.gainReelTotal         = newArt.gainReelTotal

    newArt.totalTTC           = newArt.isModifierTypeUnite==false ? newArt.quantite * newArt.pu_ttc2 : newArt.quantite * newArt.pu_ttc

    return newArt
  }

  rectificationTotauxArticle(art:any){

    if(art!=undefined){
      let ligneA = this.ligneDocumentVenteService.changeReadonlyBettweenQte1AndQte2(true, art)
      let newArtTOT = this.ligneDocumentVenteService.changeTotals(ligneA)
      // this.articles[i].total_Remise       = newArtTOT.totalRemise
      // this.articles[i].montant_Total_DC   = newArtTOT.totalDC
      // this.articles[i].total_Brut_HT      = newArtTOT.totalBrutHT
      // this.articles[i].total_Net_HT       = newArtTOT.totalNetHT
      // this.articles[i].montant_Total_TVA  = newArtTOT.totalTVA
      // this.articles[i].total_Redevance    = newArtTOT.totalRedevance
      // this.articles[i].gain_unitaire      = newArtTOT.gainReelUnitaire
      // this.articles[i].gain_Total         = newArtTOT.gainReelTotal
      //
      // // this.articles[i]              = this.calculTotalsLigne(this.articles[i])
      // console.log("*******calcul sans unite 1111111111******")
      // console.log(JSON.stringify(this.articles[i]))
      // console.log("*******calcul sans unite 222222222222******")
      //
      // rowData.quantite        = Number(rowData.quantite)+1;
      // rowData.totalTTC        = Number(rowData.quantite) * rowData.pu_ttc;
      // rowData.totalHT         = Number(rowData.quantite) * rowData.pu_ht;
      // rowData.quantiteUnite1  = rowData.quantite
      art = newArtTOT
    }

   return art
}
///////**********END : CALCUL UNITE**************/////

  updateQuantity(rowData:any, i: any , typeOperation:any , focusPremier?:string)
  {
    console.log("**********typeOperation**********"+typeOperation)
    if(rowData != undefined){

      if(this.idPanier == this.idPanier_current){

        if(typeOperation=="del"){

          if((rowData.quantite-1)<=0){
            //this.delRecord(i);
            // rowData.quantite = 1
          }else{

            this.articles[i].quantite        = Number(this.articles[i].quantite)-1;

            if(rowData.isModifierTypeUnite==true){ //// calcul unite1
              this.articles[i].quantiteUnite1 = this.articles[i].quantite
              this.articles[i].pu_ttc1 = this.articles[i].pu_ttc
              this.articles[i] = this.calcul_reciproque_qt1(this.articles[i])

            }

            if(rowData.isModifierTypeUnite==false){ ///calcul unite2
              this.articles[i].quantiteUnite2 = this.articles[i].quantite
              this.articles[i].pu_ttc = this.articles[i].pu_ttc2
              this.articles[i] = this.calcul_reciproque_qt2(this.articles[i])

            }

            if(rowData.isModifierTypeUnite==null){ ///calcul sans unite
              this.articles[i].totalTTC     = this.articles[i].quantite * this.articles[i].pu_ttc;
              this.articles[i].totalHT      = this.articles[i].quantite * this.articles[i].pu_ht;
              this.articles[i].quantiteUnite1 = this.articles[i].quantite
              this.articles[i].quantiteUnite2 = 0
              this.articles[i].pu_ht2         = 0
              this.articles[i].pu_ttc2        = 0
              this.articles[i]              =   this.calculTotalsLigne(this.articles[i],false)
            }

            // rowData.quantite -= 1;
            // rowData.totalTTC      = rowData.quantite * rowData.pu_ttc;
            // rowData.totalHT       = rowData.quantite * rowData.pu_ht;
            // rowData.quantiteUnite1 = rowData.quantite

          }
          this.articles.splice(i, rowData);
        }

        if(typeOperation=="updtUnitePrice"){
          // console.log("*****updtUnitePrice*******")
          this.articles[i]           = rowData
          this.articles[i].quantite  = rowData.isModifierTypeUnite==false ? Number(rowData.quantiteUnite2) :  Number(rowData.quantiteUnite1);
          this.articles[i].pu_ttc    = rowData.isModifierTypeUnite==false ? Number(rowData.pu_ttc2) :  Number(rowData.pu_ttc);
          this.articles[i].unite    = rowData.isModifierTypeUnite==false ? rowData.unite2:  rowData.unite1 ;

          //this.articles[i].quantiteUnite1 = this.articles[i].quantite //// BackEnd utilise quantiteUnite1
        }

        if(typeOperation=="newUnitePrice"){
          rowData.pu_ttc          = rowData.isModifierTypeUnite==false ? Number(rowData.pu_ttc2) :  Number(rowData.pu_ttc);
          this.articles.splice(i, rowData);
        }

        if(typeOperation=="add"){
          // console.log("*****add*******")
          this.articles[i].quantite        = Number(this.articles[i].quantite)+1;

          if(rowData.isModifierTypeUnite==true){ //// calcul unite1
            this.articles[i].quantiteUnite1 = this.articles[i].quantite
            this.articles[i].pu_ttc1        = this.articles[i].pu_ttc
            this.articles[i]                = this.calcul_reciproque_qt1(this.articles[i])

          }

          if(rowData.isModifierTypeUnite==false){ ///calcul unite2
            this.articles[i].quantiteUnite2 = this.articles[i].quantite
            this.articles[i].pu_ttc         = this.articles[i].pu_ttc2
            this.articles[i]                = this.calcul_reciproque_qt2(this.articles[i])

          }

          if(rowData.isModifierTypeUnite==null){ ///calcul sans unite
            this.articles[i].totalTTC     = this.articles[i].quantite * this.articles[i].pu_ttc;
            this.articles[i].totalHT      = this.articles[i].quantite * this.articles[i].pu_ht;
            this.articles[i].quantiteUnite1 = this.articles[i].quantite
            this.articles[i].quantiteUnite2 = 0
            this.articles[i].pu_ht2         = 0
            this.articles[i].pu_ttc2        = 0
            this.articles[i]              =   this.calculTotalsLigne(this.articles[i],false)
          }
          console.log(this.rowClicked+"*********"+i+"**********"+focusPremier)
          if(this.rowClicked==i || focusPremier!='')
          {
            this.articles.splice(i, rowData);
          }else{
            this.articles.splice(i, 1);
            this.articles.unshift(rowData);
          }

        }

        if(typeOperation=="new"){
          /* rien */
          console.log(i+"******rowData.isModifierTypeUnite****************"+rowData.isModifierTypeUnite)
          if(i!=undefined){
            // if(this.set_ControlNewQuantite ==0){
            //   this.articles[i].quantite = this.clavierString;
            // }else{
            //   this.articles[i].quantite += this.clavierString;
            // }

            if(rowData.isModifierTypeUnite==true){ //// calcul unite1
              console.log("**********calcul unite1********************")
              this.articles[i].quantiteUnite1 = this.articles[i].quantite
              this.articles[i].pu_ttc1 = this.articles[i].pu_ttc
              this.articles[i] = this.calcul_reciproque_qt1(this.articles[i])

            }

            if(rowData.isModifierTypeUnite==false){ ///calcul unite2
              console.log("**********calcul unite2********************")
              this.articles[i].quantiteUnite2 = this.articles[i].quantite
              this.articles[i].pu_ttc = this.articles[i].pu_ttc2
              this.articles[i] = this.calcul_reciproque_qt2(this.articles[i])

            }

            if(rowData.isModifierTypeUnite==null){ ///calcul sans unite
              console.log("**********calcul sans unite********************")
              this.articles[i].quantiteUnite1 = Number(this.articles[i].quantite);
              this.articles[i].quantiteUnite2 = 0
              //this.articles[i]              =   this.calculTotalsLigne(this.articles[i],false)
              this.articles[i].totalTTC     = Number(this.articles[i].quantite) * this.articles[i].pu_ttc;
              this.articles[i].totalHT      = Number(this.articles[i].quantite) * this.articles[i].pu_ht;
              this.articles[i].pu_ht2         = 0
              this.articles[i].pu_ttc2        = 0
              this.articles[i]              =   this.calculTotalsLigne(this.articles[i],false)
            }

          }else{
             console.log("******uuuuuuunfddddddddfinede****************",rowData)

            // let newArtTOT = this.ligneDocumentVenteService.changeTotals(rowData)
            // this.articles[i].total_Remise       = newArtTOT.totalRemise
            // this.articles[i].montant_Total_DC   = newArtTOT.totalDC
            // this.articles[i].total_Brut_HT      = newArtTOT.totalBrutHT
            // this.articles[i].total_Net_HT       = newArtTOT.totalNetHT
            // this.articles[i].montant_Total_TVA  = newArtTOT.totalTVA
            // this.articles[i].total_Redevance    = newArtTOT.totalRedevance
            // this.articles[i].gain_unitaire      = newArtTOT.gainReelUnitaire
            // this.articles[i].gain_Total         = newArtTOT.gainReelTotal
            //
            // // this.articles[i]              = this.calculTotalsLigne(this.articles[i])
            // console.log("*******calcul sans unite 1111111111******")
            // console.log(JSON.stringify(this.articles[i]))
            // console.log("*******calcul sans unite 222222222222******")
          }

        }

        if(typeOperation=="del_art"){
          this.articles.splice(i, 1);
        }

        if(typeOperation=="rien"){
          /////pour recalculer les gains
          let ar = this.calculTotalsLigne(this.articles[i],this.articles[i].isQte2)
          console.log("rien >>>> **********typeOperation**********",ar)
          this.articles[i] = ar
          console.log("rien >>>> **********typeOperation**********",this.articles[i])
        }

        if(focusPremier==''){
          this.rowClicked = 0
        }


        this.dataSourceProduct._updateChangeSubscription(); // <-- Refresh the datasource

        //this.totalPanier  = 0;
        this.totalPanier = Number(this.timbreTicket)
        this.totalHT      = 0;
        ///BL
          this.totalBrutHT      = 0
          this.totalRemise      = 0
          this.totalFodec       = 0
          this.totalDC          = 0
          this.totalNetHT       = 0
          this.totalTVA         = 0
          this.totalRedevance   = 0
          this.totalGainCommerciale   = 0
          this.totalGainReel          = 0
          //timbreFiscale:0,

        this.articles.forEach((item:any , index:any) => {
         ///// this.articles[index].quantiteUnite1 = Number(item.quantite)
          this.totalPanier      = parseNumberArround(this.totalPanier + item.totalTTC) //this.totalPanier + (item.quantite * item.pu_ttc) ;
          this.totalHT          = parseNumberArround(this.totalHT + item.totalHT)//this.totalHT + (item.quantite * item.pu_ht) ;
          //BL
          this.totalBrutHT          = Number(this.totalBrutHT)        + Number(item.totalBrutHT)
          this.totalRemise          = Number(this.totalRemise)        + Number(item.totalRemise)
          this.totalFodec           = Number(this.totalFodec)         + Number(item.totalFodec)
          this.totalDC              = Number(this.totalDC)            + Number(item.totalDC)
          this.totalNetHT           = Number(this.totalNetHT)         + Number(item.totalNetHT)
          this.totalTVA             = Number(this.totalTVA)           + Number(item.totalTVA)
          this.totalRedevance       = Number(this.totalRedevance)     + Number(item.totalRedevance)
          this.totalGainCommerciale  = Number(this.totalGainCommerciale)+ Number(item.gainCommercialTotal)
          this.totalGainReel        = Number(this.totalGainReel)      + Number(item.gainReelTotal)
          this.articles[index].gain_Total = Number(item.gainReelTotal)
          this.articles[index].article.image = []

        });
        //this.set_total_payement   = Number(this.set_OnePanier[this.idPanier].totalPayement)
        this.set_total_payement   = Number(this.set_total_payement)

        let restRendu             = parseNumberArround(this.totalPanier - this.set_total_payement)
        if(restRendu==0){
          this.set_rest_payement = 0;
          this.set_rendu_payement = 0;
        }
        if(restRendu<0){
          this.set_rest_payement = 0;
          this.set_rendu_payement = this.set_total_payement - this.totalPanier  ;
        }
        if(restRendu>0){
          this.set_rest_payement = this.totalPanier - this.set_total_payement  ;
          this.set_rendu_payement = 0 ;
        }

        this.set_detailsPanier();
        //console.log(" ----***updateQuantity *******---- : "+ JSON.stringify(this.set_OnePanier[this.idPanier]));
        this.msgToSib();
      }

    }

  }

  reinitialiserPanier(id_panier:number){

     if(this.idPanier == this.idPanier_current){ /////////  a ne pas toucher ni changer ni modifier

      this.articles.splice(0, this.dataSourceProduct.data.length);
      this.set_total_payement = 0
      this.set_rendu_payement = 0
      this.set_rest_payement  = 0
      this.totalPanier        = 0
      this.totalHT            = 0
      this.totalPayement      = 0
      this.totalRendu         = 0
      this.totalReste         = 0
      this.list_Reglement     = []
      this.articles           = []
      this.set_listPay        = []

       this.set_OnePanier[this.idPanier].listPayements  = []
       this.set_OnePanier[this.idPanier].reglements     = []

       //this.set_OnePanier[this.idPanier].date
       this.set_OnePanier[this.idPanier].id_BL				  = ""
       this.set_OnePanier[this.idPanier].id_Ticket			= ""
       this.set_OnePanier[this.idPanier].lignes			    = []
       this.set_OnePanier[this.idPanier].listPayements	= []
       this.set_OnePanier[this.idPanier].montantRendu		= 0
       this.set_OnePanier[this.idPanier].numero			    = ""
       this.set_OnePanier[this.idPanier].reglements		  = []
       this.set_OnePanier[this.idPanier].resteAPayer		= 0

       this.set_OnePanier[this.idPanier].totalGainCommerciale		= 0
       this.set_OnePanier[this.idPanier].totalGainReel		      = 0
//this.set_OnePanier[this.idPanier].sessionCaisse: Object { _id: "661d1ad83d5054b0265202e8", numero: 5, nom_machine_caisse: "POS_44", … }
       this.set_OnePanier[this.idPanier].timbreTicket		= this.timbreTicket
       this.set_OnePanier[this.idPanier].totalAchat		  = 0
       this.set_OnePanier[this.idPanier].totalBrutHT		= 0
       this.set_OnePanier[this.idPanier].totalDC			  = 0
       this.set_OnePanier[this.idPanier].totalFodec		  = 0
       this.set_OnePanier[this.idPanier].totalHT			  = 0
       this.set_OnePanier[this.idPanier].totalNetHT		  = 0
       this.set_OnePanier[this.idPanier].totalPayer	    = 0
       this.set_OnePanier[this.idPanier].totalPayement	= 0
       this.set_OnePanier[this.idPanier].totalRedevance	= 0
       this.set_OnePanier[this.idPanier].totalRemise		= 0
       this.set_OnePanier[this.idPanier].totalRendu		  = 0
       this.set_OnePanier[this.idPanier].totalReste		  = 0
       this.set_OnePanier[this.idPanier].totalTTC			  = 0
       this.set_OnePanier[this.idPanier].totalTVA			  = 0

      if(this.set_OnePanier[this.idPanier].listPayements.length>0){
        this.set_OnePanier[this.idPanier].listPayements.splice(0, this.set_OnePanier[this.idPanier].listPayements.length);
      }
      if(this.set_OnePanier[this.idPanier].reglements.length>0){
        this.set_OnePanier[this.idPanier].reglements.splice(0, this.set_OnePanier[this.idPanier].reglements.length);
      }
      if(this.set_OnePanier[this.idPanier].client.length>0){
        this.set_OnePanier[this.idPanier].client.splice(0, this.set_OnePanier[this.idPanier].client.length);
      }
      this.dataSourceProduct.data.splice(0, this.dataSourceProduct.data.length);
      this.dataSourceProduct._updateChangeSubscription(); // <-- Refresh the datasource
      this.set_detailsPanier()
      this.set_PanierCaisseEnCours.emit(this.set_OnePanier[this.idPanier])
      this.set_totalPanierCaisse.emit(0)
       this.set_synchronizData.emit(true)
    }
  }

  reinitialiserTicket(id_panier:number){

    if(this.idPanier == this.idPanier_current){ /////////  a ne pas toucher ni changer ni modifier

      this.selectedArticle.emit(null);
      this.selectedArticleUnitePrice = null;
      this.rowClicked         = -1;
      //this.clavierString      =  '0' ;
      //this.set_ControlNewQuantite   = 1;

      this.articles.splice(0, this.dataSourceProduct.data.length);
      this.set_total_payement = 0
      this.set_rendu_payement = 0
      this.set_rest_payement  = 0
      this.totalPanier        = 0
      this.totalHT            = 0
      this.totalPayement      = 0
      this.totalRendu         = 0
      this.totalReste         = 0
      this.totalBrutHT        = 0
      this.totalRemise        = 0
      this.totalFodec         = 0
      this.totalDC            = 0
      this.totalNetHT         = 0
      this.totalTVA           = 0
      this.totalRedevance     = 0
      this.totalGainCommerciale = 0
      this.totalGainReel      = 0
      this.list_Reglement     = []
      // this.articles           = []
      this.set_listPay        = []

      this.set_OnePanier[this.idPanier].listPayements  = []
      this.set_OnePanier[this.idPanier].reglements     = []

      if(this.set_OnePanier[this.idPanier].listPayements.length>0){
        this.set_OnePanier[this.idPanier].listPayements.splice(0, this.set_OnePanier[this.idPanier].listPayements.length);
      }
      if(this.set_OnePanier[this.idPanier].reglements.length>0){
        this.set_OnePanier[this.idPanier].reglements.splice(0, this.set_OnePanier[this.idPanier].reglements.length);
      }
      if(this.set_OnePanier[this.idPanier].client.length>0){
        this.set_OnePanier[this.idPanier].client.splice(0, this.set_OnePanier[this.idPanier].client.length);
      }
      this.dataSourceProduct.data.splice(0, this.dataSourceProduct.data.length);
      this.dataSourceProduct._updateChangeSubscription(); // <-- Refresh the datasource
      this.set_detailsPanier()
      this.set_PanierCaisseEnCours.emit(this.set_OnePanier[this.idPanier])
      this.set_totalPanierCaisse.emit(0)
      // this.set_synchronizData.emit(true)
    }
  }

  set_detailsPanier(){
   //this.set_listPay.push({  set_ListPayement: this.set_listPay});
    if(this.idPanier == this.idPanier_current){
/*
      //let list_Reglement : any ;//Reglement[]
      this.set_listPay.forEach((item:any, index:any) => {
        // this.set_total_payement  = Number(this.set_total_payement)+Number(item.montant_pay*item.qte_pay)
          // type_ticket_pay:    string;
        this.list_Reglement.push(
          {
        numero:             "",
        date:               new Date () ,
        montant:            item.montant_pay,
        ecartEspeceNegatif: 0,
        utilisateur :       {_id:this.tokenService.user?._id , nom:this.tokenService.user?.nom},
        sessionCaisse :       {_id:this.tokenService.sessionCaisseCourante?._id , nom:this.tokenService.sessionCaisseCourante?.numero},
        client:             this.clientPanier,
        fournisseur:        null,
        modeReglement:      item.type_pay,

        //ticket:             Ticket_Local,//[Ticket_Local];
        numPiece:           item.num_pay,
        dateEcheance:       item.date_echeance_pay,
        titulaire:          item.titulaire_pay,
        banque:             item.banque_pay,
        //compteBancaire :    CompteBancaires,
        //statut:             0,//enum_etatDocument;
        //note:               "",
        //lettrageReglement: Lettrage[],

          code_societe  : this.tokenService.getCodeSociete(),
          code_exercice : this.tokenService.getCodeExercice(),
          code_depotpv  : this.tokenService.getCodePointeVente(),
          //depotpv : this.tokenService.pointVenteCourante

          }
        );
        //this.set_listPay.splice(0,0,item)
      });
*/

      let get_sess = this.set_OnePanier[this.idPanier]?.sessionCaisse
      this.set_OnePanier[this.idPanier] = {
        reglements:     this.list_Reglement,
        lignes:         this.articles,//listArticle:    this.articles ,
        totalAchat:     this.totalPanier,
        totalTTC:       this.totalPanier,
        totalHT:        this.totalHT,
        totalPayement:  this.set_total_payement ,//this.totalPayement,
        totalRendu:     this.set_rendu_payement,//this.totalRendu,
        totalReste:     this.set_rest_payement,//this.totalReste,
        client:         this.clientPanier,
        sessionCaisse:  get_sess ==undefined ? this.tokenService.getSessionCaisse() : this.set_OnePanier[this.idPanier]?.sessionCaisse, //garder ce traitement car il y a un controle la modif ticket /// //
        listPayements:  this.set_listPay,
        numero:         this.set_OnePanier[this.idPanier]?.numero,
        date:           this.utilService.setDateReel(new Date()),
        id_Ticket:      this.set_OnePanier[this.idPanier]?.id_Ticket ,
        id_BL:          this.set_OnePanier[this.idPanier]?.id_BL ,
        totalBrutHT:    this.totalHT,
        totalRemise:    0,
        totalDC:        0,
        totalFodec:     0,
        totalNetHT:     this.totalHT,
        totalTVA:       0,
        totalRedevance: 0,
        timbreTicket:   this.timbreTicket,
        totalPayer:     this.set_total_payement,
        resteAPayer:    this.set_rest_payement,
        montantRendu:   this.set_rendu_payement,
        totalGainCommerciale: this.totalGainCommerciale,
        totalGainReel:        this.totalGainReel,

      };
      this.msgToPanier()
      console.log((this.idPanier)+" ----***set_detailsPanier*******---- : ", this.set_OnePanier[this.idPanier]);
      // console.log((this.idPanier)+" ----***set_detailsPanier*******---- : ", JSON.stringify(this.set_OnePanier[this.idPanier]));
    }

  }

  async delRecord(i: any){
    if(i!=undefined && i!= null){
      let ref_supp = this.articles[i].reference
      const { value: code_badge } = await Swal.fire({
        title: 'Supprimer cet article<br>'+ref_supp+'<br>Confirmation avec badge?',
        input: "password",
        inputPlaceholder: 'Saisir du code BADGE',
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
              inputRange!.value  = ''

            }
          });
        }
      });
      if (code_badge) {

        if(this.idPanier == this.idPanier_current) { /////////  a ne pas toucher ni changer ni modifier
          this.articles.forEach((item:any, index:any) => {
            if(index==i){//this.rowClicked){
              this.updateQuantity(item, index , "del_art");
            }
          });

          Swal.fire({
            //toast: true,
            //position: 'top',
            showConfirmButton: false,
            icon: 'success',
            //timerProgressBar,
            timer: 1000,
            title: 'Article '+ref_supp+' supprimé avec succés'
          })
          setTimeout(() => {
            this.stateInputProduct.nativeElement.focus();
          }, 1500);
        }

      }

    }

  }

  async delPanier(iPanier: any){
    // console.log((this.idPanier)+" ----**"+iPanier)
    if(iPanier!=undefined && iPanier!= null){
      const { value: code_badge } = await Swal.fire({
        title: 'Annulation du vente<br>Confirmation avec badge?',
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
              inputRange!.value  = ''
            }
          });
        }
      });
      if (code_badge) {

        this.reinitialiserPanier(this.idPanier)

         Swal.fire({
          //toast: true,
          //position: 'top',
          showConfirmButton: false,
          icon: 'success',
          //timerProgressBar,
          timer: 1000,
          title: 'Vente annulée'
        })

        setTimeout(() => {
          this.stateInputProduct.nativeElement.focus();
        }, 1500);

      }

    }

  }

  delRecord_org(i: any)
  {

    if(i!=undefined && i!= null){

      // console.log("delRecord-----iiiiiiiiiiii-------- "+i);
      var delBtn = confirm(" Voulez vous supprimer cet article ?");
      if ( delBtn == true ) {
        this.dataSourceProduct.data.splice(i, 1);
        this.dataSourceProduct._updateChangeSubscription(); // <-- Refresh the datasource
      }
    }

  }

  @ViewChild('stateInputProduct') stateInputProduct!: ElementRef;
  @ViewChild('stateInputClient') stateInputClient!: ElementRef;

  pos_genaration_ticket:boolean           = this.roleService.checkPrivilegeAccess("pos_genaration_ticket")
  pos_genaration_talent_ticket:boolean    = this.roleService.checkPrivilegeAccess("pos_genaration_talent_ticket")
  pos_genaration_bon_livraison:boolean    = this.roleService.checkPrivilegeAccess("pos_genaration_bon_livraison")
  pos_validation_payement_partiel:boolean = this.roleService.checkPrivilegeAccess("pos_validation_payement_partiel")

  pos_default_client                    = this.utilService.get_params_general('pos_default_client')

  validPanier(avecPaiement:any=true){

    if(this.idPanier == this.idPanier_current){

      console.log("***********validPanier1111111******************")
      console.log(this.set_OnePanier[this.idPanier])
      console.log("***********validPanier222******************")
      // console.log(this.set_first_clientTicket)
      // console.log("***********validPanier3333*****************")
      this.articles.forEach((item:any , index:any) => {
        if(this.articles[index]?._idLigne){
          let check_idLigne = this.articles[index]._idLigne
          this.articles[index]._id = check_idLigne != "" ? check_idLigne : undefined
        }else{this.articles[index]._id=undefined}

      });
      this.set_OnePanier[this.idPanier].lignes = this.articles
      console.log(this.set_OnePanier[this.idPanier])
      console.log("***********validPanier3333******************")

      let checkPanier:string = "-1";

      if(this.set_OnePanier[this.idPanier].client==''){
          checkPanier = "Veuillez sélectionner un client !"
      }

      if(avecPaiement==true){
        if (this.set_OnePanier[this.idPanier].listPayements.length == 0 ){
          checkPanier = "Aucun paiement pour cette commande N° "+this.idPanier
        }
      }

      if ( Number(this.set_OnePanier[this.idPanier].totalAchat) == 0 || Number(this.set_OnePanier[this.idPanier].totalTTC) == 0 ){
        checkPanier = "Panier est vide ! <br>"
       }

      if(avecPaiement==true && this.pos_validation_payement_partiel==false){
        if ( (checkPanier === "-1") && ( Number(this.set_OnePanier[this.idPanier].totalReste > 0) )){
          checkPanier = "Reste à payé <span style='color: red'>"+ this.utilService.formatMontant(Number(this.set_OnePanier[this.idPanier].totalReste)) +"</span> <br>"
        }
      }

      if(checkPanier !== "-1"){

        Swal.fire({
          title: checkPanier,
          text: '',
          icon: "error",
          timer: 5000,
          showConfirmButton: false,
        }).then((result)=>{
          setTimeout(() => {

            this.stateInputProduct.nativeElement.focus();

          }, 1500);
        });

      }else {

        Swal.fire({
          title: "Valider panier",
          //text: "Impression du ticket",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          //cancelButtonColor: "#d33",
          confirmButtonText: "Oui",
          cancelButtonText: "Non",
        }).then((result) => {
          if (result.isConfirmed) {

            // console.log(" ----***validPanier *******---- : "+ JSON.stringify(this.set_OnePanier[this.idPanier]));
            //this.putIndexedDB("PANIER", this.set_OnePanier[this.idPanier], this.idPanier);
            //this.getIndexedDB("PANIER");

            ////////DEBUT : Ticket en mode modif donc on ajoute le reglement///////////////
            /////// ATTENTION , il faut garder l'envoi des reglements avant la modif du ticket///////
            if(this.set_OnePanier[this.idPanier].id_Ticket!= undefined){
              if(this.set_OnePanier[this.idPanier].id_Ticket!="" && this.set_OnePanier[this.idPanier].reglements.length > 0)
              {
                console.log(" ----***validPanier validerTicketReglementLibre*******---- : ",this.set_OnePanier[this.idPanier]);
                this.validerTicketReglementLibre(this.set_OnePanier[this.idPanier])
              }
            }
            ///////////////FIN ajout reglement**////////////////////

            this.ticketHttpService.AddNew(this.set_OnePanier[this.idPanier]).subscribe((res) => {
              console.log(" ----***validPanier resresresresress_iiiiidddddddddddd*******---- : ",JSON.stringify(res));
              if(res['OK']==true){

                this.set_OnePanier[this.idPanier].numero      = res['RESULTAT'].numero
                this.set_OnePanier[this.idPanier].id_Ticket   = res['RESULTAT']._id

                if(this.pos_genaration_ticket == true){
                  this.generatePdf('','print')
                }

                if(this.pos_genaration_talent_ticket==true){
                  this.ticketService.generatePdfTalent(this.set_OnePanier[this.idPanier],'print')
                }

                if(this.pos_genaration_bon_livraison == true){
                  this.validTicket_BL()
                }

                Swal.fire({
                  title: "Panier validé",
                  text: "",
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                }).then((result)=>{
                  setTimeout(() => {
                    this.reinitialiserPanier(this.idPanier)
                    this.stateInputProduct.nativeElement.focus();

                  }, 1500);
                });

              }
              //this.ticketHttpBanque.successCreate(res, this.dialogRef)
              //generatePdf('','print')
            });

          }else{
            // if(this.pos_genaration_ticket == true){
            //   this.generatePdf('','print')
            // }
            setTimeout(() => {
             this.stateInputProduct.nativeElement.focus();
            }, 1500);
            //this.getIndexedDB("PANIER");
            /*
              this.ticketHttpService.AddNew(this.set_OnePanier[this.idPanier]).subscribe((res) => {
              console.log(" ----***validPanier resresresresres*******---- : ",JSON.stringify(res));
              if(res['OK']==true){
                this.set_OnePanier[this.idPanier].numero = res['RESULTAT'].numero
                this.set_OnePanier[this.idPanier].id_Ticket   = res['RESULTAT']._id
                this.validTicket_BL()
                Swal.fire({
                  title: "Panier validé",
                  text: "",
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                }).then((result)=>{
                  setTimeout(() => {
                    this.reinitialiserPanier(this.idPanier)
                    this.stateInputProduct.nativeElement.focus();

                  }, 1500);
                });
              }

            });
            */
          }

        });

      }

    }

  }

  validTicket_BL(){
    let set_Data_BL:any// DocumentVente

    if(this.idPanier == this.idPanier_current){

      this.set_OnePanier[this.idPanier].reglements.forEach((item: any, index: any) => {
        this.set_OnePanier[this.idPanier].reglements[index].lettrageReglement.type = 'bonlivraisons'
      });

      set_Data_BL =  {
        "numero":             "",
        "date":               this.set_OnePanier[this.idPanier].date , //"2024-02-26T09:36:22.876Z",
        "numeroDocClient":    "",
        "dateDocClient":      null,
        "client": {
          "_id":              this.set_OnePanier[this.idPanier].client._id , //"65c5c293eee1fad456fd6b79",
          "code":             this.set_OnePanier[this.idPanier].client.code , //"CL-0024",
          "raisonSociale":    this.set_OnePanier[this.idPanier].client.raisonSociale , //"Nadhmi",
          "matriculeFiscale": this.set_OnePanier[this.idPanier].client.matriculeFiscale , //"2200019949828",
          "telephone":        this.set_OnePanier[this.idPanier].client.telephone , //"96062453"
        },
        "type_transport":     "1",
        "chauffeur":          "",
        "vehicule":           "",
        "nom_chauffeur":      "",
        "matricule_vehicule": "",
        "depotpv":            this.tokenService.pointVenteCourante ,
        "utilisateur":        {_id:this.tokenService.user?._id, nom:this.tokenService.user?.nom} ,
        "totalBrutHT":        roundmMontantNumber(this.totalBrutHT),
        "totalRemise":        roundmMontantNumber(this.totalRemise),
        "totalHT":            roundmMontantNumber(this.totalHT),
        "totalFodec":         roundmMontantNumber(this.totalFodec) , //0.007,
        "totalDC":            roundmMontantNumber(this.totalDC) ,
        "totalNetHT":         roundmMontantNumber(this.totalNetHT) ,//0.757,
        "totalTVA":           roundmMontantNumber(this.totalTVA) , // 0.144,
        "totalRedevance":     roundmMontantNumber(this.totalRedevance),
        "timbreFiscale":      0,
        "totalTTC":           this.set_OnePanier[this.idPanier].totalTTC,
        "totalGainCommerciale": roundmMontantNumber(this.totalGainCommerciale),
        "totalGainReel":      roundmMontantNumber(this.totalGainReel),
        "totalPayer":         Number(this.set_OnePanier[this.idPanier].totalReste) == 0 ? this.set_OnePanier[this.idPanier].totalTTC :  this.set_OnePanier[this.idPanier].totalPayement,
        "resteAPayer":        this.set_OnePanier[this.idPanier].totalReste,
        "documentPrecedent": [
          {
              "_id"   : this.set_OnePanier[this.idPanier].id_Ticket ,
              "numero": this.set_OnePanier[this.idPanier].numero,
              "date"  : this.set_OnePanier[this.idPanier].date,
              "totalTTC": this.set_OnePanier[this.idPanier].totalTTC,
              "table" : enum_nomTable.K_tickets
          }
        ],
        "isDownloadDocumentPrecedent": false,
        "documentSuivant":    [],
        "notes":              "",
        "lignes":             this.set_OnePanier[this.idPanier].lignes,
        "reglements":         [] , /////this.set_OnePanier[this.idPanier].reglements,
        "code_societe":       this.tokenService.getCodeSociete(),
        "code_exercice":      this.tokenService.getCodeExercice(),
        "code_depotpv":       this.tokenService.getCodePointeVente(),
        "sessionCaisse":      this.tokenService.getSessionCaisse(),
      }

      console.log("*************validTicket_BL 111 111***************",set_Data_BL)
      set_Data_BL = this.serviceDocumentVente.adaptationTicketDocument(set_Data_BL , this.articleDepotPvss ,{estDocumentPrecedentTicket:true})
      console.log("*************validTicket_BL 22222222***************",set_Data_BL)
      this.serviceBonLivraisonHttp.AddNew(set_Data_BL).subscribe((res) => {

        console.log(res)
        console.log("*************validTicket_BL >>>res >>***************")
        this.openImpressionPDF(res.RESULTAT._id)
      });

    }

  }

  validerTicketReglementLibre(data:any){
    let listReg:any =  data.reglements
    console.log("*************validerTicketReglementLibre 111 111***************",listReg)
    console.log("*************validerTicketReglementLibre 222***************")
    listReg.forEach((item: any, index: any) => {

      let new_data:any = {
        "date":           item.date,
        "montant":        item.montant,
        "montant_Billet": item.montant_Billet,
        "ecartEspeceNegatif": item.ecartEspeceNegatif,
        "utilisateur": {
          "_id": item.utilisateur._id,
          "nom": item.utilisateur.nom
        },
        "sessionCaisse":{
          "_id": item.sessionCaisse._id,
          "numero": item.sessionCaisse.numero
        },
        "client" :{
          "_id":            item.client._id,
          "code":           item.client.code,
          "raisonSociale":  item.client.raisonSociale
        },
        "fournisseur":        null,
        "modeReglement":      item.modeReglement , //1,
        "numPiece":           item.numPiece,
        "dateEcheance":       item.dateEcheance,
        "titulaire":          item.titulaire,
        "banque":             item.banque,
        "lettrageReglement":
          {
            "montant_lettre":   item.lettrageReglement.montant_lettre,
            "type":            enum_type_document.TICKET ,// item.lettrageReglement.type  , //"bonlivraisons"
            "documents":
              [
                { "_id"     :   data.id_Ticket ,
                  "numero"  :   data.numero ,
                  "date"   :   data.date ,
                  "type"  :   enum_type_document.TICKET ,//item.lettrageReglement.type
                }
              ]
          }
        ,
        "code_societe":         this.tokenService.getCodeSociete(),
        "code_exercice":        this.tokenService.getCodeExercice(),
        "code_depotpv":         this.tokenService.getCodePointeVente(),
        "tab_reg":              "reglementclients"
      }

      if(item._id== undefined || item._id==""){

        console.log(new_data)
        console.log("*************validerTicketReglementLibre 333333333***************item._id>>>"+item._id)
        this.reglementHTTPService.AddNew(new_data).subscribe((res) => {
          if (res.OK === true) {
            //return '';
          } else {
            showAlertError(res.MESSAGE, res.RESULTAT)
            //return res.MESSAGE + '\n'+res.RESULTAT
          }

        });

      }else{
        if(item.numero!=""){
          ////on supprime l'ancien reglement si le client a été modifié sur cette ticket
          ///puis on ajoute le reglement pour le nouveau client
          if(this.set_first_clientTicket._id!=item.client._id){
              this.deleteReglement(item)
              this.reglementHTTPService.AddNew(new_data).subscribe((res) => {
              if (res.OK === true) {
                //return '';
              } else {
                showAlertError(res.MESSAGE, res.RESULTAT)
                //return res.MESSAGE + '\n'+res.RESULTAT
              }

            });
          }
        }
      }

    });


  }
  deleteReglement(item:any){

    let res_del:string = ''
    if(item._id){
      let new_data:any = {
        "_id":                  item._id,
        "code_societe":         item.code_societe,
        "code_exercice":        item.code_exercice,
        "code_depotpv":         item.code_depotpv,
        "tab_reg":              "reglementclients"
      }

      console.log(item)
      console.log("*************deleteReglement >>>>***************item._id>>>"+item._id)
      this.reglementHTTPService.delete(new_data).subscribe((res) => {
        if (res.OK === true) {
          res_del =  '';
        } else {
          showAlertError(res.MESSAGE, res.RESULTAT)
          res_del = res.MESSAGE + '\n'+res.RESULTAT
        }

      });

    }
    return res_del
  }

  openImpressionPDF(id_bl:string){
    let paramsBL_Title  = paramBonLivraison.title
    let paramsBL_URL    = paramBonLivraison.uriDocApi ///: "/bonlivraison",
    this.impressionPdfService.openPopup(id_bl, paramsBL_Title, paramsBL_URL, undefined, undefined,true);
  }

  //panelOpenCategory   = false;
  panelOpenClient     = false;
  panelOpenProduct    = false;
  // panelOpenBanque     = false;

  displayedColumns: string[]      = ['reference', 'designation', 'quantite', 'unite' ,'pu_ttc','total'];

  //dataSource                = ELEMENT_DATA;
  dataSource                  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSourceClient            = new MatTableDataSource<Client>();
  dataSourceProduct           = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // dataSourceBanque            = new MatTableDataSource<Banque>();

  putIndexedDB(set_key:any , set_value:any , set_ttl:any ) {
    this.resultDB = 'processing...';
    this.indexedDb.put('mystore', {key: set_key , value: set_value , ttl: set_ttl})
      .subscribe(
        x => this.resultDB = `STORED: ${JSON.stringify(x)}`,
        err => {
          console.log(`ERROR: ${err}`) ;
        }
      );
  }

  result_db:       Product[]     = [];
  getIndexedDB(set_key:any) {

    //this.result_db = ''
    this.indexedDb.get('mystore', set_key)
      .subscribe(
        x => {

          if(x?.value!=null){

            const itemsData = JSON.parse(JSON.stringify(x?.value));
            const keys=Object.keys(itemsData);

            /*     keys.forEach(key=>{
                   this.products.push(employeeData[key]);
                  // console.log(employeeData[key]);
                 });

             */
          //  this.products = itemsData;
            this.articleDepotPvss = itemsData;

          }else{

            if(this.result==undefined){
/*
              this.serviceHttpProduct.GetAll().subscribe((res) => {
                //this.subjectProduct$.next(this.getDataProduct(res.RESULTAT));
                this.products = this.getDataProduct(res.RESULTAT)
                this.putIndexedDB("ARTICLES",this.products , this.idPanier);
                console.log("****************PANIER >> this.serviceHttpProduct.GetAll************************"+this.products.length)
              });
*/
            }

          }

          return this.result_db ;
        },
        err => {
          this.result = `ERROR: ${err}`;
          // console.log("--------------------"+this.result)
          return this.result_db ;
        }
      );



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
  clearIndexedDB(set_key:any) {

    this.indexedDb.clear(set_key)
      .subscribe(
        () => this.resultDB = `CLEARED ALL RECORDS`,
        (err:any) => {
          this.resultDB = `ERROR: ${err}`;
        }
      );
  }

  constructor( private serviceHttpCategory:CategorieHttpService ,private serviceHttpClient:ClientHttpService,
               private dialog: MatDialog , private indexedDb: IndexedDbService,private ticketHttpService:TicketHttpService
                ,private serviceHttpProduct:ProductHttpServiceService ,
               private serviceBonLivraisonHttp:DocumentVenteHttpService
               , private tokenService:TokenService , /*private serviceHttpBanque:BanqueHttpService , */
               @Inject(DOCUMENT) document: Document,
               private ligneDocumentVenteService:LigneDocumentVenteService,
               private serviceDocumentVente: DocumentVenteService,private reglementHTTPService: ReglementHttpService,
               private renderer: Renderer2 , public utilService:UtilService , private ticketService:TicketService
                ,private impressionPdfService:ImpressionPdfService,  public roleService:RoleHttpService) {


    //thi.s333 = document.getElementById('el');
    this.set_OnePanier = [];
    this.set_paiement = [];
    this.reglementTicketClient = [];


  }

  generatePdfForTest(){
      this.generatePdf('','print')
      this.ticketService.generatePdfTalent(this.set_OnePanier[this.idPanier],'print')
  }
/////RAPPORT TICKET PDF////////
  generatePdf(panierPrint:any = '' , action='print') {

    let listPayements_loc:any = []
    this.set_OnePanier[this.idPanier].reglements.forEach((item: any, index: any) => {
        let typ_oper = this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement)
      const obj = {
        num_pay :           item.numPiece , //this.referenceTck,
        type_ticket_pay :   item.modeReglement ,//this.ticketType,
        montant_pay:        item.montant,//this.montantTck,
        montant_Billet:     item.montant_Billet,//this.montantTck,
        qte_pay:            1,//this.quantiteTck,
        total_pay:          Number(1 * item.montant_Billet),
        type_pay:           typ_oper=='TICKET' ? typ_oper+' ('+item.ticket.length+') ' : typ_oper ,
        // type_pay:           this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement),
        banque_pay:         item.banque == undefined ? '' :item.banque  ,
        titulaire_pay:      item.titulaire,
        date_echeance_pay:  item.dateEcheance == undefined ? '' :item.dateEcheance
      }
      listPayements_loc.push(obj)
    });
      this.set_OnePanier[this.idPanier].listPayements = listPayements_loc

      this.ticketService.generatePdf(this.set_OnePanier[this.idPanier],'print')


  }


  ///get list of Category
  // getDataCategory(items:any) {
  //   let newItems = []
  //   for (let key of Object.keys(items)){
  //     newItems.push(new Categorie(items[key]))
  //   }
  //   return newItems
  // }
  // getDataClient(items:any) {
  //   let newItems = []
  //   for (let key of Object.keys(items)){
  //     newItems.push(new Client(items[key]))
  //   }
  //   return newItems
  // }
  // getDataProduct(items:any) {
  //   let newItems = []
  //   for (let key of Object.keys(items)){
  //     newItems.push(new Product(items[key]))
  //   }
  //   return newItems
  // }
  /*
  getDataBanque(items:any) {
    let newItems = []
    for (let key of Object.keys(items)){
      newItems.push(new Banque(items[key]))
    }
    return newItems
  }
*/
  /*
  filterCategorys(name: string) {
    return this.categorys.filter(
      (category) => category.libelle.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

 */

  filterTicketsClients(name: string) {
    return this.ticketsClientFromCaisse.filter(
      (ticket:any) => ticket.numero.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }
  filterClients(name: string) {
    return this.clients.filter(
      (client) => client.code.concat(client.matriculeFiscale,client.raisonSociale,client.telephone).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }
  filterProducts(name: string) {
/*    return this.products.filter(
      (product) => product.reference.concat(product.codeBarre,product.designation).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );

 */
    console.log("******filterProducts*********",this.articleDepotPvss)
    return this.articleDepotPvss.filter(
      (product) => product.article.reference.concat(product.article.codeBarre,product.article.designation,product.article?.prixTTC?.toString()).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }
  /*
  filterBanques(name: string) {
    return this.banques.filter(
      (banque) => banque.libelle.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }
*/

  ngOnInit() {

    this.dataSourceProduct.data = this.articles;
    this.dataSourceProduct._updateChangeSubscription();


    //this.get_articles_caisse()
    /*
    this.serviceHttpCategory.GetAll().subscribe((res) => {
      this.subject$.next(this.getDataCategory(res.RESULTAT));
    });
*/
    /*
    this.serviceHttpClient.GetAll().subscribe((res) => {
      this.subjectClient$.next(this.getDataClient(res.RESULTAT));
      //this.putIndexedDB("CLIENTS",this.getDataClient(res.RESULTAT), this.idPanier);
    });
*/
 //  console.log("****************************************")
   //console.log( this.getIndexedDB("ARTICLES"))
   //console.log("****************************************")
/*
    this.serviceHttpProduct.GetAll(100,1).subscribe((res) => {
      this.subjectProduct$.next(this.getDataProduct(res.RESULTAT));
    });
*/
/*
    this.serviceHttpBanque.GetAll().subscribe((res) => {
      this.subjectBanque$.next(this.getDataBanque(res.RESULTAT));
    });
*/
/*
    this.data$.pipe(filter<Categorie[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.categorys = listItems;
    });
 */
    this.dataClient$.pipe(filter<Client[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.clients = listItems;

    });

    this.dataProduct$.pipe(filter<ArticleDepotPvs[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.articleDepotPvss = listItems;
    });

    this.dataTicket$.pipe(filter<Ticket[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.list_Ticket = listItems;
    });

    // let evv:any ={target:{value:this.pos_default_client.raisonSociale}}
    // this.onEnterClient(evv)
    /*
    this.dataProduct$.pipe(filter<Product[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.products = listItems;
    });

     */
    /*
    this.dataBanque$.pipe(filter<Banque[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.banques = listItems;
    });
*/
  }

  openDialogListReglement(typeCategoryAff:any) {
    if(this.idPanier == this.idPanier_current) { /////////  a ne pas toucher ni changer ni modifier
      this.dialog
        .open(DemoDialogListPayementsComponent, {
          data: {detailsPanier:this.set_OnePanier[this.idPanier]},
          disableClose: true,
          //width: '400px'
        })
        .afterClosed()
        .subscribe((resultUpdatePanier) => {

          if(resultUpdatePanier != -1 && resultUpdatePanier!=undefined && resultUpdatePanier!=null){

            this.set_OnePanier[this.idPanier] = resultUpdatePanier;

            this.set_total_payement = this.set_OnePanier[this.idPanier].totalPayement
            this.set_rendu_payement = this.set_OnePanier[this.idPanier].totalRendu
            this.set_rest_payement  = this.set_OnePanier[this.idPanier].totalReste

            this.set_detailsPanier()
            this.set_PanierCaisseEnCours.emit(this.set_OnePanier[this.idPanier])
          }

          setTimeout(() => {
            this.stateInputProduct.nativeElement.focus();
          }, 1500);

        });
    }

  }

  animal: string ='';
  name: string ='';

  openClientDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //width: '250px',
      data: {name: "888888888888", animal: "9999999999999"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


/*************Liste des règlement (paiement) MOdal***************/
@Component({
  selector: 'vex-components-overview-demo-dialogListPayements',
  template: `
    <div mat-dialog-title class="flex items-center justify-between">
        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 container">
           <span style="text-align: center; font-size: x-large;">
               <b>Liste des règlements vente 
                   {{detailsPanier.detailsPanier.numero ? 'N° '+detailsPanier.detailsPanier.numero : '' }}
               </b>
           </span>
        </div>
    </div>
    <mat-dialog-content>
                
        <div class="p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 container">
            <table [dataSource]="dataSourceOp" mat-table matSort class="mat-elevation-z8">

                <ng-container matColumnDef="type_pay"  >
                    <th mat-header-cell *matHeaderCellDef> Modalité</th>
                    <td mat-cell *matCellDef="let element"> {{element.qte_pay > 1 ? '('+element.qte_pay+')' : '' }} 
                        {{element.type_pay}} {{element.type_ticket_pay.libelle}}
                    </td>
                </ng-container>

                <!-- Position Column -->
                <ng-container matColumnDef="num_pay">
                    <th mat-header-cell *matHeaderCellDef> N° Pièce</th>
                    <td mat-cell *matCellDef="let element"> {{element.num_pay}} </td>
                </ng-container>

                <!-- Weight Column -->
                <ng-container matColumnDef="banque_pay">
                    <th mat-header-cell *matHeaderCellDef> Banque</th>
                    <td mat-cell *matCellDef="let element"> {{element.banque_pay.abreviation}} </td>
                </ng-container>

                <!-- Symbol Column -->
                <ng-container matColumnDef="date_echeance_pay">
                    <th mat-header-cell *matHeaderCellDef> Date d'écheance</th>
                    <td mat-cell *matCellDef="let element">
                        {{element.date_echeance_pay!=''? utilService.formatDate(element.date_echeance_pay,'DD/MM/AAAA') : ''}}
                    </td>
                </ng-container>

                <!-- Total Column -->
                <ng-container matColumnDef="titulaire_pay">
                    <th mat-header-cell *matHeaderCellDef> Titulaire</th>
                    <td mat-cell *matCellDef="let element"> {{element.titulaire_pay}} </td>
                </ng-container>

                <!-- Total Column -->
                <ng-container matColumnDef="billet_reg">
                    <th mat-header-cell *matHeaderCellDef> Billet/Payé_Reg/ecart</th>
                    <td mat-cell *matCellDef="let element">
                        {{utilService.formatMontant(element.montant_Billet.toString())}} /
                        {{utilService.formatMontant(element.montant_pay.toString())}} /
                        {{utilService.formatMontant(element.ecartEspeceNegatif.toString())}} 
                        
                    </td>
                </ng-container>
                
                <!-- Total Column -->
                <ng-container matColumnDef="total_pay">
                    <th mat-header-cell *matHeaderCellDef> Montant Total</th>
                    <td mat-cell *matCellDef="let element">
                        {{utilService.formatMontant(element.total_pay.toString())}}
                    </td>
                </ng-container>

                <!-- Total Column -->
                <ng-container matColumnDef="deel">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element ; let i = index">
                        
                        <button (click)="deleteRowChequeTraite(i)" color="primary" mat-icon-button
                                type="button" *ngIf="!element.sessionCaisse?.cloture">
                            <mat-icon svgIcon="mat:remove"></mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns_OP ; sticky:true ; "[style.background-color]="colorTablePanier"></tr>
                <tr mat-row *matRowDef="let row;let idx=index; let even=even; columns: displayedColumns_OP;"
                    [style.border-bottom]="'2px solid red'"></tr>
            </table>
        </div>
    </mat-dialog-content>

    <div class="px-6 py-4 border-b flex items-center" style="justify-content: space-between;">
        <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
            <span style="font-size: medium;display: flex; align-items: center;"> <b>Nombre de ligne :&nbsp;&nbsp; </b>{{nombreReglement}} </span>
        </div>
        <div style="text-align: center;  width: max-content; align-items: center;flex-direction:column">
            <span style="font-size: medium;display: flex; align-items: center;"><b>Total règlement :&nbsp;&nbsp; </b> <span style="color: red">{{utilService.formatMontant(totalReglement)}}</span></span>
        </div>
    </div>
    
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close('1')">VALIDER</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule,MatFormFieldModule,CommonModule,MatTableModule]
})

export class DemoDialogListPayementsComponent implements OnInit {

  //displayedColumns_OP: string[]   = ['type_pay','type_ticket_pay','num_pay', 'montant_pay' ,'qte_pay', 'banque_pay', 'date_echeance_pay','titulaire_pay' ,'total_pay','deel'];
  displayedColumns_OP: string[]   = ['type_pay','num_pay' , 'banque_pay', 'date_echeance_pay','titulaire_pay' ,'billet_reg', 'total_pay','deel'];
  dataSourceOp                    = new MatTableDataSource<set_ModePayement>();
  colorTablePanier  = '#6d6f6c0d';//'green';

  totalReglement  = 0
  nombreReglement = 0

  ngOnInit() {

    this.dataSourceOp.data  = this.detailsPanier.detailsPanier.listPayements;
    this.totalReglement     = this.detailsPanier.detailsPanier.totalPayement
    this.nombreReglement    = Number(this.detailsPanier.detailsPanier.listPayements.length)
    this.dataSourceOp._updateChangeSubscription();

    console.log("********Liste des règlements vente11111111111******************")
    console.log(this.detailsPanier.detailsPanier)
    console.log("*********Liste des règlements vente22222222222*****************")

  }

  deleteReglement(item:any){

    let res_del:string = ''
    if(item._id){
      let new_data:any = {
        "_id":                  item._id,
        "code_societe":         item.code_societe,
        "code_exercice":        item.code_exercice,
        "code_depotpv":         item.code_depotpv,
        "tab_reg":              "reglementclients"
      }

      console.log(item)
      console.log("*************deleteReglement >>>>***************item._id>>>"+item._id)
      this.reglementHTTPService.delete(new_data).subscribe((res) => {
        if (res.OK === true) {
          res_del =  '';
        } else {
          showAlertError(res.MESSAGE, res.RESULTAT)
          res_del = res.MESSAGE + '\n'+res.RESULTAT
        }

      });

    }
    return res_del
  }
  deleteRowChequeTraite(x:any){

    console.log("*************deleteRowChequeTraite1111111111***************",  this.detailsPanier.detailsPanier.reglements[x])
    var delBtn = confirm(" Voulez vous supprimer ce mode de paiement ?");
    if ( delBtn == true ) {

      let res:string = this.deleteReglement(this.detailsPanier.detailsPanier.reglements[x])
      if(res == ''){
    this.detailsPanier.detailsPanier.totalPayement -= Number(this.detailsPanier.detailsPanier.listPayements[x].total_pay)
    // this.detailsPanier.detailsPanier.totalReste   = (Number(this.detailsPanier.detailsPanier.totalAchat) - this.detailsPanier.detailsPanier.totalPayement) < 0 ? 0 : (this.detailsPanier.detailsPanier.totalPayement- Number(this.detailsPanier.detailsPanier.totalAchat))
    // this.detailsPanier.detailsPanier.totalRendu   = (Number(this.detailsPanier.detailsPanier.totalAchat) - this.detailsPanier.detailsPanier.totalPayement) < 0 ? (this.detailsPanier.detailsPanier.totalPayement- Number(this.detailsPanier.detailsPanier.totalAchat)) : 0

    let restRendu             = (Number(this.detailsPanier.detailsPanier.totalAchat ) - this.detailsPanier.detailsPanier.totalPayement)
    if(restRendu==0){
      this.detailsPanier.detailsPanier.totalReste = 0;
      this.detailsPanier.detailsPanier.totalRendu = 0;
    }
    if(restRendu<0){
      this.detailsPanier.detailsPanier.totalReste = 0;
      this.detailsPanier.detailsPanier.totalRendu = this.detailsPanier.detailsPanier.totalPayement - Number(this.detailsPanier.detailsPanier.totalAchat )  ;
    }

    if(restRendu>0){
      this.detailsPanier.detailsPanier.totalReste = Number(this.detailsPanier.detailsPanier.totalAchat ) - this.detailsPanier.detailsPanier.totalPayement  ;
      this.detailsPanier.detailsPanier.totalRendu = 0 ;
    }

    this.detailsPanier.detailsPanier.listPayements.splice(x, 1 );
    this.detailsPanier.detailsPanier.reglements.splice(x, 1 );
    //this.dataSourceOp.data = this.detailsPanier.detailsPanier.listPayements;
    this.dataSourceOp._updateChangeSubscription();
    this.totalReglement  = this.detailsPanier.detailsPanier.totalPayement
    this.nombreReglement = this.dataSourceOp.data.length
    console.log("*************deleteRowChequeTraite222222222***************",  this.detailsPanier.detailsPanier)
  }

    }

  }
  constructor(@Inject(MAT_DIALOG_DATA) public detailsPanier:any  , private dialogRef: MatDialogRef<DemoDialogListPayementsComponent>,
              private reglementHTTPService: ReglementHttpService, public utilService:UtilService) {
  }

  close(answer: string) {
    if(Number(answer)>0)
    {
      this.dialogRef.close(this.detailsPanier.detailsPanier);
    }else{
      this.dialogRef.close(-1);
    }
  }
}


/****************Fiche Client******************************/
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule,MatFormFieldModule,CommonModule,MatInputModule,SharedModule,
    MatDatepickerModule,FormsModule,MatOptionModule,MatAutocompleteModule,ReactiveFormsModule , MatTableModule , MatCheckboxModule]
})
export class DialogOverviewExampleDialog  implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private formBuilder: FormBuilder,
    private serviceClient:ClientService,private serviceHttpClient:ClientHttpService,
    @Inject(MAT_DIALOG_DATA) public dataClient:any) {}

  clientValidations: any;//FormGroup;

  ngOnInit() {
    this.clientValidations = this.formBuilder.group({
      raisonSociale: ['', [Validators.required,  ]],
      telephone: ['', Validators.pattern(getPatternOfNumeroTelephone())],
      matriculeFiscale: [''],
      adresse: ['', [Validators.required,  ]],
      exonereTva: [false],
      exonereTimbre: [false]
    });

  }

  close(answer: string) {

    if(answer != "-1"){

      const item = this.serviceClient.remove_id(this.clientValidations.value);
      this.serviceHttpClient.AddNew(item).subscribe((res) => {
        this.dialogRef.close();
      });

    }else{
      this.dialogRef.close(-1);
    }

  }

}
