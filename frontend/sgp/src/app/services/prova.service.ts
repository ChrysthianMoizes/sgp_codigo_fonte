import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prova } from '../models/prova.model';

@Injectable({
  providedIn: 'root'
})
export class ProvaService {

  constructor() { }

  index(page=0, size=20): Observable<any> {
    const inicio = page * size;
    const fim = inicio + size;
    return of(QUESTOES.slice(inicio, fim));
  }

  create(prova: Prova): Observable<any> {
    console.log(prova);
    return of(true);
  }

  update(prova: Prova): Observable<any> {
    console.log(prova);
    return of(true);
  }

  getNumberOfElements(): Observable<number> {
    return of(QUESTOES.length);
  }

}

const QUESTOES = [
  { id: 1, descricao: 'descri1' },
  { id: 2, descricao: 'descri2' },
  { id: 3, descricao: 'descri3' },
  { id: 4, descricao: 'descri4' },
  { id: 5, descricao: 'descasdas1' },
  { id: 6, descricao: 'descriasdasd2' },
  { id: 7, descricao: 'descrsadi3' },
  { id: 8, descricao: 'descriasda4' },
  { id: 9, descricao: 'descrizxczx1' },
  { id: 10, descricao: 'descrzxzxci2' },
  { id: 11, descricao: 'descrizzx3' },
  { id: 12, descricao: 'descrhji4' },
  { id: 13, descricao: 'descrhjhji1' },
  { id: 14, descricao: 'descrhi2' },
  { id: 15, descricao: 'descri3' },
  { id: 16, descricao: 'descri4' },
  { id: 17, descricao: 'deschjhjri1' },
  { id: 18, descricao: 'descri2' },
  { id: 19, descricao: 'deshjhjcri3' },
  { id: 20, descricao: 'descri4' },
  { id: 21, descricao: 'descri1' },
  { id: 22, descricao: 'descri2' },
  { id: 23, descricao: 'descrhhhhi3' },
  { id: 24, descricao: 'descrihhh4' }
]

