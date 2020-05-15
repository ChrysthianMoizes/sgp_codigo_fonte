import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ResourceService} from 'src/app/services/resource.service';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoDTO} from '../models/questao.dto';
import {Page} from './page';

@Injectable({
  providedIn: 'root',
})
export class QuestaoService extends ResourceService<QuestaoDTO> {

  constructor(private http: HttpClient) {
    super(http, 'questoes');
  }

  private readonly urlNova = '/api/questoes';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  obterQuestoes(): Observable<Page<QuestaoListagemDTO[]>> {
    return this.http.get<Page<QuestaoListagemDTO[]>>(this.url, this.httpOptions);
  }

  salvarQuestao(questao: QuestaoDTO): Observable<QuestaoDTO> {
    return this.http.post<QuestaoDTO>(this.url, questao, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
