import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingFabChart } from './ranking-fab-chart';

describe('RankingFabChart', () => {
  let component: RankingFabChart;
  let fixture: ComponentFixture<RankingFabChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingFabChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingFabChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
