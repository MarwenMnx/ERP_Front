import { Banque } from '../../banque/models/banque.model';

export class CompteBancaires {
  _id: string;
  libelle: string;
  numeroCompte: string;
  banque: Banque;
  agence: string;
  telephone: string;
  rib: string;
  iban: string;
  bic_swift: string;

  constructor(compteBancaire?: any) {
    this._id = compteBancaire?._id || '';
    this.libelle = compteBancaire?.libelle || '';
    this.numeroCompte = compteBancaire?.numeroCompte || '';
    this.banque = compteBancaire?.banque || '';
    this.agence = compteBancaire?.agence || '';
    this.telephone = compteBancaire?.telephone || '';
    this.rib = compteBancaire?.rib || '';
    this.iban = compteBancaire?.iban || '';
    this.bic_swift = compteBancaire?.bic_swift || '';
  }
}

export interface ICompteBancaires {
  _id: string | null;
  libelle: string | null;
  numeroCompte: string | null;
  agence: string | null;
  telephone: string | null;
  rib: string | null;
  iban: string | null;
  bic_swift: string | null;
}

export interface ReponseList {
  MESSAGE: string;
  OK: Boolean;

  RESULTAT: any;
}
