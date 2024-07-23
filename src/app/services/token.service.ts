import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Interface } from 'readline';
import { erreurAlerteAvecTimer, erreurToast, showAlertError } from '../global-functions';
import { throwError } from 'rxjs';
import {Sessions_caisse} from "../erp_caisse/sessions-caisses/models/sessions-caisses.model";
import { Societe } from '../erp_params/societe/models/societe.model';
import { Role } from '../erp_params/role_users/models/role.model';

const TOKEN_KEY = 'auth-token';
const SOCIETE_COURANTE_KEY          = 'SOCIETE_COURANTE_KEY';
const POINTVENTE_COURANTE_KEY       = 'POINTVENTE_COURANTE_KEY';
const EXERCICE_COURANTE_KEY         = 'EXERCICE_COURANTE_KEY';
const SESSION_CAISSE_COURANTE_KEY   = 'SESSION_CAISSE_COURANTE_KEY';
const ROLE_ACCESS_KEY               = 'ROLE_ACCESS_KEY';
const PARAMS_GENERAL_KEY            = 'PARAMS_GENERAL';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const USER_PSEUDO_KEY   = 'auth-pseudo';
const USER_KEY          = 'auth-user';
const LOGO              = "logo"
const USER_ROLE         = 'auth-role';
const ROLE_SUPER_ADMIN  = '14sqqs78za879899899';
const DISPLAYCAISSEANDSESSIONCAISSEADMIN = "DisplayCaisseANDSessionCaisseLikeAdmin"
const lISTROLECAISSE                      = "listRoleCaisse"

const lISTROLESESSIONCAISSE = "listRoleSessionCaisse"

const PREFIX_GRP            = "PREFIX_GRP"

export interface SocieteLogin{
  _id: string | null;
  raisonSociale: string | null;
  code_unique: string | null;
  role: string | null;
  role_libelle: string | null;
  pointeVentes: PointVente[];
  excercices:   Excercice[];
}

export interface Excercice{
  _id: string | null;
  code_unique: string | null;
  annee_exercice: string | null;
  timbreFiscale: string | null;
}

export interface PointVente{
  _id: string | null;
  code_unique: string | null;
  libelle: string | null;
}

export interface UserLogin{
  _id: string | undefined;
  nom: string | undefined;
  email: string | undefined;
  societes: SocieteLogin[];
}

export interface session_caisse{
  sessionCaisse: Sessions_caisse
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.token = localStorage.getItem(TOKEN_KEY) as string;
    if(this.token){
      let user:any = localStorage.getItem(USER_KEY)
      this.user = JSON.parse(user) as UserLogin;
      this.refreshToken   = localStorage.getItem(REFRESH_TOKEN_KEY) as string;
      let societe:any     = localStorage.getItem(SOCIETE_COURANTE_KEY)
      let point_vente:any = localStorage.getItem(POINTVENTE_COURANTE_KEY)
      let exercice:any    = localStorage.getItem(EXERCICE_COURANTE_KEY)
      let session_caisse:any    = localStorage.getItem(SESSION_CAISSE_COURANTE_KEY)
      let role_access:any    = localStorage.getItem(ROLE_ACCESS_KEY)
      let params_general:any    = localStorage.getItem(PARAMS_GENERAL_KEY)
      let prefix_grp_cur:any    = localStorage.getItem(PREFIX_GRP)
      this.societeCourante    = JSON.parse(societe)
      this.pointVenteCourante = JSON.parse(point_vente)
      this.exerciceCourante   = JSON.parse(exercice)
      this.sessionCaisseCourante  = session_caisse!=undefined ?  JSON.parse(session_caisse) : ''
      this.roleAcccessCourante= JSON.parse(role_access)
      this.paramsGeneral      = JSON.parse(params_general)
      this.prefix_grp         = prefix_grp_cur
    }
  }


  private tokenExpired(token: string) {
    try {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch (e) {
      return true;
    }
  }

  public signOut() {
    localStorage.clear()
    this.token = "";
    this.refreshToken = ""
    this.exercice = null
    this.user= null
    this.point_vente= null
    this.societeCourante= null
    this.pointVenteCourante= null
    this.exerciceCourante= null
    let prefix_grp :any =  this.getPrefix_Grp()+'/login'
    this.router.navigate(prefix_grp);
    // this.router.navigate(["/login"]);
  }

  token         = "";
  refreshToken  = "";
  prefix_grp    = "";
  dashboard     = "client";

  user!:UserLogin | null;
  exercice!:Excercice | null
  point_vente!:PointVente | null

  societeCourante:Societe | any = null
  pointVenteCourante:any
  exerciceCourante:any
  sessionCaisseCourante:any
  roleAcccessCourante:any
  paramsGeneral:any

  public getSessionCaisse(): void {
    let result = this.sessionCaisseCourante ? this.sessionCaisseCourante : null;
    return result
  }

  public getCodeSociete(): string {
    let result = this.societeCourante ? this.societeCourante.code_unique : '';
    return result
  }

  public getSocieteRacine(): string | undefined{
    let result = this.societeCourante ? this.societeCourante._id : '';
    return result
  }

  public getRole(): Role | string | undefined {
    let result = this.societeCourante ? this.societeCourante.role : '';
    return result
  }

  public getParamsGeneral(): string | undefined {
    let result = this.paramsGeneral ? this.paramsGeneral : '';
    return result
  }

  public getCodePointeVente(): string {
    let result = this.pointVenteCourante ? this.pointVenteCourante.code_unique : '';
    return result
  }

  public getCodeExercice(): string {
    let result = this.exerciceCourante ? this.exerciceCourante.code_unique : '';
    return result
  }

  public getPrefix_Grp(): string {
    let result = this.prefix_grp ? this.prefix_grp : '';
    return result
  }

  public saveSessionCaisseCourante(sessionCaisseCourante: any): void {
    this.sessionCaisseCourante = sessionCaisseCourante;
    localStorage.setItem(SESSION_CAISSE_COURANTE_KEY, JSON.stringify(this.sessionCaisseCourante));
  }

  public saveSocieteCourante(societeCourante: any): void {
    this.societeCourante = societeCourante;
    this.setPrivilegeAccess()
    localStorage.setItem(SOCIETE_COURANTE_KEY, JSON.stringify(this.societeCourante));
  }

  public savePointVenteCourante(pointVenteCourante: any): void {
    this.pointVenteCourante = pointVenteCourante;
    localStorage.setItem(POINTVENTE_COURANTE_KEY, JSON.stringify(this.pointVenteCourante));
  }

  public saveExerciceCourante(exerciceCourante: any): void {
    this.exerciceCourante = exerciceCourante;
    localStorage.setItem(EXERCICE_COURANTE_KEY, JSON.stringify(this.exerciceCourante));
  }

  public saveParamsGeneral(params_general: any): void {
    this.paramsGeneral = params_general;
    localStorage.setItem(PARAMS_GENERAL_KEY, JSON.stringify(this.paramsGeneral));
  }

  public saveUser(user: any): void {
    this.user = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, token);
    this.setHeader()
  }

  public saveRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public savePrefix_Grp(prefix_grp: string): void {
    this.prefix_grp = prefix_grp;
    localStorage.setItem(PREFIX_GRP, prefix_grp);
  }

  public getToken(): string | null {
    if (!this.isConnected()) {
      return null
    }

    return this.token;
  }

  public getTokenFromLocalStorage() {
    return this.token;
  }

  public isConnected() {
    if (!this.token || this.token=="") return false;
    return true;
  }

  header:any
  setHeader(){

  }

  getHeader() {
    const token:any = this.getToken();
    if (!token) {
      this.signOut();
      erreurToast("Vous n'êtes pas autorisé(e) à faire cela.");
      // If the token is null or undefined, throw an error
      return throwError(new Error('Token is null or undefined'));
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('x-refresh', `${this.refreshToken}`)
      .set('prefix_grp', `${this.prefix_grp}`);

    this.header = {
      headers: headers,
    };

    return this.header;
  }

  getHeaderLogin() {

    const headers = new HttpHeaders()
      .set('prefix_grp', `${this.prefix_grp}`);

    this.header = {
      headers: headers,
    };

    return this.header;
  }


  handleErrorWithParams(errorParam?: string) {

    return (error: any) => {

      try{
        if(error.error && error.error.RESULTAT && error.error.MESSAGE)
          showAlertError(error.error.MESSAGE, error.error.RESULTAT);
        else if(error.error && error.error.RESULTAT)
          showAlertError('Erreur!', error.error.RESULTAT);
        else if(error.error && error.error.MESSAGE)
          showAlertError('Erreur!', error.error.MESSAGE);
        else if(error.error && error.status === 403){
          erreurToast("Le token que vous avez utilisé est expiré.");
          this.signOut()
        }
      }catch(e){
        showAlertError('Erreur!', '');
      }

      return throwError('Custom error message');

    };

  }

  public getPrivilegeAccess(): void {
    let result = this.roleAcccessCourante ? this.roleAcccessCourante : '';
    return result
  }
  setPrivilegeAccess(){
    let listOfRoles:any = this.societeCourante?.role && this.societeCourante?.role ? this.societeCourante.role.modules : null
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
                "id": "pos_charge_caisse",
                "name": "Charge caisse",
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
    // Call the function with your modules
    const roleAcccessCourante: string[] = this.getAllIds(listOfRoles);

    this.roleAcccessCourante = roleAcccessCourante;
    console.log("********************roleAcccessCourante********************");
    console.log(this.roleAcccessCourante);
    console.log("***************************roleAcccessCourante*************************");
    localStorage.setItem(ROLE_ACCESS_KEY, JSON.stringify(this.roleAcccessCourante));
  }

  getAllIds(modules: any): string[] {
    const topLevelIds: string[] = [];

    modules.forEach((module:any) => {
      if (module.checked) {
        topLevelIds.push(module.id);
        if (module.niveau) {
          module.niveau.forEach((childModule:any) => {
            if (childModule.checked) {
              topLevelIds.push(childModule.id);
              if (childModule.niveau) {
                childModule.niveau.forEach((childModule2:any) => {
                  if (childModule2.checked) {
                    topLevelIds.push(childModule2.id);
                    if (childModule2.niveau) {
                      childModule2.niveau.forEach((childModule3:any) => {
                        if (childModule3.checked) {
                          topLevelIds.push(childModule3.id);
                        }
                      });
                    }

                  }
                });
              }
            }
          });
        }
      }
    });

    return topLevelIds;
  }


}
