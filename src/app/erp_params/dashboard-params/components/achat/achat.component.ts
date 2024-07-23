import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { achatService } from '../../societe-service.service';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerables, ChartDataLabels);

interface ResultatItem {
  code_societe?: string;
  count: number;
  totalTTC: number;
  month: string;
  year: string;
}

@Component({
  selector: 'vex-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule
  ]
})
export class AchatComponent implements OnInit {
  public achatChart: Chart | undefined;
  public selectedSociete: string = 's01';
  public societes = ['s01', 's02', 's03', 's04'];
  public startDate: string = '';
  public endDate: string = '';
  public chartType: ChartType = 'bar';
  private allData: any[] = [];

  public totalBonAchat: number = 0;
  public totalTTC: number = 0;

  constructor(private achatService: achatService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.achatService.getAllAchat().pipe(
      map((results: any[]) => results.map((data, index) => {
        const code_societe = this.societes[index];
        return {
          ...data,
          RESULTAT: data.RESULTAT.map((result: ResultatItem) => ({
            ...result,
            code_societe: code_societe
          }))
        };
      }))
    ).subscribe(
      results => {
        this.allData = results;
        this.updateChart();
      },
      error => {
        console.error('Error fetching data:', error);
        this.initializeEmptyChart();
      }
    );
  }

  onSocieteChange(): void {
    this.updateChart();
  }

  onDateChange(): void {
    this.updateChart();
  }

  updateChart(): void {
    const filteredData = this.getFilteredData();

    if (filteredData.length === 0) {
      console.warn(`No data available for société ${this.selectedSociete} within the selected dates`);
      this.initializeEmptyChart();
      return;
    }

    this.totalBonAchat = this.calculateTotal(filteredData, 'count');
    this.totalTTC = this.calculateTotal(filteredData, 'totalTTC');

    this.createChart(filteredData);
  }

  getFilteredData(): ResultatItem[] {
    let filteredData = this.allData
      .flatMap(data => data.RESULTAT || [])
      .filter(result => result.code_societe?.toLowerCase() === this.selectedSociete.toLowerCase());

    if (this.startDate) {
      filteredData = filteredData.filter(result => {
        const resultDate = new Date(`${result.year}-${result.month}-01`);
        return resultDate >= new Date(this.startDate);
      });
    }

    if (this.endDate) {
      filteredData = filteredData.filter(result => {
        const resultDate = new Date(`${result.year}-${result.month}-01`);
        return resultDate <= new Date(this.endDate);
      });
    }

    return filteredData;
  }

  calculateTotal(data: ResultatItem[], field: keyof ResultatItem): number {
    return data.reduce((sum, item) => sum + (typeof item[field] === 'number' ? item[field] as number : 0), 0);
  }

  createChart(data: ResultatItem[]): void {
    const labels: string[] = [];
    const counts: number[] = [];
    const totalTTCs: number[] = [];
    
    data.forEach(result => {
      const label = `${result.month}/${result.year}`;
      if (!labels.includes(label)) {
        labels.push(label);
      }
      const labelIndex = labels.indexOf(label);
      counts[labelIndex] = (counts[labelIndex] || 0) + result.count;
      totalTTCs[labelIndex] = (totalTTCs[labelIndex] || 0) + result.totalTTC;
    });
  
    if (this.achatChart) {
      this.achatChart.destroy();
    }
  
    this.achatChart = new Chart('achatChart', {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: `Nombre de Bons d'Achat - ${this.selectedSociete}`,
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-count',
            barPercentage: 0.6,
            categoryPercentage: 0.6,
            borderRadius: 5,
            borderSkipped: false // Pour des bords arrondis complets
          },
          {
            label: `Total TTC - ${this.selectedSociete}`,
            data: totalTTCs,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-ttc',
            barPercentage: 0.6,
            categoryPercentage: 0.6,
            borderRadius: 5,
            borderSkipped: false // Pour des bords arrondis complets
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'top',
            offset: 10,
            font: {
              size: 12,
            },
            formatter: (value, context) => {
              return context.dataset.label?.includes('Total TTC') ? this.formatCurrency(value) : value;
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const datasetLabel = tooltipItem.dataset.label || '';
                const value = Number(tooltipItem.raw);
                return `${datasetLabel}: ${datasetLabel.includes('Total TTC') ? this.formatCurrency(value) : value}`;
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad'
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            }
          },
          'y-axis-count': {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: "Nombre de Bons d'Achat"
            },
            grid: {
              drawOnChartArea: false
            }
          },
          'y-axis-ttc': {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total TTC (د.ت)'
            },
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              callback: (value) => this.formatCurrency(Number(value))
            }
          }
        }
      }
    });
  }
  
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(value);
  }

  generateCSV(): void {
    const filteredData = this.getFilteredData();
  
    // Ajout du BOM UTF-8
    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent += 'Code Société,Nombre de Bons d\'Achat,Total TTC,Month,Year\n';
  
    filteredData.forEach(item => {
      const row = `${item.code_societe},${item.count},${item.totalTTC},${item.month},${item.year}\n`;
      csvContent += row;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'achats.csv');
    document.body.appendChild(link);
  
    link.click();
  }
  

  initializeEmptyChart(): void {
    if (this.achatChart) {
      this.achatChart.destroy();
    }
    this.achatChart = new Chart('achatChart', {
      type: this.chartType,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Nombre de Bons d\'Achat',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-count'
          },
          {
            label: 'Total TTC',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-ttc'
          }
        ]
      },
      options: {
        scales: {
          'y-axis-count': {
            type: 'linear',
            position: 'left',
            beginAtZero: true
          },
          'y-axis-ttc': {
            type: 'linear',
            position: 'right',
            beginAtZero: true
          }
        }
      }
    });
  }
}
