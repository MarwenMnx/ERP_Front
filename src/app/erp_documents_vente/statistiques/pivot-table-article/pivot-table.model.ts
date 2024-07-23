export class TablePivot {
    date1: Date;
    date2: Date; 
    article: string;
    categorie: string;
    famille: string;
    Somme_Total_net_HT :number;
    Somme_Total_TTC :number;
    Somme_Quantité :number ;
  

   constructor(tablePivot: any) {
    this.date1 = tablePivot?.date1 ?? ''
    this.date2 = tablePivot?.date2 ?? ''
    this.Somme_Quantité = tablePivot?.Somme_Quantité ?? ''
    this.Somme_Total_TTC = tablePivot?.Somme_Total_TTC ?? ''
    this.Somme_Total_net_HT = tablePivot?.Somme_Total_net_HT ?? ''
    this.article = tablePivot?.article ?? ''
    this.famille = tablePivot?.famille ?? ''
    this.categorie = tablePivot?.categorie ?? ''
  }}


  export interface ITablePivot{
    _id: string | null;
    libelle: string | null;
    Somme_Quantité: number | null;
    Somme_Total_net_HT: number | null;
    Somme_Total_TTC : number | null;
    famille : string | null ;
    categorie : string | null ;
    article : string | null ;


  }
  
  export interface ReponseList{
    MESSAGE:string;
    OK: Boolean;
  
    RESULTAT:any
  }

