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
import { IRequestBody, ReleveTiere } from '../models/releve-client.model';
import { Depot } from '../../depot/models/depot.model';


@Injectable({
  providedIn: 'root'
})
export class ReleveClientHttpService {

  REST_API = environment.baseUrl+'/releveetiers'

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  // Get all objects
  GetAll(body:IRequestBody): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/all`, body, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }
  // Get all objects
  GetAllDetails(body:IRequestBody): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/all`, body, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }

   // Add
  AddNew(depot:Depot, quantitesInitial: ReleveTiere | undefined): Observable<any> {
    return this.httpClient
      .post(`${this.REST_API}/new`, quantitesInitial, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  update(depot:Depot, quantitesInitial:ReleveTiere | undefined): Observable<any> {
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
}
