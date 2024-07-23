import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';
import { ReponseList } from '../localite/localite.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaliteService {

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

  public allTypeDepartementObservable = new Subject<[]>();
  public allTypeDepartement = []
  setAllTypeDepartement(allTypeDepartement:any) {
    this.allTypeDepartementObservable.next(allTypeDepartement);
    this.allTypeDepartement = allTypeDepartement
  }
}
