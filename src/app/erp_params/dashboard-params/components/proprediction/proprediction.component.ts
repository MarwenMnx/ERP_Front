import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RecommendationService2 } from '../../societe-service.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';


@Component({
  selector: 'vex-proprediction',
  templateUrl: './proprediction.component.html',
  styleUrls: ['./proprediction.component.scss'],
  standalone : true, imports:[
    NgFor,
    NgIf,
    NgClass,
    FormsModule

  ]

})
export class PropredictionComponent implements OnInit {
  designations = ['BISCUITS LONG FENOUIL', "Pain de mie régime aux flocons d'avoine 400g-18 tranches", 'Muffin pépites 50g', 'CARRELAGE 25*66', 'PARTERRE CARTHAGO INT ONIX BEIGE 40*40 1CH 1,57 B', 'American sandwich  600g-18 Tranches', 'BRIQUE HORDIS 16', 'PETIT FOUR', 'TORTINA  BANANE 55g', 'BRIQUE 12', 'Biscottes nature SS  (paquet de 28 tranches)', 'TOAST NATURE', 'Guizata  65g (Tarte aux arachides )', 'testPopup5', 'TEST ARTICLE 30 JANVIER', 'FER 8 SIDENOR', 'Pain de mie nature 400g-14 Tranches', 'Biscottes nature (paquet de 28 tranches )', 'COOKIES KATEN', 'CIMENT HRS SOTACIB KAIROUANE SAC DE 50KG', 'CAROJOIN 18 BEIGE SEAU DE 3KG', 'testPopup2', 'PAVE UTIKA ROUGE', 'CIMENT COLLE UNICOLLE SAC DE 25KG', 'BRIQUE HORDIS 19', 'Pain 2 BURGER sesame 140g - 2 piece', 'CIMENT COLLE AFFROCHIM JAUNE 100W SAC DE 25KG', 'CIMENT BLANC SAC DE 50KG', 'CPA KR', 'BRIQUE PLATRIERE', 'Chapelure de pain 200g', 'روتي', 'Pain de mie Brioché  400g-18 tranches', 'Pain 2 BURGER nature 140g - 2 piece', 'CAROJOIN 01 BLANC SEAU DE 12KG', 'ARTICE A NON UTILISE', 'Pain de mie complet  400g-14 Tranches', 'PARTERRE CARTHAGO INT 40*40 LOCK GOLD 1ER CHOIX 1,57 B', 'CIMENT HRS NAKHIL GABES SAC DE 50KG', 'TREILLIS SOUDÉ 15/15', 'BRIQUE 8', 'TOAST CHIA', 'CAROJOIN 12 CARAMEL SEAU DE 3KG', 'LAIT VACHE QUI NE RIT PAS', 'FER 10 SIDENOR', 'PARTERRE CARTHAGO INT 40*40 GENNAR GRIS 1ER 1,57 B', 'article for new', 'CAROPJOIN 13 BEIGE MAGNOLIA SEAU DE 3KG', 'BRIQUE 16', 'CAROJOIN 14 MARRON COTTO SEAU DE 3KG', 'TOAST COMPLET', 'Biscottes blé complet au son (paquet de 28 tranches)', 'SABLEE VANIL', 'COOKIES CHOCOLAT', 'FTN_101', 'CAROJOIN 04 GRIS SEAU DE 3KG', 'CAROJOIN 17 GRIS MOYEN SEAU DE 3KG', 'BROWNIES   55 g', 'CIMENT COLLE SOFAP 100C2 SAC DE 25KG', 'ARTICLE TEST 202020', 'en vente enachat', 'CIMENT NORMAL NAKHIL GABES SAC DE 50KG', 'CIMENT NORMAL SOTAIB KAIROUANE SAC DE 50KG', 'CARRELAGE MARBRE', 'SABLEE CHOCOLAT', 'BORDURE PAVE 20*1m', 'Muffin Chocolate noisette 55g', 'TOAST REGIME', 'CIMENT COLLE DEUTCH FM1000 SAC DE 25KG', "FIL D'ATTACHE", 'PARTERRE CARTHAGO EXT 40*40 BELLERO BEIGE 1CH 1,57 B', 'Caprice chocolat 65g', 'CIMENT COLLE SOFAP 100C1 SAC DE 25KG', '777poopxxxxo7777-45878', '777poopxxxxo7777-4587ddf8p8e', 'CAROJOIN 10 GRIS CEMENT SEAU DE 3KG', 'FER 16 SIDENOR', 'FER 10 FOULADH', 'biscottes multicéréales SS (paquet de 28 tranches )', 'CIMENT NORMAL JBAL RESSAS SAC DE 50KG', 'PARTERRE CARTHAGO INT 40*40 GLISTER BEIGE  1CH 1,57 B', '777pogfffopo7777', 'CAROJOIN 48 GRIS TITANIUM SEAU DE 3KG', 'PAVE NEAPOLIS ROUGE', 'CIMENT SUPER NAKHIL GABES SAC DE 50KG', 'Pain de mie Kids nature 140g - 12 tranches', 'CIMENT SUPER JBAL RESSAS SAC DE 50KG', 'HRS SAC', 'CAROJOIN 02 NOIR SEAU DE 3KG', 'CAROJOIN 01 BLANC SEAU DE  3KG', 'CIMENT COLLE AFFROCHIM 200W NOIR SAC DE 25KG', 'FER 12 FOULADH', 'testPopup1', 'GYPSE  DECO SAC DE 40 KG', 'PARTERRE CARTHAGO INT 40*40 ARENA  GRIS 1CH 1,57 B', 'CAROJOIN 05 GRIS CLAIRE SEAU DE 3KG', 'PARTERRE CARTHAGO EXT 40*40 ROSSO BEIGE 1CH 1,57 B', 'article', 'FER 6 SIDENOR', 'PAVE NEAPOLIS GRIS', 'ramitest2024', 'dev', 'CPA', 'BRIQUE 6', 'CAROJOIN 05 GRIS CLAIRE SEAU DE 12KG', 'CAROJOIN 20 MARRON SEAU DE 3KG', 'FER 14 SIDENOR', 'Des 55', 'نصف دسم', 'دجاج', 'PARTERRE CARTHAGO INT 40*40  CITY  GRIS 1CH 1,57 B', 'CADRE FER 15/25', 'Pain de campagne 350g', 'CADRE FER 15/20', 'CADRE FER 15/15', 'PARTERRE CARTHAGO INT 40*40  ASTORIA  GRIS 1CH 1,57 B', 'CAROJOIN 50 BEIGE UMBER SEAU DE 3KG', 'Biscottes multicéréales  (paquet de 28 tranches  )', 'CIMENT COLLE DEUTCH FM2000 SAC DE 25KG', 'CARRELAGE 25*59', 'MASTIQUE BLEU'];
  selectedDesignations: string[] = [];
  recommendations: { item: string, probability: number }[] = [];

  constructor(private recommendationService2: RecommendationService2) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getRecommendations(): void {
    this.recommendationService2.getRecommendationsWithProbability(this.selectedDesignations).subscribe(recommendations => {
      this.recommendations = recommendations;
    });
  }
  getProbabilityColor(probability: number): string {
    // Définissez ici les seuils de couleurs en fonction de vos besoins
    if (probability > 0.7) {
      return 'green'; // Vert pour les probabilités élevées
    } else if (probability > 0.4) {
      return 'orange'; // Orange pour les probabilités moyennes
    } else {
      return 'red'; // Rouge pour les probabilités faibles
    }
}
}


