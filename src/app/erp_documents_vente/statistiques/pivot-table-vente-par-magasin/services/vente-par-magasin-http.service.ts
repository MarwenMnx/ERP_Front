import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { handleError, isObjectIdMongoose } from 'src/app/global-functions';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class VenteParMagasinHttpService {
  REST_API = environment.baseUrl+'/vente_par_magasin';
  // REST_API_Contact = environment.baseUrl+'/reglement';

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
