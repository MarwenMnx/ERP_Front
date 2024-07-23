import { enum_conditionReglement, enum_modeReglement, enum_statusProspection } from "src/app/global-enums";

export class Client {
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
    exonereTimbre: boolean;
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
    url_maps:   string;
    longitude:  string;
    latitude:   string;

   constructor(client?: any) {
      this.code = client?.code || undefined;
      this._id = client?._id || undefined;
      this.matriculeFiscale       = client?.matriculeFiscale || '';
      this.raisonSociale          =client?.raisonSociale || '';
      this.telephone =client?.telephone || '';
      this.tiersCategorie =client?.tiersCategorie || '';
      this.mobile =client?.mobile || '';
      this.email =client?.email || '';
      this.solde =client?.solde || 0;
      this.plafondSolde =client?.plafondSolde || 0;
      this.enCours =client?.enCours || 0;
      this.telephone =client?.telephone || '';
      this.plafondEnCours =client?.plafondEnCours || 0;
      this.remise =client?.remise || 0;
      this.conditionReglement =client?.conditionReglement || enum_conditionReglement.COMPTANT;
      this.tauxRS =client?.tauxRS || 0;
      this.exonereTva =client?.exonereTva || false;
      this.exonereTimbre =client?.exonereTimbre || false;
      this.actif =client?.actif || false;
      this.pays =client?.pays || '';
      this.gouvernorat =client?.gouvernorat || '';
      this.delegation =client?.delegation || '';
      this.localite =client?.localite || '';
      this.codePostale =client?.codePostale || '';
      this.adresse =client?.adresse || '';
      this.siteWeb =client?.siteWeb || '';
      this.statusProspection =client?.statusProspection || enum_statusProspection.JAMAIS_CONTACTE;
      this.modeReglement =client?.modeReglement || enum_modeReglement.ESPECE;
      this.observation =client?.observation || '';
      this.adresseLivraison =client?.adresseLivraison ? client?.adresseLivraison : [];
      this.contact = client?.contact ? client?.contact : [];

      this.projet =client?.projet || [];
      this.code_societe =client?.code_societe || undefined;

      this.url_maps     = client?.url_maps || '';
      this.longitude    = client?.longitude || '';
      this.latitude     = client?.latitude || '';


      // this.nom = client?.nom;
      // this.titre = client?.titre;
      // this.gouv = client?.gouv;
      // this.idpays = client?.idpays;
      // this.CP = client?.CP;
      // this.Delegation = client?.Delegation;
      // this.localite = client?.localite;
      // this.adresse = client?.adresse;
      this.labels = client?.labels;

    }}


export interface IClient{
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




