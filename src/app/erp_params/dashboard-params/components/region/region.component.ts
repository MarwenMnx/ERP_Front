import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChiffreAffaireService } from '../../societe-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface RegionData {
  NomRegion: string;
  total_TTC: number;
  total_HT: number;
}

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'vex-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class RegionComponent implements OnInit {
  @ViewChild('barChart', { static: true }) barChart!: ElementRef;
  public societes = ['S01', 'S02', 'S03', 'S04'];
  public selectedSociete = 'S01';
  private chart!: Chart;
  public errorMessage: string | null = null;
  public regionData: RegionData[] = [];
  public showTable: boolean = false;

  constructor(private chiffreAffaireService: ChiffreAffaireService) { }

  ngOnInit(): void {
    this.loadData(this.selectedSociete);
  }

  private loadData(societeCode: string): void {
    this.chiffreAffaireService.getChiffreAffaireRegion(societeCode).subscribe({
      next: data => {
        this.regionData = data.RESULTAT;
        const labels = this.regionData.map(region => region.NomRegion);
        const totalTTC = this.regionData.map(region => region.total_TTC);
        const totalHT = this.regionData.map(region => region.total_HT);
        this.renderChart(labels, totalTTC, totalHT);
        this.errorMessage = null;
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }

  private renderChart(labels: string[], totalTTC: number[], totalHT: number[]): void {
    if (this.chart) {
      this.chart.destroy();
    }
  
    const totalChiffreAffaire = this.getTotalChiffreAffaire();
  
    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total TTC',
            data: totalTTC,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Total HT',
            data: totalHT,
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value: number) => value.toFixed(2) + ' DT',
            font: {
              weight: 'bold',
              size: 12
            },
            color: '#333'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y.toFixed(2) + ' DT';
                return label;
              }
            }
          },
          title: {
            display: true,
            text: `Total Chiffre d'Affaires TTC: ${totalChiffreAffaire.toFixed(2)} DT`,
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 20,
              bottom: 20
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Régions',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Montant (DT)',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          }
        }
      }
    });
  }
  
  public getTotalChiffreAffaire(): number {
    return this.regionData.reduce((total, region) => total + region.total_TTC, 0);
  }

  public onSocieteChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSociete = selectElement.value;
    this.selectedSociete = selectedSociete;
    this.loadData(this.selectedSociete);
  }

  public exportPDF(): void {
    const canvas = this.barChart.nativeElement as HTMLCanvasElement;
    const chartImage = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('landscape');
    
    pdf.setFontSize(18);
    pdf.text('Chiffre d\'affaires par région', 140, 20, { align: 'center' });
    
    pdf.addImage(chartImage, 'JPEG', 10, 30, 280, 150);
  
    const tableColumn = ["Nom de la Région", "Total TTC (DT)", "Total HT (DT)"];
    const tableRows = this.regionData.map(region => [
      region.NomRegion,
      region.total_TTC.toFixed(2) + ' DT',
      region.total_HT.toFixed(2) + ' DT'
    ]);
  
    autoTable(pdf, {
      head: [tableColumn],
      body: tableRows,
      startY: 190
    });
  
    pdf.save('chart.pdf');
  }
}
