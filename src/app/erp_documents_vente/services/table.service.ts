import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getArticles(): Table[] {
    return [
      { date: new Date(2024, 3, 1), article: 'Article 1', prix: 100, categorie: 'Catégorie A', famille: 'Famille X' },

      { date: new Date(2024, 2, 1), article: 'Article 2', prix: 120, categorie: 'Catégorie B', famille: 'Famille Y' },

      { date: new Date(2024, 3, 11), article: 'Article 3', prix: 150, categorie: 'Catégorie B', famille: 'Famille Y' },

      // Ajoutez plus d'articles ici
    ];
  }}
