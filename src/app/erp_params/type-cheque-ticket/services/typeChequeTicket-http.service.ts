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
import { typeChequeTicket } from '../models/typeChequeTicket.model';

@Injectable({
  providedIn: 'root'
})
export class TypeChequeTicketHttpService {

  REST_API = environment.baseUrl+'/typechequeticket';




  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }
  // Add
  AddNew(data: typeChequeTicket): Observable<any> {
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

  // Update
  update(data: typeChequeTicket): Observable<any> {
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
    //   newItems.push(new typeChequeTicket(items[key]))
    // }
    return items
  }
}


