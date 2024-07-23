import { enum_type_operation, enum_types_articles, enum_types_vente } from "src/app/global-enums";
import { Categorie } from "../../categories/models/categorie.model";
import { Famille } from "../../familles/models/famille.model";
import { SousFamille } from "../../sous-famille/models/sous-famille.model";
import { Unite } from "../../unite/modeles/unite.model";

export class Product {
    _id: string;
    reference: string;
    codeBarre: string;
    designation: string
    typeArticle:number
    categorie: Categorie | null | string
    categorieLibelle: string | undefined
    famille: Famille | null
    familleLibelle: string | undefined
    sousFamille: SousFamille | null
    sousFamilleLibelle: string | undefined
    venduPar: number
    valeurStock: number
    qteEnStock: number
    pmp: number
    unite1: Unite | null
    unite1Libelle: string | undefined
    archive: boolean
    lotSerieActive: boolean
    enVente: boolean
    enAchat: boolean
    raccourciPLU: string
    prixFourn: number
    remiseF: number
    remiseMontant: number

    isFodecA: boolean
    tauxFodecA: number
    prixFodecA: number
    isDC: boolean
    tauxDC: number
    prixDC: number

    isDCVente:boolean
    tauxDCVente: number
    prixDCVente: number

    isRedevanceVente:boolean

    prixAchatNet: number
    tauxTVA: number
    montantTVA: number
    prixAchat: number
    prixAchatTTC: number
    prixRevient: number
    redevance: number
    prixRevientTTC: number
    margeAppliqueeSur: number
    tauxMarge: number
    prixMarge: number
    prixVenteHT: number
    prixNetVenteHT: number
    isFodecV: boolean
    tauxFodecV: number
    prixFodecV: number
    montantTVAVente: number
    prixTTC: number
    pVenteConseille: number
    coefficient: number
    marque: string
    marqueLibelle: string | undefined
    fournisseur: string
    unite2: Unite | null
    unite2Libelle: string | undefined
    modele: string
    modeleLibelle: string | undefined
    refFournisseur: string
    description: string
    observations: string
    frais: any[]
    estPack: boolean
    sousArticles: any[]
    venteStockNegatif: boolean
    stockReaprov: number
    stockMin: number
    stockMax: number
    longueur: number
    largeur: number
    hauteur: number
    uniteLLH: string
    surface: number
    volume: number
    poids: number
    unitePoids: string
    emplacement: any[]
    colisage: any[]
    sansRemise: boolean
    plafondRemise: number
    prixParQte: boolean
    prixQte: any[]
    enPromotion: boolean
    promotion: any[]
    fidelite: any[]
    pointFidelite: boolean
    nbPointFix: boolean
    nbPointVar: boolean
    totalFrais: number
    enBalance: boolean
    estNouveau: boolean
    estDisponible: string
    enArchive: string
    enVedette: string
    enLiquidation: string
    couleur: string
    prixVenteHT2: number
    prixVenteHT3: number
    qteTheorique: number
    imageURL: string
    image: FileDocument
    active:boolean
    constructor(product?: any) {
      this._id = product?._id || undefined;
      this.reference = product?.reference || '';
      this.codeBarre = product?.codeBarre || '';
      this.designation = product?.designation || '';
      this.typeArticle = product?.typeArticle || enum_types_articles.PS;
      this.categorie = product?.categorie || {};
      this.categorieLibelle = product?.categorie?.libelle || "";
      this.famille = product?.famille || {};
      this.familleLibelle = product?.famille?.libelle || "";
      this.sousFamille = product?.sousFamille || {};
      this.sousFamilleLibelle = product?.sousFamille?.libelle || "";
      this.venduPar = product?.venduPar || enum_types_vente.PC;
      this.valeurStock = product?.valeurStock || 0;
      this.qteEnStock = product?.qteEnStock || 0;
      this.pmp = product?.pmp || 0;
      this.unite1 = product?.unite1 || null;
      this.unite1Libelle = product?.unite1?.libelle || "";
      this.archive = product?.archive || true;
      this.lotSerieActive = product?.lotSerieActive  || false;
      this.enVente = product?.enVente || true;
      this.enAchat = product?.enAchat || true;
      this.raccourciPLU = product?.raccourciPLU || '';
      this.prixFourn = product?.prixFourn || 0;
      this.remiseF = product?.remiseF || 0;
      this.remiseMontant = product?.remiseMontant || 0;
      this.isFodecA = product?.isFodecA || false;
      this.tauxFodecA = product?.tauxFodecA || 1;
      this.prixFodecA = product?.prixFodecA || 0;
      this.isDC = product?.isDC || false;
      this.tauxDC = product?.tauxDC || 0;
      this.prixDC = product?.prixDC || 0;
      this.prixAchatNet = product?.prixAchatNet || 0;
      this.tauxTVA = product?.tauxTVA || 0;
      this.montantTVA = product?.montantTVA || 0;
      this.prixAchat = product?.prixAchat || 0;
      this.prixAchatTTC = product?.prixAchatTTC || 0;
      this.prixRevient = product?.prixRevient || 0;
      this.redevance = product?.redevance || 0;
      this.prixRevientTTC = product?.prixRevientTTC || 0;
      this.margeAppliqueeSur = product?.margeAppliqueeSur || enum_type_operation.ACHAT;
      this.tauxMarge = product?.tauxMarge || 0;
      this.prixMarge = product?.prixMarge || 0;
      this.prixVenteHT = product?.prixVenteHT || 0;
      this.prixNetVenteHT = product?.prixNetVenteHT || 0;
      this.isFodecV = product?.isFodecV || false;
      this.tauxFodecV = product?.tauxFodecV || 1;
      this.prixFodecV = product?.prixFodecV || 0;
      this.montantTVAVente = product?.montantTVAVente || 0;
      this.prixTTC = product?.prixTTC || 0;
      this.pVenteConseille = product?.pVenteConseille || 0;
      this.coefficient = product?.coefficient || 1;
      this.marque = product?.marque || '';
      this.marqueLibelle = product?.marque?.libelle || "";
      this.fournisseur = product?.fournisseur || '';
      this.unite2 = product?.unite2 || null;
      this.unite2Libelle = product?.unite2?.libelle || "";
      this.modele = product?.modele || '';
      this.modeleLibelle = product?.modele?.libelle || "";
      this.refFournisseur = product?.refFournisseur || '';
      this.description = product?.description || '';
      this.observations = product?.observations || '';
      this.frais = product?.frais || [];
      this.estPack = product?.estPack || false;
      this.sousArticles = product?.sousArticles || [];
      this.venteStockNegatif = product?.venteStockNegatif || false;
      this.stockReaprov= product?.stockReaprov || 0;
      this.stockMin= product?.stockMin || 0;
      this.stockMax= product?.stockMax || 0;
      this.longueur= product?.longueur || 0;
      this.largeur= product?.largeur || 0;
      this.hauteur= product?.hauteur || 0;
      this.uniteLLH= product?.uniteLLH || undefined;
      this.surface= product?.surface || 0;
      this.volume= product?.volume || 0;
      this.poids= product?.poids || 0;
      this.unitePoids= product?.unitePoids || undefined;
      this.emplacement = product?.emplacement || [];
      this.colisage = product?.colisage || [];
      this.sansRemise = product?.sansRemise || true;
      this.plafondRemise = product?.plafondRemise || 0;
      this.prixParQte = product?.prixParQte || true;
      this.prixQte = product?.prixQte || [];
      this.enPromotion = product?.enPromotion || false;
      this.promotion = product?.promotion || [];
      this.fidelite = product?.fidelite || [];
      this.pointFidelite = product?.pointFidelite || true;
      this.nbPointFix= product?.nbPointFix || false;
      this.nbPointVar= product?.nbPointVar || true;
      this.totalFrais= product?.totalFrais || '';
      this.enBalance= product?.enBalance || false;
      this.estNouveau= product?.estNouveau || false;
      this.estDisponible= product?.estDisponible || undefined;
      this.enArchive= product?.enArchive || undefined;
      this.enVedette= product?.enVedette || undefined;
      this.enLiquidation= product?.enLiquidation || undefined;
      this.couleur= product?.couleur || undefined;
      this.prixVenteHT2= product?.prixVenteHT2 || 0;
      this.prixVenteHT3= product?.prixVenteHT3 || 0;
      this.qteTheorique= product?.qteTheorique || 0;
      this.imageURL = product?.imageURL || undefined;
      this.image    = product?.image || [];
      this.active = product?.active || true;
      this.isDCVente = product?.isDCVente || false;
      this.tauxDCVente = product?.tauxDCVente || 0;
      this.prixDCVente = product?.prixDCVente || 0;
      this.isRedevanceVente = product?.isRedevanceVente || false;
    }
}

export interface FileDocument {
  _id:      string
  filename: string
  mimetype: string
  path:     string
}
