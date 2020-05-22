import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResourceService} from 'src/app/services/resource.service';
import {QuestaoDTO} from '../models/questao.dto';


@Injectable({
  providedIn: 'root',
})
export class QuestaoService extends ResourceService<QuestaoDTO> {

  constructor(private http: HttpClient) {
    super(http, '/api/questoes');
  }

}
