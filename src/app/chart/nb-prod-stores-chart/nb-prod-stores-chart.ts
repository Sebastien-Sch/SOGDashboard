import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';

Chart.register(...registerables);

@Component({
  selector: 'app-nb-prod-stores-chart',
  imports: [],
  standalone: true,
  templateUrl: './nb-prod-stores-chart.html',
  styleUrl: './nb-prod-stores-chart.scss',
})
export class NbProdStoresChart implements AfterViewInit {
  @ViewChild('nbProdStoresChart', { static: true }) nbProdStoresChart!: ElementRef<HTMLCanvasElement>;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  ngAfterViewInit() {
    const ctx = this.nbProdStoresChart.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData().subscribe({
      next: (res) => {
        console.log('produitsParMagasin API chart response:', res);
        console.log('produitsParMagasin:', res.produitsParMagasin.data);
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: res.produitsParMagasin.labels,
            datasets: [{
              label: 'Données des fabricants',
              data: res.produitsParMagasin.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              // indexAxis: 'y',
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