import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

}

const USUARIOS = [{
  nome: 'tito',
  email: 'flavio',
  id: 1,
  senha: '123',
  cpf: '123',
  permissao: 'true'
},
  {nome: 'flavio', cpf: '12312321'},
  {nome: 'jean'},
  {nome: 'xandao'},
  {nome: 'crithian'}
];
