import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCategoryComponent } from './survey-category.component';

describe('SurveyCategoryComponent', () => {
  let component: SurveyCategoryComponent;
  let fixture: ComponentFixture<SurveyCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyCategoryComponent]
    });
    fixture = TestBed.createComponent(SurveyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
