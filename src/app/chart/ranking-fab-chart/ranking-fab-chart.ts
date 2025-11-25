import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-ranking-fab-chart',
  imports: [CommonModule],
  templateUrl: './ranking-fab-chart.html',
  styleUrl: './ranking-fab-chart.scss',
})
export class RankingFabChart {
  constructor(private api: ApiService) { }
  fabIds: string[] = [];
  fabValues: number[] = [];
  rankingData: { fabId: string; nbVentes: number }[] = [];
  ngOnInit() {
    this.api.getData().subscribe({
      next: (res) => {
        this.rankingData = res.topFabricants.data.map((nbVentes: number, index: number) => ({
          fabId: res.topFabricants.labels[index],
          nbVentes: nbVentes
        }));
        this.fabIds = res.topFabricants.labels;
        this.fabValues = res.topFabricants.data;
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}
