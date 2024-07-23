import { Product } from "../../products/models/product.model";
import { Depot } from "../../depot/models/depot.model"
import { Excercice } from "../../../services/token.service"
import { Categorie } from "../../categories/models/categorie.model";
import { SousFamille } from "../../sous-famille/models/sous-famille.model";
import { Famille } from "../../familles/models/famille.model";
import { Interface } from "readline";

export interface ReleveTiere {
  _id: string,
  numero: string,
  date: Date,
  dateString?: string
  utilisateur: {
      nom: string,
  },

  totalTTC?: number,
 
  montant?: number,
  modeReglement?: string,
  numPiece?:  string,
  dateEcheance?: Date,

  type_document:  string,
  credit: number,
  debit: number,
  solde?: number,
  soldeCredit?: number,
  soldeDebit?: number,
}

export interface IRequestBody {
  date1: Date,
  date2: Date,
  code_societe: string,
  code_exercice: string,
  client: string
}

export interface IResponseBody {
  solde_initiale: number
  solde_credit: number
  solde_debit: number
  solde_periode: number
  solde_finale: number
  list_documents: ReleveTiere[]
}
  