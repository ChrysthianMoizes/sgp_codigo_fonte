import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Prova} from '../models/prova.model';

@Injectable({
  providedIn: 'root'
})
export class ProvaService {
  provas: any[] = [
    {id: 1, titulo: 'Título ', percentualAprovacao: 70},
    {id: 2, titulo: 'Título ', percentualAprovacao: 100},
    {
      id: 3,
      titulo: 'Lorem ipsum dolor',
      percentualAprovacao: 40,
    },
    {id: 4, titulo: 'Título ', percentualAprovacao: 10},
    {id: 5, titulo: 'Título ', percentualAprovacao: 60},
    {
      id: 6,
      titulo: 'Lorem ipsum dolor',
      percentualAprovacao: 70,
    },
    {id: 7, titulo: 'Título ', percentualAprovacao: 100},
    {id: 8, titulo: 'Título ', percentualAprovacao: 40},
    {id: 9, titulo: 'Título ', percentualAprovacao: 10},
    {id: 10, titulo: 'Título ', percentualAprovacao: 60},
  ];

  constructor() {
  }

  index(page = 0, size = 20): Observable<any> {
    return of(this.provas);
  }

  create(prova: Prova): Observable<any> {
    console.log(prova);
    return of(true);
  }

  update(prova: Prova): Observable<any> {
    console.log(prova);
    return of(true);
  }


}
