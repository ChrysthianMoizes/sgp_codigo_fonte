import { TestBed } from '@angular/core/testing';

import { ExcluirUsuarioService } from './excluir-usuario.service';

describe('ExcluirUsuarioService', () => {
  let service: ExcluirUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcluirUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
