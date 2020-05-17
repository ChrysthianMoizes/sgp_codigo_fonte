import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng';

import { QuestaoListagemDTO } from '../models/questao-listagem.dto';
import { QuestaoService } from '../service/questao.service';
import { AlertService } from './../../../components/alert/alert.service';
import { QuestaoComponent } from './../form/questao.component';
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
      this.questaoService.destroy(element.id).subscribe(
        (response) => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso',
            'Questão excluida com sucesso'
          );
          this.preencherQuestoes();
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

  showDialog(visualisar: boolean) {
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

  preencherQuestoes() {
    this.questaoService.obterQuestoes().subscribe((response) => {
      this.questoes = response;
    });
  }

  definirColunasTabela() {
    this.definicaoColunas = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'descricaoSenioridade', header: 'Senioridade' },
      { field: 'descricaoTipo', header: 'Tipo da Questão' },
    ];
  }
}
