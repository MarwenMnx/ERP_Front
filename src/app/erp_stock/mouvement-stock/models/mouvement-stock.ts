
import {Depot} from "../../../erp_params/depot/models/depot.model";
import {Client} from "../../../erp_params/clients/models/client.model";
import {Product} from "../../../erp_params/products/models/product.model";

export class Mouvement_stock {


    id:           number;
    date:         Date;
    numero:       string;
    depotpv:      Depot;
    type_document:string;
    client:       Client;
    client_code:  string;
    client_raison:string;
    article:      Product;
    reference:    string;
    designation:  string;
    quantiteUnite1:number;
    quantiteUnite2:number;
    quantiteEntree:number;
    quantiteSortie:number;
    quantiteEntree2:number;
    quantiteSortie2:number;
    unite1:       any;
    unite2:       any;
    totalNetHT:   number;
    totalTTC:     number;
    type_MVT:     string;

   //
   //  /*type mouvement entrè/sortie*/
   //  entree: boolean;
   //  type_document: number;
   // code_client: number;
   // raison_sociale:number;
   // reference: number;
   // designtaion:string;
   // depot:number;
   // qtt_entree: number ;
   // qtt_sortie : number ;



    constructor(mouvement_stock: any) {
      this.id             = mouvement_stock.id;
      this.date           = mouvement_stock.date;
      this.numero         = mouvement_stock.numero;
      this.depotpv        = mouvement_stock.depotpv;
      this.type_document  = mouvement_stock.type_document;
      this.client         = mouvement_stock.client;
      this.client_code    = mouvement_stock.client!=undefined ? mouvement_stock.client.code : "";
      this.client_raison  = mouvement_stock.client!=undefined ? mouvement_stock.client.raisonSociale : "";
      this.article        = mouvement_stock.article;
      this.reference      = mouvement_stock.article.reference;
      this.designation    = mouvement_stock.article.designation;
      this.quantiteUnite1 = mouvement_stock.quantiteUnite1;
      this.quantiteUnite2 = mouvement_stock.quantiteUnite2;
      this.quantiteEntree = mouvement_stock.type_MVT==  1 ? mouvement_stock.quantiteUnite1 : 0; //"Entrée en stock",
      this.quantiteSortie = mouvement_stock.type_MVT== -1 ? mouvement_stock.quantiteUnite1 : 0; // "Sortie de stock",
      this.quantiteEntree2 = mouvement_stock.type_MVT==  1 ? mouvement_stock.quantiteUnite2 : 0; //"Entrée en stock",
      this.quantiteSortie2 = mouvement_stock.type_MVT== -1 ? mouvement_stock.quantiteUnite2 : 0; // "Sortie de stock",
      this.unite1         = mouvement_stock.unite1;
      this.unite2         = mouvement_stock.unite2;
      this.totalNetHT     = mouvement_stock.totalNetHT;
      this.totalTTC       = mouvement_stock.totalTTC;
      this.type_MVT       = mouvement_stock.type_MVT;
      // this.date_ouverture = mouvement_stock.date_ouverture;
      // this.num_document = mouvement_stock.num_document;
      // this.entree = mouvement_stock?.entree;
      // this.type_document = mouvement_stock.type_document;
      // this.code_client = mouvement_stock.code_client;
      // this.raison_sociale = mouvement_stock.raison_sociale;
      // this.designtaion = mouvement_stock.designtaion;
      // this.reference = mouvement_stock.reference;
      // this.depot = mouvement_stock.depot;
      // this.qtt_entree = mouvement_stock.qtt_entree;
      // this.qtt_sortie = mouvement_stock.qtt_sortie;

}

}


export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}
