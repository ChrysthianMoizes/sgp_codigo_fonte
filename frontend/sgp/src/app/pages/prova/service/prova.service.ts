import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prova } from '../models/prova';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class ProvaService {
  provas: any[] = [
    { id: 1, titulo: 'Título ', percentualAprovacao: 70 },
    { id: 2, titulo: 'Título ', percentualAprovacao: 100 },
    {
      id: 3,
      titulo: 'Lorem ipsum dolor',
      percentualAprovacao: 40,
    },
    { id: 4, titulo: 'Título ', percentualAprovacao: 10 },
    { id: 5, titulo: 'Título ', percentualAprovacao: 60 },
    {
      id: 6,
      titulo: 'Lorem ipsum dolor',
      percentualAprovacao: 70,
    },
    { id: 7, titulo: 'Título ', percentualAprovacao: 100 },
    { id: 8, titulo: 'Título ', percentualAprovacao: 40 },
    { id: 9, titulo: 'Título ', percentualAprovacao: 10 },
    { id: 10, titulo: 'Título ', percentualAprovacao: 60 },
  ];

  url = 'http://localhost:3000/provas';
  constructor(private httpClient: HttpClient) {
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  index(page = 0, size = 20): Observable<any> {
    return of(this.provas);
  }

  create(prova: Prova): Observable<Prova> {
    return this.httpClient.post<Prova>(this.url, JSON.stringify(prova), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(prova: Prova): Observable<Prova> {
    return this.httpClient.put<Prova>(this.url + '/' + prova.id, JSON.stringify(prova), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  buscaProva(): Observable<Prova[]> {
    return this.httpClient.get<Prova[]>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  findByTitulo(query: string): Observable<Prova[]> {
    return of(
      PROVAS.filter((elem) =>
        elem.titulo.toLowerCase().includes(query.toLowerCase())
      ) as Prova[]
    );
  }

  delete(prova: Prova) {
    return this.httpClient.delete<Prova>(this.url + '/' + prova.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}

const PROVAS = [
  { titulo: 'Entrar na Basis' },
  { titulo: 'Entrar s ss Basis' },
  { titulo: 'fff na Basis' },
  { titulo: 'Entrar asa na Basis' },
  { titulo: 'Entrar na ad zzzz' },
  { titulo: 'Entrar na Basiada s' },
  { titulo: 'asd asd aEntrar na Basis' },
];
