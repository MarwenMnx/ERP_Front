export class Marque {
    _id?: string;
    libelle: string;

    constructor(marque: any) {
      this._id = marque._id;
      this.libelle = marque.libelle;
    }
  }

export interface IMarque{
  _id: string | null;
  libelle: string | null;

}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


