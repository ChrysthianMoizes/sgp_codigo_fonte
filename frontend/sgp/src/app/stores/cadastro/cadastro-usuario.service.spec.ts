import { TestBed } from '@angular/core/testing';

import { CadastroUsuarioService } from './cadastro-usuario.service';

describe('CadastroUsuarioService', () => {
  let service: CadastroUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
