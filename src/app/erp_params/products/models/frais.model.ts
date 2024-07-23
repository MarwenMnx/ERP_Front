export class FraisTable {
    _id: string;
    montantHT: number;
    frais: string;
    fraisLibelle: string;
    tauxTVA: number;
    montantTTC: number;
  
    constructor(product: any) {
      this._id = product._id
      this.montantHT = product.montantHT
      this.frais = product.frais
      this.fraisLibelle = product.fraisLibelle 
      this.tauxTVA = product.tauxTVA 
      this.montantTTC = product.montantTTC
    }

}
  