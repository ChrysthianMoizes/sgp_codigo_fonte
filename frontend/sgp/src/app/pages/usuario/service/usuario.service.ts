import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ResourceService<Usuario> {
  constructor(private http: HttpClient) {
    super(http, '/api/usuarios');
  }
  resetarSenha(email: String): Observable<any>{
    return of(null);
  }
}
