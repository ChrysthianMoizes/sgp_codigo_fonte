import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioToken } from '../models/usuarioToken';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private candidatos: Usuario[] = [
    {
      id: 1,
      nome: 'João Pedro',
      senha: '010101',
      email: 'jpedrocalixto@outlook.com',
      cpf: '901239013-98',
      admin: false
    },
    {
      id: 2,
      nome: 'Flávio',
      senha: '696969',
      email: 'lehmanjr@gmail.com',
      cpf: '151231312-48',
      admin: false
    },
    {
      id: 3,
      nome: 'Tito',
      senha: '666666',
      email: 'staulfertito@hotmail.com',
      cpf: '891298471-38',
      admin: false
    },
  ]

  constructor() {
  }

  findByNome(query: string): Observable<Usuario[]> {
    return of(
      USUARIOS.filter(
        elem => elem.nome.toLowerCase().includes(
          query.toLowerCase()
        )
      ) as Usuario[]
    );
  }

  show(i: number) {
    return of(USUARIOS[i]);
  }

  cadastrarUsuario(usuario: UsuarioToken): Observable<Usuario> {
    return of<Usuario>(usuario)
  }

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

  logar(email: string, senha: string): Observable<Usuario> {

    const user = {
      id: 1,
      nome: "abc",
      senha: senha,
      email: email,
      cpf: "321",
      admin: true,
    }
    console.log(user);

    return of<Usuario>(user)

  }

  reenviarEmailConfirmacao(email: string): Observable<void> {
    return of(null);
  }

  resetarSenha(email: string): Observable<void> {
    return of(null);
  }

}

const USUARIOS = [{
  nome: 'tito',
  email: 'flavio',
  id: 1,
  senha: '123',
  cpf: '123',
  permissao: 'true'
},
{ nome: 'flavio', cpf: '12312321' },
{ nome: 'jean' },
{ nome: 'xandao' },
{ nome: 'crithian' }
];
