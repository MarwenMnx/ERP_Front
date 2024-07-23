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
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {

   REST_API = environment.baseUrl+'/user';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }

  // Add
  usersBySociete(data:any): Observable<any> {

    let newData:any = data
      newData._id          = data._id
      newData.code_societe  = data.code_societe
    console.log("**************newData******************")
    console.log(newData)
    console.log("**************newData******************")
    return this.httpClient
      .post(`${this.REST_API}/societe`, newData, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: User): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined


    return this.httpClient
     .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get all users
  GetAll(): Observable<any> {
     return this.httpClient.get(`${this.REST_API}/all` ,this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetAllWithFamilleAndSousFamille(): Observable<any> {
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
  update(data: User): Observable<any> {
    let newdata:any = data

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data , this.tokenService.getHeader())
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
    //   newItems.push(new User(items[key]))
    // }
    return items
  }
}


