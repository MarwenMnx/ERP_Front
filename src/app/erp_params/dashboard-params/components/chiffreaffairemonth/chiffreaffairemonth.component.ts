import { Component } from '@angular/core';
import { ChiffreAffaireMonthService } from '../../societe-service.service';
import { Chart} from 'chart.js';
import {  OnInit, ViewChild, ElementRef } from '@angular/core';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { forkJoin, of } from 'rxjs';

import { CommonModule, NgFor } from '@angular/common';

import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'vex-chiffreaffairemonth',
  templateUrl: './chiffreaffairemonth.component.html',
  styleUrls: ['./chiffreaffairemonth.component.scss'],
  standalone : true,
  imports: [NgFor, FormsModule,  CommonModule]
})
export class ChiffreaffairemonthComponent implements OnInit {
  private chart: any;
  societies: string[] = ["s01", "s02", "s03", "s04"];
  details: { society: string, month: number, total_TTC: number }[] = [];
  selectedSociety: string = this.societies[0]; // Initialiser selectedSociety
  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(private chiffreAffaireMonthService: ChiffreAffaireMonthService) { }

  ngOnInit() {
    this.loadChiffreAffaire();
  }

  loadChiffreAffaire() {
    const months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

    const requests = this.societies.map(society =>
      this.chiffreAffaireMonthService.getChiffreAffaire(months, society)
    );

    forkJoin(requests).pipe(
      catchError((error: any) => {
        console.error('Erreur lors du chargement du chiffre d\'affaires', error);
        alert('Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.');
        return of([]);
      })
    ).subscribe((results: any[]) => {
      const datasets = results.map((result: any, index: number) => {
        const society = this.societies[index];
        const societyData = this.mapResultsToData(result.RESULTAT, months, society);
        return {
          label: `Chiffre d'affaires ${society}`,
          data: societyData.map(item => item.total_TTC),
          backgroundColor: this.getRandomColor(index),
          borderColor: this.getRandomColor(index),
          borderWidth: 1
        };
      });

      this.details = results.flatMap((result: any, index: number) => {
        const society = this.societies[index];
        return this.mapResultsToData(result.RESULTAT, months, society);
      });

      this.createChart(datasets, months);
    });
  }

  get filteredDetails() {
    return this.details.filter(detail => detail.society === this.selectedSociety);
  }

  get paginatedDetails() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDetails.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredDetails.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private mapResultsToData(results: any[], months: number[], society: string): { society: string, month: number, total_TTC: number }[] {
    return months.map(month => {
      const entry = results.find(result => result.month === month);
      return { society, month, total_TTC: entry ? entry.total_TTC : 0 };
    });
  }

  private getRandomColor(index: number): string {
    const colors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
    ];
    return colors[index % colors.length];
  }

  private createChart(datasets: any[], months: number[]) {
    const ctx = document.getElementById('chiffreAffaireChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: months.map(month => `Mois ${month}`),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chiffre d\'affaires par Société'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          datalabels: { 
            display: false 
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois'
            },
            grid: {
              display: true
            }
          },
          y: {
            title: {
              display: true,
              text: 'Chiffre d\'affaires (TTC)'
            },
            beginAtZero: true,
            grid: {
              display: true
            }
          }
        },
        elements: {
          point: {
            radius: 5
          }
        }
      }
    });
  }
}