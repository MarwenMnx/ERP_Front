import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';
import { ReponseList } from '../delegation/delegation.model';
@Injectable({
  providedIn: 'root'
})
export class DelegationService {
  constructor(private tokenService:TokenService) { }

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
