import { AlertService } from './../../../components/alert/alert.service';
import { QuestaoComponent } from './../form/questao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng';

import { QuestaoService } from '../service/questao.service';
import { Questao } from '../models/questao';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})
export class QuestaoListarComponent implements OnInit {
  questoes = [
    {
      id: 2,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 3,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
    {
      id: 1,
      senioridade: 'JUNIOR',
      tipo_questao: 'Codificação',
      descricao: 'Qual é a: ',
    },
  ];

  //questoes: any[];
  questoesSelecionadas: any[] = [];

  definicaoColunas: any[];
  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  constructor(
    private alertService: AlertService,
    private questaoService: QuestaoService,
    public dialogService: DialogService
  ) {}
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.definicaoColunas = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'senioridade', header: 'Titulo' },
      { field: 'tipo_questao', header: 'Tipo da Questão' },
    ];

    this.questaoService.getQuestoes().subscribe((response) => {
      this.questoes = response;
    });
  }

  isSelected(): boolean {
    return this.questoesSelecionadas.length == 1;
  }

  excluir() {
    this.questoesSelecionadas.forEach((element) => {
      this.questaoService.deletarQuestao(element).subscribe(
        (response) => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso',
            'Questão Excluida com sucesso'
          );
          this.questaoService.getQuestoes().subscribe((response) => {
            this.questoes = response;
          });
        },
        (error) => {
          this.alertService.montarAlerta(
            'error',
            'Erro',
            'Erro ao Excluir questão'
          );
        }
      );
    });
  }

  showDialog(id: string) {
    this.dialogQuestao.exibirDialog(id, this.questoesSelecionadas);

    // const ref = this.dialogService.open(QuestaoComponent, {
    //   data: {
    //     descricao: 'aaaa',
    //   },
    //   header: 'Alterar Questão',
    //   width: '50%',
    // });
  }

  atualizar() {
    //get na lista do banco
    console.log('teste');
  }

  ngOnDestroy() {
    this.ref.close();
  }

  canEnabled(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  deletarQuestao() {
    this.questaoService.deletarQuestao(this.questoesSelecionadas.pop());
  }

  editarQuestao(): Questao {
    return this.questaoService.atualizarQuestao(this.questoesSelecionadas[0]);
  }

  detalheQuestao(): Questao {
    return this.questaoService.getQuestaoById(this.questoesSelecionadas[0].id);
  }

  createQuestao(): any {
    return new QuestaoComponent(this.questaoService);
  }
}
