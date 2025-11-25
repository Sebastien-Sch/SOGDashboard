import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionCatSalesChart } from './evolution-cat-sales-chart';

describe('EvolutionCatSalesChart', () => {
  let component: EvolutionCatSalesChart;
  let fixture: ComponentFixture<EvolutionCatSalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionCatSalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionCatSalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
