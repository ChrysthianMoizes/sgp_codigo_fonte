import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoListarComponent } from './questao-listar.component';

describe('QuestaoComponent', () => {
  let component: QuestaoListarComponent;
  let fixture: ComponentFixture<QuestaoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestaoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
