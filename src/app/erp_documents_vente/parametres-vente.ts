import { enum_nomTable, enum_type_document } from "../global-enums"

export const paramBonLivraison = {
    title: 'Bon Livraison',
    titleButton: 'Bon Livraison',
    pageList: "bonLivraison/list",
    pageDetails : "",
    pageModifie : "bonLivraison/edit/",
    pageAjoute : "bonLivraison/new",

    uriDocApi: "/bonlivraison",
    apiGetByIdDocumentPrecedent: "lienGetByIdDocumentPrecedent",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Commande",
    apiGetDocumentsPrecedentByTier:'/boncommandeclient',
    tableDocumentPrecedent:enum_nomTable.K_bonCommandeClients,
    withReglementDocumentPrecedent:true,

    withBlockageIfExisteDocSuivante:true,

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:true,
    withQuantiteRestante:true,
    withCheckQuantiteRestante:true,
    withCheckQuantiteStock:true,
    withCheckSolde:true,

    withReglement:true,
    type_doc_reg:enum_type_document.BON_LIVRAISON
}

export const paramBonRetourTicketClient = {
    title: 'Bon Retour Ticket Client',
    titleButton: 'Bon Retour',

    pageList: "bonretourticketclient/list",
    pageDetails : "",
    pageModifie : "bonretourticketclient/edit/",
    pageAjoute : "bonretourticketclient/new",

    uriDocApi: "/bonretourmarchandiseclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Tickets",
    apiGetDocumentsPrecedentByTier:'/ticket',
    tableDocumentPrecedent:enum_nomTable.K_tickets,

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,

    withBlockageIfExisteDocSuivante:true,
    withReglementDocPrecedent:true,
    withReglement:true,
    
    estDocumentPrecedentTicket:true,
    type_doc_reg:enum_type_document.BON_RETOUR_MARCHANDISE_CLIENT
}
export const paramBonRetourMarchandiseClient = {
    title: 'Bon Retour Marchandise Client',
    titleButton: 'Bon Retour',

    pageList: "bonretourmarchandiseclient/list",
    pageDetails : "",
    pageModifie : "bonretourmarchandiseclient/edit/",
    pageAjoute : "bonretourmarchandiseclient/new",

    uriDocApi: "/bonretourmarchandiseclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "BonLivraison",
    apiGetDocumentsPrecedentByTier:'/bonLivraison',
    tableDocumentPrecedent:enum_nomTable.K_bonLivraisons,

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,

    withBlockageIfExisteDocSuivante:true,

    withQuantiteRestante:true,
    withCheckQuantiteRestante:true,

    withReglement:true,
    type_doc_reg:enum_type_document.BON_RETOUR_MARCHANDISE_CLIENT
}

export const paramBonRetourFinancierClient = {
    title: 'Bon Retour Financier Client',
    titleButton: 'Bon Retour',

    pageList: "bonretourfinancierclient/list",
    pageDetails : "",
    pageModifie : "bonretourfinancierclient/edit/",
    pageAjoute : "bonretourfinancierclient/new",

    uriDocApi: "/bonretourfinancierclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "BonLivraison",
    apiGetDocumentsPrecedentByTier:'/bonLivraison',
    tableDocumentPrecedent:enum_nomTable.K_bonLivraisons,

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,

    withBlockageIfExisteDocSuivante:true,

    withReglement:true,
    type_doc_reg:enum_type_document.BON_RETOUR_FINANCIER_FOURNISSEUR

}

export const paramDevisClient = {
    title: 'Devis Client',
    titleButton: 'Devis',

    pageList: "devisclient/list",
    pageDetails : "",
    pageModifie : "devisclient/edit/",
    pageAjoute : "devisclient/new",

    uriDocApi: "/devisclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "",
    apiGetDocumentsPrecedentByTier:'',

    withDocumentPrecedent:false,
    withBonCommandeClient:false,
    withTransporteur:false,

}

export const paramBonCommandeClient = {
    title: 'Bon Commande Client',
    titleButton: 'Bon Commande',

    pageList: "boncommandeclient/list",
    pageDetails : "",
    pageModifie : "boncommandeclient/edit/",
    pageAjoute : "boncommandeclient/new",

    uriDocApi: "/boncommandeclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Devis",
    apiGetDocumentsPrecedentByTier:'/devisclient',
    tableDocumentPrecedent:enum_nomTable.K_devisClients,

    withDocumentPrecedent:true,
    withBonCommandeClient:true,
    withTransporteur:false,

    withBlockageIfExisteDocSuivante:true,

    withCheckSolde:true
}

export const paramAvoirMarchandiseClient = {
    title: 'Avoir Marchandise Client',
    titleButton: 'Avoir',

    pageList: "avoirmarchandiseclient/list",
    pageDetails : "",
    pageModifie : "avoirmarchandiseclient/edit/",
    pageAjoute : "avoirmarchandiseclient/new",

    uriDocApi: "/avoirmarchandiseclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Retour Client",
    apiGetDocumentsPrecedentByTier:'/bonretourmarchandiseclient',
    tableDocumentPrecedent:enum_nomTable.K_bonRetourMarchandiseClients,
    withReglementDocumentPrecedent:true,

    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonretourmarchandiseclient",

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,


    withReglement:true,
    type_doc_reg:enum_type_document.AVOIR_MARCHANDISE_CLIENT
}

export const paramAvoirFinancierClient = {
    title: 'Avoir Financier Client',
    titleButton: 'Avoir',

    pageList: "avoirfinancierclient/list",
    pageDetails : "",
    pageModifie : "avoirfinancierclient/edit/",
    pageAjoute : "avoirfinancierclient/new",

    uriDocApi: "/avoirfinancierclient",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Retour Client",
    apiGetDocumentsPrecedentByTier:'/bonretourfinancierclient',
    tableDocumentPrecedent:enum_nomTable.K_bonRetourFinancierClients,
    withReglementDocumentPrecedent:true,
    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonretourfinancierclient",

    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,

    withReglement:true,
    type_doc_reg:enum_type_document.AVOIR_FINANCIER_CLIENT
}

export const paramFactureVente = {
    title: 'Facture Vente',
    titleButton: 'Facture',

    pageList: "facturevente/list",
    pageDetails : "",
    pageModifie : "facturevente/edit/",
    pageAjoute : "facturevente/new",

    uriDocApi: "/facturevente",
    apiGetDocuments: "lienGetDocuments",

    titreDocumentPrecedent: "Bon Livraison",
    apiGetDocumentsPrecedentByTier:'/bonLivraison',
    tableDocumentPrecedent:enum_nomTable.K_bonLivraisons,
    withCheckMultipleDocumentPrecedent:true,
    apiGetMultipleDocumentPrecedent:"/bonlivraison",
    withReglementDocumentPrecedent:true,
    withCheckSolde:true,
    withNotCheckSoldeIfWithDocPrecedent:true,
    withReglementDocPrecedent:true,
    withDocumentPrecedent:true,
    withBonCommandeClient:false,
    withTransporteur:false,

    withCheckQuantiteStock:true,

    withTimbreFiscal:true,
    getDocPrecedentbloquante:false,
    withReglement:true,
    type_doc_reg:enum_type_document.FACTURE_VENTE
}
