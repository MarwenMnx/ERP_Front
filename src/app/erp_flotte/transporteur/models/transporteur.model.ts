export class Transporteur {
    _id?: string;
    nom: string;
    numVehicule: string;
    gsm: string;
    tel: string;
    email: string;

    constructor(transporteur: any) {
      this._id = transporteur._id;
      this.nom = transporteur.nom;
      this.numVehicule = transporteur.numVehicule;
      this.gsm = transporteur.gsm;
      this.tel = transporteur.tel;
      this.email = transporteur.email;


    }
  }

export interface ITransporteur{
  _id: string | null;
  nom: string | null;
  numVehicule:string | null;
  gsm:string | null;
  tel:string | null;
  email:string | null;


  // estMagazin:true | false;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


