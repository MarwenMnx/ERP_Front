import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'vex-f',
  templateUrl: './f.component.html',
  styleUrls: ['./f.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule]
})
export class FComponent implements OnInit, AfterViewInit {
  facturesParJour: any[] = [];
  filteredFactures: any[] = [];
  startDate: string = '';
  endDate: string = '';
  chart: any;

  constructor(private fService: FService) {}

  ngOnInit(): void {
    // Fetching data on initialization
    this.fService.getAllFactures().subscribe(
      (results: any[]) => {
        this.facturesParJour = this.combineResults(results);
        this.filteredFactures = [...this.facturesParJour];
        this.renderChart();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  ngAfterViewInit(): void {}

  // Combining results by company and date
  combineResults(results: any[]): any[] {
    const combinedResult: any[] = [];
    const societeDataMap: { [key: string]: { [key: string]: number } } = {};

    ['S01', 'S02', 'S03', 'S04', 'S05', 'S06'].forEach(societeCode => {
      societeDataMap[societeCode] = {};
    });

    results.forEach((result, index) => {
      const societeCode = `S0${index + 1}`;
      result.RESULTAT.forEach((item: { _id: { day: number; month: number; year: number }; count: number }) => {
        const dateKey = `${item._id.year}-${item._id.month}-${item._id.day}`;

        if (!societeDataMap[societeCode][dateKey]) {
          societeDataMap[societeCode][dateKey] = 0;
        }

        societeDataMap[societeCode][dateKey] += item.count;
      });
    });

    for (const societe in societeDataMap) {
      for (const dateKey in societeDataMap[societe]) {
        combinedResult.push({
          societe: societe,
          dateKey: dateKey,
          count: societeDataMap[societe][dateKey]
        });
      }
    }

    return combinedResult;
  }

  // Applying date filters
  applyFilters(): void {
    this.applyDateFilter();
    this.renderChart();
  }

  applyDateFilter(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredFactures = this.facturesParJour.filter(facture => {
        const factureDate = new Date(facture.dateKey);
        return factureDate >= start && factureDate <= end;
      });
    } else {
      this.filteredFactures = [...this.facturesParJour];
    }
  }

  // Rendering the chart
  renderChart(): void {
    const datasets: { [key: string]: { label: string; data: number[]; backgroundColor: string; borderColor: string; borderWidth: number } } = {};
    const labelsSet: Set<string> = new Set();

    this.filteredFactures.forEach(dayData => {
      const label = dayData.dateKey;
      const societe = dayData.societe;

      if (!datasets[societe]) {
        datasets[societe] = {
          label: societe,
          data: [],
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          borderWidth: 1
        };
      }

      labelsSet.add(label);
      datasets[societe].data.push(dayData.count);
    });

    const labels = Array.from(labelsSet);

    for (const societe in datasets) {
      const dataMap = new Map<string, number>();
      this.filteredFactures.forEach(dayData => {
        if (dayData.societe === societe) {
          dataMap.set(dayData.dateKey, dayData.count);
        }
      });
      datasets[societe].data = labels.map(label => dataMap.get(label) || 0);
    }

    const ctx = document.getElementById('fChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: Object.values(datasets)
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Statistiques de factures fournisseurs par jour',
            font: {
              size: 24,
              family: 'Arial, sans-serif',
              weight: 'bold'
            },
            padding: 20,
            color: '#333'
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'normal'
              },
              color: '#333'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16,
              family: 'Arial, sans-serif',
              weight: 'bold'
            },
            bodyFont: {
              size: 14,
              family: 'Arial, sans-serif',
              weight: 'normal'
            },
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}`
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: '#555',
            font: {
              size: 12,
              family: 'Arial, sans-serif',
              weight: 'bold'
            },
            formatter: value => value
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de factures',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
                weight: 'bold'
              },
              color: '#333'
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            ticks: {
              color: '#333',
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'normal'
              }
            }
          },
          x: {
            type: 'category',
            labels: labels,
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
                weight: 'bold'
              },
              color: '#333'
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            },
            ticks: {
              color: '#333',
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'normal'
              }
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Generating random colors for the chart
  getRandomColor(): string {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  }

  // Exporting data to CSV
  exportToCSV(): void {
    const csvData = this.filteredFactures.map(facture => ({
      Société: facture.societe,
      Date: facture.dateKey,
      Count: facture.count
    }));

    // Adding BOM for UTF-8 encoding
    const csvContent = `data:text/csv;charset=utf-8,\uFEFF`
      + ["Société,Date,Count"].join(",") + "\n"
      + csvData.map(e => `${e.Société},${e.Date},${e.Count}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }
}
