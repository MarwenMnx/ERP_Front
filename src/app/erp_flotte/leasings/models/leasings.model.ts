export class Leasings {
    _id?: string;
    matricule_fiscale: string;
    raison_sociale: String;

    constructor(leasings: any) {
      this._id = leasings._id;
      this.matricule_fiscale = leasings.matricule_fiscale;
      this.raison_sociale = leasings.raison_sociale;

    }
  }

export interface ILeasings{
  _id: string | null;
  matricule_fiscale: string | null;
  raison_sociale: string | null;


}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


