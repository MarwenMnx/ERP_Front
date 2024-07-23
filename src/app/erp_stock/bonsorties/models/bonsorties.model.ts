import { Transporteur } from "src/app/erp_flotte/transporteur/models/transporteur.model"
import { Vehicule } from "src/app/erp_flotte/vehicules/models/vehicule.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"

export class DocumentSorties {
    _id: string
    numero: string
    date: Date
    notes: string
    etat:number;

   depot_PV_source: {
      _id: String,
      code_depotpv: String,
      }
   depot_PV_destination: {
      _id:String,
      code_depotpv: String,
    }

   chauffeur: Transporteur;
   vehicule: Vehicule;
    bon_sortie: {
    _id: String,
    numero: String,
    date: Date
  }
   
    utilisateur: {      
        _id:   string
        nom:   string
    }    
    lignes: LigneDocumentSorties[]   

    code_societe:               string
    code_exercice:              string
    code_depotpv:               string

    constructor(documentsorties?: any) {
        this._id = documentsorties?._id ?? ''
        this.numero = documentsorties?.numero ?? ''
        this.date = documentsorties?.date ?? ''
        this.notes = documentsorties?.notes ?? ''
        this.depot_PV_source = documentsorties?.depot_PV_source ?? ''
        this.depot_PV_destination = documentsorties?.depot_PV_destination ?? ''
        this.chauffeur = documentsorties?.chauffeur ?? ''
        this.vehicule = documentsorties?.vehicule ?? ''
        this.bon_sortie = documentsorties?.bon_sortie ?? ''
        this.lignes = documentsorties?.lignes ?? []
        this.utilisateur = documentsorties?.utilisateur ?? null
        this.code_societe = documentsorties?.code_societe ?? ''
        this.code_exercice = documentsorties?.code_exercice ?? ''
        this.code_depotpv = documentsorties?.code_depotpv ?? ''
        this.etat = documentsorties?.etat ?? ''


    }
}

export class LigneDocumentSorties {
    _id: string
    ordre: number
    article: Product
    quantiteUnite1: number
    unite1: Unite
    unite2: Unite
    isQte1:boolean
    isQte2:boolean
 
    constructor(ligneDocumentSorties?: any) {
        this._id = ligneDocumentSorties?._id ?? ''
        this.ordre = ligneDocumentSorties?.numero ?? null
        this.article = ligneDocumentSorties?.article ?? null
        this.quantiteUnite1 = ligneDocumentSorties?.numero ?? null
        this.unite1 = ligneDocumentSorties?.numero ?? null
        this.unite2 = ligneDocumentSorties?.numero ?? null
        this.isQte1 = ligneDocumentSorties?.isQte1 ?? true
        this.isQte2 = ligneDocumentSorties?.isQte2 ?? false
     


    }
}