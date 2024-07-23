import { Injectable } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {environment} from "../../../../environments/environment";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { QuantiteInitial } from '../models/quantiteInitiale.model';
import { Depot } from '../../depot/models/depot.model';


@Injectable({
  providedIn: 'root'
})
export class QuantiteInitialHttpService {

  REST_API = environment.baseUrl+'/qteInitArticle'

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  // Get all objects
  GetAll(depot:Depot): Observable<any> {
    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      code_depotpv : depot.code_unique
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }

   // Add
  AddNew(depot:Depot, quantitesInitial:QuantiteInitial | undefined): Observable<any> {
    return this.httpClient
      .post(`${this.REST_API}/new`, quantitesInitial, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  update(depot:Depot, quantitesInitial:QuantiteInitial | undefined): Observable<any> {
    return this.httpClient
      .put(this.REST_API, quantitesInitial, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Delete
  delete(item: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    return this.httpClient
      .put(API_URL, item, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new QuantiteInitial(items[key]))
    // }
    return items
  }

}
