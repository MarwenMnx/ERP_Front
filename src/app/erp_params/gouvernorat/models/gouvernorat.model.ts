
export class Gouvernorat {
    _id?: string;
    libelle?: string;
    pays: {
      _id: String,
      libelle: String
  }
    constructor(objet: any) {
      this._id = objet._id;
      this.libelle = objet.libelle;
      this.pays = objet.pays;
    }
  }

export interface IGouvernorat{
  _id: string | null;
  libelle: string | null;
  pays: string | null ;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}
