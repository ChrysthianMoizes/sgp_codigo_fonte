import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService} from 'primeng';

import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoService} from '../service/questao.service';
import {AlertService} from './../../../components/alert/alert.service';
import {QuestaoComponent} from './../form/questao.component';
import {Questao} from './../models/questao';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})
export class QuestaoListarComponent implements OnInit {

  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  questoesSelecionadas: QuestaoListagemDTO[] = [];

  questoes: Page<QuestaoListagemDTO> = new Page();

  definicaoColunas: any[];

  constructor(
    private alertService: AlertService,
    public dialogService: DialogService,
    public questaoService: QuestaoService
  ) {}

  ngOnInit(): void {
    this.definirColunasTabela();

    this.preencherQuestoes();

  }

  isSelected(): boolean {
    return this.questoesSelecionadas.length == 1;
  }

  excluir(): void {
    this.questoesSelecionadas.forEach((element) => {
      this.questaoService
        .destroy(this.questoesSelecionadas[0].id)
        .subscribe(
          (response) => {
            this.alertService.montarAlerta(
              'success',
              'Sucesso',
              'Questão Excluida com sucesso'
            );
            this.questaoService.obterQuestoes().subscribe((response) => {
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

  showDialog(visualisar: boolean){
    console.log(this.questoesSelecionadas[0])
    this.showDialogForm(this.questoesSelecionadas[0].id, visualisar);

  }

  showDialogForm(id: number, visualisar: boolean) {
    this.dialogQuestao.exibirDialog(id, visualisar);
  }

  habilitar(): boolean {
    return this.questoesSelecionadas.length > 0;
  }

  checkNumberCharacter(descricao: string): string {
    if (descricao.length > 50) {
      return descricao.substr(0, 50) + '...';
    }
    return descricao;
  }

  preencherQuestoes(){
    this.questaoService.obterQuestoes().subscribe(
      (response) => {
        this.questoes = response;
      }
    );
  }

  definirColunasTabela(){
    this.definicaoColunas = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'descricaoSenioridade', header: 'Senioridade' },
      { field: 'descricaoTipo', header: 'Tipo da Questão' },
    ];
  }
}
