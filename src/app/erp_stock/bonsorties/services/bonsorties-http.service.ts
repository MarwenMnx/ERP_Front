import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable,throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { DocumentEnteeSorties } from '../../entreeSortie/entresortie.model';
import {BonCasseComponent} from "../../boncasse/boncasse.component";
@Injectable({
  providedIn: 'root'
})
export class BonsortiesHttpService {

  REST_API = environment.baseUrl+'/bonsortie';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  //Get all objects
  GetAll(): Observable<any> {
    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      code_exercice : this.tokenService.getCodeExercice(),
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all objects
  GetAllByDepot(data: any): Observable<any> {

    // let data:any =  {
    //   _id:   newValue[1]["_id"],
    //   code_societe:  this.tokenService.getCodeSociete(),
    //   code_depotpv : this.tokenService.getCodePointeVente(),
    //   code_exercice : this.tokenService.getCodeExercice(),
    // }
    let newdata:any = data
    return this.httpClient.post(`${this.REST_API}/destination `,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  //Get all objects
  GetAllByDepotDestSrc(data: any): Observable<any> {
    let newdata:any = data
    return this.httpClient.post(`${this.REST_API}/filtre`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: any): Observable<any> {
    let newdata:any = data
    delete newdata._id
   return this.httpClient
    .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetDetails(id:string): Observable<any> {
    let data:any = {}
    data.code_societe = this.tokenService.getCodeSociete()
    data.code_exercice = this.tokenService.getCodeExercice()
    data.code_depotpv = this.tokenService.getCodePointeVente()
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
    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Delete
  delete(item: DocumentEnteeSorties): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    return this.httpClient
      .put(API_URL, item, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //convert response of all {{}, {}, {}} => [{}, {}, {}]
  getData(items:any):DocumentEnteeSorties[] {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new DocumentEnteeSorties(items[key]))
    // }
    return items
  }
}





