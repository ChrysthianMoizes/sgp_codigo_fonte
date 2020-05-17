import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResourceService} from 'src/app/services/resource.service';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';


@Injectable({
  providedIn: 'root',
})
export class QuestaoListarService extends ResourceService<QuestaoListagemDTO> {

  constructor(private http: HttpClient) {
    super(http, '/api/questoes');
  }

}
