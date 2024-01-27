import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCategoryComponent } from './income-category.component';

describe('IncomeCategoryComponent', () => {
  let component: IncomeCategoryComponent;
  let fixture: ComponentFixture<IncomeCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeCategoryComponent]
    });
    fixture = TestBed.createComponent(IncomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
