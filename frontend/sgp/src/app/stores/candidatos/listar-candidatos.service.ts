import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { element } from 'protractor';

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
      id: 3,
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

  excluirCandidatos(id: number): Observable<void> {
    var pos = this.candidatos.findIndex(element => element.id == id);
    if (pos != -1) {
      this.candidatos.splice(pos, 1);
    }
    return of(null);
  }

  editarCandidato(candidato: Usuario): Observable<Usuario[]> {
    var pos = this.candidatos.findIndex(element => element.id == candidato.id);
    if (pos != -1) {
      this.candidatos[pos] = candidato;
    }
    return of(this.candidatos);
  }
}
