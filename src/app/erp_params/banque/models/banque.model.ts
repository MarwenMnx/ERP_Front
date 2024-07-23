import { CompteBancaires } from "../../compteBancaires/models/compteBancaires.model";

export class Banque {
    _id?: string;
    libelle: string;
    abreviation:string;

    constructor(banque: any) {
      this._id = banque._id;
      this.libelle = banque.libelle;
      this.abreviation = banque.abreviation;
    }
  }

export interface IBanque{
  _id: string | null;
  libelle: string | null;
  abreviation: string | null;
  SocieteRacine: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}

export interface IBanqueCollection{
  _id: string,
  libelle: string,
  abreviation: string,
  code_societe: string,
  compteBancaires:CompteBancaires[] 
}


