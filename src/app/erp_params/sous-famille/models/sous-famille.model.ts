import { Famille } from "../../familles/models/famille.model";

export class SousFamille {
    _id?: string;
    libelle?: string;  
    // categorie:string;  
    // societeRacine:string;
    famille:Famille;

    
    constructor(sousfamille: any) {
      this._id = sousfamille._id;
      this.libelle = sousfamille.libelle;
      this.famille = sousfamille.famille;
      // this.famille = sousfamille.famille;
      // this.categorie = sousfamille.categorie ? famille.categorie.libelle: "-";
       // this.societeRacine = famille.societeRacine;
    }
  }

export interface ISousFamille{
  _id: string | null;
  libelle: string | null; 
  famille: string | null ;
 
  // SocieteRacine: string | null;  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

