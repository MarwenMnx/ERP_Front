import { Component } from '@angular/core';
import { retourService1 } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { NgFor } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';

@Component({
  selector: 'vex-retour1',
  templateUrl: './retour1.component.html',
  styleUrls: ['./retour1.component.scss'],
  standalone : true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class Retour1Component {
  societes: { codeSociete: string, nombreDevis: number }[] = [
    { codeSociete: 's01', nombreDevis: 0 },
    { codeSociete: 's02', nombreDevis: 0 },
    { codeSociete: 's03', nombreDevis: 0 },
    { codeSociete: 's04', nombreDevis: 0 }
  ];
  chart: any;
  allData: any[] = [];
  totalDevis: number = 0;

  constructor(private retourService1: retourService1) {
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
    this.retourService1.getretour1(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.nombreDevis = data.RESULTAT;
      }
      this.allData = this.societes.map(s => ({ codeSociete: s.codeSociete, nombreDevis: s.nombreDevis }));
      this.totalDevis = this.calculateTotalDevis();
      this.updateChart();
    });
  }

  calculateTotalDevis() {
    return this.societes.reduce((sum, societe) => sum + societe.nombreDevis, 0);
  }

  formatNumber(value: number, includeSymbol: boolean = true): string {
    if (includeSymbol) {
        return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' TND';
    } else {
        return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
    }
}



  onSocieteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSociete = selectElement.value;
    this.updateChart(selectedSociete);
  }

  updateChart(selectedSociete: string = '') {
    const labels = this.societes.map(s => s.codeSociete);
    const data = this.societes.map(s => s.nombreDevis);
    const chartColors = ['#FFB6C1', '#00FF00', '#7FFFD4', '#FFA500']; // Rose clair, vert, écume de mer, orange

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

    const canvas = document.getElementById('Chart23') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: filteredLabels,
                    datasets: [{
                        label: 'Les retour en NetHT',
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
                            text: 'Les Retour Marchandises clients par société',
                            padding: {
                                top: 10,
                                bottom: 30 // Augmentez cette valeur pour plus d'espace
                            }
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
                          },
                          formatter: (value) => this.formatNumber(value as number, true) // Inclure le symbole
                      }
                    },
                    scales: {
                      y: {
                          beginAtZero: true,
                          title: {
                              display: true,
                              text: 'Les Retour Marchandises Clients en NetHT'
                          },
                          ticks: {
                              callback: (value) => typeof value === 'number' ? this.formatNumber(value, false) : value // Ne pas inclure le symbole pour les nombres
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