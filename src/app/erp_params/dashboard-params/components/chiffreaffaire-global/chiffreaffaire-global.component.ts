import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chiffreaffaireService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface Societe {
  codeSociete: string;
  nombreDevis: number;
}

@Component({
  selector: 'vex-chiffreaffaire-global',
  templateUrl: './chiffreaffaire-global.component.html',
  styleUrls: ['./chiffreaffaire-global.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class ChiffreaffaireGlobalComponent implements AfterViewInit {
  societes: Societe[] = [
    { codeSociete: 's01', nombreDevis: 0 },
    { codeSociete: 's02', nombreDevis: 0 },
    { codeSociete: 's03', nombreDevis: 0 },
    { codeSociete: 's04', nombreDevis: 0 },
  ];
  totalTurnover: number = 0;
  chart: Chart<'doughnut'> | null = null;
  barChart: Chart<'bar'> | null = null;

  constructor(private chiffreaffaireService: chiffreaffaireService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngAfterViewInit() {
    this.loadDevisData();
  }

  loadDevisData() {
    this.societes.forEach((societe) => {
      this.loadDevisForSociete(societe.codeSociete);
    });
  }

  loadDevisForSociete(codeSociete: string) {
    this.chiffreaffaireService.getchiffreAffaire(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find((s) => s.codeSociete === codeSociete);
      if (societe) {
        societe.nombreDevis = data.RESULTAT;
        this.calculateTotalTurnover();
        this.updateCharts();
      }
    });
  }

  calculateTotalTurnover() {
    this.totalTurnover = this.societes.reduce((acc, s) => acc + s.nombreDevis, 0);
  }

  formatNumber(value: number): string {
    return value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' TND';
  }

  updateCharts() {
    const labels = this.societes.map((s) => s.codeSociete);
    const data = this.societes.map((s) => s.nombreDevis);
    const chartColors = ['#00796B', '#0288D1', '#F57C00', '#D32F2F'];

    if (this.chart) {
      this.chart.destroy();
    }

    if (this.barChart) {
      this.barChart.destroy();
    }

    const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

    if (doughnutCanvas) {
      const doughnutCtx = doughnutCanvas.getContext('2d');
      if (doughnutCtx) {
        this.chart = new Chart<'doughnut'>(doughnutCtx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: chartColors,
                borderColor: chartColors.map((color) => color.replace('0.2', '1')),
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Chiffre d'Affaire Global par Société",
                font: {
                  size: 16,
                },
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 10,
                  font: {
                    size: 12,
                  },
                },
              },
              datalabels: {
                formatter: (value) => {
                  return value ? ((value / this.totalTurnover) * 100).toFixed(1) + '%' : '';
                },
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 10,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ${this.formatNumber(value as number)}`;
                  },
                },
              },
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      }
    }

    if (barCanvas) {
      const barCtx = barCanvas.getContext('2d');
      if (barCtx) {
        this.barChart = new Chart<'bar'>(barCtx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: "Chiffre d'Affaire Global par Société",
                data: data,
                backgroundColor: chartColors,
                borderColor: chartColors.map((color) => color.replace('0.2', '1')),
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                align: 'top',
                anchor: 'end',
                formatter: (value) => (value ? this.formatNumber(value) : ''),
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 10,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => this.formatNumber(value as number),
                  font: {
                    size: 10,
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: 10,
                  },
                },
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      }
    }
  }

  downloadCSV() {
    const headers = ['Code Société', 'chiffre d affaire'];
    const rows = this.societes.map(societe => [societe.codeSociete, societe.nombreDevis.toString()]);
  
    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF'; // Ajout du BOM UTF-8 pour corriger l'encodage
    csvContent += headers.join(',') + '\r\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\r\n';
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'chiffre_affaire_global.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}  
