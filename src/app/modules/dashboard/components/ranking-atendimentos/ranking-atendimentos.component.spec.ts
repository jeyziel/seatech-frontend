import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingAtendimentosComponent } from './ranking-atendimentos.component';

describe('RankingAtendimentosComponent', () => {
  let component: RankingAtendimentosComponent;
  let fixture: ComponentFixture<RankingAtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingAtendimentosComponent]
    });
    fixture = TestBed.createComponent(RankingAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
