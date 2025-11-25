import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbProdStoresChart } from './nb-prod-stores-chart';

describe('NbProdStoresChart', () => {
  let component: NbProdStoresChart;
  let fixture: ComponentFixture<NbProdStoresChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbProdStoresChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbProdStoresChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
