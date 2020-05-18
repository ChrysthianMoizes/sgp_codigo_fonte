import { Questao } from '../models/questao';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestaoService {
  private URL_API: string = 'http://localhost:8080';
  private idQuestao: number = 5;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  createQuestao(questao: Questao): Observable<Questao> {
    return this.http
      .post(
        `${this.URL_API}/questoes`,
        JSON.stringify(questao),
        this.httpOptions
      )
      .pipe(
        retry(1),
        map((response: Response) => {
          return this.convertJSONtoQuestaoModel(response.json());
        })
      );
  }

  changeQuestao(questao: Questao): Observable<Questao> {
    return this.http
      .put(
        `${this.URL_API}/questoes/${questao.id}`,
        JSON.stringify(questao),
        this.httpOptions
      )
      .pipe(
        retry(1),
        map((response: Response) => {
          return this.convertJSONtoQuestaoModel(response.json());
        })
      );
  }

  deleteQuestao(id: number): Observable<Response> {
    return this.http
      .delete(`${this.URL_API}/questoes/${id}`, this.httpOptions)
      .pipe(
        retry(1),
        map((response: Response) => {
          return response;
        })
      );
  }

  pesquisarQuestoes(): Observable<Array<Questao>> {
    return this.http.get(`${this.URL_API}/questoes`, this.httpOptions).pipe(
      retry(1),
      map((response: Response) => {
        return Object.assign(new Array<Questao>(), response.json());
      })
    );
  }

  pesquisarQuestaoPorId(id: number): Observable<Questao> {
    return this.http
      .get(`${this.URL_API}/questoes${id}`, this.httpOptions)
      .pipe(
        retry(1),
        map((response: Questao) => {
          return response;
        })
      );
  }

  index(page = 0, size = 20): Observable<any> {
    const inicio = page * size;
    const fim = inicio + size;
    return of(this.questoes.slice(inicio, fim));
  }

  getNumberOfElements(): Observable<number> {
    return of(this.questoes.length);
  }

  /**
   * Convert a returned JSON object to QuestaoModel.
   */
  private convertJSONtoQuestaoModel(json: any): Questao {
    return Object.assign(new Questao(), json);
  }

  private questoes: Array<Questao> = [];

  public getQuestoes(): Observable<Questao[]> {
    return of(this.questoes);
  }

  public getQuestaoById(id: number): Observable<Questao> {
    this.questoes.forEach((element) => {
      if (id == element.id) {
        return of(element);
      }
    });
    return of(new Questao());
  }
  public criarQuestao(questao: Questao): Observable<Questao> {
    questao.id = this.idQuestao + 1;
    this.questoes.push(questao);
    this.idQuestao++;
    return of(questao);
  }

  public deletarQuestao(element: Questao): Observable<any> {
    const pos = this.questoes.indexOf(element);
    if (pos != -1) {
      this.questoes.splice(pos, 1);
    }
    return of(null);
  }

  public atualizarQuestao(questao: Questao): Observable<Questao> {
    let questaoPut: Questao;
    this.questoes.forEach((element) => {
      if (element.id == questao.id) {
        element.alternativa2 = questao.alternativa2;
        element.alternativa3 = questao.alternativa3;
        element.alternativa4 = questao.alternativa4;
        element.alternativa1 = questao.alternativa1;
        element.alternativa5 = questao.alternativa5;
        element.resposta = questao.resposta;
        element.descricao = questao.descricao;
        return of(element);
      }
    });
    return of(questaoPut);
  }
}
