import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenviarEmailComponent } from './reenviar-email.component';

describe('ReenviarEmailComponent', () => {
  let component: ReenviarEmailComponent;
  let fixture: ComponentFixture<ReenviarEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReenviarEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenviarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
