import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAvaliacaoComponent } from './listar-avaliacao.component';

describe('ListarAvaliacaoComponent', () => {
  let component: ListarAvaliacaoComponent;
  let fixture: ComponentFixture<ListarAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
