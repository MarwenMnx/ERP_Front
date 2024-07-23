import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TokenService} from "../../../services/token.service";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,  HttpHeaders,  HttpErrorResponse} from '@angular/common/http';
import { ArticleDepotPvs } from '../models/articleDepotPvs.model';
import { Depot } from '../../depot/models/depot.model';
import { Excercice } from '../../exercices/models/exercice.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesDepotPvHttpService {

  REST_API = environment.baseUrl+'/articledepotpv';

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  // Get all objects
  getAllArticlesByDepotPV(size?:number, page?:number, enVente?:Boolean): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data:any = {  code_societe  :   this.tokenService.getCodeSociete(),
                  code_exercice :   this.tokenService.getCodeExercice() ,
                  code_depotpv  :   this.tokenService.getCodePointeVente(),
                  ayant_acces   :   this.tokenService.pointVenteCourante.ayant_acces,
                  "article.enVente" : true
    }
    if(enVente) data['article'] = {enVente:enVente}
    return this.httpClient
      .post(`${this.REST_API}/collection${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  getAllArticlesByDepotPV_ENVente(size?:number, page?:number): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {  code_societe  :   this.tokenService.getCodeSociete(),
                  code_exercice :   this.tokenService.getCodeExercice() ,
                  code_depotpv  :   this.tokenService.getCodePointeVente(),
                  ayant_acces   :   this.tokenService.pointVenteCourante.ayant_acces,
                  enVente       :   true,
                  article       :   {enVente:true}

    }
    return this.httpClient
      .post(`${this.REST_API}/collection${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  getAllArticlesByDepotPVPourDocumentAchat(size?:number, page?:number, depot?:Depot, exercice?:Excercice, enAchat?:Boolean): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data:any = {  code_societe  :   this.tokenService.getCodeSociete(),
                  code_exercice :   exercice && exercice.code_unique ? exercice.code_unique : this.tokenService.getCodeExercice() ,
                  code_depotpv  :   depot && depot.code_unique ? depot.code_unique : this.tokenService.getCodePointeVente(),
    }
    if(enAchat) data['article'] = {enAchat:enAchat}
    return this.httpClient
      .post(`${this.REST_API}/articles${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getAllArticlesByCurrentDepotPV(size?:number, page?:number): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {  code_societe  :   this.tokenService.getCodeSociete(),
      code_exercice :   this.tokenService.getCodeExercice() ,
      code_depotpv  :  this.tokenService.getCodePointeVente(),
      enVente       :   true ,
      article       :   {enVente:true}
    }
    return this.httpClient
      .post(`${this.REST_API}/collection${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getAllArticlesByDepotPVCode(size?:number, page?:number,pv?:any): Observable<any> {
    let str = size ? "?size="+size : ""
    str += (size && page) ? "&&page="+page : ""
    let data = {  code_societe  :   this.tokenService.getCodeSociete(),
      code_exercice :   this.tokenService.getCodeExercice() ,
      code_depotpv  :  pv ,
      enVente       :   true ,
      article       :   {enVente:true}
    }
    return this.httpClient
      .post(`${this.REST_API}/collection${str}`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getDataArticleDepotPvss(items:any) {
    // let newItems:any = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new ArticleDepotPvs(items[key]))
    // }
    return items
  }


}
