import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResourceService } from 'src/app/services/resource.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ResourceService<Usuario> {
  constructor(private http: HttpClient) {
    super(http, '/api/usuarios');
  }
  resetarSenha(email: String): Observable<any> {
    return of(null);
  }
}
