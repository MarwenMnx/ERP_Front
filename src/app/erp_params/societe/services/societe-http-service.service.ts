import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from '../../../services/token.service';
import { Societe } from '../models/societe.model';
import {ReponseList} from "../../categories/models/categorie.model";
import {showAlertError} from "../../../global-functions";

@Injectable({
  providedIn: 'root'
})
export class SocieteHttpServiceService {
  REST_API = environment.baseUrl+'/societe';
  // Http Header

  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  // Get all objects
  GetAll(size?:number, page?:number): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient
    .post(`${this.REST_API}/all${str}`, data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get all objects
  GetSocietesByUser(size?:number, page?:number, _idUsr?:string): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {_id:  _idUsr}
    return this.httpClient
      .post(`${this.REST_API}/getSocietesByUser${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Add
  AddNew(data: any): Observable<any> {
    delete  data._id

   return this.httpClient
    .post(`${this.REST_API}/new`, data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get single object
  GetDetails(id:string): Observable<any> {
    let data:any = {}
    data._id = id
    return this.httpClient.post(`${this.REST_API}`, data, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.tokenService.handleErrorWithParams())
    );
  }
  // Update
  update(data: any): Observable<any> {
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
    // let newItems:Societe[] = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Societe(items[key]))
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
