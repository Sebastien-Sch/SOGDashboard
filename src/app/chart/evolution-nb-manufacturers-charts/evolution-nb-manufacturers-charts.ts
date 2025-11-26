import { Component, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';


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

  @Input() value?: number;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }
  
  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        const labels = res.evolutionProduitsFab.labels;
        const data = res.evolutionProduitsFab.data;

        this.chartInstance = new Chart(ctx, {
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
    });
  }
  
  /* Détecte les changements de valeur de l'attribut 'value' et lance la mise à jour du diagramme */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.loadChart();
    }
  }

  loadChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        const labels = res.evolutionProduitsFab.labels;
        const data = res.evolutionProduitsFab.data;

        this.chartInstance = new Chart(ctx, {
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
    });
  }

  
}