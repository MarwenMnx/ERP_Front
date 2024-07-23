import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/utils/UtilService.service';
import { DocumentCasse, LigneDocumentCasse } from '../boncasse/modeles/boncasse.model';
import { roundmQuantiteNumber } from 'src/app/global-functions';
import { ArticleDepotPvs } from 'src/app/erp_params/article-depotpvs/models/articleDepotPvs.model';
import { DocumentCorrectionStock, LigneCorrectionStock } from '../correction-stock/models/correction-stock.model';

@Injectable({
  providedIn: 'root'
})
export class LigneCorrectionStockService {

  constructor(private utilService: UtilService,
  ) { }
  //service des deux quantitès 
  changeQuantite1(ligne: LigneCorrectionStock) {
    //ligne = this.changeReadonlyBettweenQte1AndQte2(true, ligne)
    ligne.quantiteUnite2 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient > 0 ? ligne.quantiteUnite1 * ligne.article.coefficient : 0)
    ligne = this.calculNouvelleQte(ligne)
    return ligne
  }

  changeQuantite2(ligne: LigneCorrectionStock) {
    //ligne = this.changeReadonlyBettweenQte1AndQte2(false, ligne)
    ligne.quantiteUnite1 = roundmQuantiteNumber(ligne.unite2 && ligne.article.coefficient ? ligne.quantiteUnite2 / ligne.article.coefficient : 0)
    ligne = this.calculNouvelleQte(ligne)
    return ligne
  }

  changeNouvelleQte(ligne: LigneCorrectionStock) {
    if (!ligne.quantite_en_stock) ligne.quantite_en_stock = 0
    if (!ligne.quantite_nouvelle) ligne.quantite_nouvelle = 0
    ligne.quantiteUnite1 = Number(ligne.quantite_nouvelle) - Number(ligne.quantite_en_stock)
    ligne.quantite_difference = ligne.quantiteUnite1
    ligne = this.changeQuantite1(ligne)
    return ligne
  }

  calculNouvelleQte(ligne: LigneCorrectionStock) {
    if (!ligne.quantite_en_stock) ligne.quantite_en_stock = 0
    if (!ligne.quantiteUnite1) ligne.quantiteUnite1 = 0
    ligne.quantite_nouvelle = Number(ligne.quantite_en_stock) + Number(ligne.quantiteUnite1)
    ligne.quantite_difference = ligne.quantiteUnite1
    return ligne
  }
  
  changeReadonlyBettweenQte1AndQte2(isQte1: boolean, article: any) {
    article.isQte1 = isQte1 || article.quantiteUnite2 == 0 ? true : false
    article.isQte2 = !isQte1 || article.quantiteUnite1 == 0 ? true : false
    return article
  }

  changeTotals(ligne: any, isQte2?: boolean) {
    let quantite = !isQte2 ? ligne.quantiteUnite1 : ligne.quantiteUnite2

    return ligne
  }

  getLastNumero(lignes: LigneCorrectionStock[]) {
    try {
      return lignes.reduce((max, x) => {
        const numero = Number(x.numero);
        return numero > max ? numero : max;
      }, 0) + 1;
    } catch (e) {
      return 1
    }
  }


}

