import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { TokenService } from 'src/app/services/token.service';

const baseUrl = environment.baseUrl+'/user';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient, private tokenService:TokenService) { }

  login(data: any): Observable<any> {
    return this.http.post(baseUrl+'/login', data, this.tokenService.getHeaderLogin())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }

}
