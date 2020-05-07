import { TestBed } from '@angular/core/testing';

import { ListarCandidatosService } from './listar-candidatos.service';

describe('ListarCandidatosService', () => {
  let service: ListarCandidatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarCandidatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
