


import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { handleError, isObjectIdMongoose } from 'src/app/global-functions';
import { DocumentAchat } from '../models/document-achat.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentAchatHttpService {

  REST_API = environment.baseUrl+'/bonreceptionfournisseur';
  REST_API_Contact = environment.baseUrl+'/reglement';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  //Get all objects
  GetAll(uriDoc:string = "/bonreceptionfournisseur", idFournisseur?:string, req?:any, bloque?:Boolean): Observable<any> {
    let data:any = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      code_exercice : this.tokenService.getCodeExercice(),
    }
    if(isObjectIdMongoose(idFournisseur)) data['fournisseur'] = idFournisseur
    if(bloque != undefined) data["bloque"] = bloque

    return this.httpClient.post(`${environment.baseUrl + uriDoc}/all`, req ? req : data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all objects
  GetAllMultipleDocs(uriDoc:string = "/bonlivraison", ids?:string[]): Observable<any> {
    let data:any = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      code_exercice : this.tokenService.getCodeExercice(),
      _ids:ids
    }
    return this.httpClient.post(`${environment.baseUrl + uriDoc}/filter`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: any, uriDoc:string = "/bonreceptionfournisseur"): Observable<any> {
    let newdata:any = data
    newdata._id = undefined
   return this.httpClient
    .post(`${environment.baseUrl + uriDoc}/new`, data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetDetails(id:string, uriDoc:string = "/bonreceptionfournisseur"): Observable<any> {
    let data:any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data.code_exercice = this.tokenService.getCodeExercice()
    data.code_depotpv = this.tokenService.getCodePointeVente()
    data._id = id
    return this.httpClient.post(`${environment.baseUrl + uriDoc}`, data, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.tokenService.handleErrorWithParams())
    );
  }

  //update
  update(data: any, uriDoc:string = "/bonreceptionfournisseur"): Observable<any> {
    let API_URL = `${environment.baseUrl + uriDoc}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Delete
  delete(item: DocumentAchat, uriDoc:string = "/bonreceptionfournisseur"): Observable<any> {
    let API_URL = `${environment.baseUrl + uriDoc}/archive`;
    return this.httpClient
      .put(API_URL, item, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new DocumentAchat(items[key]))
    // }
    return items
  }
}


