
export class ParamsGeneral {
    _id:      string;
    libelle:  string;
    valeur:  string;

   constructor(paramGeneral?: any) {
      this._id        = paramGeneral?._id     || '';
      this.libelle    = paramGeneral?.libelle || '';
      this.valeur     = paramGeneral?.valeur  || '';
    }
}

export interface ReponseList{
  MESSAGE:string;
  OK:     boolean;
  RESULTAT:any
}

