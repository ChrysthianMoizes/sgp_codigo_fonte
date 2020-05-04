import { TestBed } from '@angular/core/testing';

import { ReenviarEmailService } from './reenviar-email.service';

describe('ReenviarEmailService', () => {
  let service: ReenviarEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReenviarEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
