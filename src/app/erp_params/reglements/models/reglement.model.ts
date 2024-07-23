import {Product} from "../../products/models/product.model";
import {Depot} from "../../depot/models/depot.model";
import {User} from "../../users/models/user.model";
import {Sessions_caisse} from "../../../erp_caisse/sessions-caisses/models/sessions-caisses.model";
import {enum_etatDocument, enum_modeReglement} from "../../../global-enums";
import {Banque} from "../../banque/models/banque.model";
import {CompteBancaires} from "../../compteBancaires/models/compteBancaires.model";
import {Client} from "../../clients/models/client.model";
import {Fournisseur} from "../../fournisseurs/models/fournisseur.model";

export class Reglement {
  _id?:               string;
  numero:             string | undefined;
  date:               Date;
  montant:            number;
  ecartEspeceNegatif: number;
  utilisateur:        User;
  sessionCaisse:      Sessions_caisse;
  client:             Client;
  fournisseur:        Fournisseur;
  modeReglement:      enum_modeReglement;
  // ticketResto
  ticket:             Ticket_Local;//[Ticket_Local];
  numPiece:           string;
  dateEcheance:       Date;
  titulaire:          string;
  banque:             Banque;
  compteBancaire :    CompteBancaires;
  agence?:            string;
  statut:             enum_etatDocument;
  note:               string;

  lettrageReglement:  Lettrage;

  typeString?:  string;
  clientString?:  string;
  fournisseurString?:  string;
  utilisateurString?:  string;
  dateString?: string
  dateEcheanceString?: string
  modeReglementString?: string
  banqueString?: string
  montantString?: string

  code_societe:       string;
  code_exercice:      string;
  code_depotpv:       string;
  tab_reg:            string;

    constructor(reglement?: any) {
      this._id               = reglement ? reglement._id         		     : '' ;
      this.numero            = reglement ? reglement.numero            	 : '' ;
      this.date              = reglement ? reglement.date                : '' ;
      this.montant           = reglement ? reglement.montant             : '' ;
      this.ecartEspeceNegatif= reglement ? reglement.ecartEspeceNegatif  : '' ;
      this.utilisateur       = reglement ? reglement.utilisateur         : '' ;
      this.sessionCaisse     = reglement ? reglement.sessionCaisse       : '' ;
      this.client            = reglement ? reglement.client              : '' ;
      this.fournisseur       = reglement ? reglement.fournisseur         : '' ;
      this.modeReglement     = reglement ? reglement.modeReglement       : '' ;
      this.ticket            = reglement ? reglement.ticket              : '' ;
      this.numPiece          = reglement ? reglement.numPiece            : '' ;
      this.dateEcheance      = reglement ? reglement.dateEcheance        : '' ;
      this.titulaire         = reglement ? reglement.titulaire           : '' ;
      this.banque            = reglement ? reglement.banque              : '' ;
      this.compteBancaire    = reglement ? reglement.compteBancaire      : '' ;
      this.agence            = reglement ? reglement.agence              : '' ;
      this.statut            = reglement ? reglement.statut              : '' ;
      this.note              = reglement ? reglement.note                : '' ;

      this.lettrageReglement = reglement ? reglement.lettrageReglement   : {} ;

      this.typeString = reglement && reglement.lettrageReglement && reglement.lettrageReglement.documents && reglement.lettrageReglement.documents[0]!=undefined ? reglement.lettrageReglement.documents[0].type : ""
      this.clientString = reglement && reglement.client && reglement.client.raisonSociale ?  reglement.client.raisonSociale : "";
      this.fournisseurString = reglement && reglement.fournisseur && reglement.fournisseur.raisonSociale ?  reglement.fournisseur.raisonSociale : "";
      this.utilisateurString = reglement && reglement.utilisateur && reglement.utilisateur.nom ? reglement.utilisateur.nom+" "+reglement.utilisateur.prenom : "";
      this.banqueString = reglement && reglement.banque && reglement.banque.abreviation ? reglement.banque.abreviation : "";

      this.code_societe      = reglement ? reglement.code_societe        : '' ;
      this.code_exercice     = reglement ? reglement.code_exercice       : '' ;
      this.code_depotpv      = reglement ? reglement.code_depotpv        : '' ;
      this.tab_reg           = reglement ? reglement.tab_reg : '' ;
    }
  }

export interface Lettrage {
  montant_lettre: number,
  type?:           number , //enum_type_document,
  documents?: [{
    _id:        string,
    numero:     string,
    date:       Date,
    type:       number
  }]
}

export interface Ticket_Local {
  nombre:             number,
  code_barre:         string ,
  montant_ticket:     number,
  taux_deduction:     number,
  montant_deduction:  number,
  valeur_ticket:      number,
}

export interface IReglement{
  _id:       string | null;
}

export interface ReponseList{
  MESSAGE:  string;
  OK:       Boolean;

  RESULTAT:any
}


