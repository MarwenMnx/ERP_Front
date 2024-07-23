import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';

import {showAlertError} from "../../../global-functions";
import {Rappel_stock , ReponseList} from "../models/rappel-stock";



@Injectable({
  providedIn: 'root'
})
export class RappelStockHttpService {
  REST_API = environment.baseUrl+'/rappel_stock';

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  // Get all objects
  GetAll(get_data:any): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/all`,get_data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items:any) {
    let newItems = []
    for (let key of Object.keys(items)){
      newItems.push(new Rappel_stock(items[key]))
    }
    return items
  }

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
