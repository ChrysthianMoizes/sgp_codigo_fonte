import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosComponent } from './candidatos.component';

describe('CandidatosComponent', () => {
  let component: CandidatosComponent;
  let fixture: ComponentFixture<CandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
