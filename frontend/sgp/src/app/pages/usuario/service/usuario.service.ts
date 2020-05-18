import { FiltroCandidato } from './../models/filtro-candidato.model';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';
import { Observable, of, from } from 'rxjs';
import { Page } from 'src/app/models/page.model';

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

  filtrarCandidatos(
    filtro: FiltroCandidato,
    page = 0,
    size = 20
  ): Observable<Page<Usuario>> {
    return this.http.get(`${this.url}?page=${page}&size=${size}`, {
      params: Object.assign(filtro),
    }) as Observable<Page<Usuario>>;
  }
}
