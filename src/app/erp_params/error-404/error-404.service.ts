import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// const baseUrl = environment.baseUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class Error404Service {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + '/error-404', data);
  }

}
