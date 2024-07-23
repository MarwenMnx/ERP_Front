export class Journal_Vente {
    id: number;
    dateVente: Date;
    numVente: number;
    numFacture: number;
    dateFacture: Date;
    codeClient: number;
    raisonSociale: string;
    refArticle:string;
    desiArticle:string;
    categorie:string;
    famille:string;
    sousFamille:string;
    quantitè:number;
    unitè:string;
    pvUHT: number;
    totalBrut : number;
    TauxRemise:number;
    montantRemise:number;
    totalNet:number;
    tauxTVA:number;
    MontantTVA:number;
    redevance:number;
    puTTC:number;
    totalTTC:number;


    constructor(journal_vente: any) {
      this.id = journal_vente.id;
      this.dateVente = journal_vente.dateVente;
      this.numVente = journal_vente.numVente;
      this.numFacture = journal_vente.numFacture;
      this.dateFacture = journal_vente.dateFacture;
      this.refArticle = journal_vente.refArticle;
      this.desiArticle = journal_vente.desiArticle;
      this.categorie = journal_vente.categorie;
      this.codeClient = journal_vente.codeClient;
      this.raisonSociale = journal_vente.raisonSociale;
      this.famille = journal_vente.famille;
      this.sousFamille = journal_vente.sousFamille;
      this.totalNet = journal_vente.totalNet;
      this.quantitè = journal_vente.quantitè;
      this.unitè = journal_vente.unitè;
      this.totalTTC = journal_vente.totalTTC;
      this.pvUHT = journal_vente.pvUHT;
      this.totalBrut = journal_vente.totalBrut;
      this.TauxRemise = journal_vente.TauxRemise;
      this.montantRemise = journal_vente.montantRemise;
      this.tauxTVA = journal_vente.tauxTVA;
      this.MontantTVA = journal_vente.MontantTVA;
      this.redevance = journal_vente.redevance;
      this.puTTC = journal_vente.puTTC;


    }
}
