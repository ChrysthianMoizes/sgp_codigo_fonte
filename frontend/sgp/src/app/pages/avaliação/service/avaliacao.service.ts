import { Avaliacao } from './../models/avaliacao.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  constructor() {}
  avaliacoes: Avaliacao[] = [
    {
      codigo: 1,
      data: new Date(),
      aproveitamento: 71,
      candidato: {
        codigo: 1,
        nome: 'Tito',
        cpf: '15663033700',
        senha: '1234',
        email: 'tito.stauffer@gmail.com',
        admin: false,
      },
      prova: {
        codigo: 1,
        titulo: 'Prova para entrar na BASIS',
        percentualAprovacao: 70,
        questoes: [
          {
            id: 1,
            descricao: 'como mockar dados sem ter que digitar tudo?',
            alternativa_1: 'Não dá',
            alternativa_2: 'cria um backend antes do front',
            alternativa_3: 'enfia o dedo no cu e rasga',
            alternativa_4: 'digita tudo na mão',
            alternativa_5: 'joga tudo pro alto, grita foda-se e mete o pé',
            resposta: 2,
            senioridade: 'Junior',
            tipo_questao: 'Programação',
          },
        ],
      },
    },
  ];
  getAvaliacoes(): Observable<any> {
    return of(this.avaliacoes);
  }
}
