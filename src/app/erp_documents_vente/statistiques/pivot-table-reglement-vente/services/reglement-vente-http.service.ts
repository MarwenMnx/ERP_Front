import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
 export class ReglementVenteHttpService {
  REST_API = environment.baseUrl+'/reglementventeachat';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}
  //Get all objects
  GetAll(data: any): Observable<any> {
    // let uriDoc:string = "/vente_rayon";
  let newdata : any = data ;
    return this.httpClient.post(`${this.REST_API}/all`,newdata , this.tokenService.getHeader())
    .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

}

