import { Component } from '@angular/core';
import { ClientService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages copy/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Papa from 'papaparse';

@Component({
  selector: 'vex-client-actif',
  templateUrl: './client-actif.component.html',
  styleUrls: ['./client-actif.component.scss'],
  standalone : true,
  imports: [WidgetQuickValueCenterComponent, NgFor, FormsModule]
})
export class ClientActifComponent {
  societes: { codeSociete: string, actifs: number, inactifs: number }[] = [
    { codeSociete: 's01', actifs: 0, inactifs: 0 },
    { codeSociete: 's02', actifs: 0, inactifs: 0 },
    { codeSociete: 's03', actifs: 0, inactifs: 0 },
    { codeSociete: 's04', actifs: 0, inactifs: 0 }
  ];
  chart: any;
  allData: any[] = [];
  totalActifs: number = 0;
  totalInactifs: number = 0;

  constructor(private ClientService: ClientService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.loadArticleData();
  }

  loadArticleData() {
    this.societes.forEach(societe => {
      this.loadArticlesForSociete(societe.codeSociete);
    });
  }

  loadArticlesForSociete(codeSociete: string) {
    this.ClientService.getCountActiveInactive(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.actifs = data.RESULTAT.find((d: any) => d._id === true)?.count || 0;
        societe.inactifs = data.RESULTAT.find((d: any) => d._id === false)?.count || 0;
        this.totalActifs += societe.actifs;
        this.totalInactifs += societe.inactifs;
      }
      this.allData = this.societes.map(s => ({
        codeSociete: s.codeSociete,
        actifs: s.actifs,
        inactifs: s.inactifs
      }));
      this.updateChart();
    }, error => {
      console.error(error);
      // Affichez un message d'erreur convivial ici
    });
  }

  onSocieteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSociete = selectElement.value;
    this.updateChart(selectedSociete);
  }

  updateChart(selectedSociete: string = '') {
    const labels = this.societes.map(s => s.codeSociete);
    const actifsData = this.societes.map(s => s.actifs);
    const inactifsData = this.societes.map(s => s.inactifs);

    // Changer les couleurs ici
    const chartColors = ['#007bff', '#28a745']; // Bleu et vert
    const chartBorderColors = chartColors.map(color => color);

    if (this.chart) {
      this.chart.destroy();
    }

    let filteredLabels = labels;
    let filteredActifsData = actifsData;
    let filteredInactifsData = inactifsData;

    if (selectedSociete) {
      const filteredSociete = this.societes.find(s => s.codeSociete === selectedSociete);
      if (filteredSociete) {
        filteredLabels = [filteredSociete.codeSociete];
        filteredActifsData = [filteredSociete.actifs];
        filteredInactifsData = [filteredSociete.inactifs];
      }
    }

    const canvas = document.getElementById('clinetChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: filteredLabels,
            datasets: [
              {
                label: 'Actifs',
                data: filteredActifsData,
                backgroundColor: chartColors[0],
                borderColor: chartBorderColors[0],
                borderWidth: 1
              },
              {
                label: 'Inactifs',
                data: filteredInactifsData,
                backgroundColor: chartColors[1],
                borderColor: chartBorderColors[1],
                borderWidth: 1
              }
            ]
          },
          options: {
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
            },
            plugins: {
              title: {
                display: true,
                text: 'Clients Actifs et Inactifs par Société',
                padding: {
                  top: 10,
                  bottom: 10
                },
                font: {
                  size: 18
                }
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: {
                    size: 14
                  }
                }
              },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 12
                },
                formatter: function(value: number, context: any) {
                  return value;
                },
                offset: 5
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de Clients',
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Sociétés',
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
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

  generateCsvReport() {
    const csvData = [
      ['Code société', 'Actifs', 'Inactifs'],
      ...this.allData.map(d => [d.codeSociete, d.actifs, d.inactifs]),
      ['Total', this.totalActifs, this.totalInactifs]
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
