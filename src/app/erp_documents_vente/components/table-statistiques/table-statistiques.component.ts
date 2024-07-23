import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common';

export interface DataType {
  mois: string;
  jour:string;
  Categ: string;
  famille:string;
  region:string;
}


 @Component({
  selector: 'vex-table-statistiques',
  templateUrl: './table-statistiques.component.html',
  styleUrls: ['./table-statistiques.component.scss'],
  standalone: true,
  imports :[
  CommonModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  
  ]
})
export class TableStatistiquesComponent {

 
  @Input() donnees: DataType[] = []; // Les données à afficher dans la table
  displayedColumns: string[] = ['mois', 'jour']; // Les colonnes à afficher dans la table
  displayedRows: string[] = ['Categ', 'famille']; // Les rows à afficher dans la table

  dataSource: MatTableDataSource<DataType>; // La source de données pour la table

  constructor() {
    this.dataSource = new MatTableDataSource(this.donnees);
  }



}
