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
  url = environment.url;

  constructor(private router: Router, private httpClient: HttpClient) {}

  public setUsuario(usuario: Usuario): void {
    sessionStorage.setItem(this.key, JSON.stringify(usuario));
  }

  login(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`${this.url}/usuarios/login`, usuario);
  }

  public getUsuario(): Usuario {
    if (this.containsUsuario()) {
      return JSON.parse(sessionStorage.getItem(this.key));
    } else {
      this.router.navigate(['/login']);
    }
  }

  public temPermissao(): boolean {
    return this.getUsuario().admin;
  }

  public containsUsuario(): boolean {
    return sessionStorage.key(0) === this.key;
  }

  public removerSessao(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    return this.temPermissao();
  }
}
