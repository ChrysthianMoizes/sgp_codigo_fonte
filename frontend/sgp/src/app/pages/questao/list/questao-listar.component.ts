import { Component, OnInit } from '@angular/core';
import { QuestaoService } from '../service/questao.service';
import { QuestaoModel } from '../model/questao.model';
import { QuestaoComponent } from '../form/questao.component'
@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css']
})
export class QuestaoListarComponent implements OnInit {

  questoes: Array<QuestaoModel> =  [ ]

  questoesSelecionadas: any[] = new Array<QuestaoModel>();
  definicaoColunas: any[];

  constructor(private questaoService: QuestaoService) { }

  ngOnInit(): void {

    this.definicaoColunas = [
      {field: 'id', header: 'Código'},
      {field: 'descricao', header: 'Descrição'},
      {field: 'senioridade', header: 'Titulo'},
      {field: 'tipo_questao', header: 'Tipo da Questão'}
    ];

    this.questoes = this.questaoService.getQuestoes();
  }

  isSelected(): boolean {
    return this.questoesSelecionadas.length == 1;
  }

  canEnabled(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  deletarQuestao(){
    this.questaoService.deletarQuestao(
      this.questoesSelecionadas.pop()
    )
  }

  editarQuestao(): QuestaoModel{
    return this.questaoService.atualizarQuestao(this.questoesSelecionadas[0]);
  }

  detalheQuestao(): QuestaoModel {
    return this.questaoService.getQuestaoById(this.questoesSelecionadas[0].id);
  }

  createQuestao(): any {
    return new QuestaoComponent(this.questaoService);
  }
}
