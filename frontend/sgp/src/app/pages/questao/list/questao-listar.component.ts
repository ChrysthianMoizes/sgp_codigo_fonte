import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, LazyLoadEvent} from 'primeng';
import {Page} from 'src/app/models/page.model';
import {AlertService} from '../../../components/alert/alert.service';
import {QuestaoComponent} from '../form/questao.component';

import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoListarService} from '../service/questao-listar.service';
import {QuestaoService} from '../service/questao.service';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})


export class QuestaoListarComponent implements OnInit {

  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  questaoSelecionada: QuestaoListagemDTO;
  questoes: Page<QuestaoListagemDTO>;
  itensPorPagina: number = 20;
  totalRegistros: number;

  constructor(
    private alertService: AlertService,
    public questaoService: QuestaoService,
    public questaoListarService: QuestaoListarService
  ) {
  }

  ngOnInit(): void {
    this.questoes = new Page();
  }

  isOneSelected(): boolean {
    return Boolean(this.questaoSelecionada);
  }

  excluir(id: number): void {
    this.questaoService
      .destroy(id)
      .subscribe(
        () => {
          this.alertService.montarAlerta('success', 'Sucesso', 'Questão excluida com sucesso');
          this.preencherQuestoes();
        },
        () => {
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao excluir questão');
        }
      );
    this.questaoSelecionada = null;
  }

  preencherQuestoes(pagina = 0) {
    this.questaoListarService.indexPage(pagina, this.itensPorPagina).subscribe(
      (response) => {
        this.questoes = response;
        this.totalRegistros = this.questoes.totalElements;
      }
    )
  }

  openDialog(edicao: boolean, id: number) {
    this.dialogQuestao.openDialog(edicao, id);
  }

  onChangePage(event: LazyLoadEvent){
    let pagina = event.first / event.rows;
    this.preencherQuestoes(pagina);
  }
}
