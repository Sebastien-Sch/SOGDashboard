import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

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
  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Initialize your chart here
      const labels = ['2019', '2020', '2021', '2022', '2023'];
      const data = [5000, 7000, 8000, 6000, 9000];
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Évolution des ventes',
            data: data,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }
}