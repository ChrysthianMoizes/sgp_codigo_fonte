import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() {
  }

  getPerfil(id: number): Observable<Usuario> {
    const perfil = new Usuario();
    perfil.id = 1;
    perfil.nome = 'usuário';
    perfil.email = 'usuário@email.com';
    perfil.senha = 'senha';

    return of(perfil);
  }

  updatePefil(perfil: Usuario): Observable<void> {
    return of();
  }

}
