import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCandidatosComponent } from './listar-candidatos.component';

describe('ListarCandidatosComponent', () => {
  let component: ListarCandidatosComponent;
  let fixture: ComponentFixture<ListarCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
