import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResourceService} from 'src/app/services/resource.service';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import { Page } from 'src/app/models/page.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class QuestaoListarService extends ResourceService<QuestaoListagemDTO> {
  private readonly urlQuestoes = '/api/questoes';

  constructor(private http: HttpClient) {
    super(http, '/api/questoes');
  }

  public indexPage(pagina: number, itensPorPagina: number): Observable<Page<QuestaoListagemDTO>>{
    const params = new HttpParams().
                  append('size', itensPorPagina.toString()).
                  append('page', pagina.toString());

    return this.http.get<Page<QuestaoListagemDTO>>(`${this.urlQuestoes}`, {params});
  }

}
