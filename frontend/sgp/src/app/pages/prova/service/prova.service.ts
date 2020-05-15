import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prova } from '../models/prova';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProvaService {

  private provas : Prova;

  url = 'http://localhost:3000/provas';

  constructor(private httpClient: HttpClient) {
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  index(page = 0, size = 20): Observable<Prova[]> {
    return this.httpClient.get<Prova[]>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  create(prova: Prova): Observable<Prova> {
    return this.httpClient.post<Prova>(this.url, JSON.stringify(prova))
      .pipe(
        catchError(this.handleError)
      )
  }

  update(prova: Prova): Observable<Prova> {
    return this.httpClient.put<Prova>(this.url + '/' + prova.id, JSON.stringify(prova))
      .pipe(
        catchError(this.handleError)
      )
  }

  buscaProva(): Observable<Prova> {
    return this.httpClient.get<Prova>(this.url)
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

  excluirProva(prova: Prova) {
    return this.httpClient.delete<Prova>(this.url + '/' + prova.id)
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
