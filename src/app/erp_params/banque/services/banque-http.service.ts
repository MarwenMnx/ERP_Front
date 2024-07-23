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
import { Banque } from '../models/banque.model';

@Injectable({
  providedIn: 'root'
})
export class BanqueHttpService {

  REST_API = environment.baseUrl + '/banque';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }
  // Add
  AddNew(data: Banque): Observable<any> {
    let newdata: any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined


    return this.httpClient
      .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get all objects
  GetAll(): Observable<any> {
    let data = { code_societe: this.tokenService.getCodeSociete() }
    return this.httpClient.post(`${this.REST_API}/all`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetCollections(): Observable<any> {
    let data = { code_societe: this.tokenService.getCodeSociete() }
    return this.httpClient.post(`${this.REST_API}/collection`, data, this.tokenService.getHeader())
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
  update(data: Banque): Observable<any> {
    let newdata: any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Delete
  delete(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    let data: any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data._id = id

    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // getData(items:any) {
  //   // console.log("items" , items);

  //   let newItems = []
  //   for (let key of Object.keys(items)){
  //     // console.log("**key" , key);
  //     newItems.push(new Banque(items[key]))
  //   }
  //   return newItems
  // }
}


