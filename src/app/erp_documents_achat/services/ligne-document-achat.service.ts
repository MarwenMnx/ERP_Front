import { Injectable } from '@angular/core';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { roundmMargeNumber, roundmMontantNumber, roundmQuantiteNumber, showAlertErrorHTML, showAlertInfoHTML } from 'src/app/global-functions';
import { DocumentAchat, LigneDocumentAchat } from '../models/document-achat.model';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { UtilService } from 'src/app/utils/UtilService.service';

@Injectable({
  providedIn: 'root'
})
export class LigneDocumentAchatService {

  constructor(private service:ProductServiceService, private utilService:UtilService) { }

  changePrixVHT(ligne:any){
    ligne.remiseF = ligne.tauxremise
    ligne.prixAchat = ligne.prixAchatUnitaireHT
    ligne.isFodecA = ligne.isFodec
    ligne.prixFodecA = ligne.montantFodec
    ligne.prixDC = ligne.montantDC
    ligne.prixAchat = ligne.prixAchatUnitaireNetHT
    ligne.prixAchatTTC = ligne.prixAchatUnitaireTTC
    ligne = this.service.changePrixAchat(ligne)
    ligne.prixAchatUnitaireHT = ligne.prixAchatUnitaireHT
    ligne.tauxremise = ligne.remiseF
    ligne.prixAchatUnitaireHT = ligne.prixAchat
    ligne.isFodec = ligne.isFodecA
    ligne.montantFodec = ligne.prixFodecA
    ligne.montantDC = ligne.prixDC
    ligne.prixAchatUnitaireNetHT = ligne.prixAchat
    ligne.prixAchatUnitaireTTC = ligne.prixAchatTTC
    return ligne
  }

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

  changeTotals(ligne:any, isQte2?:boolean){
    console.log(ligne.tauxremise);
    
    let quantite = !isQte2 ? ligne.quantiteUnite1 : ligne.quantiteUnite2
    ligne.totalRedevance = roundmMontantNumber(ligne.redevance * quantite)
    ligne.totalBrutHT = roundmMontantNumber(roundmMontantNumber(ligne.prixFourn) * quantite)
    ligne.totalRemise = roundmMontantNumber(((ligne.totalBrutHT * roundmMargeNumber(ligne.tauxremise) / 100) + (Number(ligne.remiseMontant) * quantite)))
    ligne.totalHT = roundmMontantNumber(ligne.totalBrutHT -  ligne.totalRemise)
    if(ligne.isDC){
      ligne.totalDC = roundmMontantNumber(ligne.totalHT * ligne.tauxDC / 100)
    }else{
      ligne.totalDC = 0
    }
    if(ligne.isFodec){
      ligne.totalFodec = roundmMontantNumber(ligne.totalHT * ligne.tauxFodec / 100)
    }else{
      ligne.totalFodec = 0
    }
    ligne.totalNetHT = roundmMontantNumber(ligne.totalHT + ligne.totalDC + ligne.totalFodec)
    ligne.totalTVA = roundmMontantNumber(ligne.totalNetHT * ligne.tauxTVA / 100)
    ligne.totalTTC = roundmMontantNumber(ligne.totalTVA + ligne.totalNetHT + ligne.totalRedevance)
    return ligne
  }

  changePrixUnitaireHT(ligne:any){
    let prixAchatHT = roundmMargeNumber(ligne.prixAchatUnitaireNetHT)
    let tauxFodec = ligne.tauxFodec
    if(!ligne.isFodec){
      tauxFodec = 0
    }
    let tauxDC = ligne.tauxDC
    if(!ligne.isDC){
      tauxDC = 0
    }
    prixAchatHT = roundmMargeNumber(prixAchatHT / (1 + tauxDC / 100 + tauxFodec / 100))
    prixAchatHT = roundmMargeNumber(prixAchatHT + roundmMargeNumber(ligne.remiseMontant))
    ligne.prixFourn  = roundmMargeNumber(roundmMargeNumber(prixAchatHT) * 100 / (100 - Number(ligne.tauxremise)))
    return ligne
  }

  changePrixUnitaireTTC(ligne:any){
    let prixAchatTTCSansTVA = roundmMontantNumber(ligne.prixAchatUnitaireTTC) - roundmMontantNumber(ligne.redevance)
    ligne.prixAchatUnitaireNetHT = roundmMontantNumber(roundmMontantNumber(prixAchatTTCSansTVA) * 100 / (Number(ligne.tauxTVA) + 100))
    return ligne
  }

  changeReadonlyBettweenQte1AndQte2(isQte1:boolean, article:any){
    let coefficient = article.article.coefficient
    if(isQte1 == true && article.isQte2 == true){
      article.prixFourn = roundmMontantNumber(article.prixFourn * coefficient)
      article.redevance = roundmMontantNumber(article.redevance * coefficient)
      article.remiseMontant = roundmMontantNumber(article.remiseMontant * coefficient)
      article = this.changePrixVHT(article)
    }else if(isQte1 == false && article.isQte1 == true && coefficient != 0){
      article.prixFourn = roundmMontantNumber(article.prixFourn / coefficient)
      article.redevance = roundmMontantNumber(article.redevance / coefficient)
      article.remiseMontant = roundmMontantNumber(article.remiseMontant / coefficient)
      article = this.changePrixVHT(article)
    }
    article.isQte1 = isQte1
    article.isQte2 = !isQte1
    return article
  }

  checkStockMax(documentOriginal:DocumentAchat, lignes:LigneDocumentAchat[], allArticles:ArticleDepotPvs[], newLigne?:LigneDocumentAchat, ligneOfList?:LigneDocumentAchat){
    let qteEnStock:number | undefined = 0
    let stockMax:number | undefined = 0
    let ligne = newLigne ? newLigne : ligneOfList
    let articleFromBackEnd = allArticles.find( res => res.article._id == ligne?.article._id )
    if(articleFromBackEnd && articleFromBackEnd.quantite){
      qteEnStock = articleFromBackEnd.quantite
      stockMax = articleFromBackEnd.article.stockMax
    } 
    if(!stockMax || stockMax == 0 ) return
    let oldLignes = documentOriginal && documentOriginal.lignes ? documentOriginal.lignes : []
    let oldQte = 0
    for(let item of oldLignes){
      oldQte += Number(item.quantiteUnite1)
    }
    let newQte = 0
    if(lignes)
    for(let item of lignes){
      newQte += Number(item.quantiteUnite1)
    }
    if(newLigne){
      newQte += Number(newLigne.quantiteUnite1)
    }
    let qteCommandee = Number(newQte) - Number(oldQte)
    if(qteCommandee < 0) return 
    let qteDifference = stockMax - Number(qteEnStock) - Number(qteCommandee)
    if(stockMax < (Number(qteEnStock) + Number(qteCommandee))){
      showAlertInfoHTML('Stock Maximum Atteint '+articleFromBackEnd?.article.reference+':'+articleFromBackEnd?.article.designation, 'La quantité Max: '+this.utilService.roundmQuantiteString(stockMax)+
      '<br> La quantité commandée: '+this.utilService.roundmQuantiteString(Number(qteCommandee))+
      '<br> La quantité en stock: '+this.utilService.roundmQuantiteString(Number(qteEnStock))+
      '<br> <span style="color:blue; font-weight:500;"> La difference: '+ this.utilService.roundmQuantiteString(-1 * qteDifference) +' '+ ligne?.unite1.libelle +'</span>.')
      return false
    }
    return true
  }

  regroupementLigneDocument(lignes:LigneDocumentAchat[]){
    let newLignes:LigneDocumentAchat[] = []
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
