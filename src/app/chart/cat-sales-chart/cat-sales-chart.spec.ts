import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSalesChart } from './cat-sales-chart';

describe('CatSalesChart', () => {
  let component: CatSalesChart;
  let fixture: ComponentFixture<CatSalesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatSalesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatSalesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
