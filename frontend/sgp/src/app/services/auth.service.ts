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

  public getPermissoesUsuarioSessionStorage(): Array<string> {
    return this.getUsuarioSessionStorage().permissoes;
  }

}
