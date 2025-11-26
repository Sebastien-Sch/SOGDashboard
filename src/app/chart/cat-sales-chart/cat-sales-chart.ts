import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';
import { SimpleChanges } from '@angular/core';

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

  /* Mois courant pour le calcul des données pour le diagramme */
  @Input() value?: number;

  ngAfterViewInit() {
    const ctx = this.catSalesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    console.log('Fetching data for month:', this.value);
    
    this.api.getData(109,this.value,2022).subscribe({
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
                'rgba(86, 230, 255, 0.5)',
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

  /* Détecte les changements de valeur de l'attribut 'value' et lance la mise à jour du diagramme */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.loadChart();
    }
  }

  /* Recharge le diagramme */
  loadChart() {
    if (!this.catSalesChartRef) return;
    const ctx = this.catSalesChartRef.nativeElement.getContext('2d');
    if (!ctx || this.value === undefined) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    console.log('Fetching data for month:', this.value);
    this.api.getData(109, this.value, 2022).subscribe({
      next: (res) => {
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
                'rgba(86, 230, 255, 0.5)',
              ],
            }]
          },
          options: { responsive: true }
        });
      },
      error: (err) => console.error('Erreur API chart:', err)
    });
  }
}