import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionNbManufacturersCharts } from './evolution-nb-manufacturers-charts';

describe('EvolutionNbManufacturersCharts', () => {
  let component: EvolutionNbManufacturersCharts;
  let fixture: ComponentFixture<EvolutionNbManufacturersCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionNbManufacturersCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionNbManufacturersCharts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
