export class ComposantTable {
    _id: string;
    sousArticle: string;
    reference: string;
    designation: string;
    prixAchat: number;
    tauxTVA: number;
    prixHT: number;
    prixTTC: number;
    quantite: number;
    totalHT: number;
    totalTTC: number;
  
    constructor(product: any) {
      this._id = product._id;
      this.sousArticle = product.sousArticle;
      this.reference = product.reference;
      this.designation = product.designation;
      this.prixAchat = product.prixAchat;
      this.tauxTVA = product.tauxTVA;
      this.prixHT = product.prixHT;
      this.prixTTC = product.prixTTC;
      this.quantite = product.quantite;
      this.totalHT = product.totalHT;
      this.totalTTC = product.totalTTC;
    }

}
  