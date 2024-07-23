// import { Famille } from "src/app/erp_params/familles/models/famille.model";

export class Vehicule {
  _id: string;
  libelle: string;
  immatricule: string;
  // famille:Famille;
  num_chassis: string;
  type_plateau: string;
  charge_total: number;
  essieu: number;
  nbre_cheveaux: number;
  poid_vide: number;
  charge_utile: number;
  nb_places: number;
  date_mise_circulation: Date;
  date_achat: Date;
  date_main_leve_leasing: Date;
  basculante: boolean;
  valeur_achat: number;
  type_conteur: string;
  nombre_km_actuelle: string;
  notes: string;

  //les listes a afficheès 
  marque_vehicule:string;  
  type_vehicule:string;
  soustype_vehicule:string;
  modele_vehicule:string;
  leasing :string;

  constructor(vehicule?: any) {
    this._id = vehicule?._id || '';
    this.libelle = vehicule?.libelle || '';
    this.immatricule = vehicule?.immatricule || '';
    this.num_chassis = vehicule?.num_chassis || '';
    this.type_plateau = vehicule?.type_plateau || '';
    this.charge_total = vehicule?.charge_total ;
    this.essieu = vehicule?.essieu;
    this.nbre_cheveaux = vehicule?.nbre_cheveaux ;
    this.poid_vide = vehicule?.poid_vide;
    this.charge_utile = vehicule?.charge_utile;
    this.nb_places = vehicule?.nb_places ;
    this.date_mise_circulation = vehicule?.date_mise_circulation || '';
    this.date_achat = vehicule?.date_achat || '';
    this.date_main_leve_leasing = vehicule?.date_main_leve_leasing || '';
    this.basculante = vehicule?.basculante || false;
    this.valeur_achat = vehicule?.valeur_achat;
    this.type_conteur = vehicule?.type_conteur || '';
    this.nombre_km_actuelle = vehicule?.nombre_km_actuelle || '';
    this.notes = vehicule?.notes || '';
    this.marque_vehicule = vehicule?.marque_vehicule || '';
    this.type_vehicule = vehicule?.type_vehicule || '';
    this.soustype_vehicule = vehicule?.soustype_vehicule || '';
    this.modele_vehicule = vehicule?.modele_vehicule || '';
    this.leasing = vehicule?.leasing || '';







    // this.famille = modèle?.famille || '';
  }
}

export interface IVehicule {
  _id: string | null;
  libelle: string | null;
  immatricule: string | null;
  num_chassis: string | null;
  type_plateau: string | null;
  charge_total: number    | null; 
  essieu: number    | null;
  nbre_cheveaux: number    | null;
  poid_vide: number    | null;
  charge_utile: number    | null;
  nb_places: number    | null;
  date_mise_circulation: Date;
  date_achat: Date;
  date_main_leve_leasing: Date;
  basculante: Boolean;
  valeur_achat: number    | null;
  type_conteur: string | null;
  nombre_km_actuelle: string | null;
  notes: string | null;

  /*les listes deroulantes*/ 
  marque_vehicule: string | null;
  type_vehicule: string | null;
  soustype_vehicule: string | null;
  modele_vehicule: string | null;
  leasing: string | null;


}

export interface ReponseList {
  MESSAGE: string;
  OK: Boolean;
  RESULTAT: any;
}
