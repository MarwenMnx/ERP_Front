import { showAlertError } from 'src/app/global-functions';
import { Injectable } from '@angular/core';


import { CompteBancaires, ICompteBancaires, ReponseList } from '../models/compteBancaires.model';

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {

  constructor() { }
  successCreate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  successUpdate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  addSocieteRacine(data:CompteBancaires):ICompteBancaires{
    let newdata:any = data
    newdata.societeRacine = "65648ad77ccea9d87367ce54"
    newdata._id = undefined
    return newdata
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new CompteBancaires(items[key]))
    // }
    return items
  }


}

