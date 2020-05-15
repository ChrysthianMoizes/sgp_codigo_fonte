import { UsuarioEdicao } from './../models/usuario-edicao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEdicaoService extends ResourceService<UsuarioEdicao> {
  constructor(private http: HttpClient) {
    super(http, 'api/usuarios');
  }
}
