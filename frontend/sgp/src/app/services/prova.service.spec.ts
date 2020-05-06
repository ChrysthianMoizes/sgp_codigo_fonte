import { TestBed } from '@angular/core/testing';

import { ProvaService } from './prova.service';

describe('ProvaService', () => {
  let service: ProvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
