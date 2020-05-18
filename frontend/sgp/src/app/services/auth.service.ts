import { Injectable } from '@angular/core';
import { Usuario } from '../pages/usuario/models/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = environment.key;

  constructor(private router: Router, private httpClient: HttpClient) {}

  setUsuario(usuario: Usuario): void {
    sessionStorage.setItem(this.key, JSON.stringify(usuario));
  }

  login(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`/api/usuarios/login`, usuario);
  }

  getUsuario(): Usuario {
    !this.containsUsuario() && this.router.navigate(['/login']);
    const usuario = JSON.parse(sessionStorage.getItem(this.key));
    return usuario != null
      ? ({
          ...usuario,
          admin: usuario.admin === 1,
        } as Usuario)
      : null;
  }

  containsUsuario(): boolean {
    return sessionStorage.getItem(this.key) != null;
  }

  removerSessao(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
