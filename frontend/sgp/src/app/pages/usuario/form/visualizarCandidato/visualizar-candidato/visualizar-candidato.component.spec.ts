import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCandidatoComponent } from './visualizar-candidato.component';

describe('VisualizarCandidatoComponent', () => {
  let component: VisualizarCandidatoComponent;
  let fixture: ComponentFixture<VisualizarCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
