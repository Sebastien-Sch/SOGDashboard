import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingProdSalesChart } from './ranking-prod-sales-chart';

describe('RankingProdSalesChart', () => {
  let component: RankingProdSalesChart;
  let fixture: ComponentFixture<RankingProdSalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingProdSalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingProdSalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
