import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { handleError, showAlertError } from 'src/app/global-functions';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpServiceService {
  REST_API = environment.baseUrl+'/article';
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
  GetAllProdcutPLU(size?:number, page?:number): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      enBalance: true
    }
    return this.httpClient
    .post(`${this.REST_API}/all${str}`, data, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetAllDepot(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient
    .post(`${environment.baseUrl+'/depotpv'}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetAllFrais(): Observable<any> {
    let data = {code_societe:  this.tokenService.getCodeSociete()}
    return this.httpClient
    .post(`${environment.baseUrl+'/frais'}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: any): Observable<any> {
   return this.httpClient
    .post(`${this.REST_API}/new`, data, this.tokenService.getHeader())
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
    let newItems = [] = items
    // for (let key of Object.keys(items)){
    //   console.log("*****getData**********",items[key])
    //   newItems.push(new Product(items[key]))
    // }
    return newItems
  }


}
