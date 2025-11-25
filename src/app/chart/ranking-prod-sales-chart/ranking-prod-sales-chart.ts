import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-ranking-prod-sales-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-prod-sales-chart.html',
  styleUrl: './ranking-prod-sales-chart.scss',
})
export class RankingProdSalesChart implements OnInit {
  rankingData: { prodId: number; catId: number; nbVentes: number }[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getData().subscribe({
      next: (res: any) => {
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
