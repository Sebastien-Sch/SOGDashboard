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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('sog-dashboard');

  constructor(private logService: LoginService, private router: Router) { }

  ngOnInit() {
    if (!this.logService.isLoggedIn()) {
      this.router.navigate(['/login-page']);
    }
  }
}
