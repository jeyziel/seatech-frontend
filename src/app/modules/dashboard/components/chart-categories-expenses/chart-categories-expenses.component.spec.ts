import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCategoriesExpensesComponent } from './chart-categories-expenses.component';

describe('ChartCategoriesExpensesComponent', () => {
  let component: ChartCategoriesExpensesComponent;
  let fixture: ComponentFixture<ChartCategoriesExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCategoriesExpensesComponent]
    });
    fixture = TestBed.createComponent(ChartCategoriesExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
