import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ResourceService} from 'src/app/services/resource.service';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoDTO} from '../models/questao.dto';
import { Page } from 'src/app/models/page.model';


@Injectable({
  providedIn: 'root',
})
export class QuestaoService extends ResourceService<QuestaoDTO> {

  constructor(private http: HttpClient) {
    super(http, '/api/questoes');
  }

  private readonly urlNova = '/api/questoes';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  obterQuestoes(): Observable<Page<QuestaoListagemDTO[]>> {
    return this.http.get<Page<QuestaoListagemDTO[]>>(this.urlNova, this.httpOptions);
  }

}
