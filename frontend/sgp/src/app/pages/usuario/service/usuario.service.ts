import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';
import { SelectItem } from 'primeng';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ResourceService<Usuario> {

  constructor(
    private http: HttpClient
  ) {
    super(http, '/api/usuarios');
  }

  findByNome(nome: string): Observable<any> {
    return this.http.get("/api/usuarios/filtro");
  }

  listarCandidatosDropdown(): Observable<any> {
    return this.http.get("/api/usuarios/dropdown");
  }

}
