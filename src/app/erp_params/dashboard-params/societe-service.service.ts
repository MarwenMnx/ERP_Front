import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';






@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  private apiUrl = environment.baseUrl + '/societe/societes2'; // Changez l'URL selon votre configuration

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  // Get all Nbr Societes
  getAllSocietes(): Observable<any> {
    let data = { code_societe: this.tokenService.getCodeSociete() };
    return this.httpClient.post(this.apiUrl, data, this.tokenService.getHeader())
  }
}


@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private apiUrl = environment.baseUrl + '/depotpv/countsociete';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getDepot(code_societe: string): Observable<any> {
    const newdata = { code_societe : code_societe.toLowerCase() };

    return this.http
      .post(`${this.apiUrl}/countdepot`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}



// CLIENT actif 
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getArticleActive(code: string) {
    throw new Error('Method not implemented.');
  }
  // Utilisez apiUrl ici si c'est ce que vous avez l'intention d'utiliser
  private apiUrl = environment.baseUrl + '/client/activeClients'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getCountActiveInactive(code_societe: string): Observable<any> {
    // Corrigez ici pour utiliser apiUrl
    let newdata:any = {}
    newdata.code_societe = code_societe.toLowerCase();

    console.log("LADJILAAAAAAAAAA", newdata, code_societe.toLowerCase(), this.tokenService.getHeader())
   return this.http
   .post(`${this.apiUrl}/countActiveInactive`, newdata, this.tokenService.getHeader())
   .pipe(catchError(this.tokenService.handleErrorWithParams()));

    // return this.http.post(`${this.apiUrl}/countActiveInactive`, {code_societe});
  }
}
// ARTICLES ACTIFS
@Injectable({
  providedIn: 'root'
})
export class articleService {
  // Utilisez apiUrl ici si c'est ce que vous avez l'intention d'utiliser
  private apiUrl = environment.baseUrl + '/article/activeArticle'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getArticleActive(code_societe: string): Observable<any> {
    // Corrigez ici pour utiliser apiUrl
    let newdata:any = {}
    newdata.code_societe = code_societe.toLowerCase();

    console.log("Idi Mani", newdata, code_societe.toLowerCase(), this.tokenService.getHeader())
   return this.http
   .post(`${this.apiUrl}/countActiveInactive`, newdata, this.tokenService.getHeader())
   .pipe(catchError(this.tokenService.handleErrorWithParams()));

    // return this.http.post(`${this.apiUrl}/countActiveInactive`, {code_societe});
  }
}

// service nombre de fournisseur
@Injectable({
  providedIn: 'root'
})
export class fournisseurService {
  // Utilisez apiUrl ici si c'est ce que vous avez l'intention d'utiliser
  private apiUrl = environment.baseUrl + '/fournisseur/fournisseur1'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getfournisseur(code_societe: string): Observable<any> {
    // Corrigez ici pour utiliser apiUrl
    let newdata:any = {}
    newdata.code_societe = code_societe.toLowerCase();

    console.log("ohhhh", newdata, code_societe.toLowerCase(), this.tokenService.getHeader())
   return this.http
   .post(`${this.apiUrl}/count`, newdata, this.tokenService.getHeader())
   .pipe(catchError(this.tokenService.handleErrorWithParams()));

    // return this.http.post(`${this.apiUrl}/countActiveInactive`, {code_societe});
  }
}

// chiffre d affaitre mensuel
@Injectable({
  providedIn: 'root'
})
export class ChiffreAffaireMonthService {
  private apiUrl = environment.baseUrl + '/chiffreaffaire_client';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getChiffreAffaire(month: number[], code_societe: string): Observable<any> {
    const data = {
      month: month,
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24"
    };
    return this.http.post(`${this.apiUrl}/all`, data, this.tokenService.getHeader())
               .pipe(
                 catchError(error => {
                   console.error('Error from API:', error);
                   return throwError(() => new Error('Custom error message'));
                 })
               );
  }
}

// chiffre d affaire region service
@Injectable({
  providedIn: 'root'
})
export class ChiffreAffaireService {
  private apiUrl = environment.baseUrl + '/chiffreaffaire_regionclient';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getChiffreAffaireRegion(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe === 'ALL' ? '' : code_societe.toLowerCase(),
      code_exercice: "24"
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Ajoutez d'autres en-têtes nécessaires ici
    });

    console.log('Request Data:', data);
    console.log('Request Headers:', headers);

    return this.http.post(`${this.apiUrl}/all`, data, this.tokenService.getHeader())
               .pipe(
                 catchError((error: HttpErrorResponse) => {
                   console.error('Error from API:', error.message);
                   return throwError(() => new Error('Custom error message: ' + error.message));
                 })
               );
  }
}



// chiffre d affaire global
@Injectable({
  providedIn: 'root'
})
export class chiffreaffaireService {
  private apiUrl = environment.baseUrl + '/chiffreaffaire_client';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getchiffreAffaire(codeSociete:
     string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24"
    };

    return this.http.post(`${this.apiUrl}/chif`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}

// top 10 client

@Injectable({
  providedIn: 'root'
})
export class Top10Service {
  private apiUrl = environment.baseUrl + '/chiffreaffaire_client'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTop10Client(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24"
    };
    return this.http.post(`${this.apiUrl}/getTOP_C`, data, this.tokenService.getHeader())
               .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}



// nombre de facture

@Injectable({
  providedIn: 'root'
})
export class factureService {
  private apiUrl = environment.baseUrl + '/facturevente'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getFacturesActives(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getsumF`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}

// devisclient 
// nombre de devis getdevis
@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = environment.baseUrl + '/devisclient';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getDevisBySociete(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };

    return this.http.post(`${this.apiUrl}/getdevis`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}
  
  

// total vente en ttc
@Injectable({
  providedIn: 'root'
})
export class venteService {
  private apiUrl = environment.baseUrl + '/bonlivraison';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getvente(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };

    return this.http.post(`${this.apiUrl}/getSum5`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}
  
// vente en nethtc
@Injectable({
  providedIn: 'root'
})
export class venteService1 {
  private apiUrl = environment.baseUrl + '/bonlivraison'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getvente1(): Observable<any> {
    const data = {
      code_societe: "s01",
      code_exercice: "24",
      code_depotpv: "pv01"
    };
  
    return this.http.post(`${this.apiUrl}/get1`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  
  
}

// top 10 article

@Injectable({
  providedIn: 'root'
})
export class Top10articleService {
  private apiUrl = environment.baseUrl + '/vente_article'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  gettop10article(): Observable<any> {
    const data = {
      code_societe: "s01",
      code_exercice: "24"
    };
    console.log("helloo");
    console.log(`${this.apiUrl}/Top10`);
    console.log("helloo22222222222");
    console.log(data);
    return this.http.post(`${this.apiUrl}/Top10`, data, this.tokenService.getHeader())
               .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://127.0.0.1:5000/recommendations';

  constructor(private http: HttpClient, private tokenService: TokenService ) { }

  getRecommendations(selectedDesignations: string[]): Observable<any> {
    const data = {
      selected_items: selectedDesignations
    };
    console.log(data);

    return this.http.post<any>(this.apiUrl, data, this.tokenService.getHeader());
  }
}


@Injectable({
  providedIn: 'root'
})
export class RecommendationService2 {
  private apiUrl = 'http://127.0.0.1:5000/recommend';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getRecommendationsWithProbability(selectedDesignations: string[]): Observable<any> {
    const data = {
      selected_items: selectedDesignations
    };
    return this.http.post<any>(this.apiUrl, data, this.tokenService.getHeader());
  }
}

// Bonlivraison
@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private apiUrl = environment.baseUrl + '/bonlivraison'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getlivraison(): Observable<any> {
    const data = {
      code_societe: "s01",
      code_exercice: "24",
      code_depotpv: "pv01"
    };
  
    return this.http.post(`${this.apiUrl}/getSumTTC5`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
  
  
}
// nombre de bon de livraison
@Injectable({
  providedIn: 'root'
})
export class bonlivraisonService {
  private apiUrl = environment.baseUrl + '/bonlivraison'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getlivraison(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getsumTTC5`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}

// Nombre des commande<:
@Injectable({
  providedIn: 'root'
})
export class commandeService {
  private apiUrl = environment.baseUrl + '/boncommandeclient'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getcommande(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getcommande`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}

// tottal retour en ttc
@Injectable({
  providedIn: 'root'
})
export class retourService {
  private apiUrl = environment.baseUrl + '/bonretourmarchandiseclient'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getretour(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getSumTTC3`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}
// TOTAL NETHT
@Injectable({
  providedIn: 'root'
})
export class retourService1 {
  private apiUrl = environment.baseUrl + '/bonretourmarchandiseclient'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getretour1(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getSum`, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }
}

// retour financier en ttc
@Injectable({
  providedIn: 'root'
})
export class retourService2 {
  private apiUrl = environment.baseUrl + '/bonretourfinancierclient'; // Assurez-vous que cette URL est correcte
 
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getretour2(codeSociete: string): Observable<any> {
    const data = {
      code_societe: codeSociete.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log('Données envoyées dans la requête HTTP :', data);


    return this.http.post(`${this.apiUrl}/getSumTTC9`, data, this.tokenService.getHeader())

  }
}
// coté Fournisseurs
// nombre des bonAchat

@Injectable({
  providedIn: 'root'
})
export class BonService {
  private apiUrl = environment.baseUrl + '/bonachat';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getBon(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    return this.http.post(`${this.apiUrl}/bon`, data, this.tokenService.getHeader())
               .pipe(
                 catchError(error => {
                   console.error('Error from API:', error);
                   return throwError(() => new Error('Custom error message'));
                 })
               );
  }
}

// 
@Injectable({
  providedIn: 'root'
})
export class FService {
  private apiUrl = environment.baseUrl + '/factureachat';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getFacture(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log(this.apiUrl, "ici4", code_societe);
    console.log('Sending data to API:', data); 
    return this.http.put(`${this.apiUrl}/facture`, data, this.tokenService.getHeader())
               .pipe(
                 catchError(error => {
                   console.error('Error from API:', error);
                   return throwError(() => new Error('Custom error message'));
                 })
               );
  }

  getAllFactures(): Observable<any[]> {
    const societes = ['S01', 'S02', 'S03', 'S04'];
    console.clear()
    console.log("ici3");
    const requests = societes.map(code_societe => this.getFacture(code_societe));
    console.log("ici5", requests);
    return forkJoin(requests);
  }
}
// 
@Injectable({
  providedIn: 'root'
})
export class CService {
  private apiUrl = environment.baseUrl + '/boncommandefournisseur';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getCommande(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    console.log(this.apiUrl, "ici4", code_societe);
    console.log('Sending data to API:', data); 
    return this.http.post(`${this.apiUrl}/commande`, data, this.tokenService.getHeader())
               .pipe(
                 catchError(error => {
                   console.error('Error from API:', error);
                   return throwError(() => new Error('Custom error message'));
                 })
               );
  }

  getAllCommande(): Observable<any[]> {
    const societes = ['S01', 'S02', 'S03', 'S04'];
    console.clear()
    console.log("ici3");
    const requests = societes.map(code_societe => this.getCommande(code_societe));
    console.log("ici5", requests);
    return forkJoin(requests);
  }
}
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}



// nombre bon AchatFournisseur
@Injectable({
  providedIn: 'root'
})
export class achatService {
  downloadPdf() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.baseUrl + '/bonachat';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getachat(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    return this.http.post(`${this.apiUrl}/bon`, data, this.tokenService.getHeader())
      .pipe(
        catchError(error => {
          console.error('Error from API:', error);
          return throwError(() => new Error('Custom error message'));
        })
      );
  }

  getAllAchat(): Observable<any[]> {
    const societes = ['s01', 's02', 's03', 's04'];
    const requests = societes.map(code_societe => this.getachat(code_societe).pipe(
      catchError(error => {
        console.error(`Error fetching data for ${code_societe}:`, error);
        return of({ code_societe: code_societe, RESULTAT: [] });
      })
    ));
    return forkJoin(requests);
  }
}
// nombre bon retour financier fournisseur
@Injectable({
  providedIn: 'root'
})
export class retourFService {
  downloadPdf() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.baseUrl + '/bonretourfinancierfournisseur';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getretour(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    return this.http.put(`${this.apiUrl}/retour`, data, this.tokenService.getHeader())
      .pipe(
        catchError(error => {
          console.error('Error from API:', error);
          return throwError(() => new Error('Custom error message'));
        })
      );
  }

  getAllretour(): Observable<any[]> {
    const societes = ['s01', 's02', 's03', 's04'];
    const requests = societes.map(code_societe => this.getretour(code_societe).pipe(
      catchError(error => {
        console.error(`Error fetching data for ${code_societe}:`, error);
        return of({ code_societe: code_societe, RESULTAT: [] });
      })
    ));
    return forkJoin(requests);
  }
}

// bonRetour
@Injectable({
  providedIn: 'root'
})
export class retourMService {
  downloadPdf() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.baseUrl + '/bonretourmarchandisefournisseur';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getretourM(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    return this.http.put(`${this.apiUrl}/retour`, data, this.tokenService.getHeader())
      .pipe(
        catchError(error => {
          console.error('Error from API:', error);
          return throwError(() => new Error('Custom error message'));
        })
      );
  }

  getAllretourM(): Observable<any[]> {
    const societes = ['s01', 's02', 's03', 's04'];
    const requests = societes.map(code_societe => this.getretourM(code_societe).pipe(
      catchError(error => {
        console.error(`Error fetching data for ${code_societe}:`, error);
        return of({ code_societe: code_societe, RESULTAT: [] });
      })
    ));
    return forkJoin(requests);
  }
}

// nombre de devis
@Injectable({
  providedIn: 'root'
})
export class devisfService {
  downloadPdf() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.baseUrl + '/devisfournisseur';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getdevis(code_societe: string): Observable<any> {
    const data = {
      code_societe: code_societe.toLowerCase(),
      code_exercice: "24",
      code_depotpv: "pv01"
    };
    return this.http.put(`${this.apiUrl}/devis`, data, this.tokenService.getHeader())
      .pipe(
        catchError(error => {
          console.error('Error from API:', error);
          return throwError(() => new Error('Custom error message'));
        })
      );
  }

  getAlldevis(): Observable<any[]> {
    const societes = ['s01', 's02', 's03', 's04'];
    const requests = societes.map(code_societe => this.getdevis(code_societe).pipe(
      catchError(error => {
        console.error(`Error fetching data for ${code_societe}:`, error);
        return of({ code_societe: code_societe, RESULTAT: [] });
      })
    ));
    return forkJoin(requests);
  }
}



