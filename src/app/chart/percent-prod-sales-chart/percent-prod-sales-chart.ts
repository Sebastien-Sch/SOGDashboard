import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-percent-prod-sales-chart',
  imports: [],
  standalone: true,
  templateUrl: './percent-prod-sales-chart.html',
  styleUrl: './percent-prod-sales-chart.scss',
})
export class PercentProdSalesChart implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Initialize your chart here
      const labels = ['Pourcentage de production', 'Pourcentage de produits en vente'];
      const data = [350, 200];
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              display: true,
              labels: {
                color: '#ffffff',
              }
            }
          }
        }
      });
    }
  }
}