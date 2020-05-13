import { Questao } from './../models/questao';
import { AlertService } from './../../../components/alert/alert.service';
import { QuestaoComponent } from './../form/questao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng';

import { QuestaoService } from '../service/questao.service';
import { ObjectUtil } from 'src/app/services/object-util.service';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})
export class QuestaoListarComponent implements OnInit {
  questoesSelecionadas: Questao[] = [];
  questoes: Questao[];
  definicaoColunas: any[];
  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  constructor(
    private objectUtil: ObjectUtil,
    private alertService: AlertService,
    private questaoService: QuestaoService,
    public dialogService: DialogService
  ) {}
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.definicaoColunas = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'senioridade.descricao', header: 'Senioridade' },
      { field: 'tipoQuestao.descricao', header: 'Tipo da Questão' },
    ];

    this.questaoService.getQuestoes().subscribe((response) => {
      this.questoes = response;
    });
  }

  isSelected(): boolean {
    return this.questoesSelecionadas.length == 1;
  }

  excluir(): void {
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
    this.questoesSelecionadas = [];
  }

  showDialog(id: string): void {
    this.dialogQuestao.exibirDialog(id, this.questoesSelecionadas[0]);
  }

  atualizar(): void {
    //get na lista do banco
  }

  habilitar(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  canEnabled(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  deletarQuestao(): void {
    this.questaoService.deletarQuestao(this.questoesSelecionadas.pop());
  }

  walk(objeto: Object, caminho: string): Object {
    return this.objectUtil.walk(objeto, caminho);
  }
}
