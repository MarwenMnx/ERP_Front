export class Type_caisses {
    _id?: string;
    libelle: string;


    constructor(type_caisses: any) {
      this._id      = type_caisses._id;
      this.libelle  = type_caisses.libelle;
    }
  }

export interface IType_caisses {
  _id: string | null;
  libelle: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


