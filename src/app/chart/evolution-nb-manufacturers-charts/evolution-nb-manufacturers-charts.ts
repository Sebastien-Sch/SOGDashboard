import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-evolution-nb-manufacturers-charts',
  standalone: true,
  imports: [],
  templateUrl: './evolution-nb-manufacturers-charts.html',
  styleUrl: './evolution-nb-manufacturers-charts.scss',
})
export class EvolutionNbManufacturersCharts implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Initialize your chart here
      const labels = ['2019', '2020', '2021', '2022', '2023'];
      const data = [5, 10, 15, 20, 25];
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Évolution du nombre de fabricants',
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