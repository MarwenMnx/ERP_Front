import { Component } from '@angular/core';
import { retourService2 } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { NgFor } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';


@Component({
  selector: 'vex-retourfinancier',
  templateUrl: './retourfinancier.component.html',
  styleUrls: ['./retourfinancier.component.scss'],
  standalone : true,
  imports: [WidgetQuickValueCenterComponent, NgFor]
})
export class RetourfinancierComponent {
  societes: { codeSociete: string, nombreDevisTTC: number, nombreDevisNetHT: number }[] = [
    { codeSociete: 's01', nombreDevisTTC: 0, nombreDevisNetHT: 0 },
    { codeSociete: 's02', nombreDevisTTC: 0, nombreDevisNetHT: 0 },
    { codeSociete: 's03', nombreDevisTTC: 0, nombreDevisNetHT: 0 },
    { codeSociete: 's04', nombreDevisTTC: 0, nombreDevisNetHT: 0 }
  ];
  chart: any;
  showTTC: boolean = true;

  constructor(private retourService2: retourService2) {
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
    this.retourService2.getretour2(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.nombreDevisTTC = data.RESULTAT.sumTotalTTC;
        societe.nombreDevisNetHT = data.RESULTAT.sumTotalNetHT;
      }
      this.updateChart();
    });
  }

  onSocieteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSociete = selectElement.value;
    this.updateChart(selectedSociete);
  }

  toggleData() {
    this.showTTC = !this.showTTC;
    this.updateChart();
  }

  updateChart(selectedSociete: string = '') {
    const labels = this.societes.map(s => s.codeSociete);
    const data = this.societes.map(s => this.showTTC ? s.nombreDevisTTC : s.nombreDevisNetHT);
    const chartColors = ['#FF69B4', '#8B0000', '#FFA500', '#40E0D0'];

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
        filteredData = [this.showTTC ? filteredSociete.nombreDevisTTC : filteredSociete.nombreDevisNetHT];
        filteredColors = [chartColors[labels.indexOf(selectedSociete)]];
      }
    }

    const canvas = document.getElementById('Chart8') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: filteredLabels,
            datasets: [{
              label: this.showTTC ? 'Les retour en TTC' : 'Les retour en Net HT',
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
                text: 'Les Retour Financier clients par société',
                font: {
                  size: 18,
                  weight: 'bold'
                }
              },
              legend: {
                display: false
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 4,
                padding: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
                }
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
                  text: this.showTTC ? 'Les Retour Financier Clients en TTC' : 'Les Retour Financier Clients en Net HT'
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
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: 'easeInOutBounce'
            }
          }
        });
      }
    }
  }
}