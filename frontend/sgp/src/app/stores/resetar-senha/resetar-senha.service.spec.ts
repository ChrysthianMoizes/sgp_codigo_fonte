import { TestBed } from '@angular/core/testing';

import { ResetarSenhaService } from './resetar-senha.service';

describe('ResetarSenhaService', () => {
  let service: ResetarSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetarSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
