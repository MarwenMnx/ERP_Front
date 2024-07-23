import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/utils/UtilService.service';
import {  roundmQuantiteNumber } from 'src/app/global-functions';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';

import { DocumentEnteeSorties, LigneDocumentEntreeSorties } from '../entreeSortie/entresortie.model';

@Injectable({
  providedIn: 'root'
})
export class LigneDocumentEntreeService {

  constructor(private utilService:UtilService,
    ) { }
//service des deux quantitès 
changeQuantite1(ligne:any){
  ligne = this.changeReadonlyBettweenQte1AndQte2(true, ligne)
  ligne.quantiteUnite2 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient > 0 ? ligne.quantiteUnite1 * ligne.article.coefficient : 0)
  return ligne
}

changeQuantite2(ligne:any){
  ligne = this.changeReadonlyBettweenQte1AndQte2(false, ligne)
  ligne.quantiteUnite1 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient ? ligne.quantiteUnite2 / ligne.article.coefficient : 0)
  return ligne
}

    //

    changeReadonlyBettweenQte1AndQte2(isQte1:boolean, article:any){
      article.isQte1 = isQte1 || article.quantiteUnite2 == 0 ? true : false
      article.isQte2 = !isQte1 || article.quantiteUnite1 == 0 ? true : false
      return article
    }
    checkQuantiteIsValide(documentOriginal:DocumentEnteeSorties, lignes:LigneDocumentEntreeSorties[], allArticles:ArticleDepotPvs[], newLigne?:LigneDocumentEntreeSorties, ligneOfList?:LigneDocumentEntreeSorties){
      let qteEnStock:number | undefined = 0
      let ligne = newLigne ? newLigne : ligneOfList
      let articleFromBackEnd = allArticles.find( res => res.article?._id == ligne?.article?._id )
      if(articleFromBackEnd?.article.venteStockNegatif != false) return true
      if(articleFromBackEnd && articleFromBackEnd.quantite) qteEnStock = articleFromBackEnd.quantite
      let oldLignes = documentOriginal && documentOriginal.lignes ? documentOriginal.lignes : []
      let oldQte = 0
      for(let item of oldLignes){
        oldQte += Number(item.quantiteUnite1)
      }
      let newQte = 0
      if(lignes)
      for(let item of lignes){
        newQte += Number(item.quantiteUnite1)
      }
      if(newLigne){
        newQte += Number(newLigne.quantiteUnite1)
      }
      return true
    }

   
    checkAllLigne(documentOriginal:DocumentEnteeSorties, lignes:LigneDocumentEntreeSorties[], allArticles:ArticleDepotPvs[]){
      if(lignes && lignes.length > 0){
        for(let item of lignes){
          if(!this.checkQuantiteIsValide(documentOriginal, lignes, allArticles, undefined, item)) return false
        }
      }
      return true
    }


    changeTotals(ligne:any, isQte2?:boolean){
      let quantite = !isQte2 ? ligne.quantiteUnite1 : ligne.quantiteUnite2

      return ligne
    }

    getLastNumero(lignes:LigneDocumentEntreeSorties[]){
      try{
        return lignes.reduce((max, x) => {
          const numero = Number(x.ordre);
          return numero > max ? numero : max;
        }, 0) + 1;
      }catch(e){
        return 1
      }
    }

  
}

