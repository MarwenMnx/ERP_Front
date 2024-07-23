import { enum_nomTable, enum_type_document } from "../global-enums"

export const paramBonReception = {
    title: 'Bon Reception',
    titleButton: "Bon Reception",

    pageList: "bonReception/list",
    pageDetails: "",
    pageModifie: "bonReception/edit/",
    pageAjoute: "bonReception/new",

    uriDocApi: "/bonreceptionfournisseur",
    apiGetDocuments: "",
    withCheckSolde:true,

    titreDocumentPrecedent: "Bon Commande",
    apiGetDocumentsPrecedentByTier: '/boncommandefournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonCommandeFournisseurs,

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withBlockageIfExisteDocSuivante:true,

    withReglement:true,
    type_doc_reg:enum_type_document.BON_RECEPTION_FOURNISSEUR,

    withDocFournisseur:true,
    
}

export const paramBonAchat = {
    title: 'Bon Achat',
    titleButton: "Bon Achat",

    pageList: "bonAchat/list",
    pageDetails: "",
    pageModifie: "bonAchat/edit/",
    pageAjoute: "bonAchat/new",

    uriDocApi: "/bonachat",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Reception",
    apiGetDocumentsPrecedentByTier: '/bonreceptionfournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonReceptionFournisseurs,
    withCheckSolde:true,
    withNotCheckSoldeIfWithDocPrecedent:true,
    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonreceptionfournisseur",
    
    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withBlockageIfExisteDocSuivante:true,

    withReglement:true,
    type_doc_reg:enum_type_document.BON_ACHAT,

    withReglementDocPrecedent:true,
    
    withDocFournisseur:true,

    withControlDocEtDateFournisseur:true
}

export const paramBonCommandeFournisseur = {
    title: 'Bon Commande Fournisseur',
    titleButton: "Bon Commande",

    pageList: "bonCommandeFournisseur/list",
    pageDetails: "",
    pageModifie: "bonCommandeFournisseur/edit/",
    pageAjoute: "bonCommandeFournisseur/new",

    uriDocApi: "/boncommandefournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Devis",
    apiGetDocumentsPrecedentByTier: '/devisfournisseur',
    tableDocumentPrecedent: enum_nomTable.K_devisFournisseurs,

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    
    withDocFournisseur:true,
    
    withTransporteur: false
}

export const paramDevisfournisseur = {
    title: 'Devis Fournisseur',
    titleButton: "Devis Fournisseur",

    pageList: "devisFournisseur/list",
    pageDetails: "",
    pageModifie: "devisFournisseur/edit/",
    pageAjoute: "devisFournisseur/new",

    uriDocApi: "/devisfournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "",
    apiGetDocumentsPrecedentByTier: '',

    withDocumentPrecedent: false,
    withBonCommandeClient: false,

    withDocFournisseur:true,
    
    withTransporteur: false
}

export const paramBonRetourMarchandiseFournisseur = {
    title: 'Bon Retour Marchandise Fournisseur',
    titleButton: "Bon Retour",

    pageList: "bonRetourMarchandiseFournisseur/list",
    pageDetails: "",
    pageModifie: "bonRetourMarchandiseFournisseur/edit/",
    pageAjoute: "bonRetourMarchandiseFournisseur/new",

    uriDocApi: "/bonretourmarchandisefournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Reception",
    apiGetDocumentsPrecedentByTier: '/bonreceptionfournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonReceptionFournisseurs,

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withBlockageIfExisteDocSuivante:true,
    
    withReglement:true,
    withDocFournisseur:true,
    
    type_doc_reg:enum_type_document.BON_RETOUR_MARCHANDISE_FOURNISSEUR
    
}

export const paramBonRetourFinancierFournisseur = {
    title: 'Bon Retour Financier Fournisseur',
    titleButton: "Bon Retour",

    pageList: "bonRetourFinancierFournisseur/list",
    pageDetails: "",
    pageModifie: "bonRetourFinancierFournisseur/edit/",
    pageAjoute: "bonRetourFinancierFournisseur/new",

    uriDocApi: "/bonretourfinancierfournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Reception",
    apiGetDocumentsPrecedentByTier: '/bonreceptionfournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonCommandeFournisseurs,

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withBlockageIfExisteDocSuivante:true,

    withReglement:true,
    withDocFournisseur:true,
    
    type_doc_reg:enum_type_document.BON_RETOUR_FINANCIER_FOURNISSEUR
}

export const paramAvoirMarchandiseFournisseur = {
    title: 'Avoir Marchandise Fournisseur',
    titleButton: "Avoir",

    pageList: "avoirMarchandiseFournisseur/list",
    pageDetails: "",
    pageModifie: "avoirMarchandiseFournisseur/edit/",
    pageAjoute: "avoirMarchandiseFournisseur/new",

    uriDocApi: "/avoirmarchandisefournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Retour Marchandise",
    apiGetDocumentsPrecedentByTier: '/bonretourmarchandisefournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonRetourMarchandiseFournisseurs,

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,
    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonretourmarchandisefournisseur",


    withReglement:true,
    withDocFournisseur:true,
    
    type_doc_reg:enum_type_document.AVOIR_MARCHANDISE_FOURNISSEUR
}

export const paramAvoirFinancierFournisseur = {
    title: 'Avoir Financier Fournisseur',
    titleButton: "Avoir",

    pageList: "avoirFinancierFournisseur/list",
    pageDetails: "",
    pageModifie: "avoirFinancierFournisseur/edit/",
    pageAjoute: "avoirFinancierFournisseur/new",

    uriDocApi: "/avoirfinancierfournisseur",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Retour Financier",
    apiGetDocumentsPrecedentByTier: '/bonretourfinancierfournisseur',
    tableDocumentPrecedent: enum_nomTable.K_bonRetourFinancierFournisseurs,

    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonretourfinancierfournisseur",

    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withReglement:true,

    withDocFournisseur:true,
    
    type_doc_reg:enum_type_document.AVOIR_FINANCIER_FOURNISSEUR
}

export const paramFactureAchat = {
    title: 'Facture Achat',
    titleButton: "Facture",

    pageList: "factureAchat/list",
    pageDetails: "",
    pageModifie: "factureAchat/edit/",
    pageAjoute: "factureAchat/new",

    uriDocApi: "/factureachat",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Achat",
    apiGetDocumentsPrecedentByTier: '/bonachat',
    tableDocumentPrecedent: enum_nomTable.K_bonAchats,
    withCheckSolde:true,
    withNotCheckSoldeIfWithDocPrecedent:true,
    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonachat",
    
    withDocumentPrecedent: true,
    withBonCommandeClient: false,
    withTransporteur: false,

    withTimbreFiscal:true,
    withReglementDocPrecedent:true,
    
    withReglement:true,
    withDocFournisseur:true,
    getDocPrecedentbloquante:false,
    withControlDocEtDateFournisseur:true,
    
    type_doc_reg:enum_type_document.FACTURE_ACHAT
}