import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor() { }

  create(avaliacao: Avaliacao): Observable<Avaliacao> {
    return of(avaliacao);
  }

  update(avaliacao: Avaliacao): Observable<Avaliacao> {
    return of(avaliacao);
  }

}
