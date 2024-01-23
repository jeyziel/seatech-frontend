import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSurveysHarborComponent } from './chart-surveys-harbor.component';

describe('ChartSurveysHarborComponent', () => {
  let component: ChartSurveysHarborComponent;
  let fixture: ComponentFixture<ChartSurveysHarborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartSurveysHarborComponent]
    });
    fixture = TestBed.createComponent(ChartSurveysHarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
