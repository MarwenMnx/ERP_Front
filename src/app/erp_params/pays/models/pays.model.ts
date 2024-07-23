export class Pays {
    _id?: string;
    libelle: string;

    constructor(pays: any) {
      this._id = pays._id;
      this.libelle = pays.libelle;
    }
  }

export interface IPays{
  _id: string | null;
  libelle: string | null;

}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


