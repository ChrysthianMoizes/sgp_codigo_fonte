import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, LazyLoadEvent, ConfirmationService, SelectItem} from 'primeng';
import {Page} from 'src/app/models/page.model';
import {AlertService} from '../../../components/alert/alert.service';
import {QuestaoComponent} from '../form/questao.component';

import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoListarService} from '../service/questao-listar.service';
import {QuestaoService} from '../service/questao.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { async } from '@angular/core/testing';
import { QuestaoFiltro } from '../models/questao-filtro.model';
import { SenioridadeService } from '../service/senioridade.service';
import { TipoQuestaoService } from '../service/tipo-questao.service';

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

  senioridades: SelectItem[];
  tipoQuestoes: SelectItem[];

  itensPorPagina: number = 20;
  totalRegistros: number;

  filtro: QuestaoFiltro = new QuestaoFiltro();

  constructor(
    private alertService: AlertService,
    public questaoService: QuestaoService,
    public questaoListarService: QuestaoListarService,
    public confirmation: ConfirmationService,
    public loadingService: LoadingService,
    private senioridadeService: SenioridadeService,
    private tipoQuestaoService: TipoQuestaoService
  ) {
  }

  ngOnInit(): void {
    this.questoes = new Page();
    this.getTiposQuestao();
    this.getSenioridades();
  }

  isOneSelected(): boolean {
    return Boolean(this.questaoSelecionada);
  }

  excluir(id: number): void {
    this.loadingService.activate();
    this.questaoService
      .destroy(id)
      .subscribe(
        () => {
          this.loadingService.deactivate();
          this.alertService.montarAlerta('success', 'Sucesso', 'Questão excluida com sucesso');
          this.preencherQuestoes();
        },
        () => {
          this.loadingService.deactivate();
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao excluir questão');
        }
      );
    this.questaoSelecionada = null;
  }

  preencherQuestoes(pagina: number = 0) {
    this.questaoListarService.indexPage(pagina, this.itensPorPagina).subscribe(
      (response) => {
        this.questoes = response;
        this.totalRegistros = this.questoes.totalElements;
        this.loadingService.deactivate();
      },
      () => {
        this.loadingService.deactivate();
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao listar as questões');
      }
    )
  }

  openDialog(edicao: boolean, id: number) {
    this.dialogQuestao.openDialog(edicao, id);
  }

  onChangePage(event: LazyLoadEvent){
    this.loadingService.activate();
    let pagina = event.first / event.rows;
    this.preencherQuestoes(pagina);
  }

  verificaNumeroCaractere(texto: string): string{
    if (texto.length > 150) {
      return texto.substr(0, 150) + '...';
    }
    return texto;
  }

  confirmarExclusao(id: number){
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      header: "Excluir questão",
      icon: "pi pi-question-circle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass: "ui-button-success",
      rejectButtonStyleClass: "ui-button-warning",
      accept: () => {
        this.excluir(id);
      }
    });
  }

  atualizarLista(){

  }

  getSenioridades() {
    this.senioridadeService.index().subscribe(
      (resposta) => {
        this.senioridades = resposta;
        this.senioridades.unshift({value: null, label:"" });
      }
    );
  }

  getTiposQuestao() {
    this.tipoQuestaoService.index().subscribe(
      (resposta) => {
        this.tipoQuestoes = resposta;
        this.tipoQuestoes.unshift({value: null, label:"" });
      }
    );
  }
}
