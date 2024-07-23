import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChiffreAffaireRegionClientHttpService {

  REST_API = environment.baseUrl+'/chiffreaffaire_regionclient';
 // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}
  GetAll(data: any): Observable<any> {
    let newdata : any = data ;
    return this.httpClient.post(`${this.REST_API}/all`,newdata , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  //Get all objects
  // GetAll(uriDoc:string = "/chiffreaffaire_regionclient"): Observable<any> {
  //   let data:any = {
  //     code_societe:  this.tokenService.getCodeSociete(),
  //     code_depotpv : this.tokenService.getCodePointeVente(),
  //     code_exercice : this.tokenService.getCodeExercice(),
  //     }
  //   return this.httpClient.post(`${environment.baseUrl + uriDoc}/all`,data , this.tokenService.getHeader())
  //   .pipe(catchError(this.tokenService.handleErrorWithParams()));
  // }

}

