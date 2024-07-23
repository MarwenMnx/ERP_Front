export class PromotionTable {
    _id:string
    numPromo: string
    dateDebut: Date
    dateFin: Date
    ancienPrix: number
    tauxRemise: number
    nouveauPrix: number

    constructor(promotion?: any) {
        this._id = promotion ? promotion._id : ''
        this.numPromo = promotion ? promotion?.numPromo : ''
        this.dateDebut = promotion ? promotion?.dateDebut : new Date
        this.dateFin = promotion ? promotion?.dateFin : new Date
        this.ancienPrix = promotion ? promotion?.ancienPrix : 0
        this.tauxRemise = promotion ? promotion?.tauxRemise : 0
        this.nouveauPrix = promotion ? promotion?.nouveauPrix : 0
    }
}