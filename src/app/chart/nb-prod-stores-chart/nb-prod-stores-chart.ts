import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-nb-prod-stores-chart',
  imports: [],
  standalone: true,
  templateUrl: './nb-prod-stores-chart.html',
  styleUrl: './nb-prod-stores-chart.scss',
})
export class NbProdStoresChart implements AfterViewInit {
  @ViewChild('nbProdStoresChart', { static: true }) nbProdStoresChartRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.nbProdStoresChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const labels = ['Produit 1', 'Produit 2', 'Produit 3', 'Produit 4'];
      const data = [50, 75, 150, 100];
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            indexAxis: 'y',
            label: 'Nombre de produits en magasin',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  }
}