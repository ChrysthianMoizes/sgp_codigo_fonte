import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prova } from '../models/prova';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';

@Injectable({
  providedIn: 'root',
})



export class ProvaService extends ResourceService<Prova>{

  constructor(private http: HttpClient) {
    super(http, '/api/provas');
   }

   private provas: Prova[];

   findByTitulo(query: string): Observable<Prova[]> {
    return of(
      this.provas.filter((elem) =>
        elem.titulo.toLowerCase().includes(query.toLowerCase())
      ) as Prova[]
    );
  }


/*   index(page = 0, size = 20): Observable<Prova[]> {
    return this.http.get<Prova[]>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  create(prova: Prova): Observable<Prova> {
    return this.http.post<Prova>(this.url, JSON.stringify(prova))
      .pipe(
        catchError(this.handleError)
      )
  }

  update(prova: Prova): Observable<Prova> {
    return this.http.put<Prova>(this.url + '/' + prova.id, JSON.stringify(prova))
      .pipe(
        catchError(this.handleError)
      )
  }

  buscaProva(): Observable<Prova> {
    return this.http.get<Prova>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  buscaProvas(): Observable<Prova[]> {
    return this.http.get<Prova[]>(this.url)
      .pipe(
        catchError(this.handleError))
  }



  excluirProva(prova: Prova) {
    return this.http.delete<Prova>(this.url + '/' + prova.id)
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
    };*/
}
