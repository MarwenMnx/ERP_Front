import { Injectable } from '@angular/core';
import { Frais, IFrais, ReponseList } from '../models/frais.model';


@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor() { }

  successCreate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      alert(res.MESSAGE)
    }
  }

  successUpdate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      alert(res.MESSAGE)
    }
  }

  addSocieteRacine(data:Frais):IFrais{
    let newdata:any = data
    newdata.societeRacine = "65648ad77ccea9d87367ce54"
    newdata._id = undefined
    return newdata
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Frais(items[key]))
    // }
    return items
  }


}
