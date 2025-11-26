import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-ranking-prod-sales-chart',
  imports: [CommonModule],
  templateUrl: './ranking-prod-sales-chart.html',
  styleUrl: './ranking-prod-sales-chart.scss',
})
export class RankingProdSalesChart {
  constructor(private api: ApiService) { }
  @Input() value?: number;
  fabIds: string[] = [];
  fabValues: number[] = [];
  rankingData: { prodId: number; catId: number; nbVentes: number }[] = [];
  ngOnInit() {
    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        const raw = res?.topVentesProduits ?? [];
        if (!Array.isArray(raw)) {
          console.error('topVentesProduits n\'est pas un tableau:', raw);
          return;
        }
        this.rankingData = raw.map((item: any) => ({
          prodId: item?.[1] ?? 0,
          catId: item?.[2] ?? 0,
          nbVentes: item?.[0] ?? 0,
        }));
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
    this.api.getData(109,this.value,2022).subscribe({
      next: (res) => {
        const raw = res?.topVentesProduits ?? [];
        if (!Array.isArray(raw)) {
          console.error('topVentesProduits n\'est pas un tableau:', raw);
          return;
        }
        this.rankingData = raw.map((item: any) => ({
          prodId: item?.[1] ?? null,
          catId: item?.[2] ?? null,
          nbVentes: item?.[0] ?? 0,
        }));
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}
