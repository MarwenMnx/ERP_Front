export class Tauxtva {
    _id?: string;
    libelle: string;
    taux:number;
    actif:boolean;

    constructor(tauxtva: any) {
      this._id = tauxtva._id;
      this.libelle = tauxtva.libelle;
      this.taux = tauxtva.taux;
      this.actif= tauxtva?.actif;
    }
  }

export interface ITauxtva{
  _id: string | null;
  libelle: string | null;
  taux: number | null;
  actif: string | true | undefined; 
  SocieteRacine: string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


