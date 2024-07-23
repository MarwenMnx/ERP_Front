import { enum_conditionReglement, enum_modeReglement, enum_statusProspection } from "src/app/global-enums";

export class Fournisseur {
    code:string;
    matriculeFiscale:string;
    _id?: string ;
    raisonSociale:string;
    tiersCategorie:string;
    telephone:string;
    mobile: string;
    email: string;
   
    solde: number;
    plafondSolde: number;
    enCours: number;
    plafondEnCours: number;
    remise: number;
    conditionReglement: string;
    tauxRS: number;
    exonereTva: boolean;
    exonereRS: boolean;
    actif: boolean;
     pays :string;
    gouvernorat: string;                    
    delegation: string;
    localite: string;
    codePostale: string;
    adresse: string;
    siteWeb: string;
    statusProspection: string; // enumeartion
    modeReglement: string; // enumeartion
    observation: string;
    adresseLivraison:any[];
    contact:any[];
    projet:any[];
    code_societe: string;
    deleted?: boolean;
    labels: any;
    
   constructor(fournisseur?: any) {
    this.code = fournisseur?.code || undefined;
      this._id = fournisseur?._id || undefined;
      this.matriculeFiscale= fournisseur?.matriculeFiscale || '';
      this.raisonSociale =fournisseur?.raisonSociale || '';
      this.telephone =fournisseur?.telephone || '';
      this.tiersCategorie =fournisseur?.tiersCategorie || '';
      this.mobile =fournisseur?.mobile || '';
      this.email =fournisseur?.email || '';
      this.solde =fournisseur?.solde || 0;
      this.plafondSolde =fournisseur?.plafondSolde || 0;
      this.enCours =fournisseur?.enCours || 0;      
      this.telephone =fournisseur?.telephone || '';
      this.plafondEnCours =fournisseur?.plafondEnCours || 0;
      this.remise =fournisseur?.remise || 0;
      this.conditionReglement =fournisseur?.conditionReglement || enum_conditionReglement.COMPTANT;
      this.tauxRS =fournisseur?.tauxRS || 0;
      this.exonereTva =fournisseur?.exonereTva || false;
      this.exonereRS =fournisseur?.exonereRS || false;
      this.actif =fournisseur?.actif || false;
      this.pays =fournisseur?.pays || '';
      this.gouvernorat =fournisseur?.gouvernorat || '';
      this.delegation =fournisseur?.delegation || '';
      this.localite =fournisseur?.localite || '';
      this.codePostale =fournisseur?.codePostale || '';
      this.adresse =fournisseur?.adresse || '';
      this.siteWeb =fournisseur?.siteWeb || '';
      this.statusProspection =fournisseur?.statusProspection || enum_statusProspection.JAMAIS_CONTACTE;
      this.modeReglement =fournisseur?.modeReglement || enum_modeReglement.ESPECE;
      this.observation =fournisseur?.observation || '';
      this.adresseLivraison =fournisseur?.adresseLivraison ? fournisseur?.adresseLivraison : [];
      this.contact = fournisseur?.contact ? fournisseur?.contact : [];
     
      this.projet =fournisseur?.projet || [];
      this.code_societe =fournisseur?.code_societe || undefined;
     
     
      // this.nom = fournisseur?.nom;
      // this.titre = fournisseur?.titre;
      // this.gouv = fournisseur?.gouv;
      // this.idpays = fournisseur?.idpays;
      // this.CP = fournisseur?.CP;
      // this.Delegation = fournisseur?.Delegation;
      // this.localite = fournisseur?.localite;
      // this.adresse = fournisseur?.adresse;
      this.labels = fournisseur?.labels;
   
    }}

    
export interface IFournisseur{
  _id: string | null;
  code: string | null;
  nom :string | null;  
  titre: string | null;                      
  gouv: string | null;  
  idpays: number | null;
  CP: string | null;  
  Delegation:string | null;
  raisonSociale:string | null;  


}

export interface ReponseList{
  MESSAGE:string;
  OK: boolean;
  RESULTAT:any  
}

  


  