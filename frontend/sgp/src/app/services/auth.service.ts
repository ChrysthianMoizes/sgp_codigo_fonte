import { Injectable } from '@angular/core';
import { Usuario } from '../pages/usuario/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private KEY: string = 'sgp';

  public setUsuario(usuario: Usuario): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(usuario));
  }

  public getUsuario(): Usuario {
    if (this.containsUsuario()) {
      return JSON.parse(sessionStorage.getItem(this.KEY));
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
    return sessionStorage.key(0) === this.KEY;
  }

  public removerSessao(): void {
    sessionStorage.clear();
  }

  public isAdmin(): boolean {
    return this.temPermissao();
  }
}
