import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';

Chart.register(...registerables);

@Component({
  selector: 'app-cat-sales-chart',
  imports: [],
  standalone: true,
  templateUrl: './cat-sales-chart.html',
  styleUrl: './cat-sales-chart.scss',
})
export class CatSalesChart implements AfterViewInit {
  @ViewChild('catSalesChart', { static: true }) catSalesChartRef!: ElementRef<HTMLCanvasElement>;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  ngAfterViewInit() {
    const ctx = this.catSalesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData().subscribe({
      next: (res) => {
        console.log('API chart response:', res);
        console.log('topCategories:', res.topCategories.data);
        this.chartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: res.topCategories.labels,
            datasets: [{
              label: 'Les catégories de produits vendus',
              data: res.topCategories.data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(86, 230, 255, 0.5)'
              ],
            }]
          },
          options: {
            responsive: true,
          }
        });
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}