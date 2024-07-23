export class EmplacementTable {
    _id: string;
    depot_pv: Object;
    magasin: string;
    rayon: number;
    casier: string;
    niveau: number;
    selected:boolean;
    qte_min: Number;
    qte_max: Number;
    venteStockNegatif: Boolean;
    stockReaprov: Number;
    enVente: Boolean;
    constructor(product: any) {
      this._id = product._id
      this.depot_pv = product.depot_pv
      this.magasin = product.magasin
      this.rayon = product.rayon
      this.casier = product.casier
      this.niveau = product.niveau
      this.selected = product.selected
      this.qte_min = product.qte_min
      this.qte_max = product.qte_max
      this.venteStockNegatif = product.venteStockNegatif
      this.stockReaprov = product.stockReaprov
      this.enVente = product.enVente
    }

}
