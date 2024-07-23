import { Fournisseur } from "src/app/erp_params/fournisseurs/models/fournisseur.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Reglement } from "src/app/erp_params/reglements/models/reglement.model"
import { Sessions_caisse } from "src/app/erp_caisse/sessions-caisses/models/sessions-caisses.model"
import { enum_type_transport } from "src/app/global-enums"
import { getDateByForma } from "src/app/global-functions"

export class DocumentAchat {
    _id:                                string
    exercice:                           string
    numero:                             string
    date:                               Date
    dateLibelle:                        string
    fournisseur:                        Fournisseur
    fournisseurLibelle:                 string
    type_transport?:                    string
    chauffeur?: {
        nom:                            String,
        numVehicule:                    String,
        gsm:                            String,
        tel:                            String,
        email:                          String
    }
    vehicule?: {
        libelle:                        String,
        immatricule:                    String,
    }
    nom_chauffeur?:                     string;
    matricule_vehicule?:                string;
    depotpv: {
        _id:                            string,
        libelle:                        string,
        code_unique:                    string
    }
    sessionCaisse:                      Sessions_caisse | undefined
    utilisateur: {
        _id:                            string,
        nom:                            string
    }
    bloque:                             Boolean
    totalBrutHT:                        number
    totalRemise:                        number
    totalHT:                            number
    totalFodec:                         number
    totalDC:                            number
    totalNetHT:                         number
    totalTVA:                           number
    totalRedevance:                     number
    timbreFiscale:                      number
    totalTTC:                           number
    totalPayer:                         number
    resteAPayer:                        number
    totalGainCommerciale:               number
    totalGainReel:                      number
    documentPrecedent?:                 DocumentAchat[]
    isDownloadDocumentPrecedent?:       Boolean
    documentSuivant?:                   DocumentAchat[]
    numeroDocFournisseur:               string
    dateDocFournisseur:                 Date
    pieceJointe:                        string
    notes:                              string
    lignes:                             LigneDocumentAchat[]
    reglements:                         Reglement[]
    code_societe:                       string;
    code_exercice:                      string;
    code_depotpv:                       string;
    table?:                             string;
    documentPrecedentreglements?:       Reglement[]

    constructor(documentAchat?: any) {
        this._id = documentAchat?._id ?? ''
        this.numero = documentAchat?.numero ?? ''
        this.date = documentAchat?.date ?? ''
        this.dateLibelle = getDateByForma(documentAchat?.date) ?? ''
        this.fournisseur = documentAchat?.fournisseur ?? ''
        this.fournisseurLibelle = documentAchat?.fournisseur?.raisonSociale ?? ""
        this.type_transport = documentAchat?.type_transport ?? enum_type_transport.INTERNE
        this.chauffeur = documentAchat?.chauffeur ?? null
        this.vehicule = documentAchat?.vehicule ?? null
        this.nom_chauffeur = documentAchat?.nom_chauffeur ?? null
        this.matricule_vehicule = documentAchat?.matricule_vehicule ?? null
        this.totalRemise = documentAchat?.totalRemise ?? 0
        this.totalHT = documentAchat?.totalHT ?? 0
        this.totalTVA = documentAchat?.totalTVA ?? 0
        this.totalTTC = documentAchat?.totalTTC ?? 0
        this.totalGainCommerciale = documentAchat?.totalGainCommerciale ?? 0
        this.totalGainReel = documentAchat?.totalGainReel ?? 0
        this.timbreFiscale = documentAchat?.timbreFiscale ?? 0
        this.totalBrutHT = documentAchat?.totalBrutHT ?? 0
        this.depotpv = documentAchat?.depotpv ?? 0
        this.totalRedevance = documentAchat?.totalRedevance ?? 0
        this.totalFodec = documentAchat?.totalFodec ?? 0
        this.utilisateur = documentAchat?.utilisateur ?? 0
        this.totalDC = documentAchat?.totalDC ?? 0
        this.resteAPayer = documentAchat?.resteAPayer ?? 0
        this.exercice = documentAchat?.exercice ?? ''
        this.bloque = documentAchat?.bloque ?? false
        this.totalNetHT = documentAchat?.totalNetHT ?? 0
        this.totalPayer= documentAchat?.totalPayer ?? 0
        this.documentPrecedent = documentAchat?.documentPrecedent ?? []
        this.isDownloadDocumentPrecedent = documentAchat?.isDownloadDocumentPrecedent ?? false
        this.documentSuivant = documentAchat?.documentSuivant ?? []
        this.numeroDocFournisseur= documentAchat?.numeroDocFournisseur ?? ''
        this.dateDocFournisseur= documentAchat?.dateDocFournisseur ?? ''
        this.pieceJointe= documentAchat?.pieceJointe ?? ''
        this.notes= documentAchat?.notes ?? ''
        this.code_societe= documentAchat?.code_societe ?? ''
        this.code_exercice= documentAchat?.code_exercice ?? ''
        this.code_depotpv= documentAchat?.code_depotpv ?? false
        this.lignes= documentAchat?.lignes ?? []
        this.reglements= documentAchat?.reglements ?? []
    }
}

export class LigneDocumentAchat {
    _id: string
    numero: number
    numeroDateDoc?: string
    id_document_precedent?: string
    article: Product
    quantite?:number
    quantiteUnite1:number
    unite1:any
    quantiteUnite2:number
    unite2:any

    prixFourn:number
    tauxremise:number
    remiseMontant:number
    prixAchatUnitaireHT:number
    isFodec:boolean
    tauxFodec:number
    montantFodec:number
    isDC:boolean
    tauxDC:number
    montantDC:number
    prixAchatUnitaireNetHT:number
    tauxTVA:number
    montantTVA:number
    redevance:number
    prixAchatUnitaireTTC:number

    totalBrutHT:number
    totalRemise:number
    totalHT:number
    totalFodec:number
    totalDC:number
    totalNetHT:number
    totalTVA:number
    totalRedevance:number
    totalTTC:number

    isQte1:boolean
    isQte2:boolean

    constructor(ligneDocumentAchat?: any) {
       this._id = ligneDocumentAchat?._id ?? ''
       this.numero = ligneDocumentAchat?.numero ?? ''
       this.article= ligneDocumentAchat?.article ?? null

       this.unite1 = ligneDocumentAchat?.unite1 ?? null
       this.unite2 = ligneDocumentAchat?.unite2 ?? null
       this.prixFourn= ligneDocumentAchat?.prixFourn ?? 0
       this.tauxremise= ligneDocumentAchat?.tauxremise ?? 0
       this.remiseMontant= ligneDocumentAchat?.remiseMontant ?? 0
       this.prixAchatUnitaireHT = ligneDocumentAchat?.prixAchatUnitaireHT ?? 0

       this.isFodec= ligneDocumentAchat?.isFodec ?? 0
       this.tauxFodec= ligneDocumentAchat?.tauxFodec ?? 0
       this.montantFodec= ligneDocumentAchat?.montantFodec ?? 0
       this.isDC = ligneDocumentAchat?.isDC ?? false
       this.tauxDC= ligneDocumentAchat?.tauxDC ?? 0
       this.montantDC= ligneDocumentAchat?.montantDC ?? 0
       this.prixAchatUnitaireNetHT= ligneDocumentAchat?.prixAchatUnitaireNetHT ?? 0
       this.tauxTVA= ligneDocumentAchat?.tauxTVA ?? 0
       this.montantTVA= ligneDocumentAchat?.montantTVA ?? 0
       this.prixAchatUnitaireTTC= ligneDocumentAchat?.prixAchatUnitaireTTC ?? 0
       this.redevance= ligneDocumentAchat?.redevance ?? 0

       this.totalRemise= ligneDocumentAchat?.totalRemise ?? 0
       this.totalFodec= ligneDocumentAchat?.totalFodec ?? 0
       this.totalDC= ligneDocumentAchat?.totalDC ?? 0
       this.totalRedevance= ligneDocumentAchat?.totalRedevance ?? 0
       this.totalHT= ligneDocumentAchat?.totalHT ?? 0
       this.totalNetHT= ligneDocumentAchat?.totalNetHT ?? 0
       this.totalBrutHT= ligneDocumentAchat?.totalBrutHT ?? 0
       this.totalTVA= ligneDocumentAchat?.totalTVA ?? 0
       this.totalTTC= ligneDocumentAchat?.totalTTC ?? 0
       this.quantiteUnite1= ligneDocumentAchat?.quantiteUnite1 ?? 0
       this.quantiteUnite2= ligneDocumentAchat?.quantiteUnite2 ?? 0
       this.isQte1 = ligneDocumentAchat?.isQte1 ?? true
       this.isQte2 = ligneDocumentAchat?.isQte2 ?? true
    }
}
