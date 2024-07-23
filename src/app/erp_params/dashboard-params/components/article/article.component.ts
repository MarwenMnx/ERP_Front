import { Component } from '@angular/core';
import { articleService } from '../../societe-service.service';
import { Chart, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WidgetQuickValueCenterComponent } from 'src/app/pages copy/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Societe {
  codeSociete: string;
  actifs: number;
  inactifs: number;
}

@Component({
  selector: 'vex-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent, NgFor, FormsModule]
})
export class ArticleComponent {
  societes: Societe[] = [
    { codeSociete: 's01', actifs: 0, inactifs: 0 },
    { codeSociete: 's02', actifs: 0, inactifs: 0 },
    { codeSociete: 's03', actifs: 0, inactifs: 0 },
    { codeSociete: 's04', actifs: 0, inactifs: 0 }
  ];
  chart: any;

  constructor(private articleService: articleService) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.loadArticleData();
  }

  loadArticleData() {
    this.societes.forEach(societe => {
      this.articleService.getArticleActive(societe.codeSociete).subscribe((data: any) => {
        const result = data.RESULTAT;
        societe.actifs = result.find((d: any) => d._id === true)?.count || 0;
        societe.inactifs = result.find((d: any) => d._id === false)?.count || 0;
        this.updateChart();
      });
    });
  }

  onSocieteChange(event: Event) {
    const selectedSociete = (event.target as HTMLSelectElement).value;
    this.updateChart(selectedSociete);
  }

  updateChart(selectedSociete: string = '') {
    const labels = this.societes.map(s => s.codeSociete);
    const actifsData = this.societes.map(s => s.actifs);
    const inactifsData = this.societes.map(s => s.inactifs);

    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = document.getElementById('articleChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const data = {
          labels: selectedSociete ? [selectedSociete] : labels,
          datasets: [
            {
              label: 'Actifs',
              data: selectedSociete ? [actifsData[labels.indexOf(selectedSociete)]] : actifsData,
              backgroundColor: '#008000',
              borderColor: '#006400',
              borderWidth: 1
            },
            {
              label: 'Inactifs',
              data: selectedSociete ? [inactifsData[labels.indexOf(selectedSociete)]] : inactifsData,
              backgroundColor: '#FF0000',
              borderColor: '#8B0000',
              borderWidth: 1
            }
          ]
        };

        const options: ChartOptions = {
          plugins: {
            title: {
              display: true,
              text: 'Articles actifs et inactifs par société',
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
              formatter: (value: number) => value
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Nombre d'articles"
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
        };

        this.chart = new Chart(ctx, {
          type: 'bar',
          data,
          options
        });
      }
    }
  }
}
