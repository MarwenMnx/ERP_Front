import { Product } from "../../products/models/product.model";
import { Depot } from "../../depot/models/depot.model"
import { Excercice } from "../../../services/token.service"
import { Categorie } from "../../categories/models/categorie.model";
import { SousFamille } from "../../sous-famille/models/sous-famille.model";
import { Famille } from "../../familles/models/famille.model";

export class QuantiteInitial {
  _id?: string | undefined;
  quantiteArticles:QuantiteInitialLigne[]
  utilisateur:{
    _id:string | undefined,
    nom:string | undefined,
  }
  code_societe:string | undefined;
  code_exercice:string | undefined;
  code_depotpv:string | undefined;
  bloquerImportation:boolean | undefined;
  dateImportation:Date | null;
  constructor(quantiteInitial?:any){
    this._id = quantiteInitial?._id ? quantiteInitial._id : "" 
    this.quantiteArticles = quantiteInitial?.quantiteArticles ? quantiteInitial.quantiteArticles : []
    this.utilisateur = quantiteInitial?.utilisateur ? quantiteInitial.utilisateur : "" 
    this.code_societe = quantiteInitial?.code_societe ? quantiteInitial.code_societe : "" 
    this.code_exercice = quantiteInitial?.code_exercice ? quantiteInitial.code_exercice : "" 
    this.code_depotpv = quantiteInitial?.code_depotpv ? quantiteInitial.code_depotpv : "" 
    this.bloquerImportation = quantiteInitial?.bloquerImportation ? quantiteInitial.bloquerImportation : false 
    this.dateImportation = quantiteInitial?.dateImportation ? quantiteInitial.dateImportation : null 
  }
}

export class QuantiteInitialLigne {
  _id?: string | undefined;
  quantite_initial: number | undefined;
  article: {
    _id: string,
    reference: string,
    codeBarre: string,
    designation: string,
    categorie:Categorie | null,
    famille:Famille | null,
    sousFamille:SousFamille | null
  } | undefined;
  referenceLibelle: string | undefined;
  codeBarreLibelle: string | undefined;
  designationLibelle: string | undefined;
  categorieLibelle: string | undefined;
  familleLibelle: string | undefined;
  sousFamilleLibelle: string | undefined;
  
  constructor(quantiteInitialLigne:any){
    this._id = quantiteInitialLigne._id ? quantiteInitialLigne._id : undefined
    this.quantite_initial = quantiteInitialLigne.quantite_initial ? quantiteInitialLigne.quantite_initial : 0
    this.article = quantiteInitialLigne.article ? quantiteInitialLigne.article :  undefined
    this.referenceLibelle = quantiteInitialLigne.article.reference ? quantiteInitialLigne.article.reference : ""
    this.codeBarreLibelle  = quantiteInitialLigne.article.codeBarre ? quantiteInitialLigne.article.codeBarre : "" 
    this.designationLibelle  = quantiteInitialLigne.article.designation ? quantiteInitialLigne.article.designation : "" 
    this.categorieLibelle = quantiteInitialLigne.article.categorie?.libelle ? quantiteInitialLigne.article?.categorie?.libelle : "" 
    this.familleLibelle = quantiteInitialLigne.article?.famille?.libelle ? quantiteInitialLigne.article?.famille?.libelle : "" 
    this.sousFamilleLibelle = quantiteInitialLigne.article?.sousFamille?.libelle ? quantiteInitialLigne.article.sousFamille?.libelle : "" 
  }
}