import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prova } from '../models/prova';
import { SelectItem } from 'primeng';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class ProvaService extends ResourceService<Prova>{

  constructor(private http: HttpClient) {
    super(http, '/api/provas')
  }

  buscaProva(): Observable<any> {
    return null;
  }

  exibirProvaDetalhada(id: number): Observable<any> {
    return this.http.get(`/api/provas/avaliacoes/${id}`);
  }

  listarProvasDropdown(): Observable<any> {
    return this.http.get("/api/provas/dropdown");
  }

  findByTitulo(titulo: string): Observable<any> {
    return this.http.get(`/api/provas/titulo/${titulo}`);
  }

  findByTituloFiltro(query: string): Observable<any> {
    return this.http.get(`/api/provas/filtro/${query}`);
  }
}
