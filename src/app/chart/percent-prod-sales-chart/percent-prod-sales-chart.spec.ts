import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentProdSalesChart } from './percent-prod-sales-chart';

describe('PercentProdSalesChart', () => {
  let component: PercentProdSalesChart;
  let fixture: ComponentFixture<PercentProdSalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentProdSalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentProdSalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
