import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';

Chart.register(...registerables);

@Component({
  selector: 'app-data-manufacturer-chart',
  standalone: true,
  templateUrl: './data-manufacturer-chart.html'
})
export class DataManufacturerChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData().subscribe({
      next: (res) => {
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: res.nbFabParCategorie.labels,
            datasets: [{
              label: 'Données des fabricants',
              data: res.nbFabParCategorie.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              indexAxis: 'y',
            }]
          },
          options: { scales: { y: { beginAtZero: true } } }
        });
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}
