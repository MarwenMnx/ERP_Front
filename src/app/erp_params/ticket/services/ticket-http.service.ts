import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,  HttpHeaders,  HttpErrorResponse} from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import {Ticket} from "../models/ticket.model";
import { enum_nomTable } from 'src/app/global-enums';


@Injectable({
  providedIn: 'root'
})
export class TicketHttpService {

  REST_API = environment.baseUrl+'/ticket';

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  // Get all objects
  GetAll(req?:any): Observable<any> {

    let data = {
      code_societe:   this.tokenService.getCodeSociete(),
      code_exercice:  this.tokenService.getCodeExercice(),
      code_depotpv:   this.tokenService.getCodePointeVente()
    }
    return this.httpClient.post(`${this.REST_API}/all`,!req ? data : req , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetFiltreTickets(dataFiltre: any): Observable<any> {
    let data = dataFiltre;
    return this.httpClient.post(`${this.REST_API}/all`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  GetTicketByID(idTicket:string): Observable<any> {
    let data = {
      code_societe:   this.tokenService.getCodeSociete(),
      code_exercice:  this.tokenService.getCodeExercice(),
      code_depotpv:   this.tokenService.getCodePointeVente(),
      _id:idTicket
    }
    return this.httpClient.post(`${this.REST_API}`,data , this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Add
  AddNew(data: any): Observable<any> {
    let newdata:any = data

    newdata.code_societe  = this.tokenService.getCodeSociete()
    newdata.code_exercice = this.tokenService.getCodeExercice()
    newdata.code_depotpv  = this.tokenService.getCodePointeVente()

    newdata.pointVente    = this.tokenService.pointVenteCourante
    //newdata.date          = new Date()

    let getSess:any  = this.tokenService.getSessionCaisse()

    if(newdata.id_Ticket){
      newdata._id = newdata.id_Ticket
      return this.httpClient
        .put(`${this.REST_API}`, data, this.tokenService.getHeader())
        .pipe(catchError(this.tokenService.handleErrorWithParams()));
    }else{
      newdata.nomMachine            = getSess.nom_machine_caisse
      newdata.sessionCaisse._id     = getSess._id
      newdata.sessionCaisse.numero  = getSess.numero

      return this.httpClient
        .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
        .pipe(catchError(this.tokenService.handleErrorWithParams()));
    }


  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Ticket(items[key]))
    // }
    items.map((x:any) => {
      if(x.documentSuivant && x.documentSuivant.length > 0){
        let docBL = x.documentSuivant.find((y:any) => y.table == enum_nomTable.K_bonLivraisons)
        if(docBL) x.numeroBL = docBL.numero
      }
    })
    return items
  }



}
