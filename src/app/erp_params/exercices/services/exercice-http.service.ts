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
import { Excercice } from '../models/exercice.model';
import {ReponseList} from "../../banque/models/banque.model";
import {showAlertError} from "../../../global-functions";


@Injectable({
  providedIn: 'root'
})
export class ExerciceHttpService {

  REST_API = environment.baseUrl+'/exercice'

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }


  // Get all objects
  GetAll(): Observable<any> {
    let data = {
      code_societe:  this.tokenService.getCodeSociete(),
    }
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }

   // Add
  AddNew(data: any): Observable<any> {
    let newdata:any = data
    newdata._id = undefined
    return this.httpClient
      .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  update(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    return this.httpClient
      .put(this.REST_API, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }


  //Delete
  delete(item: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    return this.httpClient
      .put(API_URL, item, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items:any):Excercice[] {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Excercice(items[key]))
    // }
    return items
  }


  successCreate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  successUpdate(res:ReponseList, dialogRef:any){
    if(res.OK){
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }


}
