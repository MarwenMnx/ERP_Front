export class Categorie {
    _id?: string;
    libelle: string;

    constructor(categorie: any) {
      this._id = categorie._id;
      this.libelle = categorie.libelle;
    }
  }

export interface ICategorie{
  _id: string | null;
  libelle: string | null;
  SocieteRacine: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


