import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ExcluirUsuarioService {

  usuarios: Usuario[];

  constructor() { }

/*
  excluirUsuario(usuario: Usuario): void{
      this.apiService.excluirUsuario(usuario.id)
        .subscribe( data => {
          this.usuarios = this.usuarios.filter(
            filtraUsuario => filtraUsuario !== usuario);
        })
    };
  }
*/

  /*
  codigo para ser usado na API

  excluirUsuario(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }

  */
}
