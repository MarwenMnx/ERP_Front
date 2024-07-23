
export class Excercice {
  _id:            string | undefined;
  code_unique:    string | undefined;
  annee_exercice: string | undefined;
  timbreFiscale:  number | undefined;
  timbreTicket:   number | undefined;
  enCours:        boolean | undefined;
  cloturee:       boolean | undefined;

  constructor(excercice?:any){
    this._id            = excercice._id             ? excercice._id : ""
    this.code_unique    = excercice.code_unique     ? excercice.code_unique : ""
    this.annee_exercice = excercice.annee_exercice  ? excercice.annee_exercice : ""
    this.timbreFiscale  = excercice.timbreFiscale   ? excercice.timbreFiscale : ""
    this.timbreTicket   = excercice.timbreTicket    ? excercice.timbreTicket : ""
    this.enCours        = excercice.enCours         ? excercice.enCours : false
    this.cloturee       = excercice.cloturee        ? excercice.cloturee : false
  }

}
