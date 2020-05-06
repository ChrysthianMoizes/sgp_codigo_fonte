import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() {

   }

   logar(email: string, senha: string): Observable<Usuario>{

    const user= {
      id: 1,
      nome: "abc",
      senha: "123",
      email: "abc@ho",
      cpf: "321",
      permissao: "ROLE_ADMIN",
    }
    return of<Usuario>(user)

  }
}


