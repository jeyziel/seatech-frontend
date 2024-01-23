import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCustomersComponent } from './ranking-customers.component';

describe('RankingCustomersComponent', () => {
  let component: RankingCustomersComponent;
  let fixture: ComponentFixture<RankingCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingCustomersComponent]
    });
    fixture = TestBed.createComponent(RankingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
