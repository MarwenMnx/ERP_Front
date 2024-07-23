
export class type_piece_jointe{
    _id?: string;
    libelle: string;
    tables_associer:string;

 constructor(type_piece_jointe: any) {
      this._id = type_piece_jointe._id;
      this.libelle = type_piece_jointe.libelle;
      this.tables_associer = type_piece_jointe.tables_associer;
    }
  }

export interface IType_piece_jointe{
  _id: string | null;
  libelle: string | null;
  tables_associer: [String];

}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}


