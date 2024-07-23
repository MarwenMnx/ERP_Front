import {Product} from "../../products/models/product.model";

export class Depot {
    _id?: string;
    libelle: string;
    adresse:string;
    telephone: string;
    responsable:string;
    notes:string;
    email:string;
    type:number;
    ayant_acces:Depot[];
    lignes:Product[];
    code_unique: string | undefined;
    est_actif:Boolean;
    header_ticket: string;
    footer_ticket: string;
    // estMagazin:boolean;

    constructor(depot: any) {
      this._id = depot._id || '';
      this.libelle = depot.libelle || '';
      this.adresse = depot.adress || '';
      this.telephone = depot.telephone || '';
      this.responsable = depot.responsable || '';
      this.notes = depot.notes || '';
      this.email = depot.email || '';
      this.type = depot.type || '';
      this.ayant_acces          = depot.ayant_acces || '';
      this.code_unique          = depot.code_unique || '';
      this.lignes               = depot.lignes || '';
      this.est_actif            = depot.est_actif || true;
      this.header_ticket        = depot.header_ticket || '';
      this.footer_ticket        = depot.footer_ticket || '';
      // this.estMagazin = depot.estMagazin;
    }
  }

export interface IDepot{
  _id: string | null;
  libelle: string | null;
  adresse:string | null;
  telephone: string | null;
  responsable:string | null;
  notes:string | null;
  email:string | null;
  type:string | null;

  // estMagazin:true | false;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


