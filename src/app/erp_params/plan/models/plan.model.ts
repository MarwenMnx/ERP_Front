import {Depot} from "../../depot/models/depot.model";

export class Plan {
    _id?:           string;
    libelle:        string;
    couleur_fond:   string;
    couleur_text:   string;
    ordre:          number;
    depot_PV:       Depot;
    image:          string;
    articles:       ArticlesPlan [];
    code_societe:   string

    constructor(plan: any) {
      this._id          = plan._id;
      this.libelle      = plan.libelle;
      this.couleur_fond = plan.couleur_fond;
      this.couleur_text = plan.couleur_text;
      this.ordre        = plan.ordre;
      this.depot_PV     = plan.depot_PV;
      this.image        = plan.image;
      this.articles     = plan.articles;
      this.code_societe = plan.code_societe
    }
  }

export interface  ArticlesPlan  {
  _id: string | null;
  ordre: number;
  couleur_fond: string;
  couleur_text: string;
}

export interface IPlan{
  _id: string | null;
  libelle: string | null;
  couleur_fond: string | null;
  couleur_text: string | null;
  ordre: number | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


