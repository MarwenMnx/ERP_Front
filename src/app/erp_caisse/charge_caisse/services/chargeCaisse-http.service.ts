import { TokenService } from './../../../services/token.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {ChargeCaisse, ReponseList} from "../models/chargeCaisse.model";
import {showAlertError} from "../../../global-functions";


@Injectable({
  providedIn: 'root'
})
export class ChargeCaisseHttpService {

  REST_API = environment.baseUrl+'/chargeCaisse';
  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }

  AddNew(data: ChargeCaisse): Observable<any> {
    let newdata:any       = data
    newdata.code_societe  = this.tokenService.getCodeSociete()
    newdata._id           = undefined

    return this.httpClient
     .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  GetAll(): Observable<any> {

    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      code_depotpv : this.tokenService.getCodePointeVente(),
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  GetDetails(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.tokenService.handleErrorWithParams())
    );
  }

 // Update
  update(data: ChargeCaisse): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  delete(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    let data : any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data._id = id

    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new CompteBancaires(items[key]))
    // }
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
