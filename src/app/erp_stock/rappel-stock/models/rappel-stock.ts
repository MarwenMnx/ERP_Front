import {Unite} from "../../../erp_params/unite/modeles/unite.model";
import {Categorie} from "../../../erp_params/categories/models/categorie.model";
import {Famille} from "../../../erp_params/familles/models/famille.model";
import {SousFamille} from "../../../erp_params/sous-famille/models/sous-famille.model";

export class Rappel_stock {

  id:                       number;
  reference:                string;
  designation:              string;
  codeBarre:                string;
  categorie:                Categorie;
  famille:                  Famille;
  sousFamille:              SousFamille;
  typeArticle:              string;

  qteEnStock:               number;
  unite1:                   Unite;
  unite2:                   Unite;
  coefficient:              number;
  qte_init_articlePV:       number;
  totalAchatQteUnite1:      number;
  totalAchatQteUnite2:      number;
  totalRetourFRQteUnite1:   number;
  totalRetourFRQteUnite2:   number;
  totalVenteQteUnite1:      number;
  totalVenteQteUnite2:      number;
  totalRetourCLQteUnite1:   number;
  totalRetourCLQteUnite2:   number;
  totalEntreeQteUnite1:     number;
  totalEntreeQteUnite2:     number;
  totalSortieQteUnite1:     number;
  totalSortieQteUnite2:     number;
  totalCorrectionQteUnite1: number;
  totalCorrectionQteUnite2: number;
  totalCasseQteUnite1:      number;
  totalCasseQteUnite2:      number;
  qteinit:                  number;
  qte_finale:               number;
  qte_finale_unite2:        number;

    constructor(correction_stock: any) {

      this.id                       = correction_stock.id;
      this.reference                = correction_stock.reference;
      this.designation              = correction_stock.designation;
      this.codeBarre                = correction_stock.codeBarre;
      this.categorie                = correction_stock.categorie;
      this.famille                  = correction_stock.famille;
      this.sousFamille              = correction_stock.sousFamille;
      this.typeArticle              = correction_stock.typeArticle;

      this.qteEnStock               = correction_stock.qteEnStock;
      this.unite1                   = correction_stock.unite1;
      this.unite2                   = correction_stock.unite2;
      this.coefficient              = correction_stock.coefficient;
      this.qte_init_articlePV       = correction_stock.qte_init_articlePV;
      this.totalAchatQteUnite1      = correction_stock.totalAchatQteUnite1;
      this.totalAchatQteUnite2      = correction_stock.totalAchatQteUnite2;
      this.totalRetourFRQteUnite1   = correction_stock.totalRetourFRQteUnite1;
      this.totalRetourFRQteUnite2   = correction_stock.totalRetourFRQteUnite2;
      this.totalVenteQteUnite1      = correction_stock.totalVenteQteUnite1;
      this.totalVenteQteUnite2      = correction_stock.totalVenteQteUnite2;
      this.totalRetourCLQteUnite1   = correction_stock.totalRetourCLQteUnite1;
      this.totalRetourCLQteUnite2   = correction_stock.totalRetourCLQteUnite2;
      this.totalEntreeQteUnite1     = correction_stock.totalEntreeQteUnite1;
      this.totalEntreeQteUnite2     = correction_stock.totalEntreeQteUnite2;
      this.totalSortieQteUnite1     = correction_stock.totalSortieQteUnite1;
      this.totalSortieQteUnite2     = correction_stock.totalSortieQteUnite2;
      this.totalCorrectionQteUnite1 = correction_stock.totalCorrectionQteUnite1;
      this.totalCorrectionQteUnite2 = correction_stock.totalCorrectionQteUnite2;
      this.totalCasseQteUnite1      = correction_stock.totalCasseQteUnite1;
      this.totalCasseQteUnite2      = correction_stock.totalCasseQteUnite2;
      this.qteinit                  = correction_stock.qteinit;
      this.qte_finale               = correction_stock.qte_finale;
      this.qte_finale_unite2        = correction_stock.qte_finale_unite2;

    }
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}
