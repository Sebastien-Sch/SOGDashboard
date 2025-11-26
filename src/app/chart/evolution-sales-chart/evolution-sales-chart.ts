import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';

Chart.register(...registerables);

@Component({
  selector: 'app-evolution-sales-chart',
  standalone: true,
  imports: [],
  templateUrl: './evolution-sales-chart.html',
  styleUrl: './evolution-sales-chart.scss',
})
export class EvolutionSalesChart implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData().subscribe({
      next: (res) => {
        const labels = res.evolutionProduitsFab.labels;
        const Data = res.evolutionProduitsFab.data;

        console.log('evolutionProduitsFab API chart response:', res);
        console.log('evolutionProduitsFab labels:', labels);
        console.log('evolutionProduitsFab data:', Data);

        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Données des fabricants',
              data: Data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              // indexAxis: 'y',
            }]
          },
        });
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }


  // ngAfterViewInit() {
  //   const ctx = this.chartCanvas.nativeElement.getContext('2d');
  //   if (ctx) {
  //     // Initialize your chart here
  //     const labels = ['2019', '2020', '2021', '2022', '2023'];
  //     const data = [5000, 7000, 8000, 6000, 9000];
  //     new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: 'Évolution des ventes',
  //           data: data,
  //           fill: false,
  //           borderColor: 'rgba(75, 192, 192, 1)',
  //           tension: 0.1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           y: { beginAtZero: true }
  //         }
  //       }
  //     });
  //   }
  // }
}