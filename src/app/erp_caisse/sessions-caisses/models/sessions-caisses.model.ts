import { User } from "../../../erp_params/users/models/user.model";

export class Sessions_caisse {

    _id?: number;
    numero: number;
    nom_machine_caisse: string;
    date_ouverture:Date;
    cloture:boolean;
    date_cloture:Date;
    fond_caisse_superviseur:number;
    fond_caisse_caissier:number;
    totale_vente_espece: number;
    totale_TTC_article: number;
    totale_ecart_negatif: number;
    total_encaissement: number;
    total_decaissement: number;
    montant_ecart: number;
    total_gain: number;
    notes: string;
    code_depotpv: string;
    utilisateur_caissier:User;
    utilisateur_cloture:User;
    detail_reglement:Detail_reglement;
    validation_cloture:boolean
    depot_PV_source: {
      _id: string,
      libelle: string,
      code_unique:string,
    };
    constructor(sessions_caisse?: any) {
      this._id                        = sessions_caisse?._id || '';
      this.numero                     = sessions_caisse?.numero  || '';
      this.utilisateur_caissier       = sessions_caisse?.utilisateur_caissier  || '';
      this.nom_machine_caisse         = sessions_caisse?.nom_machine_caisse  || '';
      this.total_encaissement         = sessions_caisse?.total_encaissement || ''
      this.date_ouverture             = sessions_caisse?.date_ouverture || ''
      this.cloture                    = sessions_caisse?.cloture || false
      this.date_cloture               = sessions_caisse?.date_cloture || ''
      this.fond_caisse_superviseur    = sessions_caisse?.fond_caisse_superviseur || ''
      this.fond_caisse_caissier       = sessions_caisse?.fond_caisse_caissier || ''
      this.total_decaissement         = sessions_caisse?.total_decaissement || ''
      this.totale_vente_espece        = sessions_caisse?.totale_vente_espece || ''
      this.totale_TTC_article         = sessions_caisse?.totale_TTC_article || ''
      this.totale_ecart_negatif       = sessions_caisse?.totale_ecart_negatif || ''
      this.notes                      = sessions_caisse?.notes || ''
      this.code_depotpv               = sessions_caisse?.code_depotpv || ''
      this.montant_ecart              = sessions_caisse?.montant_ecart || ''
      this.total_gain                 = sessions_caisse?.total_gain || ''
      this.utilisateur_caissier       = sessions_caisse?.utilisateur_caissier|| ''
      this.utilisateur_cloture        = sessions_caisse?.utilisateur_cloture|| ''
      this.detail_reglement           = sessions_caisse?.detail_reglement|| ''
      this.validation_cloture         = sessions_caisse?.validation_cloture|| false
      this.depot_PV_source            = sessions_caisse?.depot_PV_source ;
}

}

export interface Detail_reglement{
  mode_reglement: string , //enum_modeReglement
  nombre:         number,
  total:          number
}


export interface ISessions_caisse{
  _id: number | null;
   numero: number | null;
  nom_machine_caisse: string | null;
  date_ouverture:Date;
  cloture:string | true | undefined;
  date_cloture:Date;
  fond_caisse_superviseur:number | null;
  fond_caisse_caissier:number | null;
  total_vente: number | null;
  total_encaissement: number | null;
  totad_decaissement: number | null;
  montant_ecart: number | null;
  total_gain: number | null;
  notes: string | null;
  SocieteRacine: string | null;



}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}
