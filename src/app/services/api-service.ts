import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChartResponse {
  nbFabParCategorie: {
    data: any[];
    labels: string[];
  };
  topCategories: {
    data: any[];
    labels: string[];
  };
  evolutionVentes: {
    datasets: [
      {
        data: any[],
        label: string[],
      },
    ];
    labels: string[];
  };
  nbProduitsFabriques: number;
  pourcentageVentesProduits: number;
  nbProduitsMagasins: number;
  nbVentes: number;
  topFabricants: {
    data: any[];
    labels: string[];
  };
  topVentesProduits: Array<{ nbVentes: number; prodId: number; catId: number }>;
  rankingData: Array<{ nbVentes: number; prodId: number; catId: number }>;


}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.68.131:5000/api/dashboard/109/5/2022';

  constructor(private http: HttpClient) { }

  getData(): Observable<ChartResponse> {
    return this.http.get<ChartResponse>(`${this.baseUrl}`);
  }

  // getDataManufacturerChart(): Observable<ChartResponse> {
  //   return this.http.get<ChartResponse>(`${this.baseUrl}/manufacturers/chart`);
  // }

}
