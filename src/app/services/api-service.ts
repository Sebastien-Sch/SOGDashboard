import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChartResponse {
  nbFabParCategorie: {
    data: any[];
    labels: string[];
  };
  produitsParMagasin: {
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
  evolutionProduitsFab: {
    data: any[],
    labels: string[],
  },

  nbProduitsFabriques: number;
  nbAccordVente: number;
  pourcentageVendus: number;
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
  private baseUrl = 'http://localhost:5000/api/dashboard/109/5/2022'; /* URL de l'API Python de traitement de données */

  constructor(private http: HttpClient) { }

  getData(fabId? : number, month? : number, year?: number): Observable<ChartResponse> {
    const url = 'http://localhost:5000/api/dashboard/' + `${fabId}/${month}/${year}`;
    return this.http.get<ChartResponse>(url);
  }

  // getDataManufacturerChart(): Observable<ChartResponse> {
  //   return this.http.get<ChartResponse>(`${this.baseUrl}/manufacturers/chart`);
  // }

}
