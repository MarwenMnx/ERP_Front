import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Top10articleService } from '../../societe-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumn } from '@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgFor,
    NgIf,
    NgClass,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class Top10Component implements OnInit {
  @Input() data: any[] = []; // Données à afficher dans le tableau
  // @Input() columnsToDisplay: any[] = []; // Colonnes à afficher dans le tableau
  @Input() pageSize = 6; // Nombre d'articles à afficher par page

  visibleColumns!: Array<any | string>;
  columnsToDisplay: TableColumn<any>[] = [
   
    {
      label: 'Designation',
      property: 'designation',
      type: 'text',
      cssClasses: ['font-medium']
    },
    
    {
      label: 'Somme TTC',
      property: 'somme_TTC',
      type: 'text',
      cssClasses: ['font-medium']
    },
    // {
    //   label: 'DATE',
    //   property: 'timestamp',
    //   type: 'text',
    //   cssClasses: ['text-secondary']
    // }
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private top10articleService: Top10articleService) {}

  ngOnInit(): void {
    this.getTop10Articles();
  }

  getTop10Articles() {
    this.visibleColumns = this.columnsToDisplay.map(
      (column) => column.property
    );

    this.top10articleService.gettop10article().subscribe(
      (data: any) => {
        // console.clear();
        console.log('Données reçues : ', data);

        if (data.RESULTAT) {
          for (let index = 0; index < data.RESULTAT.length; index++) {
            data.RESULTAT[index]['designation'] = data.RESULTAT[index].article
              ? data.RESULTAT[index].article.designation
              : '';
          }

          console.log('Données reçues : ', data);
          this.dataSource.data = data.RESULTAT;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error: any) => {
        console.error(
          'Erreur lors de la récupération des 10 meilleurs articles : ',
          error
        );
      }
    );
  }
}
