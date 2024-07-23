
import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient,} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { DemandeAlimentation } from '../models/demande_alimentation_stock.model';
@Injectable({
  providedIn: 'root'
})
export class DemandeAlimentationStockHttpService {

  REST_API = environment.baseUrl+'/demandealimentation';

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

  // Add
  AddNew(data: any): Observable<any> {
    let newdata:any = data
    newdata._id = undefined
   return this.httpClient
    .post(`${this.REST_API}/new`, data, this.tokenService.getHeader())
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
  delete(item: DemandeAlimentation): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    return this.httpClient
      .put(API_URL, item, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //convert response of all {{}, {}, {}} => [{}, {}, {}]
  getData(items:any) {
    // let newItems = []
    // for (let item of items){
    //   newItems.push(new DemandeAlimentation(item))
    // }
    return items
  }
}




