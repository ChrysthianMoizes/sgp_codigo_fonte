import { QuestaoModel } from './../model/questao.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestaoService {
  constructor() {}

  createQuestao(questao: QuestaoModel) {
    console.log(questao);
  }

  changeQuestao(questao: QuestaoModel) {
    console.log(questao);
  }

  deleteQuestao(questao: QuestaoModel) {
    console.log(questao);
  }

  pesquisarQuestao(questao: QuestaoModel) {
    console.log(questao);
  }
}
