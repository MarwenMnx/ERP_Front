import { Injectable } from '@angular/core';
import { showAlertError } from 'src/app/global-functions';
import { ReponseList } from '../modeles/type-pj.model';
@Injectable({
  providedIn: 'root'
})
export class TypePieceJointeService {

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

  
}
