export class Commande_client {
    id: number;
    etatCommande: string;
    dateCommande: Date;
    numCommande: number;
    dateBL: Date;
    numBL: number;
    dateDevis: Date;
    numDevis:number;
    codeClient: string;
    raisonSociale: string;
    totalBrute: number;
    totalRemise: number;
    totalNet:number;
    totalTva:number;
    totalRedevance:number;
    totalTTC:number;
    note:number;

  
    constructor(commande_client: any) {
      this.id = commande_client.id;
      this.etatCommande = commande_client.etatCommande;
      this.dateCommande = commande_client.dateCommande;
      this.numCommande = commande_client.numCommande;
      this.dateBL = commande_client.dateBL;
      this.numBL = commande_client.numBL;
      this.dateDevis = commande_client.dateDevis;
      this.numDevis = commande_client.numDevis;
      this.codeClient = commande_client.codeClient;
      this.raisonSociale = commande_client.raisonSociale;
      this.totalBrute = commande_client.totalBrute;
      this.totalRemise = commande_client.totalRemise;
      this.totalNet = commande_client.totalNet;
      this.totalTva = commande_client.totalTva;
      this.totalRedevance = commande_client.totalRedevance;
      this.totalTTC = commande_client.totalTTC;
      this.note = commande_client.note;
    }
}
  
  