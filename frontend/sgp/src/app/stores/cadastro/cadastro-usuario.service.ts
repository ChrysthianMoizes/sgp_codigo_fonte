import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  constructor() { }

  // cadastrar(usuario:Object): Observable<string> {
  cadastrarUsuario(usuario:Usuario): Observable<Usuario> {
    return of<Usuario>(usuario)
  }
}
