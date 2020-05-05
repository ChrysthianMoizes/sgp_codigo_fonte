import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Perfil} from "../models/perfil";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() {
  }

  obterPerfil(id: number): Observable<Perfil> {
    const perfil = new Perfil();
    perfil.id = 1;
    perfil.nome = 'usuário';
    perfil.email = 'usuário@email.com';
    perfil.senha = 'senha';

    return of(perfil);
  }

  update(perfil: Perfil): Observable<void> {
    return of();
  }

}
