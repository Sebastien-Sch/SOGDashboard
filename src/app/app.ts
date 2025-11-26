import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Navbar } from './layout/navbar/navbar';
import { LoginService } from './services/loginService/login-service';
import { DataManufacturerChartComponent } from "./chart/data-manufacturer-chart/data-manufacturer-chart";
import { PercentProdSalesChart } from './chart/percent-prod-sales-chart/percent-prod-sales-chart';
import { EvolutionSalesChart } from './chart/evolution-sales-chart/evolution-sales-chart';
import { CatSalesChart } from './chart/cat-sales-chart/cat-sales-chart';
import { NbProdStoresChart } from "./chart/nb-prod-stores-chart/nb-prod-stores-chart";
import { RankingFabChart } from "./chart/ranking-fab-chart/ranking-fab-chart";
import { RankingProdSalesChart } from './chart/ranking-prod-sales-chart/ranking-prod-sales-chart';
import { ApiService } from './services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { EvolutionNbManufacturersCharts } from './chart/evolution-nb-manufacturers-charts/evolution-nb-manufacturers-charts';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Navbar,
    DataManufacturerChartComponent,
    PercentProdSalesChart,
    EvolutionSalesChart,
    CatSalesChart,
    NbProdStoresChart,
    RankingFabChart,
    RankingProdSalesChart,
    EvolutionNbManufacturersCharts,
    HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('sog-dashboard');
  nbProduitsFabriques: number = 0;
  nbVentes: number = 0;
  nbAccordVente: number = 0;
  fabId! : number;
  month: number = (new Date().getMonth())+1; // Mois actuel (1-12)
  year: number = 2022;

  constructor(private logService: LoginService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData(109, this.month, 2022).subscribe({
      next: (res) => {
        this.nbProduitsFabriques = res.nbProduitsFabriques;
        this.nbVentes = res.nbVentes;
        this.nbAccordVente = res.nbAccordVente;
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });

    if (!this.logService.isLoggedIn()) {
      this.router.navigate(['/login-page']);
    }
  }

  onMonthChanged(monthNumber : number){
    this.month = monthNumber;  // ← Stocke le mois
    console.log('Mois changé dans app.ts:', this.month);
    this.apiService.getData(109, monthNumber, 2022).subscribe({
      next: (res) => {
        this.nbProduitsFabriques = res.nbProduitsFabriques;
        this.nbVentes = res.nbVentes;
        this.nbAccordVente = res.nbAccordVente;
      },
      error: (err) => {
        console.error('Erreur API chart:', err);
      }
    });
  }
}
