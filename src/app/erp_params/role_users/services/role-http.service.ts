import { Injectable } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {environment} from "../../../../environments/environment";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Role} from "../models/role.model";
import {ReponseList} from "../../clients/models/client.model";
import {showAlertError} from "../../../global-functions";
import {Banque} from "../../banque/models/banque.model";

@Injectable({
  providedIn: 'root'
})
export class RoleHttpService {

  REST_API = environment.baseUrl+'/role';

  // Http Header
  constructor(private httpClient: HttpClient, private tokenService:TokenService) {
  }

// Get all rôles
  GetAll(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/all` ,this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  AddNew(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined

    return this.httpClient
      .post(`${this.REST_API}/new`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  roleByUser(data: any): Observable<any> {
    let newdata:any = data
    // newdata._id = _idUsr // id utilisateur
    /*
    cet api recupere les rôle selon l'id_user
    Si AdminBongest alors il renvoi tous les rôle
    sinon si superadminGroup , il renvoie les autres rôles sauf AdminBongest et son rôle
    sinon si adminSociete , renvoie les autres simple roles (sauf adminBongest & adminGroup & adminSociete)
     */
    return this.httpClient
      .post(`${this.REST_API}/byuser`, newdata, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Update
  update(data: any): Observable<any> {
    let newdata:any = data
    newdata.code_societe = this.tokenService.getCodeSociete()

    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data, this.tokenService.getHeader())
      .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetDetails(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, this.tokenService.getHeader()).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.tokenService.handleErrorWithParams())
    );
  }

  successGetDetails(res:ReponseList, form:any, defaults:any){
    if(res.OK){
      defaults = res.RESULTAT
      form.patchValue(defaults as any);
    }else{
      showAlertError('Erreur!', res.RESULTAT);
    }
  }

  checkPrivilegeAccess(idModule:string){
     let listOfRoles:any =  this.tokenService.getPrivilegeAccess()
    // return listOfRoles.includes('admin')
    let modules = [
      {
        "id": "donnes_de_base",
        "name": "DONNEES DE BASE",
        "checked": true,
        "niveau": [
          {
            "id": "produits",
            "name": "Produits",
            "checked": true,
            "niveau": [
              {
                "id": "produits_list",
                "name": "List",
                "checked": true
              },
              {
                "id": "produits_add",
                "name": "Ajouter produit",
                "checked": true
              },
              {
                "id": "produits_update",
                "name": "Modifier produit",
                "checked": true
              },
              {
                "id": "produits_promotion_remise",
                "name": "Promotion remise",
                "checked": true,
                "niveau": [
                  {
                    "id": "promotion_remise_list",
                    "name": "List",
                    "checked": true
                  },
                  {
                    "id": "promotion_remise_add",
                    "name": "Ajouter",
                    "checked": true
                  }
                ]
              }
            ]
          },
          {
            "id": "clients",
            "name": "Clients",
            "checked": true,
            "niveau": [
              {
                "id": "clients_list",
                "name": "List",
                "checked": true
              },
              {
                "id": "clients_add",
                "name": "Ajouter client",
                "checked": true
              },
              {
                "id": "clients_update",
                "name": "Modifier client",
                "checked": true
              }
            ]
          },
          {
            "id": "fournisseurs",
            "name": "Fournisseurs",
            "checked": true,
            "niveau": [
              {
                "id": "fournisseurs_list",
                "name": "List",
                "checked": true
              },
              {
                "id": "fournisseurs_add",
                "name": "Ajouter fournisseur",
                "checked": true
              },
              {
                "id": "fournisseurs_update",
                "name": "Modifier fournisseur",
                "checked": true
              }
            ]
          },
          {
            "id": "quantiteInitial",
            "name": "Quantité - Initiale",
            "checked": true
          },
          {
            "id": "parametrageImportations",
            "name": "Paramétrer les importations",
            "checked": true
          },
          {
            "id": "importations",
            "name": "Importations",
            "checked": true
          }
        ],
        "_id": "6627783dd69be621911457a8"
      },
      {
        "id": "pos_vente",
        "name": "POS - VENTE",
        "checked": true,
        "niveau": [
          {
            "id": "erp_pos_caisse",
            "name": "Caisse - Vente",
            "checked": true,
            "niveau": [
              {
                "id": "pos_validation_sans_payement",
                "name": "Validation Sans Payement",
                "checked": true
              },
              {
                "id": "pos_validation_payement_partiel",
                "name": "Validation Avec Payement Partiel",
                "checked": true
              },
              {
                "id": "pos_genaration_bon_livraison",
                "name": "Génération bon livraison",
                "checked": true
              },
              {
                "id": "pos_cloture_caisse",
                "name": "Clôture caisse",
                "checked": true
              },
              {
                "id": "pos_list_plan",
                "name": "Liste des plans",
                "checked": true
              },
              {
                "id": "pos_pavee_num",
                "name": "Pavé numerique",
                "checked": true
              }
            ]
          },
          {
            "id": "erp_pos_tickets",
            "name": "Tickets",
            "checked": true,
            "niveau": [
              {
                "id": "pos_tickets_list",
                "name": "Tickets",
                "checked": true
              },
              {
                "id": "pos_tickets_imprimer",
                "name": "Imprimer",
                "checked": true
              }
            ]
          },
          {
            "id": "erp_pos_reglements",
            "name": "Règlements",
            "checked": true,
            "niveau": [
              {
                "id": "pos_reglement_list",
                "name": "Règlements",
                "checked": true
              }
            ]
          }
        ],
        "_id": "6627783dd69be621911457a9"
      },
      {
        "id": "1.1",
        "name": "Document Achat",
        "checked": true,
        "niveau": [
          {
            "id": "1.1.1",
            "name": "Bon de reception",
            "checked": true,
            "niveau": [
              {
                "id": "1.1.1.1",
                "name": "List",
                "checked": true
              },
              {
                "id": "1.1.1.2",
                "name": "Ajouter BR",
                "checked": true
              },
              {
                "id": "1.1.1.3",
                "name": "Modifier BR",
                "checked": true
              }
            ]
          },
          {
            "id": "1.1.2",
            "name": "Bon Achat",
            "checked": true,
            "niveau": [
              {
                "id": "1.1.2.1",
                "name": "List",
                "checked": true
              },
              {
                "id": "1.1.2.2",
                "name": "Ajouter BA",
                "checked": true
              },
              {
                "id": "1.1.2.3",
                "name": "Modifier BA",
                "checked": true
              }
            ]
          },
          {
            "id": "1.1.3",
            "name": "test 3 (DGP) IgG",
            "checked": true
          }
        ],
        "_id": "6627783dd69be621911457aa"
      },
      {
        "id": "2.1",
        "name": "Document Vente",
        "checked": true,
        "niveau": [
          {
            "id": "2.1.1",
            "name": "Caisse - Vente",
            "checked": true,
            "niveau": [
              {
                "id": "2.1.1.1",
                "name": "Valider Sans Paiement",
                "checked": true
              },
              {
                "id": "2.1.1.2",
                "name": "Annuler vente",
                "checked": true
              }
            ]
          },
          {
            "id": "2.1.2",
            "name": "test 2  (DGP) IgG",
            "checked": true
          },
          {
            "id": "2.1.3",
            "name": "test 3  (DGP) IgG",
            "checked": true
          }
        ],
        "_id": "6627783dd69be621911457ab"
      }
    ]
    // console.log("********checkPrivilegeAccess111**********"+idModule)
    // console.log(listOfRoles)
    // console.log("********checkPrivilegeAcces22222**********")
    return listOfRoles.includes(idModule)
  }

  getData(items:any) {
    // let newItems = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Role(items[key]))
    // }
    return items
  }

}
