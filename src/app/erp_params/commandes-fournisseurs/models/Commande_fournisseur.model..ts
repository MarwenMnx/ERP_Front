export class Commande_fournisseur {
    id: number;
    etatCommande: string;
    dateCommande: Date;
    numCommande: number;
    dateBC: Date;
    numBR: number;
    codeFournisseur: string;
    raisonSociale: string;
    totalBrute: number;
    totalRemise: number;
    totalNet:number;
    totalTva:number;
    totalRedevance:number;
    totalTTC:number;
    note:number;

  
    constructor(commande_fournisseur: any) {
      this.id = commande_fournisseur.id;
      this.etatCommande = commande_fournisseur.etatCommande;
      this.dateCommande = commande_fournisseur.dateCommande;
      this.numCommande = commande_fournisseur.numCommande;
      this.dateBC = commande_fournisseur.dateBC;
      this.numBR = commande_fournisseur.numBR;
      this.codeFournisseur = commande_fournisseur.codeFournisseur;
      this.raisonSociale = commande_fournisseur.raisonSociale;
      this.totalBrute = commande_fournisseur.totalBrute;
      this.totalRemise = commande_fournisseur.totalRemise;
      this.totalNet = commande_fournisseur.totalNet;
      this.totalTva = commande_fournisseur.totalTva;
      this.totalRedevance = commande_fournisseur.totalRedevance;
      this.totalTTC = commande_fournisseur.totalTTC;
      this.note = commande_fournisseur.note;
    }
}
  
  