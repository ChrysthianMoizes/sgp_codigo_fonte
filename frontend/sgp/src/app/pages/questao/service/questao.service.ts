import { Questao } from './../models/questao.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { element } from 'protractor';

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

  /**
   * Convert a returned JSON object to QuestaoModel.
   */
  private convertJSONtoQuestaoModel(json: any): Questao {
    return Object.assign(new Questao(), json);
  }

  private questoes: Array<Questao> = [
    {
      id: 1,
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra nisi quis ante dignissim ultricies. Mauris aliquet ultricies dui. Sed laoreet neque ut blandit bibendum. Sed porttitor porta scelerisque. Vivamus vel nunc arcu. Vivamus sagittis urna at neque vulputate iaculis. Suspendisse consequat tincidunt elit eget porta. Phasellus cursus, nibh in suscipit dapibus, mauris arcu luctus est, ut tincidunt orci eros vel arcu.',
      alternativa_1:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_2:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_3:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_4:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_5:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      resposta: 2,
      senioridade: 'Pleno',
      tipo_questao: 'Codificação',
    },
    {
      id: 2,
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra nisi quis ante dignissim ultricies. Mauris aliquet ultricies dui. Sed laoreet neque ut blandit bibendum. Sed porttitor porta scelerisque. Vivamus vel nunc arcu. Vivamus sagittis urna at neque vulputate iaculis. Suspendisse consequat tincidunt elit eget porta. Phasellus cursus, nibh in suscipit dapibus, mauris arcu luctus est, ut tincidunt orci eros vel arcu.',
      alternativa_1:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_2:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_3:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_4:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_5:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      resposta: 4,
      senioridade: 'Júnior',
      tipo_questao: 'Requisitos',
    },
    {
      id: 3,
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra nisi quis ante dignissim ultricies. Mauris aliquet ultricies dui. Sed laoreet neque ut blandit bibendum. Sed porttitor porta scelerisque. Vivamus vel nunc arcu. Vivamus sagittis urna at neque vulputate iaculis. Suspendisse consequat tincidunt elit eget porta. Phasellus cursus, nibh in suscipit dapibus, mauris arcu luctus est, ut tincidunt orci eros vel arcu.',
      alternativa_1:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_2:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_3:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_4:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_5:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      resposta: 2,
      senioridade: 'Sênior',
      tipo_questao: 'Teste e Arquitetura',
    },
    {
      id: 4,
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra nisi quis ante dignissim ultricies. Mauris aliquet ultricies dui. Sed laoreet neque ut blandit bibendum. Sed porttitor porta scelerisque. Vivamus vel nunc arcu. Vivamus sagittis urna at neque vulputate iaculis. Suspendisse consequat tincidunt elit eget porta. Phasellus cursus, nibh in suscipit dapibus, mauris arcu luctus est, ut tincidunt orci eros vel arcu.',
      alternativa_1:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_2:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_3:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_4:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_5:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      resposta: 4,
      senioridade: 'Estagiário',
      tipo_questao: 'Codificação',
    },
    {
      id: 5,
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra nisi quis ante dignissim ultricies. Mauris aliquet ultricies dui. Sed laoreet neque ut blandit bibendum. Sed porttitor porta scelerisque. Vivamus vel nunc arcu. Vivamus sagittis urna at neque vulputate iaculis. Suspendisse consequat tincidunt elit eget porta. Phasellus cursus, nibh in suscipit dapibus, mauris arcu luctus est, ut tincidunt orci eros vel arcu.',
      alternativa_1:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_2:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_3:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_4:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      alternativa_5:
        'In augue ipsum, faucibus eget mauris eget, elementum viverra nulla.',
      resposta: 2,
      senioridade: 'Pleno',
      tipo_questao: 'Codificação',
    },
  ];

  public getQuestoes(): Observable<any> {
    return of(this.questoes);
  }

  public getQuestaoById(id: number): Questao {
    this.questoes.forEach((element) => {
      if (id == element.id) {
        return element;
      }
    });
    return new Questao();
  }
  public criarQuestao(questao: Questao): Questao {
    questao.id = this.idQuestao + 1;
    this.questoes.push(questao);
    this.idQuestao++;
    return questao;
  }

  public deletarQuestao(element: Questao): Observable<any> {
    const pos = this.questoes.indexOf(element);
    console.log(pos);
    if (pos != -1) {
      this.questoes.splice(pos, 1);
    }
    return of(null);
  }

  public atualizarQuestao(questao: Questao): Questao {
    let questaoPut: Questao = this.getQuestaoById(questao.id);
    questaoPut.alternativa_1 = questao.alternativa_1;
    questaoPut.alternativa_2 = questao.alternativa_2;
    questaoPut.alternativa_3 = questao.alternativa_3;
    questaoPut.alternativa_4 = questao.alternativa_4;
    questaoPut.alternativa_5 = questao.alternativa_5;
    questaoPut.resposta = questao.resposta;
    questaoPut.descricao = questao.descricao;
    questaoPut.senioridade = questao.senioridade;
    questaoPut.tipo_questao = questao.tipo_questao;
    return questaoPut;
  }
}
