import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCategoriesCustomerComponent } from './chart-categories.component';

describe('ChartCategoriesComponent', () => {
  let component: ChartCategoriesCustomerComponent;
  let fixture: ComponentFixture<ChartCategoriesCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCategoriesCustomerComponent]
    });
    fixture = TestBed.createComponent(ChartCategoriesCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
