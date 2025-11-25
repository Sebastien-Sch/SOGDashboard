import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

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

  ngAfterViewInit(): void {
    const ctx = this.catSalesChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Category 1', 'Category 2', 'Category 3'],
          datasets: [{
            label: 'Les catégories de produits vendus',
            data: [10, 20, 30],
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
    }
  }
}