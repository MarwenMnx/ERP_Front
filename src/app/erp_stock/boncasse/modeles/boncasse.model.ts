import { Depot } from "src/app/erp_params/depot/models/depot.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"

export class DocumentCasse {
    _id: string
    numero: string
    date: Date
    notes: string
    lignes: LigneDocumentCasse[]
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

    constructor(documentCasse?: any) {
        this._id = documentCasse?._id ?? ''
        this.numero = documentCasse?.numero ?? ''
        this.date = documentCasse?.date ?? ''
        this.notes = documentCasse?.notes ?? ''
        this.lignes = documentCasse?.lignes ?? []
        this.depotpv = documentCasse?.depotpv ?? null
        this.utilisateur = documentCasse?.utilisateur ?? null
        this.code_societe = documentCasse?.code_societe ?? ''
        this.code_exercice = documentCasse?.code_exercice ?? ''
        this.code_depotpv = documentCasse?.code_depotpv ?? ''
        this.etat = documentCasse?.etat ?? ''


    }
}

export class LigneDocumentCasse {
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
    lignes: LigneDocumentCasse[]

   constructor(ligneDocumentCasse?: any) {
        this._id = ligneDocumentCasse?._id ?? ''
        this.numero = ligneDocumentCasse?.numero ?? ''
        this.article = ligneDocumentCasse?.article ?? null
        this.quantiteUnite1 = ligneDocumentCasse?.numero ?? null
        this.quantiteUnite2 = ligneDocumentCasse?.numero ?? null
        this.depot_pv = ligneDocumentCasse?.depot_pv ?? null
        this.utilisateur = ligneDocumentCasse?.utilisateur ?? null
        this.lignes = ligneDocumentCasse?.lignes ?? []
        this.isQte1 = ligneDocumentCasse?.isQte1 ?? true
        this.isQte2 = ligneDocumentCasse?.isQte2 ?? false
        this.unite1 = ligneDocumentCasse?.numero ?? null
        this.unite2 = ligneDocumentCasse?.numero ?? null


    }
}