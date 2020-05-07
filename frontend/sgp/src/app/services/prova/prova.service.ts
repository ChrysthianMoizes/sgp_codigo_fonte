import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Prova} from '../../models/prova';

@Injectable({
  providedIn: 'root'
})
export class ProvaService {

  provas: Prova[] = [
    {id: 1, titulo: 'Título ', percentualAprovacao: 70},
    {id: 2, titulo: 'Título ', percentualAprovacao: 100},
    {
      id: 3, titulo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '     ', percentualAprovacao: 40
    },
    {id: 4, titulo: 'Título ', percentualAprovacao: 10},
    {id: 5, titulo: 'Título ', percentualAprovacao: 60},
    {
      id: 6, titulo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!\n' +
        '     ', percentualAprovacao: 70
    },
    {id: 7, titulo: 'Título ', percentualAprovacao: 100},
    {id: 8, titulo: 'Título ', percentualAprovacao: 40},
    {id: 9, titulo: 'Título ', percentualAprovacao: 10},
    {id: 10, titulo: 'Título ', percentualAprovacao: 60}
  ];

  constructor() {
  }

  getProvas(): Observable<Prova[]> {
    return of(this.provas);
  }
}
