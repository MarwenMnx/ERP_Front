import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {  HttpClient } from '@angular/common/http';

import { TokenService } from 'src/app/services/token.service';
import { showAlertError } from 'src/app/global-functions';
import { Observable, catchError, map } from 'rxjs';
// import { Pays } from './models/pays.model';
import { Pays , ReponseList} from '../models/pays.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  REST_API = environment.baseUrl+'/pays';

  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

 // Add
 AddNew(data: Pays): Observable<any> {
  let newdata:any = data
  newdata.code_societe = this.tokenService.getCodeSociete()
  newdata._id = undefined

  return this.httpClient
   .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
   .pipe(catchError(this.tokenService.handleErrorWithParams()));
}
// Get all objects
GetAll(): Observable<any> {
  let data = {code_societe:  this.tokenService.getCodeSociete()}
  return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
  .pipe(catchError(this.tokenService.handleErrorWithParams()));
}

// Get all objects
GetAllWithModeles(): Observable<any> {
  let data = {code_societe:  this.tokenService.getCodeSociete()}
  return this.httpClient.post(`${this.REST_API}/collection`,data , this.tokenService.getHeader())
  .pipe(catchError(this.tokenService.handleErrorWithParams()));
}

// Get single object
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
update(data: Pays): Observable<any> {
  let newdata:any = data
  newdata.code_societe = this.tokenService.getCodeSociete()

  let API_URL = `${this.REST_API}`;
  return this.httpClient
    .put(API_URL, data, this.tokenService.getHeader())
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
  //   newItems.push(new Pays(items[key]))
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
