export class typeChequeTicket {
    _id?: string;
    libelle: string;
    code:string;
    montant_ticket:number;
    taux_deduction:number;
    montant_deduction:number;
    valeur_ticket:number;

    constructor(typechequeticket: any) {
      this._id                = typechequeticket._id;
      this.libelle            = typechequeticket.libelle;
      this.code               = typechequeticket.code;
      this.montant_ticket     = typechequeticket.montant_ticket;
      this.taux_deduction     = typechequeticket.taux_deduction;
      this.montant_deduction  = typechequeticket.montant_deduction;
      this.valeur_ticket      = typechequeticket.valeur_ticket;

    }
  }
  /*
export interface ICategorie{
  _id: string | null;
  libelle: string | null;
  SocieteRacine: string | null;
}
*/
export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


