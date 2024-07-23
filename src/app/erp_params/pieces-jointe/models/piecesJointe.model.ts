
export class PiecesJointe {
  _id:              string;
  titre:            string;
  fichier_content:  string;
  filename:         string;
  mimetype:         string;
  path:             string;
  type_piecejointe: string;

  constructor(piecesjointe?: any) {
      this._id              = piecesjointe?._id || '';
      this.titre            = piecesjointe?.titre || '';
      this.fichier_content  = piecesjointe?.fichier_content || '';
      this.filename         = piecesjointe?.filename || '';
      this.mimetype         = piecesjointe?.mimetype || '';
      this.path             = piecesjointe?.path              || '';
      this.type_piecejointe = piecesjointe?.type_piecejointe  || '';

  }
}
