import { Depot } from "src/app/erp_params/depot/models/depot.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"
import { UtilService } from "src/app/utils/UtilService.service"

export class DocumentCorrectionStock {
    _id: string
    numero: string
    date: Date
    dateString: string
    notes: string
    lignes: LigneCorrectionStock[]
    depotpv: {      
        _id:                    string,
        libelle:                string,
    }  
    utilisateur: {      
        _id:   string
        nom:   string
    }   
    utilisateurNom:             string    

    code_societe:               string
    code_exercice:              string
    code_depotpv:               string

    inventaire: {
      _id:                      string,
      numero:                   string,
    }

    constructor(documentCorrectionStock?: any) {
        this._id = documentCorrectionStock?._id ?? ''
        this.numero = documentCorrectionStock?.numero ?? ''
        this.date = documentCorrectionStock?.date ?? ''
        this.dateString = documentCorrectionStock?.date ? UtilService.formatDate(documentCorrectionStock?.date) : ''
        this.notes = documentCorrectionStock?.notes ?? ''
        this.lignes = documentCorrectionStock?.lignes ?? []
        this.depotpv = documentCorrectionStock?.depotpv ?? null
        this.utilisateur = documentCorrectionStock?.utilisateur ?? null
        this.utilisateurNom = documentCorrectionStock?.utilisateur.nom ?? ''
        this.code_societe = documentCorrectionStock?.code_societe ?? ''
        this.code_exercice = documentCorrectionStock?.code_exercice ?? ''
        this.code_depotpv = documentCorrectionStock?.code_depotpv ?? ''
        this.inventaire = documentCorrectionStock?.inventaire ?? {}
    }
}

export class LigneCorrectionStock {
    _id: string
    numero: number
    article: Product
    quantite_en_stock: number
    quantite_difference: number
    quantite_nouvelle: number
    quantiteUnite1: number
    quantiteUnite2: number
    coefficient: Number
    unite1: Unite
    unite2: Unite
    isQte1:boolean
    isQte2:boolean
    ordre: Number
          

   constructor(ligneDocumentCorrectionStock?: any) {
        this._id = ligneDocumentCorrectionStock?._id ?? ''
        this.numero = ligneDocumentCorrectionStock?.numero ?? ''
        this.article = ligneDocumentCorrectionStock?.article ?? null
        this.quantite_en_stock = ligneDocumentCorrectionStock?.quantite_en_stock ?? null
        this.quantite_difference = ligneDocumentCorrectionStock?.quantite_difference ?? null
        this.quantite_nouvelle = ligneDocumentCorrectionStock?.quantite_nouvelle ?? null
        this.quantiteUnite1 = ligneDocumentCorrectionStock?.numero ?? null
        this.quantiteUnite2 = ligneDocumentCorrectionStock?.numero ?? null
        this.coefficient = ligneDocumentCorrectionStock?.coefficient ?? null
        this.ordre = ligneDocumentCorrectionStock?.ordre ?? null
        this.isQte1 = ligneDocumentCorrectionStock?.isQte1 ?? true
        this.isQte2 = ligneDocumentCorrectionStock?.isQte2 ?? false
        this.unite1 = ligneDocumentCorrectionStock?.numero ?? null
        this.unite2 = ligneDocumentCorrectionStock?.numero ?? null
   }
}