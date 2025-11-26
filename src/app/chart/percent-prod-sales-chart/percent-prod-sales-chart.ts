import { Component, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../services/api-service';
Chart.register(...registerables);

@Component({
  selector: 'app-percent-prod-sales-chart',
  imports: [],
  standalone: true,
  templateUrl: './percent-prod-sales-chart.html',
  styleUrl: './percent-prod-sales-chart.scss',
})
export class PercentProdSalesChart implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() value?: number;

  private chartInstance: Chart | null = null;
  constructor(private api: ApiService) { }

  ngAfterViewInit() {

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        console.log('produitsParMagasin API chart response:', res);
        console.log('nbProduitsFabriques:', res.nbProduitsFabriques);
        const labels = ['Pourcentage de production', 'Pourcentage de produits en vente'];
        const data = [(res.pourcentageVendus / 100) * res.nbProduitsFabriques, res.nbProduitsFabriques];
        this.chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              legend: {
                position: 'top',
                display: true,
                labels: {
                  color: '#ffffff',
                }
              }
            }
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

  loadChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    
    if (this.chartInstance) {
      console.log("yo");
      this.chartInstance.destroy();
    }

    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        console.log('produitsParMagasin API chart response:', res);
        console.log('nbProduitsFabriques:', res.nbProduitsFabriques);
        const labels = ['Pourcentage de production', 'Pourcentage de produits en vente'];
        const data = [(res.pourcentageVendus / 100) * res.nbProduitsFabriques, res.nbProduitsFabriques];
        this.chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              legend: {
                position: 'top',
                display: true,
                labels: {
                  color: '#ffffff',
                }
              }
            }
          }
        });
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  } 
}