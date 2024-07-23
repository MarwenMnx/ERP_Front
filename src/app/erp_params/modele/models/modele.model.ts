import { Famille } from "../../familles/models/famille.model";


export class Modèle {
    _id: string;
    libelle: string;  
    marque:string;  
    // famille:Famille;
  
    // societeRacine:string;

     constructor(modèle?: any) {
      this._id = modèle?._id || ''; 
      this.libelle = modèle?.libelle || '';
      this.marque = modèle?.marque || '';
      // this.famille = modèle?.famille || '';
    
      // this.societeRacine = famille.societeRacine;
    }
  }

export interface IModèle{
  _id: string | null;
  libelle: string | null; 
  marque: string | null; 
  // SocieteRacine: string | null;  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

