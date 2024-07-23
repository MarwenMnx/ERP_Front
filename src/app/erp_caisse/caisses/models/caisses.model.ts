import {Sessions_caisse} from "../../sessions-caisses/models/sessions-caisses.model";
import {Type_charges} from "../../../erp_params/type-charges/models/type-charges.model";
import {User} from "../../../erp_params/users/models/user.model";
import {Type_caisses} from "../../type-caisses/models/type-caisses.model";
import {Depot} from "../../../erp_params/depot/models/depot.model";



export class Caisses {

  _id?:               string;
  numero:             string;

  libelle:            string;
  fondCaisse:         number; // alimentation manuelle
  montant:            number; // (charger via le cloture du session caisse + fond caisse) - ( fond session caisse + remise banque)
  sessionCaisse:       any [];
  utilisateur_ouverture_caisse: User;
  utilisateur_cloture_caisse:   User;
  utilisateurs_caisse:          User[];
  date_ouverture:               Date;
  date_cloture:                 Date;
  cloture:                      boolean;
  depotpv:  Depot[];
  typeCaisse:     Type_caisses;
  code_societe:   string
  code_exercice:  string;
  code_depotpv:   string;

    constructor(chargeCaisse: any) {
      this._id                 = chargeCaisse._id
      this.numero              = chargeCaisse.numero
      this.libelle             = chargeCaisse.libelle
      this.fondCaisse          = chargeCaisse.fondCaisse
      this.montant             = chargeCaisse.montant
      this.sessionCaisse       = chargeCaisse.sessionCaisse

      this.utilisateur_ouverture_caisse = chargeCaisse.utilisateur_ouverture_caisse
      this.utilisateur_cloture_caisse   = chargeCaisse.utilisateur_cloture_caisse
      this.utilisateurs_caisse          = chargeCaisse.utilisateurs_caisse
      this.date_ouverture               = chargeCaisse.date_ouverture
      this.date_cloture                 = chargeCaisse.date_cloture
      this.cloture                      = chargeCaisse.cloture
      this.depotpv                      = chargeCaisse.depotpv
      this.typeCaisse                   = chargeCaisse.typeCaisse
      this.code_societe                 = chargeCaisse.code_societe
      this.code_exercice                = chargeCaisse.code_exercice
      this.code_depotpv                 = chargeCaisse.code_depotpv
    }
  }

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


