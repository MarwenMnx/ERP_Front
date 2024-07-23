import { Injectable } from '@angular/core';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { roundmMargeNumber, roundmMontantNumber, roundmQuantiteNumber, showAlertError, showAlertErrorHTML } from 'src/app/global-functions';
import { DocumentVente, LigneDocumentVente } from '../models/document-vente.model';
import { Product } from 'src/app/erp_params/products/models/product.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';

@Injectable({
  providedIn: 'root'
})
export class LigneDocumentVenteService {

  constructor(private utilService:UtilService, public productService:ProductServiceService, private service:ProductServiceService) { }

  changeQuantite1(ligne:any){
    ligne = this.changeReadonlyBettweenQte1AndQte2(true, ligne)
    ligne.quantiteUnite2 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient > 0 ? ligne.quantiteUnite1 * ligne.article.coefficient : 0)
    ligne.quantite = ligne.quantiteUnite1
    return ligne
  }

  changeQuantite2(ligne:any){
    ligne = this.changeReadonlyBettweenQte1AndQte2(false, ligne)
    ligne.quantiteUnite1 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient ? ligne.quantiteUnite2 / ligne.article.coefficient : 0)
    ligne.quantite = ligne.quantiteUnite2
    return ligne
  }

  changeTotals(ligne:any, isQte2?:Boolean, isCalculTicket?:Boolean){
    let prixVenteHT = roundmMontantNumber(ligne.prixVenteBrutHT)
    let quantite = !isQte2 ? ligne.quantiteUnite1 : ligne.quantiteUnite2
    let remiseFVente = ligne.tauxremise !== undefined ? ligne.tauxremise : 0
    let remiseMontantVente = ligne.remiseMontant !== undefined ? ligne.remiseMontant : 0
    let redevance = ligne.redevance !== undefined ? ligne.redevance : (ligne.article.redevance ? ligne.article.redevance : 0)
    let prixVenteUnitaireNetHT = ligne.prixVenteUnitaireNetHT
    let prixAchat = !isQte2 ? ligne.article.prixAchat : ligne.article.prixAchat / ligne.article.coefficient
    let prixRevient = !isQte2 ? ligne.article.prixRevient : ligne.article.prixRevient / ligne.article.coefficient

    let fodec_taux = ligne.article.tauxFodec !=undefined ? ligne.article.tauxFodec : ligne.article.tauxFodecV //0  prend le parametrage après 
    let tauxFodec = ligne.tauxFodec !== undefined ? ligne.tauxFodec : ligne.tauxFodecV //ligne.article.tauxFodec

    let isFodec =  ligne.isFodec !== undefined ? ligne.isFodec : ligne.article.isFodecV
    let tauxDC =  ligne.tauxDC !== undefined ? ligne.tauxDC : ligne.article.tauxDCVente
    let isDC =  ligne.isDC !== undefined ? ligne.isDC : ligne.article.isDCVente
    let tauxTVA = ligne.tauxTVA !== undefined ? ligne.tauxTVA : ligne.article.tauxTVA
    ligne.totalRedevance = 0
    if(ligne.article.isRedevanceVente){
      ligne.totalRedevance = roundmMontantNumber(redevance * quantite)
    }
    ligne.totalBrutHT = roundmMontantNumber(prixVenteHT * quantite)
    ligne.totalRemise = roundmMontantNumber(((ligne.totalBrutHT * roundmMargeNumber(remiseFVente) / 100) + (Number(remiseMontantVente) * quantite)))
    ligne.totalHT = roundmMontantNumber(ligne.totalBrutHT -  ligne.totalRemise)
    ligne.totalDC = 0
    if(isDC){
      ligne.totalDC = roundmMontantNumber(ligne.totalHT * tauxDC / 100)
    }
    ligne.totalFodec = 0
    if(isFodec){
      ligne.totalFodec = roundmMontantNumber(ligne.totalHT * tauxFodec / 100)
    }
    ligne.totalNetHT = roundmMontantNumber(ligne.totalHT + ligne.totalDC + ligne.totalFodec)
    ligne.totalTVA = roundmMontantNumber(ligne.totalNetHT * tauxTVA / 100)
    if(!isCalculTicket){
      ligne.totalTTC = roundmMontantNumber(ligne.totalTVA + ligne.totalNetHT + ligne.totalRedevance)
    }else{
      ligne.totalTTC = roundmMontantNumber(quantite * ligne.prixVenteUnitaireTTC)
    }
    
    ligne.gainCommercialUnitaire = roundmMontantNumber((Number(prixVenteUnitaireNetHT) - Number(prixAchat)))
    ligne.gainCommercialTotal = roundmMontantNumber((Number(prixVenteUnitaireNetHT) - Number(prixAchat)) * quantite)
    ligne.gainReelUnitaire = roundmMontantNumber((Number(prixVenteUnitaireNetHT) - Number(prixRevient)))
    ligne.gainReelTotal = roundmMontantNumber((Number(prixVenteUnitaireNetHT) - Number(prixRevient)) * quantite)
    return ligne
  }

  changePrixUnitaireHT(ligne:any){
    let prixNetVenteHT = roundmMontantNumber(ligne.prixVenteUnitaireNetHT)
    let remiseFVente = ligne.tauxremise ? ligne.tauxremise : 0
    let remiseMontantVente = ligne.remiseMontant ? ligne.remiseMontant : 0
    let tauxFodec = ligne.tauxFodec ? ligne.tauxFodec : ligne.article.tauxFodec
    let isFodec =  ligne.isFodec ? ligne.isFodec : ligne.article.isFodecV
    let tauxDC =  ligne.tauxDC ? ligne.tauxDC : ligne.article.tauxDCVente
    let isDC =  ligne.isDC ? ligne.isDC : ligne.article.isDCVente

    if(!isFodec){
      tauxFodec = 0
    }
    if(!isDC){
      tauxDC = 0
    }
    let prixVenteHT = roundmMontantNumber(prixNetVenteHT / (1 + tauxDC / 100 + tauxFodec / 100))
    prixVenteHT = roundmMontantNumber(prixVenteHT + roundmMontantNumber(remiseMontantVente))

    ligne.prixVenteBrutHT  = roundmMontantNumber(roundmMontantNumber(prixVenteHT) * 100 / (100 - Number(remiseFVente)))
    return ligne
  }

  changePrixUnitaireTTC(ligne:any){
    let prixTTC = ligne.prixVenteUnitaireTTC
    let redevance = ligne.redevance ? ligne.redevance : ligne.article.redevance
    let tauxTVA = ligne.tauxTVA ?  ligne.tauxTVA :  ligne.article.tauxTVA
    let prixTTCSansTVA = roundmMontantNumber(prixTTC)
    if(ligne.article.isRedevanceVente){
      prixTTCSansTVA -= roundmMontantNumber(redevance)
    }
    ligne.prixVenteUnitaireNetHT = roundmMontantNumber(roundmMontantNumber(prixTTCSansTVA) * 100 / (Number(tauxTVA) + 100))
    return ligne
  }

  changeReadonlyBettweenQte1AndQte2(isQte1:boolean, article:any){
    let redevance = article.redevance
    let prixAchat = article.article.prixAchat
    let prixRevient = article.article.prixRevient
    let coefficient = article.article.coefficient
    if(isQte1 == true && article.isQte2 == true){
      article.prixVenteBrutHT = article.prixVenteBrutHT * coefficient
      article.redevance = article.redevance * coefficient
      article.prixAchatUnitaireHT = prixAchat
      article.prixRevient = prixRevient
      article.remiseMontant = article.remiseMontant * coefficient
      article = this.changePrixVente(article)
    }else if(isQte1 == false && article.isQte1 == true && coefficient != 0){
     // article.prixVenteBrutHT = roundmMontantNumber(prixVenteHT / coefficient)
      article.prixVenteBrutHT = article.prixVenteBrutHT / coefficient
      article.redevance = roundmMontantNumber(redevance / coefficient)
      article.prixAchatUnitaireHT = roundmMontantNumber(prixAchat / coefficient)
      article.prixRevient = roundmMontantNumber(prixRevient / coefficient)
      article.remiseMontant = article.remiseMontant / coefficient
      article = this.changePrixVente(article)
    }
    article.isQte1 = isQte1
    article.isQte2 = !isQte1
    return article
  }

  changePrixVente(ligne:LigneDocumentVente){
    if(!ligne.article) return ligne
    ligne.prixVenteHT = ligne.prixVenteBrutHT
    ligne.isFodecV = ligne.article.isFodecV
    ligne.remiseFVente = ligne.tauxremise
    ligne.remiseMontantVente = ligne.remiseMontant
    ligne.isDCVente = ligne.isDC
    ligne.tauxDCVente = ligne.tauxDC
    ligne.isRedevanceVente = ligne.article.isRedevanceVente
    let res = this.service.changePrixVente(ligne)
    ligne.montantFodec = res.prixFodecV
    ligne.montantDC = res.prixDCVente
    ligne.prixVenteUnitaireNetHT = res.prixNetVenteHT
    ligne.montantTVA = res.montantTVAVente
    ligne.prixVenteUnitaireTTC = res.prixTTC
    return ligne
  }

  checkQuantiteIsValide(documentOriginal:DocumentVente, lignes:LigneDocumentVente[], allArticles:ArticleDepotPvs[], newLigne?:LigneDocumentVente, ligneOfList?:LigneDocumentVente){
    let qteEnStock:number | undefined = 0
    let ligne = newLigne ? newLigne : ligneOfList
    let articleFromBackEnd:any = null
    
    try{
      articleFromBackEnd = allArticles.find( res => res.article._id == ligne?.article._id && res.depotpv._id == ligne?.depot_pv._id )
    }catch(e){}

    if(!articleFromBackEnd || articleFromBackEnd?.article.venteStockNegatif === true) return true
    if(articleFromBackEnd && articleFromBackEnd.quantite) qteEnStock = articleFromBackEnd.quantite
    let oldLignes = documentOriginal && documentOriginal.lignes ? documentOriginal.lignes : []
    let oldQte = 0
    if(oldLignes){
      for(let item of oldLignes){
        if(ligne && (item.article._id === ligne.article._id) && (item.depot_pv._id === ligne.depot_pv._id))
          oldQte += Number(item.quantiteUnite1)
      }
    }
    let newQte = 0
    if(lignes){
      for(let item of lignes){
        if(ligne && (item.article._id === ligne.article._id) && (item.depot_pv._id === ligne.depot_pv._id))
          newQte += Number(item.quantiteUnite1)
      }
    }
    if(newLigne){
      newQte += Number(newLigne.quantiteUnite1)
    }
    let qteCommandee = Number(newQte) - Number(oldQte)
    if(qteCommandee < 0) return true
    let qteDifference = Number(qteEnStock) - qteCommandee
    if(qteDifference < 0){
      showAlertErrorHTML(articleFromBackEnd?.article.reference+':'+articleFromBackEnd?.article.designation, 'La quantité en stock: '+this.utilService.roundmQuantiteString(qteEnStock)+'<br> La quantité commandée: '+this.utilService.roundmQuantiteString(Number(newQte) - Number(oldQte))+'<br> <span style="color:red; font-weight:500;"> La difference: '+ this.utilService.roundmQuantiteString(-1 * qteDifference) +' '+ ligne?.unite1.libelle +'</span>.')
      return false
    }
    return true
  }

  checkQuantiteRestanteIsValid(documentOriginal:DocumentVente, documentCurrente:DocumentVente, lignes:LigneDocumentVente[], allArticles:ArticleDepotPvs[], newLigne?:LigneDocumentVente, ligneOfList?:LigneDocumentVente){
    let ligne = newLigne ? newLigne : ligneOfList
    let articleFromBackEnd = allArticles.find( res => res.article._id == ligne?.article._id && res.depotpv._id == ligne?.depot_pv._id )
    let lignesCommande = documentCurrente.documentPrecedent && documentCurrente.documentPrecedent.length > 0 && documentCurrente.documentPrecedent[0].lignes ? documentCurrente.documentPrecedent[0].lignes : []
    let qteRestante = 0
    lignesCommande.forEach(x => {
      if(x.article._id === ligne?.article._id){
        qteRestante += (x.quantiteRestante ? x.quantiteRestante : 0)
      }
    })

    let quantiteRestante = (lignesCommande && lignesCommande.length > 0 && qteRestante) ? qteRestante : ligne?.quantiteRestante
    
    let oldLignes = documentOriginal && documentOriginal.lignes ? documentOriginal.lignes : []
    let oldQte = 0
    for(let item of oldLignes){
      if(ligne && (item.article._id === ligne.article._id))
        oldQte += Number(item.quantiteUnite1)
    }
    let newQte = 0
    if(lignes)
    for(let item of lignes){
      if(ligne && (item.article._id === ligne.article._id))
        newQte += Number(item.quantiteUnite1)
    }
    if(newLigne){
      newQte += Number(newLigne.quantiteUnite1)
    }
    let qteCommandee = Number(newQte) - Number(oldQte)
    if(qteCommandee < 0) return true
    let qteDifference = Number(quantiteRestante) - qteCommandee
    if(qteDifference < 0){
      showAlertErrorHTML(articleFromBackEnd?.article.reference+':'+articleFromBackEnd?.article.designation, 'La quantité restante: '+this.utilService.roundmQuantiteString(quantiteRestante)+'<br> La quantité commandée: '+this.utilService.roundmQuantiteString(Number(qteCommandee))+'<br> <span style="color:red; font-weight:500;"> La difference: '+ this.utilService.roundmQuantiteString(-1 * qteDifference) +' '+ ligne?.unite1.libelle +'</span>.')
      return false
    }
    return true
  }

  checkAllLigneQuantiteIsValid(documentOriginal:DocumentVente, lignes:LigneDocumentVente[], allArticles:ArticleDepotPvs[]){
    if(lignes && lignes.length > 0){
      for(let item of lignes){
        if(!this.checkQuantiteIsValide(documentOriginal, lignes, allArticles, undefined, item)) return false
      }
    }
    return true
  }

  checkAllLigneQuantiteRestante(documentOriginal:DocumentVente, document:DocumentVente, lignes:LigneDocumentVente[], allArticles:ArticleDepotPvs[]){
    if(lignes && lignes.length > 0){
      for(let item of lignes){
        if(!this.checkQuantiteRestanteIsValid(documentOriginal, document, lignes, allArticles, undefined, item)) return false
      }
    }
    return true
  }

  regroupementLigneDocument(lignes:LigneDocumentVente[]){
    let newLignes:LigneDocumentVente[] = []
    let numero = 1
    for(let item of lignes){
      let isExiste = false
      for(let newItem of newLignes){
        if(newItem.article._id === item.article._id){
          newItem.quantiteUnite1 += item.quantiteUnite1
          newItem.quantiteUnite2 += item.quantiteUnite2
          newItem = this.changeTotals(newItem)
          isExiste = true
        }
      }
      if(!isExiste) {
        item.numero = numero++
        item.id_document_precedent = ""
        newLignes.push(item)
      }
    }
    return newLignes
  }

}

