import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng';

import { ObjectUtil } from 'src/app/services/object-util.service';
import { QuestaoListagemDTO } from '../models/questao-listagem.dto';
import { Page } from '../service/page';
import { QuestaoService } from '../service/questao.service';
import { AlertService } from './../../../components/alert/alert.service';
import { QuestaoComponent } from './../form/questao.component';
import { Questao } from './../models/questao';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})
export class QuestaoListarComponent implements OnInit {
  questoesSelecionadas: Questao[] = [];
  questoes: Page<QuestaoListagemDTO> = new Page();
  definicaoColunas: any[];
  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  constructor(
    private objectUtil: ObjectUtil,
    private alertService: AlertService,
    public dialogService: DialogService,
    public questaoService: QuestaoService
  ) {}

  ngOnInit(): void {
    this.definicaoColunas = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'descricaoSenioridade', header: 'Senioridade' },
      { field: 'descricaoTipo', header: 'Tipo da Questão' },
    ];

    this.questaoService.obterQuestoes().subscribe((response) => {
      this.questoes = response;
    });
    this.questaoService.index().subscribe((response) => {
      // this.questoes = response;
    });
  }

  isSelected(): boolean {
    return this.questoesSelecionadas.length == 1;
  }

  excluir(): void {
    this.questoesSelecionadas.forEach((element) => {
      this.questaoService
        .destroy(`${this.questoesSelecionadas[0].id}`)
        .subscribe(
          (response) => {
            this.alertService.montarAlerta(
              'success',
              'Sucesso',
              'Questão Excluida com sucesso'
            );
            this.questaoService.obterQuestoes().subscribe((response) => {
              // this.questoes = response;
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

  showDialogVisualizar() {
    this.dialogQuestao.exibirDialogVisualisar(this.questoesSelecionadas[0]);
    this.questoesSelecionadas = [];
  }

  showDialogEditar() {
    this.dialogQuestao.exibirDialogEditar(this.questoesSelecionadas[0]);
    this.questoesSelecionadas = [];
  }

  showDialogCadastro() {
    this.dialogQuestao.exibirDialogCadastro();
    this.questoesSelecionadas = [];
  }

  habilitar(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  walk(objeto: Object, caminho: string) {
    return this.objectUtil.walk(objeto, caminho);
  }

  checkNumberCharacter(descricao: string): string {
    if (descricao.length > 50) {
      return descricao.substr(0, 50) + '...';
    }
    return descricao;
  }
}
