import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsToReceiveComponent } from './bills-to-receive.component';

describe('BillsToReceiveComponent', () => {
  let component: BillsToReceiveComponent;
  let fixture: ComponentFixture<BillsToReceiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsToReceiveComponent]
    });
    fixture = TestBed.createComponent(BillsToReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
