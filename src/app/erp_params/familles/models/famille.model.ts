import { Categorie } from 'src/app/erp_params/categories/models/categorie.model';
export class Famille {
    _id?: string;
    libelle?: string;  
    categorie:Categorie;  
    // societeRacine:string;

    
    constructor(famille: any) {
      this._id = famille._id;
      this.libelle = famille.libelle;
      //this.categorie = famille.categorie ? famille.categorie.libelle: "-";
      this.categorie = famille.categorie;
    
      // this.societeRacine = famille.societeRacine;
    }
  }

export interface IFamille{
  _id: string | null;
  libelle: string | null; 
  categorie: string | null; 
  // SocieteRacine: string | null;  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

