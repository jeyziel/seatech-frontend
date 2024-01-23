import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCategoriesComponent } from './chart-categories.component';

describe('ChartCategoriesComponent', () => {
  let component: ChartCategoriesComponent;
  let fixture: ComponentFixture<ChartCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCategoriesComponent]
    });
    fixture = TestBed.createComponent(ChartCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
