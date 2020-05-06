import {TestBed} from '@angular/core/testing';

import {RequisicaoLoadingService} from './requisicao-loading.service';

describe('RequisicaoLoadingService', () => {
  let service: RequisicaoLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisicaoLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
