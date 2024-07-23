import { Injectable } from '@angular/core';

import { TokenService } from 'src/app/services/token.service';
import { ReponseList } from '../models/plan.model';
import { showAlertError } from 'src/app/global-functions';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {

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
