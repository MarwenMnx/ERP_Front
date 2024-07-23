export class FideliteTable {
    _id: string;
    carte: string;
    nbPoint: number;
    taux: number;
    
    constructor(product: any) {
      this._id = product._id
      this.carte = product.carte
      this.nbPoint = product.nbPoint 
      this.taux = product.taux
    }

}
  