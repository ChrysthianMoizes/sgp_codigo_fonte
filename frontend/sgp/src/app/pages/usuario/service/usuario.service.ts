import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioToken } from '../models/usuarioToken';
import { AuthService } from 'src/app/services/auth.service';
import { element } from 'protractor';
import { error } from '@angular/compiler/src/util';
import { AuthGuard } from 'src/app/services/auth.guard';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private candidatos: Usuario[] = [
    {
      id: 1,
      nome: 'João Pedro',
      senha: '010101',
      email: 'jpedrocalixto@outlook.com',
      cpf: '901239013-98',
      admin: false,
    },
    {
      id: 2,
      nome: 'Flávio',
      senha: '696969',
      email: 'lehmanjr@gmail.com',
      cpf: '151231312-48',
      admin: false,
    },
    {
      id: 3,
      nome: 'Tito',
      senha: '666666',
      email: 'staulfertito@hotmail.com',
      cpf: '891298471-38',
      admin: false,
    },
    {
      id: 4,
      nome: 'Administrador',
      senha: 'admin',
      email: 'admin@admin',
      cpf: '901239013-98',
      admin: true,
    }
  ];

  constructor() {}

  findByNome(query: string): Observable<Usuario[]> {
    return of(
      this.candidatos.filter((elem) =>
        elem.nome.toLowerCase().includes(query.toLowerCase())
      ) as Usuario[]
    );
  }

  show(i: number): Observable<Usuario> {
    return of(this.candidatos[i]);
  }

  cadastrarUsuario(usuario: UsuarioToken): Observable<Usuario> {
    this.candidatos.push(<Usuario>usuario);
    return of<Usuario>(usuario)
  }

  listarCandidatos(): Observable<Usuario[]> {
    let candidatosAv: Usuario[] = [];
    this.candidatos.forEach(element => {
      if(!element.admin){
        candidatosAv.push(element);
      }
    })
    return of<Usuario[]>(candidatosAv);
  }

  excluirCandidatos(id: number): Observable<void> {
    var pos = this.candidatos.findIndex((element) => element.id == id);
    if (pos != -1) {
      this.candidatos.splice(pos, 1);
    }
    return of(null);
  }

  editarCandidato(candidato: Usuario): Observable<Usuario[]> {
    var pos = this.candidatos.findIndex(
      (element) => element.id == candidato.id
    );
    if (pos != -1) {
      this.candidatos[pos] = candidato;
    }
    return of(this.candidatos);
  }

  existeUser(email: string, senha: string) {
    return this.candidatos.find(element => element.email === email && element.senha === senha);
  }

  logar(email: string, senha: string): Observable<Usuario> {
    const candidato: Usuario = this.existeUser(email, senha);
    console.log(this.candidatos)
    return candidato ? of(candidato) : of (null);
  }

  reenviarEmailConfirmacao(email: string): Observable<void> {
    return of(null);
  }

  resetarSenha(email: string): Observable<void> {
    return of(null);
  }
}
