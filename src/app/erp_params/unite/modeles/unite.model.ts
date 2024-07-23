export class Unite {
    _id?: string;
    libelle: string;
    code:string;

    constructor(unite: any) {
      this._id = unite._id;
      this.libelle = unite.libelle;
      this.code = unite.code;
    }
  }

export interface IUnite{
  _id: string | null;
  libelle: string | null;
  code: string | null;
  SocieteRacine: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


