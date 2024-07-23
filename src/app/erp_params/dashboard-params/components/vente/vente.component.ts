import { Component } from '@angular/core';
import { venteService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { NgFor } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';


@Component({
  selector: 'vex-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  standalone : true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class VenteComponent {
  societes: { codeSociete: string, nombreDevis: number }[] = [
    { codeSociete: 's01', nombreDevis: 0 },
    { codeSociete: 's02', nombreDevis: 0 },
    { codeSociete: 's03', nombreDevis: 0 },
    { codeSociete: 's04', nombreDevis: 0 }
  ];
  chart: any;
  allData: any[] = [];

  constructor(private venteService: venteService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngAfterViewInit() {
    this.loadDevisData();
  }

  loadDevisData() {
    this.societes.forEach(societe => {
      this.loadDevisForSociete(societe.codeSociete);
    });
  }

  loadDevisForSociete(codeSociete: string) {
    this.venteService.getvente(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.nombreDevis = data.RESULTAT;
      }
      this.allData = this.societes.map(s => ({ codeSociete: s.codeSociete, nombreDevis: s.nombreDevis }));
      this.updateChart();
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
    const chartColors = ['#FF69B4', '#8B0000', '#FFA500', '#40E0D0']; // hot pink, dark red, orange, turquoise

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

    const canvas = document.getElementById('Chart3') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: filteredLabels,
            datasets: [{
              label: 'Les Ventes',
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
                text: 'Les ventes par société'
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
                  text: 'Les Vente'
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
            maintainAspectRatio: false // Désactive le maintien du ratio pour contrôler la hauteur
          }
        });
      }
    }
  }
}
