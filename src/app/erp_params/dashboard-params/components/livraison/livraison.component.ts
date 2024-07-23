import { Component, WritableSignal, computed, signal } from '@angular/core';
import { bonlivraisonService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'vex-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class LivraisonComponent {
  societes: { codeSociete: string, nombreDevis: number }[] = [
    { codeSociete: 's01', nombreDevis: 0 },
    { codeSociete: 's02', nombreDevis: 0 },
    { codeSociete: 's03', nombreDevis: 0 },
    { codeSociete: 's04', nombreDevis: 0 }
  ];
  chart: any;
  allData: any[] = [];
  totalDevis: number = 0;

  constructor(private bonlivraisonService: bonlivraisonService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.loadDevisData();
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
    this.bonlivraisonService.getlivraison(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.nombreDevis = data.RESULTAT;
        this.totalDevis += societe.nombreDevis;
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
  
    const chartColors = ['#FF0000', '#800080', '#FFC0CB', '#4169E1'];
    const chartBorderColors = chartColors.map(color => color.replace('0.2', '1'));
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    let filteredLabels = labels;
    let filteredData = data;
    let filteredColors = chartColors;
    let filteredBorderColors = chartBorderColors;
  
    if (selectedSociete) {
      const filteredSociete = this.societes.find(s => s.codeSociete === selectedSociete);
      if (filteredSociete) {
        filteredLabels = [filteredSociete.codeSociete];
        filteredData = [filteredSociete.nombreDevis];
        const index = labels.indexOf(selectedSociete);
        filteredColors = [chartColors[index]];
        filteredBorderColors = [chartBorderColors[index]];
      }
    }
  
    const canvas = document.getElementById('bonChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: filteredLabels,
            datasets: [{
              label: 'Nombre de BonLivraison',
              data: filteredData,
              backgroundColor: filteredColors,
              borderColor: filteredBorderColors,
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'x',  // Changez ici pour un diagramme en barres verticales
            plugins: {
              title: {
                display: true,
                text: 'Nombre de BonLivraison par société'
              },
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 14
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Sociétés'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de BonLivraison'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }
            }
          }
        });
      }
    }
  }
  
}