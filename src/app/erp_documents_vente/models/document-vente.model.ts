import { Client } from "src/app/erp_params/clients/models/client.model"
import { Product } from "src/app/erp_params/products/models/product.model"
import { Reglement } from "src/app/erp_params/reglements/models/reglement.model"
import { Sessions_caisse } from "src/app/erp_caisse/sessions-caisses/models/sessions-caisses.model"
import { Unite } from "src/app/erp_params/unite/modeles/unite.model"
import { enum_type_operation, enum_type_transport } from "src/app/global-enums"
import { getDateByForma } from "src/app/global-functions"
import { session_caisse } from "src/app/services/token.service"


export class DocumentVente {
    _id:                            string
    numero:                         string
    date:                           Date
    numeroDate?:                     string
    numeroDocClient?:               string
    dateDocClient?:                 Date
    dateLibelle:                    string
    client:                         Client
    clientLibelle:                  string
    table?:                         string
    type_transport:                 string
    chauffeur?: {
        nom:                        String,
        numVehicule:                String,
        gsm:                        String,
        tel:                        String,
        email:                      String
    }
    vehicule?: {
        libelle:                    String,
        immatricule:                String,
    }
    nom_chauffeur:                  string;
    matricule_vehicule:             string;
    depotpv: {
        _id:                        string,
        libelle:                    string,
        code_unique:                string
    }
    sessionCaisse:                  Sessions_caisse | undefined
    utilisateur: {
        _id:                        string
        nom:                        string
    }
    totalBrutHT:                    number
    totalRemise:                    number
    totalHT:                        number
    totalFodec:                     number
    totalDC:                        number
    totalNetHT:                     number
    totalTVA:                       number
    totalRedevance:                 number
    timbreFiscale:                  number
    totalTTC:                       number
    totalGainCommerciale:           number
    totalGainReel:                  number
    totalPayer:                     number
    resteAPayer:                    number
    documentPrecedent?:             DocumentVente[]
    isDownloadDocumentPrecedent?:   Boolean
    documentSuivant?:               DocumentVente[]
    notes:                          string
    lignes:                         LigneDocumentVente[]
    reglements:                     Reglement[]
    code_societe:                   string
    code_exercice:                  string
    code_depotpv:                   string
    avecRegroupementLignes?:        Boolean
    documentPrecedentreglements?:   Reglement[]
    constructor(documentVente?: any) {
        this._id = documentVente?._id ?? ''
        this.numero = documentVente?.numero ?? ''
        this.numeroDocClient = documentVente?.numeroDocClient ?? undefined
        this.dateDocClient = documentVente?.dateDocClient ?? undefined
        this.date = documentVente?.date ?? ''
        this.dateLibelle = getDateByForma(documentVente?.date) ?? ''
        this.client = documentVente?.client ?? null
        this.clientLibelle = documentVente?.client?.raisonSociale ?? ""
        this.table = documentVente?.table ?? undefined
        this.type_transport = documentVente?.type_transport ?? enum_type_transport.INTERNE
        this.chauffeur = documentVente?.chauffeur ?? null
        this.vehicule = documentVente?.vehicule ?? null
        this.nom_chauffeur = documentVente?.nom_chauffeur ?? null
        this.matricule_vehicule = documentVente?.matricule_vehicule ?? null
        this.depotpv = documentVente?.depotpv ?? null
        this.sessionCaisse = documentVente?.sessionCaisse ?? null
        this.utilisateur = documentVente?.utilisateur ?? null
        this.totalBrutHT = documentVente?.totalBrutHT ?? 0
        this.totalRemise = documentVente?.totalRemise ?? 0
        this.totalHT = documentVente?.totalHT ?? 0
        this.totalFodec = documentVente?.totalFodec ?? 0
        this.totalDC = documentVente?.totalDC ?? 0
        this.totalNetHT = documentVente?.totalNetHT ?? 0
        this.totalTVA = documentVente?.totalTVA ?? 0
        this.totalRedevance = documentVente?.totalRedevance ?? 0
        this.timbreFiscale = documentVente?.timbreFiscale ?? 0
        this.totalTTC = documentVente?.totalTTC ?? 0
        this.totalGainCommerciale = documentVente?.totalGainCommerciale ?? 0
        this.totalGainReel = documentVente?.totalGainReel ?? 0
        this.totalPayer = documentVente?.totalPayer ?? 0
        this.resteAPayer = documentVente?.resteAPayer ?? 0
        this.documentPrecedent = documentVente?.documentPrecedent ?? []
        this.isDownloadDocumentPrecedent = documentVente?.isDownloadDocumentPrecedent ?? false
        this.documentSuivant = documentVente?.documentSuivant ?? []
        this.notes = documentVente?.notes ?? ''
        this.lignes = documentVente?.lignes ?? []
        this.reglements = documentVente?.reglements ?? []
        this.code_societe = documentVente?.code_societe ?? ''
        this.code_exercice = documentVente?.code_exercice ?? ''
        this.code_depotpv = documentVente?.code_depotpv ?? ''
    }
}

export class LigneDocumentVente {
    _id : string
    numero: number
    numeroDateDoc?: string
    id_document_precedent?: string
    article: Product
    quantiteUnite1: number
    unite1: Unite
    quantiteUnite2: number

    quantite?: number

    unite2: Unite
    prixAchatUnitaireHT: number
    prixVenteBrutHT: number
    tauxremise: number
    remiseMontant: number
    prixVenteUnitaireHT: number
    isFodec: Boolean
    tauxFodec: number
    montantFodec: number
    isDC: Boolean
    tauxDC: number
    montantDC: number
    prixVenteUnitaireNetHT: number
    tauxTVA: number
    montantTVA: number
    redevance: number
    prixVenteUnitaireTTC: number
    totalBrutHT: number
    totalRemise: number
    totalHT: number
    totalFodec: number
    totalDC: number
    totalNetHT: number
    totalTVA: number
    totalRedevance: number
    timbreFiscale: number
    totalTTC: number
    gainCommercialUnitaire: number //(PV TTC - Prix Achat TTC)
    gainCommercialTotal: number // (quantite * (PV TTC - Prix Achat TTC))
    gainReelUnitaire: number // (PV TTC - Prix revient TTC)
    gainReelTotal: number // (quantite * (PV TTC - Prix revient TTC))
    isQte1:boolean
    isQte2:boolean

    prixVenteHT:number | undefined
    isFodecV:Boolean | undefined
    remiseFVente:number | undefined
    remiseMontantVente:number | undefined
    isDCVente:Boolean | undefined
    tauxDCVente:number | undefined
    isRedevanceVente:Boolean | undefined
    depot_pv:{
        _id:string,
        libelle:string
    }
    quantiteLivre?:      number
    quantiteRestante?:   number
    constructor(ligneDocumentVente?: any) {
       this._id = ligneDocumentVente?._id ?? ''
       this.numero = ligneDocumentVente?.numero ?? ''
       this.article= ligneDocumentVente?.article ?? null
       this.quantiteUnite1 = ligneDocumentVente?.numero ?? 0
       this.unite1 = ligneDocumentVente?.numero ?? null
       this.quantiteUnite2 = ligneDocumentVente?.numero ?? 0
       this.unite2 = ligneDocumentVente?.numero ?? null
       this.prixAchatUnitaireHT = ligneDocumentVente?.prixAchatUnitaireHT ?? 0
       this.prixVenteBrutHT = ligneDocumentVente?.prixVenteBrutHT ?? 0
       this.tauxremise = ligneDocumentVente?.tauxremise ?? 0
       this.remiseMontant = ligneDocumentVente?.remiseMontant ?? 0
       this.prixVenteUnitaireHT = ligneDocumentVente?.prixVenteUnitaireHT ?? 0
       this.isFodec = ligneDocumentVente?.isFodec ?? false
       this.tauxFodec = ligneDocumentVente?.tauxFodec ?? 0
       this.montantFodec = ligneDocumentVente?.montantFodec ?? 0
       this.isDC = ligneDocumentVente?.isDC ?? false
       this.tauxDC = ligneDocumentVente?.tauxDC ?? 0
       this.montantDC = ligneDocumentVente?.montantDC ?? 0
       this.prixVenteUnitaireNetHT = ligneDocumentVente?.prixVenteUnitaireNetHT ?? ''
       this.tauxTVA = ligneDocumentVente?.tauxTVA ?? 0
       this.montantTVA = ligneDocumentVente?.montantTVA ?? 0
       this.redevance = ligneDocumentVente?.redevance ?? 0
       this.prixVenteUnitaireTTC = ligneDocumentVente?.prixVenteUnitaireTTC ?? 0
       this.totalBrutHT = ligneDocumentVente?.totalBrutHT ?? 0
       this.totalRemise = ligneDocumentVente?.totalRemise ?? 0
       this.totalHT = ligneDocumentVente?.totalHT ?? 0
       this.totalFodec = ligneDocumentVente?.totalFodec ?? 0
       this.totalDC = ligneDocumentVente?.totalDC ?? 0
       this.totalNetHT = ligneDocumentVente?.totalNetHT ?? 0
       this.totalTVA = ligneDocumentVente?.totalTVA ?? 0
       this.totalRedevance = ligneDocumentVente?.totalRedevance ?? 0
       this.timbreFiscale = ligneDocumentVente?.timbreFiscale ?? 0
       this.totalTTC = ligneDocumentVente?.totalTTC ?? 0
       this.gainCommercialUnitaire = ligneDocumentVente?.gainCommercialUnitaire ?? 0 //(PV TTC - Prix Achat TTC)
       this.gainCommercialTotal = ligneDocumentVente?.gainCommercialTotal ?? 0 // (quantite * (PV TTC - Prix Achat TTC))
       this.gainReelUnitaire = ligneDocumentVente?.gainReelUnitaire ?? 0 // (PV TTC - Prix revient TTC)
       this.gainReelTotal = ligneDocumentVente?.gainReelTotal ?? 0 // (quantite * (PV TTC - Prix revient TTC))
       this.isQte1 = ligneDocumentVente?.isQte1 ?? true
       this.isQte2 = ligneDocumentVente?.isQte2 ?? true
       this.depot_pv = ligneDocumentVente?.depot_pv ?? null
       this.quantiteLivre = ligneDocumentVente?.quantiteLivre ?? undefined
       this.quantiteRestante = ligneDocumentVente?.quantiteRestante ?? undefined
    }
}
