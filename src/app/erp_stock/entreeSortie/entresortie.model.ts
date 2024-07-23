import { Transporteur } from "src/app/erp_flotte/transporteur/models/transporteur.model"
import { Vehicule } from "src/app/erp_flotte/vehicules/models/vehicule.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"
import {enum_type_transport} from "../../global-enums";
import {Chauffeur} from "../../erp_flotte/chauffeur/models/chauffeur.model";

export class DocumentEnteeSorties {
    _id: string;
    numero: string;
    date: Date;
    notes: string;
    etat:number;

   depot_PV_source: {
      _id: string,
      libelle: string,
      code_unique:string,
      ayant_acces:string | undefined
      };
   depot_PV_destination: {
     _id: string,
     libelle: string,
     code_unique:string,
     ayant_acces:string | undefined
    };

    chauffeurAFF: string;
    vehiculeAFF: string;

    chauffeur: Chauffeur;
    vehicule: Vehicule;

    nom_chauffeur:string;
    matricule_vehicule:string;

    type_transport:enum_type_transport;

    bon_entree: {
    _id: string,
    numero: string,
    date: Date,
    code_depotpv: string,
    code_societe: string,
    code_exercice:	string
  };

    bon_sortie: {
    _id: string,
    numero: string,
    date: Date
    code_depotpv: string,
    code_societe: string,
    code_exercice:	string
  };

    utilisateur: {
        _id:   string
        nom:   string
    }    ;
    lignes: LigneDocumentEntreeSorties[]

    code_societe:               string;
    code_exercice:              string;
    code_depotpv:               string;

    quantiteUnite1_origine:     number;
    quantiteUnite2_origine:     number;

    constructor(documententreesorties?: any) {
        this._id                  = documententreesorties?._id ;
        this.numero               = documententreesorties?.numero ;
        this.date                 = documententreesorties?.date ;
        this.notes                = documententreesorties?.notes ;
        this.depot_PV_source      = documententreesorties?.depot_PV_source ;
        this.depot_PV_destination = documententreesorties?.depot_PV_destination ;
        this.chauffeurAFF         = documententreesorties?.chauffeur ? documententreesorties.chauffeur.nom : documententreesorties?.nom_chauffeur  ;
        this.vehiculeAFF          = documententreesorties?.vehicule ? documententreesorties?.vehicule.libelle : documententreesorties?.matricule_vehicule ;
         this.chauffeur           = documententreesorties?.chauffeur ;
        this.nom_chauffeur        = documententreesorties?.nom_chauffeur ;
        this.vehicule             = documententreesorties?.vehicule ;
        this.matricule_vehicule   = documententreesorties?.matricule_vehicule ;
        this.type_transport       = documententreesorties?.type_transport ;
        this.bon_sortie           = documententreesorties?.bon_sortie ;
        this.bon_entree           = documententreesorties?.bon_entree;
        this.lignes               = documententreesorties?.lignes;
        this.utilisateur          = documententreesorties?.utilisateur ;
        this.code_societe         = documententreesorties?.code_societe ;
        this.code_exercice        = documententreesorties?.code_exercice ;
        this.code_depotpv         = documententreesorties?.code_depotpv ;
        this.etat                 = documententreesorties?.etat;

        this.quantiteUnite1_origine                 = documententreesorties?.quantiteUnite1_origine;
        this.quantiteUnite2_origine                 = documententreesorties?.quantiteUnite2_origine;


    }
}

export class LigneDocumentEntreeSorties {
    _id:            string
    ordre:          number
    article:        Product
    quantiteUnite1_AFF: number
    quantiteUnite2_AFF: number
    quantiteUnite1: number
    quantiteUnite2: number
    unite1:         Unite
    unite2:         Unite
    isQte1:         boolean
    isQte2:         boolean

    constructor(ligneDocumentSorties: any) {
        this._id                = ligneDocumentSorties._id
        this.ordre              = ligneDocumentSorties.numero
        this.article            = ligneDocumentSorties.article
        this.quantiteUnite1     = ligneDocumentSorties.quantiteUnite1
        this.quantiteUnite1_AFF     = ligneDocumentSorties.quantiteUnite1
        this.quantiteUnite2_AFF     = ligneDocumentSorties.quantiteUnite2
        this.quantiteUnite2     = ligneDocumentSorties.quantiteUnite2
        this.unite1             = ligneDocumentSorties.numero
        this.unite2             = ligneDocumentSorties.numero
        this.isQte1             = ligneDocumentSorties.isQte1
        this.isQte2             = ligneDocumentSorties.isQte2

   }
}
