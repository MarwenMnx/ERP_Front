import { Component, OnDestroy } from '@angular/core';
import { fournisseurService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages copy/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'vex-supplier',
  templateUrl: './razina.component.html',
  styleUrls: ['./razina.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent, NgFor, FormsModule]
})
export class RazinaComponent implements OnDestroy {
  societes: { codeSociete: string, actifs: number, inactifs: number }[] = [
    { codeSociete: 's01', actifs: 0, inactifs: 0 },
    { codeSociete: 's02', actifs: 0, inactifs: 0 },
    { codeSociete: 's03', actifs: 0, inactifs: 0 },
    { codeSociete: 's04', actifs: 0, inactifs: 0 }
  ];
  chart: any;
  allData: any[] = [];

  constructor(private fournisseurService: fournisseurService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
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
    this.fournisseurService.getfournisseur(codeSociete).subscribe((data: any) => {
      const societe = this.societes.find(s => s.codeSociete === codeSociete);
      if (societe) {
        societe.actifs = data.RESULTAT.find((d: any) => d._id === true)?.count || 0;
        societe.inactifs = data.RESULTAT.find((d: any) => d._id === false)?.count || 0;
      }
      this.allData = this.societes.map(s => ({
        codeSociete: s.codeSociete,
        actifs: s.actifs,
        inactifs: s.inactifs
      }));
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
    const actifsData = this.societes.map(s => s.actifs);
    const inactifsData = this.societes.map(s => s.inactifs);

    const chartColors = ['#008000', '#FF0000'];

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

    const canvas = document.getElementById('fourniChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Actifs', 'Inactifs'],
            datasets: [{
              label: 'Fournisseurs',
              data: [filteredActifsData.reduce((a, b) => a + b, 0), filteredInactifsData.reduce((a, b) => a + b, 0)],
              backgroundColor: chartColors,
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Fournisseurs actifs et inactifs par société',
                padding: {
                  top: 20,
                  bottom: 20
                }
              },
              legend: {
                display: true
              },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#000',
                font: {
                  weight: 'bold',
                  size: 14
                },
                formatter: function(value: number, context: any) {
                  return value;
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

  generateCSV() {
    const headers = ['Code Societe', 'Actifs', 'Inactifs'];
    const rows = this.allData.map(societe => [societe.codeSociete, societe.actifs, societe.inactifs]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';

    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'fournisseurs_report.csv');
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }
}
