import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReponseList } from '../models/client.model';
import { isObjectIdMongoose, showAlertError, succesAlerteAvecTimer } from 'src/app/global-functions';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private router:Router) { 
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
    if(newdata.adresseLivraison)
      for(let item of newdata.adresseLivraison){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.adresseLivraison = []

    if(newdata.contact)
      for(let item of newdata.contact){
        item._id = isObjectIdMongoose(item._id) ? item._id : undefined
      }
    else newdata.contact = []
    
    return newdata
  }

  successCreate(res:ReponseList){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      setTimeout(() => {
      this.router.navigate(['/clients']);
    }, 2000);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  successGetDetails(res:ReponseList, form:any, defaults:any){
    if(res.OK){
      defaults = res.RESULTAT
      form.patchValue(defaults as any);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  filtrerAdress(outputAutocomplete:any, allPays:any){
    let idPays = outputAutocomplete.pays ? outputAutocomplete.pays._id : null
    let idGouvernorat = outputAutocomplete.gouvernorat ? outputAutocomplete.gouvernorat._id : null
    let idDelegation = outputAutocomplete.delegation ? outputAutocomplete.delegation._id : null
    let idLocalite = outputAutocomplete.localite ? outputAutocomplete.localite._id : null
    outputAutocomplete.gouvernoratsFiltree = []
    outputAutocomplete.delegationsFiltree = []
    outputAutocomplete.localitesFiltree = []
    let pays = allPays.find((x:any) => x._id == idPays)
    
    if(!pays){
      outputAutocomplete.pays = ""
      outputAutocomplete.gouvernorat = ""
      outputAutocomplete.delegation = ""
      outputAutocomplete.localite = ""
      return outputAutocomplete
    }

    outputAutocomplete.gouvernoratsFiltree = pays.gouvernorats
    let gouvernorat = pays.gouvernorats.find((x:any) => x._id == idGouvernorat)
    
    if(!gouvernorat){
      outputAutocomplete.gouvernorat = ""
      outputAutocomplete.delegation = ""
      outputAutocomplete.localite = ""
      return outputAutocomplete
    }

    outputAutocomplete.delegationsFiltree = gouvernorat.delegations
    let delegation = gouvernorat.delegations.find((x:any) => x._id == idDelegation)
    
    if(!delegation){
      outputAutocomplete.delegation = ""
      outputAutocomplete.localite = ""
      return outputAutocomplete
    }

    outputAutocomplete.localitesFiltree = delegation.localites

    if(!delegation.localites.find((x:any) => x._id == idLocalite)){
      outputAutocomplete.localite = ""
      return outputAutocomplete
    }
    
    return outputAutocomplete
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
