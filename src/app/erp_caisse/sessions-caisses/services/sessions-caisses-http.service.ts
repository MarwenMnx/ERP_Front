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
import { Sessions_caisse } from '../models/sessions-caisses.model';
import { handleError } from 'src/app/global-functions';

@Injectable({
  providedIn: 'root'
})
export class SessionsCaissesHttpService {

  REST_API = environment.baseUrl+'/sessioncaisse';


  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }

//filtre
  Filter(): Observable<any> {
    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.pointVenteCourante?.code_unique,
      code_exercice : this.tokenService.exerciceCourante?.code_unique,
      utilisateur_caissier: this.tokenService.user?._id,
      cloture: false,
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // cloture
  ClotureCaisse(data: Sessions_caisse): Observable<any> {
    let newdata:any       = data
    newdata.code_societe  = this.tokenService.getCodeSociete()
    newdata.code_depotpv  = this.tokenService.pointVenteCourante?.code_unique
    newdata.code_exercice = this.tokenService.exerciceCourante?.code_unique

    return this.httpClient
     .post(`${this.REST_API}/cloture `, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()))
  }

  // Add
  AddNew(data: Sessions_caisse): Observable<any> {
    let newdata:any = data
    newdata.code_societe          = this.tokenService.getCodeSociete()
    /////newdata.code_depotpv          = this.tokenService.pointVenteCourante?.code_unique // deja renseigner au debut
    newdata.code_exercice         = this.tokenService.exerciceCourante?.code_unique
    newdata.utilisateur_ouverture = {_id:this.tokenService.user?._id , nom:this.tokenService.user?.nom }
    newdata.utilisateur_cloture   = []
    newdata._id = undefined
    return this.httpClient
     .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
     .pipe(catchError(this.tokenService.handleErrorWithParams()))
  }

  GetAll(): Observable<any> {

    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.pointVenteCourante?.code_unique, //// deja renseigner au debut
      code_exercice : this.tokenService.exerciceCourante?.code_unique,
      //code_exercice:"24",
      //code_depotpv:"pv03"
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetDetails(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
    ).pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  // Update
  update(data: Sessions_caisse): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    /////newdata.code_depotpv = this.tokenService.pointVenteCourante?.code_unique ///// deja renseigner au debut
    newdata.code_exercice = this.tokenService.exerciceCourante?.code_unique

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
    //   newItems.push(new Sessions_caisse(items[key]))
    // }
    return items
  }
}


