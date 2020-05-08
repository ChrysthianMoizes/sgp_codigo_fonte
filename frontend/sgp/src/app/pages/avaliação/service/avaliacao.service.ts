import { Avaliacao } from '../models/avaliacao';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  constructor() {}
  avaliacoes: Avaliacao[] = [
    {
      id: 1,
      dataAvaliacao: new Date(),
      aproveitamento: 71,
      candidato: {
        id: 1,
        nome: 'Tito',
        cpf: '15663033700',
        senha: '1234',
        email: 'tito.stauffer@gmail.com',
        admin: false,
      },
      prova: {
        id: 1,
        titulo: 'Prova para entrar na BASIS',
        percentualAprovacao: 70,
        questoes: [
          {
            id: 1,
            descricao: 'como mockar dados sem ter que digitar tudo?',
            alternativa1: 'Não dá',
            alternativa2: 'cria um backend antes do front',
            alternativa3: 'enfia o dedo no cu e rasga',
            alternativa4: 'digita tudo na mão',
            alternativa5: 'joga tudo pro alto, grita foda-se e mete o pé',
            resposta: 2,
            senioridade: {
              id: 1,
              descricao: 'Junior',
            },
            tipoQuestao: {
              id: 1,
              descricao: 'Programação',
            },
          },
        ],
      },
    },
  ];
  getAvaliacoes(): Observable<any> {
    return of(this.avaliacoes);
  }
}
