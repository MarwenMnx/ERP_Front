import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DepotService } from '../../societe-service.service';
import { forkJoin } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vex-chart-societe',
  templateUrl: './chart-societe.component.html',
  styleUrls: ['./chart-societe.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ChartSocieteComponent implements AfterViewInit {
  chart: Chart | undefined;
  depotCounts: number[] = [];
  pointVenteCounts: number[] = [];
  labels: string[] = [];
  totalDepots = 0;
  totalPointsVente = 0;

  constructor(private depotService: DepotService) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  ngAfterViewInit(): void {
    const codesSociete = ['s01', 's02', 's03', 's04'];
    this.loadStats(codesSociete);
  }

  loadStats(codesSociete: string[]): void {
    const statsObservables = codesSociete.map(code => this.depotService.getDepot(code));
    forkJoin(statsObservables).subscribe(
      results => {
        results.forEach((result, index) => {
          const codeSociete = codesSociete[index];
          this.labels.push(`Société ${codeSociete}`);

          const depots = result.RESULTAT.find((item: any) => item._id === '0');
          const pointsVente = result.RESULTAT.find((item: any) => item._id === '1');

          const countDepots = depots ? depots.count : 0;
          const countPointsVente = pointsVente ? pointsVente.count : 0;

          this.depotCounts.push(countDepots);
          this.pointVenteCounts.push(countPointsVente);

          this.totalDepots += countDepots;
          this.totalPointsVente += countPointsVente;
        });
        this.createChart(this.labels, this.depotCounts, this.pointVenteCounts);
      },
      error => {
        console.error('Erreur lors du chargement des statistiques des articles', error);
      }
    );
  }

  createChart(labels: string[], depotCounts: number[], pointVenteCounts: number[]): void {
    const ctx = document.getElementById('depot') as HTMLCanvasElement;
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de dépôts',
            data: depotCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barThickness: 'flex',
            maxBarThickness: 40,
            borderRadius: 5,
            borderSkipped: false
          },
          {
            label: 'Nombre de points de vente',
            data: pointVenteCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: 'flex',
            maxBarThickness: 40,
            borderRadius: 5,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
        plugins: {
          datalabels: {
            color: '#000',
            font: {
              weight: 'bold',
              size: 12,
              family: 'Roboto, sans-serif'
            },
            anchor: 'end',
            align: 'top',
            formatter: Math.round
          },
          title: {
            display: true,
            text: 'Statistiques des dépôts et points de vente',
            font: {
              size: 18,
              weight: 'bold',
              family: 'Roboto, sans-serif'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleFont: {
              size: 16,
              weight: 'bold',
              family: 'Roboto, sans-serif'
            },
            bodyFont: {
              size: 14,
              family: 'Roboto, sans-serif'
            },
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: 'Roboto, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Sociétés',
              font: {
                size: 16,
                weight: 'bold',
                family: 'Roboto, sans-serif'
              },
              padding: {
                top: 10
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)',
              lineWidth: 1
            },
            title: {
              display: true,
              text: 'Nombre',
              font: {
                size: 16,
                weight: 'bold',
                family: 'Roboto, sans-serif'
              },
              padding: {
                top: 10
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
  

  generateTableHTML(): string {
    let tableHTML = `<table border="1" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Société</th>
          <th>Nombre de dépôts</th>
          <th>Nombre de points de vente</th>
        </tr>
      </thead>
      <tbody>`;
  
    this.labels.forEach((label, index) => {
      tableHTML += `
        <tr>
          <td>${label}</td>
          <td>${this.depotCounts[index]}</td>
          <td>${this.pointVenteCounts[index]}</td>
        </tr>`;
    });
  
    tableHTML += `
        <tr>
          <td><strong>Total</strong></td>
          <td><strong>${this.totalDepots}</strong></td>
          <td><strong>${this.totalPointsVente}</strong></td>
        </tr>
      </tbody>
    </table>`;
    
    return tableHTML;
  }

  generateCSVReport(): void {
    const rows = [['Société', 'Nombre de dépôts', 'Nombre de points de vente']];
    this.labels.forEach((label, index) => {
      rows.push([label, this.depotCounts[index].toString(), this.pointVenteCounts[index].toString()]);
    });

    rows.push(['Total', this.totalDepots.toString(), this.totalPointsVente.toString()]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rapport.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
