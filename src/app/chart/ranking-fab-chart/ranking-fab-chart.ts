import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() value?: number;
  fabIds: string[] = [];
  fabValues: number[] = [];
  rankingData: { fabId: string; nbVentes: number }[] = [];
  ngOnInit() {
    this.api.getData(109,this.value,2022).subscribe({
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

  /* Détecte les changements de valeur de l'attribut 'value' et lance la mise à jour du diagramme */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.loadChart();
    }
  }
  
  loadChart() {
    this.api.getData(109,this.value,2022).subscribe({
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
