import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChiffreAffaireClientHttpService {
  REST_API = environment.baseUrl+'/api/chiffreaffaire_client';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}
  
  //Get all objects
  GetAll(uriDoc:string = "/chiffreaffaire_client"): Observable<any> {
    let data:any = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      code_exercice : this.tokenService.getCodeExercice(),
      client: ["65f18b34b99e37953fda24a4"],
      categorie : ["65b7a7077d6e71dac0f898be"]

    }
    return this.httpClient.post(`${environment.baseUrl + uriDoc}/all`,data , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

}
