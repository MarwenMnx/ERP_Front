export class PrixQteTable {
    _id: string;
    qteMin: number;
    qteMax: number;
    prixHT: number;
    prixTTC: number;

    constructor(prixQte?: any) {
      this._id = prixQte?._id || ''
      this.qteMin = prixQte?.qteMin || 0
      this.qteMax = prixQte?.qteMax || 0
      this.prixHT = prixQte?.prixHT || 0
      this.prixTTC = prixQte?.prixTTC || 0
    }

}
  