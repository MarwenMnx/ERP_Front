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
import { Fournisseur } from '../models/fournisseur.model';
import { handleError } from 'src/app/global-functions';

@Injectable({
  providedIn: 'root'
})
export class FournisseurHttpService {


  REST_API = environment.baseUrl+'/fournisseur';
  REST_API_Contact = environment.baseUrl+'/contact';
  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  //Get all objects
  GetAll(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all Adresses
  GetAllAdress(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${environment.baseUrl+"/pays/collection"}`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all Adresses
  GetAllTypeContact(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${environment.baseUrl+"/typecontact/all?t=2"}`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all Adresses
  GetAllTiersCategorie(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${environment.baseUrl+"/tierscategorie/all?t=2"}`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined

   return this.httpClient
    .post(`${this.REST_API}/new`, data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNewContact(data: any): Observable<any> {
    let newdata:any = data

    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata.typeTiers = 2
    newdata._id = undefined
    console.log("" , newdata);
    return this.httpClient
      .post(`${this.REST_API_Contact}/new`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  updateContact(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    return this.httpClient
      .put(this.REST_API_Contact, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }


  //Delete
  deleteContact(id: any): Observable<any> {
    let API_URL = `${this.REST_API_Contact}/archive`;
    let data : any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data._id = id

    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

 // Get single object
 GetDetails(id:string): Observable<any> {
  let data:any = {}
  data.code_societe = this.tokenService.getCodeSociete()
  data._id = id

  return this.httpClient.post(`${this.REST_API}`, data, this.tokenService.getHeader()).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.tokenService.handleErrorWithParams())
  );
}
  //update
  update(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }


//Delete
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
    //   newItems.push(new Fournisseur(items[key]))
    // }
    return items
  }
}
