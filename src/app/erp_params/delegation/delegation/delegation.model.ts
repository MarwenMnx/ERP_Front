
export class Delegation {
  _id?: string;
  libelle: string;
  code_societe:string;
  gouvernorat: {
    _id: String,
    libelle: String
  }

  constructor(delegation: any) {
    this._id = delegation._id;
    this.libelle = delegation.libelle;
    this.code_societe = delegation.code_societe;
    this.gouvernorat = delegation.gouvernorat;
  }
}

export interface IDelegation{
  _id: string | null;
  libelle: string | null;
  code_societe: string | null;
  gouvernorat: string | null ;
}


export interface ReponseList{
MESSAGE:string;
OK: Boolean;

RESULTAT:any
}
