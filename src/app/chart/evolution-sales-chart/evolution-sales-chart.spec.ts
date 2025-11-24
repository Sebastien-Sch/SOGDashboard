import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionSalesChart } from './evolution-sales-chart';

describe('EvolutionSalesChart', () => {
  let component: EvolutionSalesChart;
  let fixture: ComponentFixture<EvolutionSalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionSalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionSalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
