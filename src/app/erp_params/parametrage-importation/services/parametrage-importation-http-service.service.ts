import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { DataImportation, ParametreImportation } from '../models/parametrage-importation.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrageImportationHttpServiceService {

  REST_API = environment.baseUrl+'/parametrage_importation';
  
  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }
  // Add
  addNew(data: ParametreImportation): Observable<any> {
    let newdata:any = data
    newdata._id     = undefined
    return this.httpClient
     .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  update(data: ParametreImportation): Observable<any> {
    return this.httpClient
      .put(`${this.REST_API}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Get single object
  getDetails(data: ParametreImportation): Observable<any> {
    let newdata:any = data
    newdata._id     = undefined
    newdata.champs     = undefined
   
    return this.httpClient
     .post(`${this.REST_API}`, newdata, this.tokenService.getHeader())
     .pipe(
      catchError(
        this.tokenService.handleErrorWithParams()
      )
    );
  }
  
  // Add
  sendLignes(data: DataImportation): Observable<any> {
    return this.httpClient
     .post(environment.baseUrl+'/parametrage_modele/new', data, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

}


