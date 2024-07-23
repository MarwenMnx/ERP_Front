export class CodeBarreTable {
    _id: string;
    codeBarreColi: string;
    libelleColi: string;
  
    constructor(codeBarre: any) {
      this._id = codeBarre._id
      this.codeBarreColi = codeBarre.codeBarreColi
      this.libelleColi = codeBarre.libelleColi
    }

}
  