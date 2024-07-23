export class Type_charges {
    _id?: string;
    libelle: string;


    constructor(type_charges: any) {
      this._id = type_charges._id;
      this.libelle = type_charges.libelle;
    }
  }

export interface IType_charges {
  _id: string | null;
  libelle: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


