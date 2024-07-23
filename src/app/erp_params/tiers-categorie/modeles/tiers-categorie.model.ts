import { enum_typetiers } from "src/app/global-enums";

export class tiers_categorie {
    _id?: string;
    libelle: string;
    typeTiers: number;

 


    constructor(tiers_categorie: any) {
      this._id = tiers_categorie._id;
      this.libelle = tiers_categorie.libelle;
      this.typeTiers = tiers_categorie.typeTiers;
      // this.typeTiers = tiers_categorie.typeTiers;

    }
  }

export interface ITiers_categorie{
  _id: string | null;
  libelle: string | null;
  typeTiers: string | null;


}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


