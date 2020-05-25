import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from 'src/app/services/resource.service';
import { Pageable } from 'src/app/util/pageable-request';
import { Questao } from '../models/questao';
import { QuestaoListagemDTO } from '../models/questao-listagem.dto';
import { SelectItem } from 'primeng';


@Injectable({
  providedIn: 'root',
})
export class QuestaoListarService extends ResourceService<QuestaoListagemDTO> {

  constructor(private http: HttpClient) {
    super(http, '/api/questoes');
  }

  listarQuestoesDropdown(filtro: any, pageable: Pageable<SelectItem>): Observable<Pageable<SelectItem>> {
    return this.http.get("/api/questoes/dropdown", {
      params: Object.assign(filtro, pageable),
    }) as Observable<Pageable<SelectItem>>;
  }

}
