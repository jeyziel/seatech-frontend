import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsToPayComponent } from './bills-to-pay.component';

describe('BillsToPayComponent', () => {
  let component: BillsToPayComponent;
  let fixture: ComponentFixture<BillsToPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsToPayComponent]
    });
    fixture = TestBed.createComponent(BillsToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
