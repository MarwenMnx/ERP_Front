

import { Injectable } from '@angular/core';
import {enum_conditionReglement, enum_modeReglement , enum_statusProspection,
        enum_typeDepotPV, enum_types_articles, enum_typetiers,enum_type_document, enum_etat_bonsortie}
        from "../global-enums";

import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class NumberToLettreFrService {

  private units = ['', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf'];
  private teens = ['', 'Onze', 'Douze', 'Treize', 'Quatorze', 'Quinze', 'Seize', 'Dix-Sept', 'Dix-Huit', 'Dix-Neuf'];
  private tens = ['', 'Dix', 'Vingt', 'Trente', 'Quarante', 'Cinquante', 'Soixante', 'Soixante-Dix', 'Quatre-Vingt', 'Quatre-Vingt-Dix'];
  
  convertToFrenchWords(number: number): string {
    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);
    let result = this.convertNumber(integerPart);
  
    if (decimalPart > 0) {
      result += ` virgule ${this.convertNumber(decimalPart)}`;
    }
  
    return result;
  }
  
  private convertNumber(number: number): string {
    if (number === 0) return 'Zéro';
    if (number < 1000) {
      return this.convertChunk(number);
    } else {
      
      const millions = Math.floor(number / 1000000);
      const remainder = number % 1000000;
      const millionString = millions > 0 ? (millions > 1 ? this.convertChunk(millions) + ' Millions' : 'Un Million') : '';
      const remainderString = remainder > 0 ? (millionString ? ' et ' : '') + this.convertChunk(remainder) : '';
      return millionString + remainderString;
    }
  }
  
  private convertChunk(chunk: number): string {
    if (chunk === 0) return '';
    if (chunk < 10) return this.units[chunk];
    if (chunk < 20) return this.teens[chunk - 10];
    if (chunk < 100) {
      const remainder = chunk % 10;
      const connectingWord = remainder > 0 ? ' et ' : '';
      const unit = remainder === 1 && chunk !== 71 && chunk !== 91 ? ' et ' + this.units[1] : this.units[remainder];
      return this.tens[Math.floor(chunk / 10)] + connectingWord + unit;
    }
    if (chunk < 1000) {
      const remainder = chunk % 100;
      const connectingWord = remainder > 0 ? ' et ' : '';
      return this.units[Math.floor(chunk / 100)] + ' Cent' + connectingWord + this.convertChunk(remainder);
    }
    if (chunk < 10000) {
      const thousands = Math.floor(chunk / 1000);
      const remainder = chunk % 1000;
      const thousandString = thousands > 0 ? (thousands > 1 ? this.convertChunk(thousands) + ' Mille' : 'Mille') : '';
      const remainderString = remainder > 0 ? ' et ' + this.convertChunk(remainder) : '';
      return thousandString + remainderString;
    }
    return '';
  }

}