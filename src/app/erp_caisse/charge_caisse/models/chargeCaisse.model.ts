import {Sessions_caisse} from "../../sessions-caisses/models/sessions-caisses.model";
import {Type_charges} from "../../../erp_params/type-charges/models/type-charges.model";



export class ChargeCaisse {

  _id?:               string;
  numero:             string;
  date:               Date;
  montant:            number;
  motif:              string;
  beneficiaireInterne:beneficiaireInterne | null ;
  beneficiaireExterne:string;
  sessionCaisse:      Sessions_caisse ;
  notes:              string;
  type_charge:        Type_charges;
  utilisateur:        any;
  code_societe:       string;
  code_exercice:      string;
  code_depotpv:       string;

    constructor(chargeCaisse: any) {
      this._id                 = chargeCaisse._id
      this.numero              = chargeCaisse.numero
      this.date                = chargeCaisse.date
      this.montant             = chargeCaisse.montant
      this.motif               = chargeCaisse.motif
      this.beneficiaireInterne = chargeCaisse.beneficiaireInterne
      this.beneficiaireExterne = chargeCaisse.beneficiaireExterne
      this.sessionCaisse       = chargeCaisse.sessionCaisse
      this.notes               = chargeCaisse.notes
      this.type_charge         = chargeCaisse.type_charge
      this.utilisateur         = chargeCaisse.utilisateur
      this.code_societe        = chargeCaisse.code_societe
      this.code_exercice       = chargeCaisse.code_exercice
      this.code_depotpv        = chargeCaisse.code_depotpv
    }
  }

// export interface IBanque{
//   _id: string | null;
//   libelle: string | null;
//   abreviation: string | null;
//   SocieteRacine: string | null;
// }

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}

export interface beneficiaireInterne{
    _id: string,
    nom: string
}


