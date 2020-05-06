import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { CadastrarProvaComponent } from './cadastrar-prova.component';

describe('CadastrarProvaComponent', () => {
  let component: CadastrarProvaComponent;
  let fixture: ComponentFixture<CadastrarProvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarProvaComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
