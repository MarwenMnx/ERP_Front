import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {UtilService} from "../../../utils/UtilService.service";
import {listPaniers, PeriodicElement, set_ModePayement} from "../../../erp_pos/caisse/panier/panier.component" ;
import {TicketHttpService} from "../services/ticket-http.service";
import {Product} from "../../products/models/product.model";
import {TicketService} from "../services/ticket.service";
import {DocumentVente} from "../../../erp_documents_vente/models/document-vente.model";
import {ImpressionPdfService} from "../../../impression/impression-pdf.service";
import {roundmMontantNumber, showAlertError} from "../../../global-functions";
import {DocumentVenteHttpService} from "../../../erp_documents_vente/services/document-vente-http.service";
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vex-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule,MatFormFieldModule,CommonModule,MatTableModule, NgClass, NgFor, NgIf]
})
export class DetailsTicketComponent  implements OnInit {

  displayedColumns_OP: string[]   = ['type_pay','num_pay' , 'banque_pay', 'date_echeance_pay','titulaire_pay' ,'total_pay'];
  dataSourceOp                    = new MatTableDataSource<set_ModePayement>();
  colorTablePanier                = '#6d6f6c0d';//'green';

  // displayedColumns_ART: string[]  = ['reference' ,  'designation' , 'quantiteUnite1' , 'totalTTC' ];
  displayedColumns_ART: string[]  = ['reference' ,  'designation' , 'unite', 'quantite', 'pu_ttc' , 'totalTTC' ];
  dataSourceART                   = new MatTableDataSource<Product>();
  colorTableART                   = '#6d6f6c0d';//'green';

  totalReglement        = 0
  totalAchat            = 0
  dateOp:any            = this.utilService.setDateReel(new Date()) //new Date()
  caissier:any          = ""
  client:any            = "Passager"
  set_OnePanier:any;
  set_OnePanierVide: listPaniers;

  autre_doc:boolean = false
  num_ticket:any=''
  num_retour:any=''
  async ngOnInit() {
    //
    // console.log("*******this.autreDoc111111111**********")
    // console.log(this.autreDoc)
    // console.log("*******this.autreDoc222222222**********")
    if(this.autreDoc.autreDoc){
      if(this.autreDoc.autreDoc.type=='retour_ticket'){
          let res = await this.getDetails(this.autreDoc.autreDoc.doc._id,'/bonretourmarchandiseclient')
        // console.log("*******getDetails11111**********")
        // console.log(res)
        this.autre_doc = true
        this.set_data_ticket(res)
        // console.log("*******getDetails22222**********")
      }
    }else{
      this.ticketHttpService.GetTicketByID(this.detailsPanier.detailsPanier._id).subscribe((res) => {
              this.autre_doc = false
              this.set_data_ticket(res)
        // res.RESULTAT.lignes.forEach((item: any, index: any) => {
        //   /// this.set_OnePanier.lignes.push(item)
        //   this.set_OnePanierVide.lignes.push(
        //     {  article :            item.article,
        //       depotpv :             item.pointVente  ,
        //       reference:            item.article.reference ,
        //       designation:          item.article.designation ,
        //       quantite:             item.quantiteUnite1 ,
        //       pu_ttc:               item.pu_ttc ,
        //       pu_ttc1:              item.pu_ttc1 ,
        //       pu_ttc2:              item.pu_ttc2 ,
        //       totalTTC:             item.totalTTC ,
        //       pu_ht:                item.pu_ht ,
        //       pu_ht1:               item.pu_ht1 ,
        //       pu_ht2:               item.pu_ht2 ,
        //       quantiteUnite1:       item.quantiteUnite1 ,
        //       quantiteUnite2:       item.quantiteUnite2 ,
        //       remise:               '' ,
        //       totalRemise:          0 ,
        //       totalDC:              0 ,
        //       montant_Total_FODEC : 0 ,
        //       totalBrutHT:          0 ,
        //       totalNetHT:           0 ,
        //       taux_TVA_Applique:    0 ,
        //       montant_unitaire_TVA: 0,
        //       totalTVA:             0 ,
        //       totalRedevance:       0,
        //       unite :               item.unite ,
        //       unite1 :              item.article.unite1 ,
        //       unite2 :              item.article.unite2 ,
        //       isModifierTypeUnite : '',
        //       ticketPLU:            false ,
        //
        //       prixAchatUnitaireHT:  0,
        //       prixVenteBrutHT:      0,
        //       tauxremise:           0,
        //       remiseMontant:        0,
        //       prixVenteUnitaireHT:  0,
        //       isFodec:              false ,
        //       tauxFodec:            0,
        //       montantFodec:         0,
        //       isDC:                 false ,
        //       tauxDC:               0,
        //       montantDC:            0,
        //       prixVenteUnitaireNetHT: 0,
        //       tauxTVA:              0,
        //       montantTVA:           0,
        //       redevance:            0,
        //       prixVenteUnitaireTTC: 0,
        //       totalHT:              0,
        //       totalFodec:           0,
        //       timbreFiscale:        0,
        //       gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
        //       gainCommercialTotal:  0,  // (quantite * (PV TTC - Prix Achat TTC))
        //       gainReelUnitaire:     0,  // (PV TTC - Prix revient TTC)
        //       gainReelTotal:        0,  // (quantite * (PV TTC - Prix revient TTC))
        //       isQte1:               false ,
        //       isQte2:               false ,
        //       prixVenteHT:          0,
        //       isFodecV:             false ,
        //       remiseFVente:         0,
        //       remiseMontantVente:   0,
        //       isDCVente:            false ,
        //       tauxDCVente:          0,
        //       isRedevanceVente:     false ,
        //       quantiteLivre:       0,
        //       quantiteRestante:    0,
        //     }
        //
        //   )
        //
        // });
        //
        // this.dataSourceART.data  =  this.set_OnePanier.lignes;
        // this.dataSourceART._updateChangeSubscription();
        //
        // res.RESULTAT.reglements.forEach((item: any, index: any) => {
        //   let typ_oper = this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement)
        //   const obj = {
        //     num_pay :           item.numPiece , //this.referenceTck,
        //     type_ticket_pay :   item.modeReglement ,//this.ticketType,
        //     montant_pay:        item.montant,//this.montantTck,
        //     montant_Billet:     item.montant_Billet,//this.montantTck,
        //     qte_pay:            1,//this.quantiteTck,
        //     total_pay:          Number(1 * item.montant_Billet),
        //     type_pay:           typ_oper=='TICKET' ? typ_oper+' ('+item.ticket.length+') ' : typ_oper ,
        //     // type_pay:         this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement),
        //     banque_pay:         item.banque == undefined ? '' :item.banque  ,
        //     titulaire_pay:      item.titulaire == undefined ? '' :item.titulaire  ,
        //     date_echeance_pay:  item.dateEcheance == undefined ? '' :item.dateEcheance  ,
        //   }
        //   this.set_OnePanier.listPayements.push(obj)
        //   this.totalReglement += Number( Number(1 * item.montant_Billet))
        //
        // });
        //
        // this.set_OnePanierVide.numero = res.RESULTAT.numero
        // this.dateOp                   = this.utilService.formatDateTime(res.RESULTAT.date) //this.utilService.formatDateTime(this.detailsPanier.detailsPanier.date)
        // this.caissier                 = res.RESULTAT.sessionCaisse.utilisateur_caissier.nom //detailsPanier.detailsPanier.sessionCaisse.utilisateur_caissier.nom
        // this.client                   = res.RESULTAT.client.raisonSociale //this.detailsPanier.detailsPanier.client.raisonSociale
        // this.totalAchat               = res.RESULTAT.totalTTC //this.detailsPanier.detailsPanier.totalTTC
        // this.dataSourceOp.data        = this.set_OnePanier.listPayements;
        // this.dataSourceOp._updateChangeSubscription();
        //
        // this.set_OnePanierVide.listPayements =  this.set_OnePanier.listPayements
        // this.set_OnePanierVide.client        =  res.RESULTAT.client//this.detailsPanier.detailsPanier.client
        // this.set_OnePanierVide.totalAchat    =  res.RESULTAT.totalTTC//this.detailsPanier.detailsPanier.totalTTC
        // this.set_OnePanierVide.sessionCaisse =  res.RESULTAT.sessionCaisse//this.detailsPanier.detailsPanier.sessionCaisse
        // this.set_OnePanierVide.date          =  res.RESULTAT.date//this.detailsPanier.detailsPanier.date
        //
        // let restRendu             = (Number(this.set_OnePanierVide.totalAchat ) - this.totalReglement)
        // if(restRendu==0){
        //   this.set_OnePanierVide.totalReste = 0;
        //   this.set_OnePanierVide.totalRendu = 0;
        // }
        // if(restRendu<0){
        //   this.set_OnePanierVide.totalReste = 0;
        //   this.set_OnePanierVide.totalRendu = this.totalReglement- Number(this.set_OnePanierVide.totalAchat)  ;
        // }
        //
        // if(restRendu>0){
        //   this.set_OnePanierVide.totalReste = Number(this.set_OnePanierVide.totalAchat ) - this.totalReglement  ;
        //   this.set_OnePanierVide.totalRendu = 0 ;
        // }

      });
    }

  }

  set_data_ticket(res:any){

    console.log("*******getDetails1111**********")
    console.log(res)
    console.log("*******getDetails22222**********")

    let totalAchat:any = this.autre_doc==true ? 0 : res.RESULTAT.totalTTC

    res.RESULTAT.lignes.forEach((item: any, index: any) => {

      let pu_ttc:any    = item.pu_ttc
      let pu_ttc1:any   = item.pu_ttc1
      let pu_ttc2:any   = item.pu_ttc2
      let totalTTC:any  = item.totalTTC

        if(this.autre_doc==true && item.quantiteUnite1 == item.quantite) {
          pu_ttc  = roundmMontantNumber(item.totalTTC / item.quantite)
          pu_ttc1 = roundmMontantNumber(item.totalTTC / item.quantite)
          pu_ttc2 = roundmMontantNumber(item.totalTTC / item.article.coefficient)
          totalTTC  = roundmMontantNumber(pu_ttc * item.quantite)
          totalAchat = Number(totalAchat) + Number(totalTTC)
        }
        if(this.autre_doc==true && item.quantiteUnite2 == item.quantite) {
          pu_ttc  = roundmMontantNumber(item.totalTTC / item.quantite)
          pu_ttc2 = roundmMontantNumber(item.totalTTC / item.quantite)
          pu_ttc1 = roundmMontantNumber(item.totalTTC / item.article.coefficient)
          totalTTC  = roundmMontantNumber(pu_ttc * item.quantite)
          totalAchat = Number(totalAchat) + Number(totalTTC)
        }

            /// this.set_OnePanier.lignes.push(item)
            this.set_OnePanierVide.lignes.push(
              {  article :            item.article,
                depotpv :             item.pointVente  ,
                reference:            item.article.reference ,
                designation:          item.article.designation ,
                quantite:             item.quantite , //item.quantiteUnite1 ,
                pu_ttc:               pu_ttc ,
                pu_ttc1:              pu_ttc1 ,
                pu_ttc2:              pu_ttc2 ,
                totalTTC:             totalTTC ,
                pu_ht:                item.pu_ht ,
                pu_ht1:               item.pu_ht1 ,
                pu_ht2:               item.pu_ht2 ,
                quantiteUnite1:       item.quantiteUnite1 ,
                quantiteUnite2:       item.quantiteUnite2 ,
                remise:               '' ,
                totalRemise:          0 ,
                totalDC:              0 ,
                montant_Total_FODEC : 0 ,
                totalBrutHT:          0 ,
                totalNetHT:           0 ,
                taux_TVA_Applique:    0 ,
                montant_unitaire_TVA: 0,
                totalTVA:             0 ,
                totalRedevance:       0,
                unite :               item.quantiteUnite2==item.quantite ? item.unite2 : item.unite1 , //item.unite
                unite1 :              item.article.unite1 ,
                unite2 :              item.article.unite2 ,
                isModifierTypeUnite : '',
                ticketPLU:            false ,

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
                prixVenteUnitaireNetHT: 0,
                tauxTVA:              0,
                montantTVA:           0,
                redevance:            0,
                prixVenteUnitaireTTC: 0,
                totalHT:              item.totalHT,
                totalFodec:           0,
                timbreFiscale:        0,
                gainCommercialUnitaire: 0, //(PV TTC - Prix Achat TTC)
                gainCommercialTotal:  0,  // (quantite * (PV TTC - Prix Achat TTC))
                gainReelUnitaire:     0,  // (PV TTC - Prix revient TTC)
                gainReelTotal:        0,  // (quantite * (PV TTC - Prix revient TTC))
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

            )


    });

    this.dataSourceART.data  =  this.set_OnePanier.lignes;
    this.dataSourceART._updateChangeSubscription();

    res.RESULTAT.reglements.forEach((item: any, index: any) => {
      let typ_oper = this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement)
      const obj = {
        num_pay :           item.numPiece , //this.referenceTck,
        type_ticket_pay :   item.modeReglement ,//this.ticketType,
        montant_pay:        item.montant,//this.montantTck,
        montant_Billet:     item.montant_Billet,//this.montantTck,
        qte_pay:            1,//this.quantiteTck,
        total_pay:          Number(1 * item.montant_Billet),
        type_pay:           typ_oper=='TICKET' ? typ_oper+' ('+item.ticket.length+') ' : typ_oper ,
        // type_pay:         this.utilService.getEnumKeyByValue('enum_modeReglement' , item.modeReglement),
        banque_pay:         item.banque == undefined ? '' :item.banque  ,
        titulaire_pay:      item.titulaire == undefined ? '' :item.titulaire  ,
        date_echeance_pay:  item.dateEcheance == undefined ? '' :item.dateEcheance  ,
      }
      this.set_OnePanier.listPayements.push(obj)
      this.totalReglement += Number( Number(1 * item.montant_Billet))

    });

    let sessionCaisse:any = this.autre_doc==true ? {utilisateur_caissier:{nom:res.RESULTAT.documentPrecedent[0].sessionCaisse.utilisateur_caissier.nom }} : res.RESULTAT.sessionCaisse

    this.num_ticket               = this.autre_doc==true ? res.RESULTAT.documentPrecedent[0].numero : res.RESULTAT.numero
    this.num_retour               = res.RESULTAT.numero

    this.set_OnePanierVide.numero = this.autre_doc==true ? this.num_ticket+' - RETOUR' : this.num_ticket

    this.dateOp                   = this.utilService.formatDateTime(res.RESULTAT.date) //this.utilService.formatDateTime(this.detailsPanier.detailsPanier.date)
    this.caissier                 = this.autre_doc==true ? res.RESULTAT.documentPrecedent[0].sessionCaisse.utilisateur_caissier.nom  : res.RESULTAT.sessionCaisse.utilisateur_caissier.nom //detailsPanier.detailsPanier.sessionCaisse.utilisateur_caissier.nom
    this.client                   = res.RESULTAT.client.raisonSociale //this.detailsPanier.detailsPanier.client.raisonSociale
    this.totalAchat               = totalAchat //res.RESULTAT.totalTTC //this.detailsPanier.detailsPanier.totalTTC
    this.dataSourceOp.data        = this.set_OnePanier.listPayements;
    this.dataSourceOp._updateChangeSubscription();

    this.set_OnePanierVide.listPayements =  this.set_OnePanier.listPayements
    this.set_OnePanierVide.client        =  res.RESULTAT.client//this.detailsPanier.detailsPanier.client
    this.set_OnePanierVide.totalAchat    =  totalAchat //res.RESULTAT.totalTTC//this.detailsPanier.detailsPanier.totalTTC
    this.set_OnePanierVide.sessionCaisse =  sessionCaisse //res.RESULTAT.sessionCaisse//this.detailsPanier.detailsPanier.sessionCaisse
    this.set_OnePanierVide.date          =  res.RESULTAT.date//this.detailsPanier.detailsPanier.date

    let restRendu             = (Number(this.set_OnePanierVide.totalAchat ) - this.totalReglement)
    if(restRendu==0){
      this.set_OnePanierVide.totalReste = 0;
      this.set_OnePanierVide.totalRendu = 0;
    }
    if(restRendu<0){
      this.set_OnePanierVide.totalReste = 0;
      this.set_OnePanierVide.totalRendu = this.totalReglement- Number(this.set_OnePanierVide.totalAchat)  ;
    }

    if(restRendu>0){
      this.set_OnePanierVide.totalReste = Number(this.set_OnePanierVide.totalAchat ) - this.totalReglement  ;
      this.set_OnePanierVide.totalRendu = 0 ;
    }
  }

  deleteRowChequeTraite(x:any){

    var delBtn = confirm(" Voulez vous supprimer ce mode de paiement ?");
    if ( delBtn == true ) {
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
      //this.dataSourceOp.data = this.detailsPanier.detailsPanier.listPayements;
      this.dataSourceOp._updateChangeSubscription();
      this.totalReglement  = this.detailsPanier.detailsPanier.totalPayement
    }

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public detailsPanier:any ,
    @Inject(MAT_DIALOG_DATA) public autreDoc:any ,
    private ticketHttpService:TicketHttpService
    , private dialogRef: MatDialogRef<DetailsTicketComponent>,public impressionPdfService:ImpressionPdfService,
              public utilService:UtilService , private ticketService:TicketService,
    private serviceDocVenteHttp: DocumentVenteHttpService) {

    this.set_OnePanier = "";
    this.set_OnePanierVide = {
     lignes:[],//listArticle:PeriodicElement[];
    client:         "",
    sessionCaisse:  "",
    totalAchat:     0,
    totalTTC:       0,
    totalHT:        0,
    totalPayement:  0,
    totalRendu:     0,
    totalReste:     0,
    listPayements: [] ,
    reglements:     "",
    numero:         "",
    date: this.utilService.setDateReel(new Date())  , //new Date(),
    id_Ticket:      "",
    id_BL:          "",

      totalBrutHT:    0,
      totalRemise:    0,
      totalDC:        0,
      totalFodec:     0,
      totalNetHT:     0,
      totalTVA:       0,
      totalRedevance: 0,
      timbreTicket:   0,
      totalPayer:     0,
      resteAPayer:    0,
      montantRendu:   0,
      totalGainCommerciale: 0,
      totalGainReel: 0,

  };
    this.set_OnePanier = this.set_OnePanierVide;
  }

  close(answer: string) {

    switch (Number(answer) ) {
      case 1 :
        this.ticketService.generatePdf(this.set_OnePanierVide,'print')
        return -1
        break;

         case 2:
           this.ticketService.generatePdfTalent(this.set_OnePanierVide,'print')
           return -1
        break;
         case 3:
           let doc_v:any = this.detailsPanier.detailsPanier
           this.openImpressionPDF(doc_v);
           return -1

        break;

      default :
        this.dialogRef.close(-1);
        break;

    }

    // if(Number(answer)>0)
    // {
    //   this.ticketService.generatePdf(this.set_OnePanierVide,'print')
    //   return -1
    //   //this.dialogRef.close(-1);
    // }else{
    //   this.dialogRef.close(-1);
    // }
  }


  openImpressionPDF(doc: DocumentVente, mode?:number){
    this.impressionPdfService.openPopup(doc._id, "Ticket", "/ticket", mode);
  }

  async getDetails(id: string, uriDocApi?: string): Promise<DocumentVente | null> {
    return new Promise((resolve) => {
      this.serviceDocVenteHttp.GetDetails(id, uriDocApi).subscribe((res) => {
        if (res.OK) {
          resolve(res)
        } else {
          resolve(null)
          showAlertError(res.MESSAGE, res.RESULTAT);
        }
      });
    });
  }

}
