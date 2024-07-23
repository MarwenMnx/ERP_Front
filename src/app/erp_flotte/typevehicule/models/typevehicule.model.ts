export class TypeVehicule {
    _id?: string;
    libelle: string;
  

    constructor(plan: any) {
      this._id = plan._id;
      this.libelle = plan.libelle;
  
    }
  }

export interface ITypeVehicule{
  _id: string | null;
  libelle: string | null;

}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


