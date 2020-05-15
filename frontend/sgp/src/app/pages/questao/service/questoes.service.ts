import { HttpClient } from '@angular/common/http';
import { Questao } from './../models/questao';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class QuestoesService extends ResourceService<Questao> {
  constructor(private http: HttpClient) {
    super(http, 'questoes');
  }
}
