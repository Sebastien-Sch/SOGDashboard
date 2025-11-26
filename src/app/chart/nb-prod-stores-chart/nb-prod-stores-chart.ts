import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';
import { SimpleChanges } from '@angular/core';


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

  /* Mois courant pour le calcul des données pour le diagramme */
  @Input() value?: number;

  ngAfterViewInit() {
    const ctx = this.nbProdStoresChart.nativeElement.getContext('2d');
    if (!ctx) return;

    this.api.getData(109,this.value,2022).subscribe({
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

/* Détecte les changements de valeur de l'attribut 'value' et lance la mise à jour du diagramme */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.loadChart();
    }
  }

  loadChart() {
    if (!this.nbProdStoresChart) return;
    const ctx = this.nbProdStoresChart.nativeElement.getContext('2d');
    if (!ctx || this.value === undefined) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.api.getData(109,this.value,2022).subscribe({
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