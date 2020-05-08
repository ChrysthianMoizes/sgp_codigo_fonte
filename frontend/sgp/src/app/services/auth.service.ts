import { Usuario } from './../pages/usuario/models/usuario.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private KEY: string = 'sgp';

  public setUsuarioSessionStorage(usuario: Usuario): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(usuario));
  }

  public getUsuarioSessionStorage(): Usuario {
    if (this.containsUsuarioSessionStorage()) {
      return JSON.parse(sessionStorage.getItem(this.KEY));
    }
    return new Usuario();
  }

  public getNomeUsuarioSessionStorage(): string {
    if (this.containsUsuarioSessionStorage()) {
      return this.getUsuarioSessionStorage().nome;
    }
    return '';
  }

  public getIdUsuarioSessionStorage(): number {
    if (this.containsUsuarioSessionStorage()) {
      return this.getUsuarioSessionStorage().id;
    }
    return 0;
  }

  public getEmailUsuarioSessionStorage(): string {
    if (this.containsUsuarioSessionStorage()) {
      return this.getUsuarioSessionStorage().email;
    }
    return '';
  }

  public getCpflUsuarioSessionStorage(): string {
    if (this.containsUsuarioSessionStorage()) {
      return this.getUsuarioSessionStorage().cpf;
    }
    return '';
  }

  public getPermissaoUsuarioSessionStorage(): boolean {
    if (this.containsUsuarioSessionStorage()) {
      return this.getUsuarioSessionStorage().admin;
    }
    return false;
  }

  public temPermissao(): boolean {
    return this.getPermissaoUsuarioSessionStorage();
  }

  public containsUsuarioSessionStorage(): boolean {
    return sessionStorage.key(0) === this.KEY;
  }

  public retirarUsuarioDoSessionStorage(): void {
    sessionStorage.clear();
  }

  public isAdmin(): boolean {
    return this.temPermissao();
  }
}
