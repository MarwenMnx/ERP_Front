
export enum enum_nomTable {
  K_articles = "articles",
  K_categories = "categories",
  K_tierscategories = "tierscategories",
  K_clients = "clients",
  K_conditionsreglements = "conditionsreglements",
  K_contacts = "contacts",
  K_delegations = "delegations",
  K_depot_PVs = "depot_pvs",
  K_exercices = "exercices",
  K_familles = "familles",
  K_fournisseurs = "fournisseurs",
  K_frais = "frais",
  K_gouvernorats = "gouvernorats",
  K_marques = "marques",
  K_modeles = "modeles",
  K_localites = "localites",
  K_pays = "pays",
  K_projets = "projets",
  K_roles = "roles",
  K_societes = "societes",
  K_sousfamilles = "sousfamilles",
  K_tauxtvas = "tauxtvas",
  K_tickets = "tickets",
  K_typecontacts = "typecontacts",
  K_unites = "unites",
  K_banques = "banques",
  K_machineCaisses = "machinecaisses",
  K_sessionCaisses = "sessioncaisses",
  K_plans = "plans",
  K_articleDepotPVs = "articledepotpvs",
  K_reglementClients = "reglementclients",
  K_reglementFournisseurs = "reglementfournisseurs",
  K_typeChequeTickets = "typechequetickets",
  K_typeCarteFidelites = "typecartefidelites",
  K_carteFidelites = "cartefidelites",
  K_bonFidelites = "bonfidelites",
  K_typeCharges = "typecharges",
  K_charges = "charges",
  K_soldeClients = "soldeclients",
  K_soldeFournisseurs = "soldefournisseurs",
  K_soldeArticles = "soldearticles",
  // K_qteInitialeArticles = "qteinitialearticles",
  K_utilisateurs = "utilisateurs",
  K_caisses = "caisses",
  K_balanceArticles = "balancearticles",
  K_balances = "balances",
  K_bonCasses = "boncasses",
  K_demandeAlimentations = "demandealimentations",
  K_bonSorties = "bonsorties",
  K_bonEntrees = "bonentrees",
  K_inventaires = "inventaires",
  K_correctionStocks = "correctionstocks",
  K_bonReceptionFournisseurs = "bonreception_frs",
  K_bonCommandeFournisseurs = "boncommande_frs",
  K_bonCommandeClients = "boncommande_cls",
  K_devisFournisseurs = "devis_frs",
  K_devisClients = "devis_cls",
  K_bonAchats = "bonachats",
  K_factureAchats = "factureachats",
  K_bonLivraisons = "bonlivraisons",
  K_factureVentes = "factureventes",
  K_bonRetourMarchandiseClients = "br_marchandise_cls",
  K_avoirMarchandiseClients = "avoir_marchandise_cls",
  K_bonRetourFinancierClients = "br_financier_cls",
  K_avoirFinancierClients = "avoir_financier_cls",
  K_bonRetourMarchandiseFournisseurs = "br_marchandise_frs",
  K_avoirMarchandiseFournisseurs = "avoir_marchandise_frs",
  K_bonRetourFinancierFournisseurs = "br_financier_frs",
  K_avoirFinancierFournisseurs = "avoir_financier_frs",
  K_compteBancaires = "comptebancaires",
  K_marqueVehicules = "marquevehicules",
  K_modeleVehicules = "modelevehicules",
  K_typeVehicules = "typevehicules",
  K_sousTypeVehicules = "soustypevehicules",
  K_leasings = "leasings",
  K_vehicules = "vehicules",
  K_chauffeurs = "chauffeurs",
  K_typepiecejointe = "typepiecejointes",
  K_piecejointe = "piecejointes",
  K_parametrage_importation = "parametrage_importation"
}

export enum enum_prefix {
  P_CLIENT = "CL",
  P_FOURNISSEUR = "FR",
  P_TICKET = "TCK",
  P_BON_CASSE = "BC",
  P_BON_SORTIE = "BS",
  P_INVENTAIRE = "IV",

  P_REGLEMENT_FOURNISSEUR = "RF",
  P_REGLEMENT_CLIENT_BL = "RCL",
  P_REGLEMENT_CLIENT_TICKET = "RCT",
  P_CARTE_FIDELITE = "9999",  // 4 pour prefix + 8 pour num
  P_BON_FIDELITE = "BF",
  P_CHARGE = "CH",
  P_BON_RECEPTION = "BR",
  P_BON_LIVRAISON = "BL"
}

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  internal_server_error = 500,
}

export enum enum_types_articles {
  PS = 1, // "Produit Simple",
  PF = 2, // "Produit Fini",
  MP = 3, //"Matière Première",
  SR = 4, //"Service",
}

export enum enum_types_vente {
  PC = 1, //"Pièce"
  PD = 2, //"Poids",
  UN = 3, //"Unité",
}

export enum enum_type_operation {
  VENTE = 1,
  ACHAT = 2,
  REVIENT = 3,
}

export enum enum_typetiers {
  client = 1,
  fournisseur = 2,
}

export enum enum_civilite {
  Mme = 1,
  Mr = 2,
}

export enum enum_tauxRS {
  t0 = 0,
  t05 = 0.5,
  t1 = 1,
  t15 = 1.5,
}

export enum enum_statusProspection {
  JAMAIS_CONTACTE = 1,
  A_CONTACTER = 2,
  NE_PAS_CONTACTER = 3,
  CONTACT_EN_COURS = 4,
  CONTACT_REALISE = 5,
}

export enum enum_conditionReglement {
  COMPTANT = 1,
  A_LA_LIVRAISON = 2,
  A_LA_RECEPTION_DE_FACTURE = 3,
  J30 = 4,
  J30_FIN_MOIS = 5,
  J30_MOIS_SUIVANT = 6,
  J60 = 7,
  J60_FIN_MOIS = 8,
  J60_MOIS_SUIVANT = 9,
  PAIEMENT_3fOIS = 10,
}

export enum enum_modeReglement {
  ESPECE = 1,
  CHEQUE = 2,
  TRAITE = 3,
  VIREMENT = 4,
  VERSEMENT = 5,
  TICKET = 6,
  CARTE_BANCAIRE = 7,
}

export enum enum_etatDocument {
  EN_ATTENTE = 1,
  EN_COURS = 2,
  VALIDER = 3,
  REFUSER = 4,
}
export enum enum_typeDepotPV {
  DEPOT = 0,
  POINTVENTE = 1
}

export enum enum_typeFichier {
  IMAGE = "image",
  DOCUMENTS = "documents"
}

/* new enums ajouteès pour le module BonSorties*/

export enum enum_type_transport {
  INTERNE = "1",
  EXTERNE = "2",
}

export enum enum_etat_bonsortie {
  ENATTENTE = 1,
  ENCOURS = 2,
  LIVRER = 3,
  NONLIVRER = 4
}

export interface QueryDocument extends Document {
  _id: String,
  code_societe: String
  code_exercice: String
  code_depotpv: String

  type: enum_typeFichier
  id_file: String
}

export const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const numbers = '0123456789';

export enum enum_type_document { //document lettrageReglement

  REGLEMENT_CLIENT = enum_nomTable.K_reglementClients,
  REGLEMENT_FOURNISSEUR = enum_nomTable.K_reglementFournisseurs,

  BON_RECEPTION_FOURNISSEUR = enum_nomTable.K_bonReceptionFournisseurs, //  "bonreceptions",
  BON_ACHAT = enum_nomTable.K_bonAchats,
  FACTURE_ACHAT = enum_nomTable.K_factureAchats,

  TICKET = enum_nomTable.K_tickets,
  BON_LIVRAISON = enum_nomTable.K_bonLivraisons,
  FACTURE_VENTE = enum_nomTable.K_factureVentes,

  BON_SORTIE = enum_nomTable.K_bonSorties,
  BON_ENTREE = enum_nomTable.K_bonEntrees,
  BON_CASSE = enum_nomTable.K_bonCasses,


  BON_RETOUR_MARCHANDISE_TICKET = enum_nomTable.K_bonRetourMarchandiseClients,
  BON_RETOUR_MARCHANDISE_CLIENT = enum_nomTable.K_bonRetourMarchandiseClients,
  BON_RETOUR_FINANCIER_CLIENT = enum_nomTable.K_bonRetourFinancierClients,
  BON_RETOUR_MARCHANDISE_FOURNISSEUR = enum_nomTable.K_bonRetourMarchandiseFournisseurs,
  BON_RETOUR_FINANCIER_FOURNISSEUR = enum_nomTable.K_bonRetourFinancierClients,

  AVOIR_MARCHANDISE_CLIENT = enum_nomTable.K_avoirMarchandiseClients,
  AVOIR_FINANCIER_CLIENT = enum_nomTable.K_avoirFinancierClients,
  AVOIR_MARCHANDISE_FOURNISSEUR = enum_nomTable.K_avoirMarchandiseFournisseurs,
  AVOIR_FINANCIER_FOURNISSEUR = enum_nomTable.K_avoirFinancierClients,

  BON_COMMANDE = enum_nomTable.K_bonCommandeFournisseurs,

}

export enum enum_type_document_vente {
  BON_MARCHANDISE_CLIENTS = "br_marchandise_cls",
  AVOIR_MARCHANDISE_CLIENTS = "avoir_marchandise_cls",
  BON_LIVRAISONS = "bonlivraisons",
  FACTURE_VENTES = "factureventes",
}

export enum enum_type_document_entree_sortie {
  BON_RECEPTION_FOURNISSEUR = "bonreception_frs",
  BON_ACHATS = "bonachats",
  FACTURE_ACHATS = "factureachats",
  BON_MARCHANDISE_CLIENTS = "br_marchandise_cls",
  AVOIR_MARCHANDISE_CLIENTS = "avoir_marchandise_cls",
  BON_ENTREES = "bonentrees",
  TICKETS = "tickets",
  BON_LIVRAISONS = "bonlivraisons",
  FACTURE_VENTES = "factureventes",
  BON_RETOUR_MARCHANDISE_FOURNISSEURS = "br_marchandise_frs",
  AVOIR_MARCHANDISE_FOURNISSEURS = "avoir_marchandise_frs",
  BON_CASSES = "boncasses",
  BON_SORTIES = "bonsorties",
  CORRECTION_STOCK = "correctionStocks"
}
export enum enum_type_document_entree {
  BON_RECEPTION_FOURNISSEUR = "bonreception_frs",
  BON_ACHATS = "bonachats",
  FACTURE_ACHATS = "factureachats",
  BON_MARCHANDISE_CLIENTS = "br_marchandise_cls",
  AVOIR_MARCHANDISE_CLIENTS = "avoir_marchandise_cls",
  BON_ENTREES = "bonentrees",
  CORRECTION_STOCK = "correctionStocks"
}
export enum enum_type_document_sortie {
  TICKETS = "tickets",
  BON_LIVRAISONS = "bonlivraisons",
  FACTURE_VENTES = "factureventes",
  BON_RETOUR_MARCHANDISE_FOURNISSEURS = "br_marchandise_frs",
  AVOIR_MARCHANDISE_FOURNISSEURS = "avoir_marchandise_frs",
  BON_CASSES = "boncasses",
  BON_SORTIES = "bonsorties",
  CORRECTION_STOCK = "correctionStocks"
}

export enum enum_modes_imprission {
  modeNormale = 0,
  modeWithRegroupement = 1,
  modeSansRegroupement = 2
}

export enum enum_colonnes_list {
  product = "PRODUCT_COLONNES_LIST",
  documentAchat = "DOCUMENTACHAT_COLONNES_LIST",
  documentVENTE = "DOCUMENTVENTE_COLONNES_LIST",
  ligneDocumentAchat = "LIGNEDOCUMENTACHAT_COLONNES_LIST",
  ligneDocumentVENTE = "LIGNEDOCUMENTVENTE_COLONNES_LIST",

  mouvementStock = "MOUVEMENTSTOCK_LIST"
}

export enum enum_type_mouvement {
  ENTREE_STOCK = 1, // "Entrée en stock",
  SORTIE_STOCK = -1, // "Sortie de stock",
  // ENTREE_SORTIE_STOCK = 0, //"Entrée sortie de stock"
}

export enum enum_table_piecejointe {
  ARTICLE = enum_nomTable.K_articles,
  CLIENT = enum_nomTable.K_clients,
  FOURNISSEUR = enum_nomTable.K_fournisseurs,
}

export enum enum_status_paiement{
  tous = 0,
  payee = 1,
  nonpayee = 2,
}

export enum page_orientation{
  portrait = "portrait",
  landscape = "landscape"
}

export enum list_date_range_label{
  Today               = "Aujourd'hui",
  YesterdayAndToday   = "Hier et aujourd'hui",
  Yesterday           = 'Hier',
  Last7Days           = 'Dernier 7 jours',
  Last30Days          = 'Dernier 30 jours',
  ThisMonth           = 'Mois en cours',
  PreviousMonth       = 'Mois dernier',
  ThisYear            = 'Année en cours',
  PreviousYear        = 'Année dernière',
  // Tomorrow            = 'Demain',
  // Next7Days           = 'Prochain 7 jours',
  // Next30Days          = 'Prochain 30 jours',
  Custom              = 'Libre'
}
