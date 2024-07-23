import { Depot } from "src/app/erp_params/depot/models/depot.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"

export class DemandeAlimentation {
    _id: string
    numero: string
    date: Date
    notes: string
    lignes: LigneDocumentDemandeAlimentation[]
   //etat : interne/externe
    etat: boolean
    // depotpv: Depot 
    depotpv: {      
        _id:                    string,
        libelle:                string,
    }  
    utilisateur: {      
        _id:   string
        nom:   string
    }       

    code_societe:               string
    code_exercice:              string
    code_depotpv:               string

    constructor(demandealimentation?: any) {
        this._id = demandealimentation?._id ?? ''
        this.numero = demandealimentation?.numero ?? ''
        this.date = demandealimentation?.date ?? ''
        this.notes = demandealimentation?.notes ?? ''
        this.lignes = demandealimentation?.lignes ?? []
        this.depotpv = demandealimentation?.depotpv ?? null
        this.utilisateur = demandealimentation?.utilisateur ?? null
        this.code_societe = demandealimentation?.code_societe ?? ''
        this.code_exercice = demandealimentation?.code_exercice ?? ''
        this.code_depotpv = demandealimentation?.code_depotpv ?? ''
        this.etat = demandealimentation?.etat ?? ''


    }
}

export class LigneDocumentDemandeAlimentation {
    _id: string
    numero: number
    article: Product
    quantiteUnite1: number
    quantiteUnite2: number
    unite1: Unite
    unite2: Unite
    isQte1:boolean
    isQte2:boolean

    depot_pv: {
        _id: string,
        libelle: string
    }
    utilisateur: {      
        _id: string
        nom: string
    }       
    lignes: LigneDocumentDemandeAlimentation[]

   constructor(ligneDocumentdemandealimentation?: any) {
        this._id = ligneDocumentdemandealimentation?._id ?? ''
        this.numero = ligneDocumentdemandealimentation?.numero ?? ''
        this.article = ligneDocumentdemandealimentation?.article ?? null
        this.quantiteUnite1 = ligneDocumentdemandealimentation?.numero ?? null
        this.quantiteUnite2 = ligneDocumentdemandealimentation?.numero ?? null
        this.depot_pv = ligneDocumentdemandealimentation?.depot_pv ?? null
        this.utilisateur = ligneDocumentdemandealimentation?.utilisateur ?? null
        this.lignes = ligneDocumentdemandealimentation?.lignes ?? []
        this.isQte1 = ligneDocumentdemandealimentation?.isQte1 ?? true
        this.isQte2 = ligneDocumentdemandealimentation?.isQte2 ?? false
        this.unite1 = ligneDocumentdemandealimentation?.numero ?? null
        this.unite2 = ligneDocumentdemandealimentation?.numero ?? null


    }
}