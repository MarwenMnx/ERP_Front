import { Injectable } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {environment} from "../../../../environments/environment";
import { Observable, throwError,of } from 'rxjs';
import { catchError,tap, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Reglement} from "../models/reglement.model";
import { isObjectIdMongoose } from 'src/app/global-functions';
import { UtilService } from 'src/app/utils/UtilService.service';


@Injectable({
  providedIn: 'root'
})
export class ReglementHttpService {

  REST_API = environment.baseUrl+'/reglement'
  private reglementsUrl = 'assets/Reglements.json';
  private reglements: Reglement[] = []; 

  constructor(
    private httpClient: HttpClient, 
    private tokenService:TokenService,
    public utilService: UtilService) { }

    getAllFournisseurs(): Observable<any> {
      return this.httpClient.get('assets/Fournisseurs.json');
    }
    getAllClients(): Observable<any>{
      return this.httpClient.get('assets/Clients.json');
    }
    getAllReglements(): Observable<Reglement[]> {
      return this.httpClient.get<Reglement[]>(this.reglementsUrl)
        .pipe(
          tap((reglements: Reglement[]) => this.reglements = reglements), // Store data locally
        );
    }

    addReglement(newReglement: Reglement): Observable<Reglement[]> {
      return this.httpClient.post<Reglement[]>(this.reglementsUrl, newReglement)
        .pipe(
          tap((reglements: Reglement[]) => this.reglements = reglements), // Update local data
          catchError((error) => {
            console.error('Error adding reglement:', error);
            return throwError(error);
          })
        );
    }
  
    deleteReglement(reglement: Reglement): Observable<Reglement[]> {
      this.reglements = this.reglements.filter(r => r._id !== reglement._id);
      return of(this.reglements);
    }
  
    

   

  // Get all objects
  GetAll(req?:any): Observable<any> {
    let data:any = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      tab_reg:      "reglementclients",
    }

    return this.httpClient.post(`${this.REST_API}/all`, req ? req : data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));;
  }

  // Get single object
  GetDetails(id:string, tab_reg?:string): Observable<any> {
    let data:any = {
      code_societe:  this.tokenService.getCodeSociete(),
      code_exercice: this.tokenService.getCodeExercice(),
      code_depotpv : this.tokenService.getCodePointeVente(),
      tab_reg:      !tab_reg ? "reglementclients" : tab_reg,
      _id:id
    }

    return this.httpClient.post(`${this.REST_API}`, data, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.tokenService.handleErrorWithParams())
    );
  }

  GetAllTickets(req?:any): Observable<any> {
    let data = req
    return this.httpClient.post(`${this.REST_API}/all`, data, this.tokenService.getHeader())
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


  getData(items:any) {
    let newItems = []
      for (let key of Object.keys(items)){
        let item:any = new Reglement(items[key])
        item.dateString = this.utilService.formatDateTime(item.date) 
        item.dateEcheanceString = item.dateEcheance ? this.utilService.formatDateTime(item.dateEcheance) : ""
        item.modeReglementString = item.modeReglement ? this.utilService.getEnumKeyByValue('enum_modeReglement' ,item.modeReglement) : ""
        item.montantString = this.utilService.formatMontant(item.montant.toString())
        newItems.push(item)
      }
    return newItems
  }

}
