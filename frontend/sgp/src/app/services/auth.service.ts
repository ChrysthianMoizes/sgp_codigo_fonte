import { Injectable } from '@angular/core';
import { Usuario } from '../pages/usuario/models/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  key = environment.key;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ){}

  public setUsuario(usuario: Usuario): void {
    sessionStorage.setItem(this.key, JSON.stringify(usuario));
  }

  login(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`/api/usuarios/login`, usuario);
  }

  public getUsuario(): Usuario {
    if (this.containsUsuario()) {
      return JSON.parse(sessionStorage.getItem(this.key));
    }
  }

  public getNomeUsuario(): string {
    if (this.containsUsuario()) {
      return this.getUsuario().nome;
    }
    return '';
  }

  public getIdUsuario(): number {
    if (this.containsUsuario()) {
      return this.getUsuario().id;
    }
    return 0;
  }

  public getEmailUsuario(): string {
    if (this.containsUsuario()) {
      return this.getUsuario().email;
    }
    return '';
  }

  public getCpflUsuario(): string {
    if (this.containsUsuario()) {
      return this.getUsuario().cpf;
    }
    return '';
  }

  public getPermissaoUsuario(): boolean {
    if (this.containsUsuario()) {
      return this.getUsuario().admin;
    }
    return false;
  }

  public temPermissao(): boolean {
    return this.getPermissaoUsuario();
  }

  public containsUsuario(): boolean {
    return sessionStorage.key(0) === this.key;
  }

  public removerSessao(): void {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  public isAdmin(): boolean {
    return this.temPermissao();
  }
}
