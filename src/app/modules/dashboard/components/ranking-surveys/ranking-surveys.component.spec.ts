import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingSurveysComponent } from './ranking-surveys.component';

describe('RankingSurveysComponent', () => {
  let component: RankingSurveysComponent;
  let fixture: ComponentFixture<RankingSurveysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingSurveysComponent]
    });
    fixture = TestBed.createComponent(RankingSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
