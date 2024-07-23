import { Injectable } from '@angular/core';
import { ReponseList } from '../../categories/models/categorie.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isObjectIdMongoose, roundmMargeNumber, roundmMontantNumber, roundmTauxNumber, showAlertError, succesAlerteAvecTimer } from 'src/app/global-functions';
import { TokenService } from 'src/app/services/token.service';
import { enum_type_operation } from 'src/app/global-enums';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private router:Router, private tokenService:TokenService) { }

  addSocieteRacine(data:any){

  }
  remove_id(data:any):any{
    let newdata:any = data
    newdata._id = undefined
    newdata = this.remove_IdInSousList(data)
    return newdata
  }

  remove_IdInSousList(data:any){
    let newdata:any = data
    if(newdata.emplacement)
      for(let item of newdata.emplacement){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.emplacement = []

    if(newdata.colisage)
      for(let item of newdata.colisage){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.colisage = []

    if(newdata.sousArticles)
      for(let item of newdata.sousArticles){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.sousArticles = []

    if(newdata.prixQte)
      for(let item of newdata.prixQte){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.prixQte = []

    if(newdata.promotion)
      for(let item of newdata.promotion){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.promotion = []

    if(newdata.fidelite)
      for(let item of newdata.fidelite){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
        item.carte = undefined
      }
    else newdata.fidelite = []

    newdata.nbPointVar = !newdata.nbPointFix

    return newdata
  }

  convertJSONToFormData(item:any){
    const formData = new FormData();

    for (let key in item) {
      if (item.hasOwnProperty(key) && key != 'image') {
        if (typeof item[key] === 'number' || typeof item[key] === 'string' || typeof item[key] === 'boolean') {
          // If it's a number or string, directly append
          formData.append(key, item[key]);
        } else if (typeof item[key] === 'object' || Array.isArray(item[key])) {
          // If it's an object (excluding arrays), stringify and append
          formData.append(key, JSON.stringify(item[key]));
        } else if(item[key] === null){
          formData.append(key, item[key]);
        }
        // Add additional checks for other data types if needed
      }
    }
    if (item.image && item.image.name) {
      formData.append("image", item.image, item.image.name);
    }

    formData.append("code_societe", this.tokenService.getCodeSociete())
    formData.append("code_exercice", this.tokenService.getCodeExercice())
    return formData
  }

  successCreate(res:ReponseList){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 2000);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  successGetDetails(res:ReponseList, form:any, defaults:any){
    if(res.OK){
      form.patchValue(defaults as any);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  changePrixAchat(article:any){
    article.prixFourn = roundmMargeNumber(article.prixFourn)
    let tauxFodec = article.tauxFodec ? article.tauxFodec : article.tauxFodecA
    let remiseF = article.remiseF || article.remiseF == 0 ? Number(article.remiseF) : Number(article.tauxremise) 
    let remiseT = roundmMargeNumber(roundmMargeNumber(article.prixFourn) * roundmMargeNumber(remiseF) / 100) + roundmMontantNumber(article.remiseMontant)
    var prixAchat = roundmMargeNumber(roundmMargeNumber(article.prixFourn) - remiseT )

    article.prixAchatUnitaireHT = roundmMargeNumber(prixAchat)
    
    var tauxMarge = roundmMargeNumber(article.tauxMarge)
    article.tauxMarge = roundmMargeNumber(article.tauxMarge)

    if(article.isDC){
      article.prixDC = roundmMontantNumber(prixAchat * article.tauxDC / 100)
    }else{
      article.prixDC = 0
    }

    if(article.isFodecA){
      article.prixFodecA = roundmMontantNumber(prixAchat * tauxFodec / 100)
    }else{
      article.prixFodecA = 0
    }

    article.prixAchat = roundmMontantNumber( prixAchat + article.prixDC + article.prixFodecA)
    article.montantTVA = roundmMontantNumber(article.prixAchat * article.tauxTVA / 100)
    article.prixAchatTTC = roundmMontantNumber(article.prixAchat + article.montantTVA + roundmMontantNumber(article.redevance))
    article.totalFrais = 0
    article.totalFraisTTC = 0
    try{
      for(let frais of article.frais){
        article.totalFrais += roundmMontantNumber(frais.montantHT)
        article.totalFraisTTC += roundmMontantNumber(frais.montantTTC)
      }
    }catch(e){
      article.totalFrais = 0
      article.totalFraisTTC = 0
    }

    article.prixRevient =  roundmMontantNumber(roundmMontantNumber(article.prixAchat) + roundmMontantNumber(article.totalFrais))
    article.prixRevientTTC =  roundmMontantNumber(roundmMontantNumber(article.prixAchatTTC) + roundmMontantNumber(article.totalFraisTTC))
  
    var tauxMarge = roundmMargeNumber(article.tauxMarge)
    article.tauxMarge = roundmMargeNumber(article.tauxMarge)

    let prixAchatBrut = roundmMontantNumber(article.prixAchat)
    if(article.margeAppliqueeSur == enum_type_operation.REVIENT){
      prixAchatBrut = roundmMontantNumber(article.prixRevient)
    }
    article.prixMarge = roundmMontantNumber(tauxMarge * prixAchatBrut / 100)
    article.prixVenteHT = roundmMontantNumber(prixAchatBrut + article.prixMarge)

    return article
  }

  changePrixVente(article:any){
    let prixVenteHT = article.prixVenteHT
    let redevance = article.redevance
    let remiseFVente = article.remiseFVente ? article.remiseFVente : 0
    let remiseMontantVente = article.remiseMontantVente ? article.remiseMontantVente : 0
    let tauxFodec = article.tauxFodec ? article.tauxFodec : article.tauxFodecV
    
    prixVenteHT = roundmMontantNumber(prixVenteHT - ((prixVenteHT * roundmMargeNumber(remiseFVente) / 100) + Number(remiseMontantVente)))

    let prixFodecV = 0
    if(article.isFodecV){
      prixFodecV = roundmMontantNumber(prixVenteHT * tauxFodec / 100)
    }
    
    let prixDCVente = 0
    if(article.isDCVente){
      prixDCVente = roundmMontantNumber(prixVenteHT * article.tauxDCVente / 100)
    }

    let prixNetVenteHT = roundmMontantNumber(Number(prixVenteHT) + Number(prixFodecV) + Number(prixDCVente))
    let montantTVAVente = roundmMontantNumber(prixNetVenteHT * article.tauxTVA / 100)
    let prixTTC = roundmMontantNumber(roundmMontantNumber(montantTVAVente) + roundmMontantNumber(prixNetVenteHT))
    if(article.isRedevanceVente){
      prixTTC = roundmMontantNumber(prixTTC) + roundmMontantNumber(redevance)
    }
    article.redevance = roundmMontantNumber(redevance)
    article.prixFodecV =  roundmMontantNumber(prixFodecV)
    article.prixDCVente =  roundmMontantNumber(prixDCVente)
    article.prixNetVenteHT =  roundmMontantNumber(prixNetVenteHT)
    article.montantTVAVente =  roundmMontantNumber(montantTVAVente)
    article.prixTTC =  roundmMontantNumber(prixTTC)
    return article
  }

  changePrixVHT(article:any) {
    article = this.changePrixAchat(article)
    article = this.changePrixVente(article)
    return article
  }

  calculTauxMarge(article:any){
    article.tauxFodec = article.tauxFodec ? article.tauxFodec : article.tauxFodecV
    let prixAchat = roundmMontantNumber(article.prixAchat)
    if(article.margeAppliqueeSur == enum_type_operation.REVIENT){
       prixAchat = roundmMontantNumber(article.prixRevient)
    }

    let prixNetVenteHT = roundmMontantNumber(article.prixNetVenteHT)

    let tauxFodec = article.isFodecV && roundmTauxNumber(article.tauxFodec) > 0 ? roundmTauxNumber(article.tauxFodec) : 0
    let tauxDC = article.isDCVente && roundmTauxNumber(article.tauxDCVente) > 0 ? roundmTauxNumber(article.tauxDCVente) : 0

    let prixVenteHT = prixNetVenteHT * 100 / (roundmTauxNumber(tauxFodec + tauxDC + 100))

    let rest = roundmMargeNumber(roundmMargeNumber(prixVenteHT) - prixAchat)

    article.tauxMarge =  prixAchat > 0 ? roundmMargeNumber(rest / prixAchat * 100) : 0

    if(prixAchat == 0) article.prixFourn = prixVenteHT

    return article
  }

  changePrixAchatTTC(article:any){
    let prixAchatTTCSansTVA = roundmMontantNumber(article.prixAchatTTC) - roundmMontantNumber(article.redevance)
    prixAchatTTCSansTVA = roundmMontantNumber(roundmMontantNumber(prixAchatTTCSansTVA) * 100 / (Number(article.tauxTVA) + 100))

    let tauxFodec = article.tauxFodec ? article.tauxFodec : article.tauxFodecA
    if(!article.isFodecA){
      tauxFodec = 0
    }

    let tauxDC = article.tauxDC
    if(!article.isDC){
      tauxDC = 0
    }

    prixAchatTTCSansTVA = roundmMontantNumber(prixAchatTTCSansTVA / (1 + tauxDC / 100 + tauxFodec / 100))

    prixAchatTTCSansTVA = roundmMontantNumber(prixAchatTTCSansTVA + roundmMontantNumber(article.remiseMontant))

    article.prixFourn  = roundmMontantNumber(roundmMontantNumber(prixAchatTTCSansTVA) * 100 / (100 - Number(article.remiseF)))

    return article
  }

  changePrixVenteTTC(article:any){
    let prixTTCSansTVA = roundmMontantNumber(article.prixTTC)
    if(article.isRedevanceVente){
      prixTTCSansTVA = roundmMontantNumber(article.prixTTC) - roundmMontantNumber(article.redevance)
    }
    article.prixNetVenteHT = roundmMontantNumber(roundmMontantNumber(prixTTCSansTVA) * 100 / (Number(article.tauxTVA) + 100))
    return article;
  }
}
