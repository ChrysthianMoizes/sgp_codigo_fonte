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

  public temPermissao(permissao: string): boolean {
    return this.getPermissoesUsuarioSessionStorage()
      .includes(permissao);
  }

  public temUmaDessasPermissoes(permissoes: Array<string>): boolean {
    permissoes.forEach(permissao => {
      if(this.temPermissao(permissao)) return true;
    });
    return false;
  }

  public containsUsuarioSessionStorage(): boolean {
    return sessionStorage.key(0) == this.KEY ? true : false;
  }

  public retirarUsuarioDoSessionStorage(): void {
    sessionStorage.clear();
  }

  // constructor(){
  //   sessionStorage.setItem(this.KEY, "jean")
  //   console.log("USUARIO ADICIONADO AO SESSEION STORAGE")
  //   console.log(sessionStorage.key(0))
  //   console.log("EXISTE UM USUARIO NO SESSIONSTORAGE: ", this.containsUsuarioSessionStorage())
  //   this.retirarUsuarioDoSessionStorage();
  //   console.log("EXISTE UM USUARIO NO SESSIONSTORAGE: ", this.containsUsuarioSessionStorage())
  //   console.log(sessionStorage.key(0))
  // }
}
