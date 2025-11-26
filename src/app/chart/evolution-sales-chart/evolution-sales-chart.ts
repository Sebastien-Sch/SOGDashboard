import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';
import { SimpleChanges } from '@angular/core';

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

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  @Input() value?: number;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        console.log('API chart response:', res);
        const rawDatasets = res.evolutionVentes.datasets;
        const labels = res.evolutionVentes.labels;

        // Transforme les datasets en une seule ligne
        const datasets = rawDatasets.map((data: any, id: number) => ({
          label: data.label,
          data: data.data,
          fill: false,
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(86, 230, 255, 1)'][id % 3],
          tension: 0.1
        }));

        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: { labels, datasets },
          options: { responsive: true }
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

  loadChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
          this.chartInstance.destroy();
        }

    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {

        const rawDatasets = res.evolutionVentes.datasets;
        const labels = res.evolutionVentes.labels;

        // Transforme les datasets en une seule ligne
        const datasets = rawDatasets.map((data: any, id: number) => ({
          label: data.label,
          data: data.data,
          fill: false,
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(86, 230, 255, 1)'][id % 3],
          tension: 0.1
        }));

        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: { labels, datasets },
          options: { responsive: true }
        });
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}