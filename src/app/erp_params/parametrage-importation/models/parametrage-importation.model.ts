import {Depot} from "../../depot/models/depot.model";

export class ParametreImportation {
  _id?: string;
  code_societe: string;
  table: string;
  champs: IChampParametreImportation[];
  constructor(parametreImportation?: any) {
    this._id          = parametreImportation?._id || "";
    this.code_societe = parametreImportation?.code_societe || "";
    this.table = parametreImportation?.table || "";
    this.champs = parametreImportation?.champs || [];
  }
}

export class DataImportation {
  _id?: string;
  code_societe: string;
  table: string;
  lignes: any[];
  constructor(parametreImportation?: any) {
    this._id          = parametreImportation?._id || "";
    this.code_societe = parametreImportation?.code_societe || "";
    this.table = parametreImportation?.table || "";
    this.lignes = parametreImportation?.lignes || [];
  }
}

export interface IChampParametreImportation{
  nom:string,
  ordre:number
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


