import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isObjectIdMongoose, showAlertError, showAlertErrorHTML, succesAlerteAvecTimer } from 'src/app/global-functions';
import { Subject } from 'rxjs';
import { ReponseList } from 'src/app/erp_params/clients/models/client.model';
import { IBanqueCollection } from 'src/app/erp_params/banque/models/banque.model';
import { BanqueHttpService } from 'src/app/erp_params/banque/services/banque-http.service';
import { Observable, of } from 'rxjs';
import { Fournisseur } from 'src/app/erp_params/fournisseurs/models/fournisseur.model';
import { DocumentAchat, LigneDocumentAchat } from '../models/document-achat.model';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentAchatService {

  constructor(private router:Router, private utilService:UtilService) { 
  }

  addSocieteRacine(data:any):any{
    // let newdata:any = data
    // newdata._id = undefined
    // return newdata
  }

  remove_id(data:any):any{
    let newdata:any = data
    newdata._id = undefined
    newdata = this.remove_IdInSousList(data)
    return newdata
  }

  remove_IdInSousList(data:any){
    let newdata:any = data
    if(newdata.lignes)
      for(let item of newdata.lignes){
        item.article.image = undefined
        item.image = undefined
        item.article.estPack = undefined
        item.article.venteStockNegatif = item.article.venteStockNegatif ? item.article.venteStockNegatif : undefined
        item.article.uniteLLH = item.article.uniteLLH ? item.article.uniteLLH  : undefined
        item.article.unitePoids = item.article.unitePoids ? item.article.unitePoids  : undefined
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

  successCreate(res:ReponseList, pageList = '/bonReception/list'){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      setTimeout(() => {
      this.router.navigate([pageList]);
    }, 2000);
    }else{
      showAlertError(res.MESSAGE, res.RESULTAT);
    }
  }

  successGetDetails(res:ReponseList, form:any, defaults:any){
    if(res.OK){
      defaults = res.RESULTAT
      form.patchValue(defaults as any);
    }else{
      showAlertError(res.MESSAGE, res.RESULTAT);
    }
  }

  public allPaysObservable = new Subject<[]>();
  public allPays = []
  setAllPays(allPays:any) {
    this.allPaysObservable.next(allPays);
    this.allPays = allPays
  }

  public allTypeContactObservable = new Subject<[]>();
  public allTypeContact = []
  setAllTypeContacts(allTypeContacts:any) {
    this.allTypeContactObservable.next(allTypeContacts);
    this.allTypeContact = allTypeContacts
  }

  checkSoldeFournisseur(fournisseur:Fournisseur | null, oldDocument:DocumentAchat, newDocument:DocumentAchat){
    let newSolde = Number(newDocument.totalTTC) - Number(oldDocument.totalTTC)
    if(newSolde < 0) return true
    if(!fournisseur || fournisseur.plafondSolde == 0) return true
    let differenceSolde = Number(fournisseur.plafondSolde) - Number(fournisseur.solde) - Number(newSolde)
    if(differenceSolde < 0){
      showAlertErrorHTML("Fournisseur = "+fournisseur?.raisonSociale, 'Le solde: '+this.utilService.roundmMontantString(Number(fournisseur.solde) + Number(newSolde))+'<br> Plafond solde: '+this.utilService.roundmMontantString(Number(fournisseur.plafondSolde))+'<br> <span style="color:red; font-weight:500;"> La difference: '+ this.utilService.roundmMontantString(-1 * differenceSolde) +'</span>.')
      return false
    }
    return true
  }
  
}

