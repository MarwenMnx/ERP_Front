import { TokenService } from 'src/app/services/token.service';

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {ParamsGeneral, ReponseList} from "../models/paramsGeneral.model";
import {showAlertError, showAlertSucess} from "../../../global-functions";
import {enum_status_paiement} from "../../../global-enums";
import {IndexedDbService} from "../../../utils/indexedDB_PWA/indexeddb.service";

@Injectable({
  providedIn: 'root'
})
export class ParamsGeneralHttpService {

  REST_API = environment.baseUrl+'/params';

  // Http Header
  constructor(private httpClient: HttpClient,private indexedDb: IndexedDbService,
              private tokenService:TokenService) {
  }
  // Add
  AddNew(data: ParamsGeneral): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined

    return this.httpClient
      .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Update
  update(data: ParamsGeneral): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get all objects
  GetAll(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Delete
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
    //   newItems.push(new ParamsGeneral(items[key]))
    // }
    return items
  }

  listParamsGeneral:any = ""
  result?: string;
  get_params_general_by_key(set_key:any){



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
      //dialogRef.close(res.RESULTAT);
      showAlertSucess('Sucess', res.RESULTAT)
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

}
