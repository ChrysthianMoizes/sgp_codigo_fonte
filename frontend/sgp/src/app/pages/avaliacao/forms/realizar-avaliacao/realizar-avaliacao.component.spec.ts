import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarAvaliacaoComponent } from './realizar-avaliacao.component';

describe('RealizarAvaliacaoComponent', () => {
  let component: RealizarAvaliacaoComponent;
  let fixture: ComponentFixture<RealizarAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
