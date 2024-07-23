import {Product} from "../../products/models/product.model";
import {Depot} from "../../depot/models/depot.model";

export class ArticleDepotPvs {
    _id?:             string;
    article:          Product;
    depotpv:          Depot;
    quantite:         number;
    actif_balance:    boolean;
    code_balance:     string;
  venteStockNegatif:  boolean;

    constructor(articleDepotPvs: any) {
      this._id                = articleDepotPvs._id;
      this.article            = articleDepotPvs.article;
      this.depotpv            = articleDepotPvs.depotpv;
      this.quantite           = articleDepotPvs.quantite;
      this.actif_balance      = articleDepotPvs.actif_balance;
      this.code_balance       = articleDepotPvs.code_balance;
      this.venteStockNegatif  = articleDepotPvs.venteStockNegatif;
    }
  }

export interface IArticleDepotPvs{
  _id:      string    | null;
  article:  Product[] | null;
  depotpv:  Depot     | null;
  quantite: number    | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


