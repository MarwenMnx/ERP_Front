import { Injectable } from '@angular/core';

import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';
import { ReponseList } from '../models/leasings.model';
@Injectable({
  providedIn: 'root'
})
export class LeasingsService {

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
