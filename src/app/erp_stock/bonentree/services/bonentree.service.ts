import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isObjectIdMongoose, showAlertError, succesAlerteAvecTimer } from 'src/app/global-functions';
import { Subject } from 'rxjs';
import { ReponseList } from 'src/app/erp_params/clients/models/client.model';
import { UtilService } from 'src/app/utils/UtilService.service';
@Injectable({
  providedIn: 'root'
})
export class BonentreeService {
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

    if(newdata.reglements)
      for(let item of newdata.reglements){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.reglements = []
   
    if(newdata.depot_PV_source) newdata.depot_PV_source.code_depotpv = newdata.depot_PV_source.code_unique
    if(newdata.depot_PV_destination) newdata.depot_PV_destination.code_depotpv = newdata.depot_PV_destination.code_unique
    
    return newdata
  }

  successCreate(res:ReponseList){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      setTimeout(() => {
        this.router.navigate(['/bonEntree/list']);
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

}


