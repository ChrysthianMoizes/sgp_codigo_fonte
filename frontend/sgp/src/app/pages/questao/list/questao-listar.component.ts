import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, DialogService, SelectItem, Table} from 'primeng';
import {LoadingService} from 'src/app/components/loading/loading.service';
import {Pageable} from 'src/app/util/pageable-request';
import {AlertService} from '../../../components/alert/alert.service';
import {QuestaoComponent} from '../form/questao.component';
import {QuestaoFiltro} from '../models/questao-filtro.model';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoListarService} from '../service/questao-listar.service';
import {QuestaoService} from '../service/questao.service';
import {SenioridadeService} from '../service/senioridade.service';
import {TipoQuestaoService} from '../service/tipo-questao.service';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})

export class QuestaoListarComponent implements OnInit {

  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  @ViewChild('dt') table: Table;

  questaoSelecionada: QuestaoListagemDTO;
  questoes: Pageable<QuestaoListagemDTO> = new Pageable<QuestaoListagemDTO>(0, 20);

  senioridades: SelectItem[];
  tiposQuestao: SelectItem[];

  itensPorPagina: number;

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
    this.itensPorPagina = 20;
    this.getTiposQuestao();
    this.getSenioridades();
    this.atualizarPagina(null);

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
          this.atualizarPagina();
        },
        () => {
          this.loadingService.deactivate();
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao excluir questão');
        }
      );
    this.questaoSelecionada = null;
  }

  preencherQuestoes(filtro: QuestaoFiltro, pageable: Pageable<QuestaoListagemDTO>) {
    this.questaoListarService.index(filtro, pageable).subscribe(
      (response) => {
        this.questoes = response;
        this.loadingService.deactivate();
      },
      () => {
        this.loadingService.deactivate();
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao listar as questões');
      }
    );
  }

  openDialog(edicao: boolean, id: number) {
    this.dialogQuestao.openDialog(edicao, id);
  }

  atualizarPagina(event = null) {
    this.loadingService.activate();

    const pageable = new Pageable<QuestaoListagemDTO>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'descricao');
    } else {
      if (this.table) {
        this.table.first = 0;
      }
    }

    this.preencherQuestoes(this.filtro, pageable);
  }

  confirmarExclusao(id: number) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir questão',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'ui-button-success',
      rejectButtonStyleClass: 'ui-button-warning',
      accept: () => {
        this.excluir(id);
      }
    });
  }

  getSenioridades() {
    this.senioridadeService.index().subscribe(
      (resposta) => {
        this.senioridades = resposta;
        this.senioridades.unshift({value: 0, label: 'Selecione...'});
      }
    );
  }

  getTiposQuestao() {
    this.tipoQuestaoService.index().subscribe(
      (resposta) => {
        this.tiposQuestao = resposta;
        this.tiposQuestao.unshift({value: 0, label: 'Selecione...'});
      }
    );
  }

}
