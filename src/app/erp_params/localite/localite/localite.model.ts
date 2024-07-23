
export class Localite {
  _id?: string;
  libelle: String;
  codePostal: String;
  delegation: {
    _id: String,
    libelle: String
}
  constructor(localite: any) {
    this._id = localite._id;
    this.libelle = localite.libelle;
    this.codePostal = localite.codePostal;
    this.delegation = localite.delegation;
  }
}

export interface Loucalite{
  _id: string | null;
  libelle: string | null;
  delegation: string | null ;
}

export interface ReponseList{
MESSAGE:string;
OK: Boolean;

RESULTAT:any
}
