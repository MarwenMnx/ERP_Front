// import { Famille } from "src/app/erp_params/familles/models/famille.model";


export class ModèleVehicule {
    _id: string;
    libelle: string;  
    marque_vehicule:string;  
    // famille:Famille;
  
    constructor(modèlevehicule?: any) {
      this._id = modèlevehicule?._id || ''; 
      this.libelle = modèlevehicule?.libelle || '';
      this.marque_vehicule = modèlevehicule?.marque_vehicule || '';
      // this.famille = modèle?.famille || '';
     }
  }

export interface IModèleVehicule{
  _id: string | null;
  libelle: string | null; 
  marque_vehicule: string | null; 
  // SocieteRacine: string | null;  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

