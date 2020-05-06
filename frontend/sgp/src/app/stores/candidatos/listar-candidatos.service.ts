import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ListarCandidatosService {
  private candidatos = [
    {
      id: 1,
      nome: 'João Pedro',
      senha: '010101',
      email: 'jpedrocalixto@outlook.com',
      cpf: '901239013-98',
      permissao: 'ROLE_USER'
    },
    {
      id: 2,
      nome: 'Flávio',
      senha: '696969',
      email: 'lehmanjr@gmail.com',
      cpf: '151231312-48',
      permissao: 'ROLE_USER'
    },
    {
      id: 1,
      nome: 'Tito',
      senha: '666666',
      email: 'staulfertito@hotmail.com',
      cpf: '891298471-38',
      permissao: 'ROLE_USER'
    },
  ]
  constructor() { }

  listarCandidatos(): Observable<Usuario[]> {
    return of<Usuario[]>(this.candidatos);
  }
}
