// import { Famille } from "src/app/erp_params/familles/models/famille.model";


export class SousTypeVehicule {
    _id: string;
    libelle: string;  
    type_vehicule:string;  
    // famille:Famille;
  
    constructor(soustypevehicule?: any) {
      this._id = soustypevehicule?._id || ''; 
      this.libelle = soustypevehicule?.libelle || '';
      this.type_vehicule = soustypevehicule?.type_vehicule || '';
      // this.famille = modèle?.famille || '';
     }
  }

export interface ISousTypeVehicule{
  _id: string | null;
  libelle: string | null; 
  type_vehicule: string | null; 
  // SocieteRacine: string | null;  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

