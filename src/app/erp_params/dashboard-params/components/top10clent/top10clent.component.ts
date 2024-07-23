import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Top10Service } from '../../societe-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'vex-top10clent',
  templateUrl: './top10clent.component.html',
  styleUrls: ['./top10clent.component.scss'],
  standalone : true,imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgFor,
    NgIf,
    NgClass,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})

export class Top10clentComponent {
  @Input() data: any[] = [];
  @Input() pageSize = 6;
  visibleColumns: string[] = [];
  columnsToDisplay: TableColumn<any>[] = [
    {
      label: 'Raison sociale',
      property: 'raisonSociale',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'Total TTC (TND)',
      property: 'total_TTC',
      type: 'text',
      cssClasses: ['font-medium']
    }
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  selectedSociete = 's01';
  societes = ['s01', 's02', 's03', 's04'];

  constructor(private top10Service: Top10Service) {}

  ngOnInit(): void {
    this.getTop10Client();
  }

  getTop10Client(): void {
    this.visibleColumns = this.columnsToDisplay.map(column => column.property);
    this.top10Service.getTop10Client(this.selectedSociete).subscribe(
      data => {
        if (data.RESULTAT) {
          this.formatClientData(data.RESULTAT);
          this.dataSource.data = data.RESULTAT;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des 10 meilleurs clients : ', error);
      }
    );
  }

  formatClientData(clients: any[]): void {
    clients.forEach(client => {
      client.raisonSociale = client.client ? client.client.raisonSociale : '';
      client.total_TTC = this.formatCurrency(client.total_TTC);
    });
  }

  formatCurrency(amount: number): string {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount)} TND`;
  }

  onSocieteChange(): void {
    this.getTop10Client();
  }
}