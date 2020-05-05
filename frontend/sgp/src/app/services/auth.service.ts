import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY: string = 'sgp';

  public setUsuarioSessionStorage(usuario: Usuario): void{
    sessionStorage.setItem(this.KEY, JSON.stringify(usuario));
  }

  public getUsuarioSessionStorage(): Usuario {
    return JSON.parse(sessionStorage.getItem(this.KEY));
  }

  public getNomeUsuarioSessionStorage(): string {
    return this.getUsuarioSessionStorage().nome;
  }

  public getIdUsuarioSessionStorage(): number {
    return this.getUsuarioSessionStorage().id;
  }

  public getEmailUsuarioSessionStorage(): string {
    return this.getUsuarioSessionStorage().email;
  }

  public getCpflUsuarioSessionStorage(): string {
    return this.getUsuarioSessionStorage().cpf;
  }

  public getPermissaoUsuarioSessionStorage(): string {
    return this.getUsuarioSessionStorage().permissao;
  }

  public temPermissao(permissao: string): boolean {
    return this.getPermissaoUsuarioSessionStorage() == permissao;
  }

  public containsUsuarioSessionStorage(): boolean {
    return sessionStorage.key(0) == this.KEY ? true : false;
  }

  public retirarUsuarioDoSessionStorage(): void {
    sessionStorage.clear();
  }

  public isAdmin(): boolean {
    return this.temPermissao('ROLE_ADMIN');
  }
}
