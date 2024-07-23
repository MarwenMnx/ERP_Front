import { Component, AfterViewInit } from '@angular/core';
import { factureService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'vex-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class FactureComponent implements AfterViewInit {
  societes = [
    { codeSociete: 's01', nombreDevis: 0 },
    { codeSociete: 's02', nombreDevis: 0 },
    { codeSociete: 's03', nombreDevis: 0 },
    { codeSociete: 's04', nombreDevis: 0 }
  ];
  chart: any;
  totalDevis: number = 0;

  constructor(private factureService: factureService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngAfterViewInit() {
    this.loadDevisData();
  }

  loadDevisData() {
    this.totalDevis = 0;
    this.societes.forEach(societe => {
      this.loadDevisForSociete(societe.codeSociete);
    });
  }

  loadDevisForSociete(codeSociete: string) {
    this.factureService.getFacturesActives(codeSociete).subscribe({
      next: (data: any) => {
        const societe = this.societes.find(s => s.codeSociete === codeSociete);
        if (societe) {
          societe.nombreDevis = data.RESULTAT;
          this.totalDevis += societe.nombreDevis;
        }
        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching data for', codeSociete, err);
      }
    });
  }

  onSocieteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSociete = selectElement.value;
    this.updateChart(selectedSociete);
  }

  updateChart(selectedSociete: string = '') {
    const labels = this.societes.map(s => s.codeSociete);
    const data = this.societes.map(s => s.nombreDevis);
    const chartColors = ['#00796B', '#0288D1', '#F57C00', '#D32F2F'];

    if (this.chart) {
      this.chart.destroy();
    }

    let filteredLabels = labels;
    let filteredData = data;
    let filteredColors = chartColors;

    if (selectedSociete) {
      const filteredSociete = this.societes.find(s => s.codeSociete === selectedSociete);
      if (filteredSociete) {
        filteredLabels = [filteredSociete.codeSociete];
        filteredData = [filteredSociete.nombreDevis];
        filteredColors = [chartColors[labels.indexOf(selectedSociete)]];
      }
    }

    const canvas = document.getElementById('factureChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: filteredLabels,
            datasets: [{
              label: 'Nombre de factures',
              data: filteredData,
              backgroundColor: filteredColors,
              borderColor: filteredColors.map(color => color.replace('0.2', '1')),
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Nombre de factures par société'
              },
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 14
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de factures'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Sociétés'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }
}
