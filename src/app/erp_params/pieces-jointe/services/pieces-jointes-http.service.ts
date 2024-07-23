import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PiecesJointesHttpService {

  REST_API = environment.baseUrl+'/files';

  constructor(private httpClient: HttpClient, private tokenService:TokenService) {}

  // Add
  upload_file(data: any): Observable<any> {
    let newdata:any = data
    // newdata.code_societe  = this.tokenService.getCodeSociete()
    // newdata._id           = undefined // id client

    return this.httpClient
      .put(`${this.REST_API}/upload_file`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // delete
  delete_file(data: any): Observable<any> {
    let newdata:any = data
    // newdata.code_societe  = this.tokenService.getCodeSociete()
    // newdata._id           = undefined // id client

    return this.httpClient
      .put(`${this.REST_API}/delete_file`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // download
  download_file(data: any): Observable<any> {
    let newdata:any = data
    // newdata.code_societe  = this.tokenService.getCodeSociete()
    // newdata._id           = undefined // id client

    return this.httpClient
      .post(`${this.REST_API}/download_file`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

}
