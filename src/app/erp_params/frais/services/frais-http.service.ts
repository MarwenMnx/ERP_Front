
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
import { Frais } from '../models/frais.model';



@Injectable({
  providedIn: 'root'
})
export class FraisHttpService {

  REST_API = environment.baseUrl+'/frais';
  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }
  AddNew(data: Frais): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined

    return this.httpClient
     .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.handleError));
  }


  GetAll(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader());
  }

  GetDetails(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

 // Update
  update(data: Frais): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    let data : any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data._id = id

    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.handleError));
  }



  // Error
  handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Handle client error
    errorMessage = error.error.message;
  } else {
    // Handle server error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => {
    errorMessage;
  });
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Frais(items[key]))
    // }
    return items
  }
}


