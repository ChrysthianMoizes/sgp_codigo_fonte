import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable
export class AvaliacaoService {
  constructor(private http: HttpClient) {}

  getAvaliacoes() {
    return this.http
      .get('')
      .toPromise()
      .then((res) => <Avaliacao[]>res)
      .then((data) => {
        return data;
      });
  }
}
