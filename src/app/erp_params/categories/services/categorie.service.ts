import { Injectable } from '@angular/core';
import { ReponseList } from '../models/categorie.model';
import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

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
