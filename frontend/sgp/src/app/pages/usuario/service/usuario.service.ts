import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ResourceService<Usuario> {

  constructor(
    private http: HttpClient
  ) {
    super(http, 'usuarios');
  }

}
