// import { Famille } from "src/app/erp_params/familles/models/famille.model";

export class Chauffeur {
  _id?:         string;
  nom:          string;
  numVehicule:  string;
  gsm:          string;
  tel:          string;
  email:        string;

  constructor(chauffeur: any) {
    this._id          = chauffeur._id;
    this.nom          = chauffeur.nom;
    this.numVehicule  = chauffeur.numVehicule;
    this.gsm          = chauffeur.gsm;
    this.tel          = chauffeur.tel;
    this.email        = chauffeur.email;


  }
}

export interface IChauffeur{
  _id:        string | null;
  nom:        string | null;
  numVehicule:string | null;
  gsm:        string | null;
  tel:        string | null;
  email:      string | null;


  // estMagazin:true | false;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


