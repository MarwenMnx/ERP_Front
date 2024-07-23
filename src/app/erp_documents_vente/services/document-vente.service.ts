import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isObjectIdMongoose, roundmMontantNumber, showAlertError, showAlertErrorHTML, succesAlerteAvecTimer } from 'src/app/global-functions';
import { Subject } from 'rxjs';
import { Client, ReponseList } from 'src/app/erp_params/clients/models/client.model';
import { DocumentVente, LigneDocumentVente } from '../models/document-vente.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from 'src/app/erp_params/ticket/models/ticket.model';
import { LigneDocumentVenteService } from './ligne-document-vente.service';
import { Reglement } from 'src/app/erp_params/reglements/models/reglement.model';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentVenteService {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private utilService: UtilService,
    private ligneDocumentVenteService: LigneDocumentVenteService
  ) {
  }

  addSocieteRacine(data: any): any {
    // let newdata:any = data
    // newdata._id = undefined
    // return newdata
  }

  remove_id(data: any): any {
    let newdata: any = data
    newdata._id = undefined
    newdata = this.remove_IdInSousList(data)
    return newdata
  }

  remove_IdInSousList(data: any) {
    let newdata: any = data
    if (newdata.lignes)
      for (let item of newdata.lignes) {
        item.article.image = undefined
        item.image = undefined
        item.article.estPack = undefined
        item.article.venteStockNegatif = item.article.venteStockNegatif ? item.article.venteStockNegatif : undefined
        item.article.uniteLLH = item.article.uniteLLH ? item.article.uniteLLH : undefined
        item.article.unitePoids = item.article.unitePoids ? item.article.unitePoids : undefined
        item.article.emplacement = undefined
        item.article.modification_notes = undefined
        item.article.addition_note = undefined
        item.article.colisage = undefined
        item.article.sousArticles = undefined
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.lignes = []

    let regs = []
    if (newdata.reglements){
      for (let item of newdata.reglements) {
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
        if(!(!isObjectIdMongoose(data._id) && isObjectIdMongoose(item._id))){
          regs.push(item)
        }
      }
    }
    newdata.reglements = regs

    if(!newdata.documentSuivant) newdata.documentSuivant = []
    if(!newdata.documentPrecedent) newdata.documentPrecedent = []

    return newdata
  }

  successCreate(res: ReponseList, pageList = '/bonLivraison/list') {
    if (res.OK) {
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      setTimeout(() => {
        this.router.navigate([pageList]);
      }, 2000);
    } else {
      showAlertError(res.MESSAGE, res.RESULTAT);
    }
  }

  successGetDetails(res: ReponseList, form: any, defaults: any) {
    if (res.OK) {
      defaults = res.RESULTAT
      form.patchValue(defaults as any);
    } else {
      showAlertError(res.MESSAGE, res.RESULTAT);
    }
  }


  public allPaysObservable = new Subject<[]>();
  public allPays = []
  setAllPays(allPays: any) {
    this.allPaysObservable.next(allPays);
    this.allPays = allPays
  }

  public allTypeContactObservable = new Subject<[]>();
  public allTypeContact = []
  setAllTypeContacts(allTypeContacts: any) {
    this.allTypeContactObservable.next(allTypeContacts);
    this.allTypeContact = allTypeContacts
  }

  checkSoldeClient(client: Client | null, oldDocument: DocumentVente, newDocument: DocumentVente) {
    let newSolde = Number(newDocument.totalTTC) - Number(oldDocument.totalTTC)
    if (newSolde < 0) return true
    if (!client || client.plafondSolde == 0) return true
    let differenceSolde = Number(client.plafondSolde) - Number(client.solde) - Number(newSolde)
    if (differenceSolde < 0) {
      showAlertErrorHTML("Client = " + client?.raisonSociale, 'Le solde: ' + this.utilService.roundmMontantString(Number(client.solde) + Number(newSolde)) + '<br> Plafond solde: ' + this.utilService.roundmMontantString(Number(client.plafondSolde)) + '<br> <span style="color:red; font-weight:500;"> La difference: ' + this.utilService.roundmMontantString(-1 * differenceSolde) + '</span>.')
      return false
    }
    return true
  }

  adaptationTicketDocument(doc:Ticket | DocumentVente | any, allArticles?:any[], dataParams?:any){
    let lignes:LigneDocumentVente[] = []
    let compteur = 0
    doc.lignes.map( (y:any) => {
      let x:any = JSON.parse(JSON.stringify(y))
      compteur++
      x.numero = compteur
      if(allArticles){
        let article = allArticles.find(a => a.article._id == x.article._id)
        if(article){
          x.article = article.article
        }
      }
      x.isQte1              = x.quantite == x.quantiteUnite1
      x.isQte2              = x.quantite == x.quantiteUnite2
      x.prixAchatUnitaireHT = x.quantite == x.quantiteUnite2 && x.coefficient ? x.article.prixAchat / x.article.coefficient : x.article.prixAchat
      x.prixVenteBrutHT     = x.quantite == x.quantiteUnite2  && x.coefficient ? x.article.prixVenteHT / x.article.coefficient : x.article.prixVenteHT
      x.isFodec             = x.article.isFodecV
      x.tauxFodec           = x.article.tauxFodecV ? x.article.tauxFodecV : 1
      x.montantFodec        = x.article.prixFodecV
      x.isDC                = x.article.isDCVente
      x.tauxDC              = x.article.tauxDCVente
      x.montantDC           = x.article.prixFodecV
      x.prixVenteUnitaireNetHT  = x.quantite == x.quantiteUnite2 && x.coefficient ? x.article.prixNetVenteHT / x.article.coefficient : x.article.prixNetVenteHT
      x.tauxTVA                 = (doc.client && doc.client.exonereTva == true) ? 0 : x.article.tauxTVA
      x.montantTVA          = x.article.montantTVAVente
      x.redevance           = x.quantite == x.quantiteUnite2 && x.coefficient ? x.article.redevance / x.article.coefficient : x.article.redevance
      x.tauxremise          = 0
      x.remiseMontant       = 0
      x.unite1              = x.article.unite1
      x.unite2              = x.article.unite2
      x.coefficient         = x.article.coefficient
      x.depot_pv            = x.depotpv
      x                     = this.ligneDocumentVenteService.changePrixVente(x)
      x                     = this.ligneDocumentVenteService.changeReadonlyBettweenQte1AndQte2(x.isQte1, x)
      x.prixVenteUnitaireTTC = x.pu_ttc
      x = this.ligneDocumentVenteService.changePrixUnitaireTTC(x)
      x = this.ligneDocumentVenteService.changePrixUnitaireHT(x)
      x = this.ligneDocumentVenteService.changePrixVente(x)
      x.prixVenteUnitaireHT = x.prixVenteUnitaireNetHT
      if(x["isQte1"] == true){
        x = this.ligneDocumentVenteService.changeTotals(x, false, dataParams.estDocumentPrecedentTicket)
      }else{
        x = this.ligneDocumentVenteService.changeTotals(x, true, dataParams.estDocumentPrecedentTicket)
      }
      x.quantiteRestante = 0
      x.quantiteLivre = 0
      lignes.push(x)
    })
    doc.lignes = lignes
    let totals = this.changeTotals(doc)
    for(let key in totals){
      doc[key] = totals[key]
    }
    return doc
  }

  changeTotals(document:Ticket | DocumentVente | any, allClients?:Client[], dataParams?:any) {
    let totals: any = {
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
      gainReelTotal:0,
      gainCommercialTotal:0,
      totalPayer: 0,
      resteAPayer: 0
    }
    let lignes:LigneDocumentVente[] = document['lignes'] ? document['lignes'] : []
    let reglements:Reglement[] = document['reglements'] ? document['reglements'] : []
    try {

      for (let item of lignes) {
        let item2:any = item
        for (let key in totals) {
          if (item2[key] && typeof item2[key] === 'number') {
             totals[key] += roundmMontantNumber(item2[key])
          }
        }
      }

      totals.totalGainCommerciale = totals.gainCommercialTotal
      totals.totalGainReel = totals.gainReelTotal

      totals.totalPayer = 0

      for (let item of reglements) {
        totals.totalPayer += Number(item.montant)
      }

      let client = null
      if(allClients && document.client){
        client = allClients.find(x => x._id === document.client._id)
      }

      if(dataParams && dataParams?.withTimbreFiscal == true && (!client || client.exonereTimbre === false)){
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

    return totals
  }

}

