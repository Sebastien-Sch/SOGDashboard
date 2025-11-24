import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManufacturerChartComponent } from './data-manufacturer-chart';

describe('DataManufacturerChartComponent', () => {
  let component: DataManufacturerChartComponent;
  let fixture: ComponentFixture<DataManufacturerChartComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataManufacturerChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataManufacturerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
