
import { Tauxtva } from '../../taux-tva/models/tauxTva.model';
export class Frais {
    _id?: string;
    libelle?: string;  
    tauxTVA:Tauxtva;  
    direct:boolean;
  

    
    constructor(frais: any) {
      this._id = frais._id;
      this.libelle = frais.libelle;
      this.tauxTVA = frais.tauxTVA;
      this.direct = frais?.direct;

    
    }
  }

export interface IFrais{
  _id: string | null;
  libelle: string | null; 
  // tauxTVA: string | null; 
  direct: string | true | undefined; 

  
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any  
}

