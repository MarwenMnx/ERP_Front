import {Product} from "../../products/models/product.model";
import {Depot} from "../../depot/models/depot.model";
import {Unite} from "../../unite/modeles/unite.model";

export class Ticket {
  _id?:               string;
  numero:             string;
  nomMachine:         string;
  lignes:             lignes[];//listArticle:PeriodicElement[];
  client:         any;
  sessionCaisse:  any;
  totalAchat:     number;
  totalHT:        number;
  totalTTC:       number;
  totalPayement:  number;
  totalRendu:     number;
  totalReste:     number;
  date:           Date;
  nomUtilisateur?:string
  numeroBL?:string
  //listPayements:  set_ModePayement[];

    //code_depotpv: string;

    constructor(ticket: any) {
      this._id                = ticket._id         ;
      this.numero             = ticket.numero      ;
      this.nomMachine         = ticket.nomMachine  ;
      this.lignes             = ticket.lignes  ;
      this.client             = ticket.client      ;
      this.sessionCaisse      = ticket.sessionCaisse;
      this.nomUtilisateur      = ticket.sessionCaisse.utilisateur_caissier?.nom ? ticket.sessionCaisse.utilisateur_caissier?.nom : '' ;
      this.totalAchat         = ticket.totalAchat     ;
      this.totalHT            = ticket.totalHT     ;
      this.totalPayement      = ticket.totalPayement     ;
      this.totalRendu         = ticket.totalRendu     ;
      this.totalReste         = ticket.totalReste     ;
      this.date               = ticket.date     ;
      this.totalTTC           = ticket.totalTTC     ;
      // this.montantTotal       = ticket.montantTotal;
      // this.montantPaye        = ticket.montantPaye ;
      // this.ligneTicket        = ticket.ligneTicket ;
    }
  }

export interface lignes {
  article : Product;
  depotpv : Depot;
  reference:    string;
  designation:  string;
  quantite:     number;
  unite:        Unite;
  pu_ttc:       number;
  total:        number;
  pu_ht:        number;
  quantiteUnite1:number;
  quantiteUnite2:number;
  remise:       string;
  remiseMontant :      number;
  totalRemise:number;
  montant_Total_DC:number;
  montant_Total_FODEC : number;
  totalBrutHT:number;
  totalNetHT:number;
  taux_TVA_Applique: number;
  montant_unitaire_TVA: number;
  montant_Total_TVA: number;
  totalRedevance:number;
  gain_unitaire:number;
  gain_Total : number;
}
export interface ITicket{
  _id:                string | null;
  numero:             string | null;
  nomMachine:         string | null;
  client:             string | null;
  sessionCaisse:      string | null;
  totalHT:            number | null;
  montantTotal:       number | null;
  montantPaye:        number | null;
  ligneTicket:        string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


