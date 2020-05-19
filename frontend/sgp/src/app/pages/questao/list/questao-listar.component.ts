import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, DialogService, LazyLoadEvent, SelectItem, Dropdown} from 'primeng';
import {LoadingService} from 'src/app/components/loading/loading.service';
import {AlertService} from '../../../components/alert/alert.service';
import {QuestaoComponent} from '../form/questao.component';
import {QuestaoFiltro} from '../models/questao-filtro.model';
import {QuestaoListagemDTO} from '../models/questao-listagem.dto';
import {QuestaoListarService} from '../service/questao-listar.service';
import {QuestaoService} from '../service/questao.service';
import { SenioridadeService } from '../service/senioridade.service';
import { TipoQuestaoService } from '../service/tipo-questao.service';
import { Pageable } from 'src/app/util/pageable-request';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './questao-listar.component.html',
  styleUrls: ['./questao-listar.component.css'],
  providers: [DialogService],
})

export class QuestaoListarComponent implements OnInit {

  @ViewChild('DialogCadastrar') dialogQuestao: QuestaoComponent;

  questaoSelecionada: QuestaoListagemDTO;
  questoes: QuestaoListagemDTO[];

  senioridades: SelectItem[];
  tipoQuestoes: SelectItem[];

  itensPorPagina: number = 10;
  totalRegistros: number = 0;

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
    this.onChangePage(null);
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
          this.onChangePage();
        },
        () => {
          this.loadingService.deactivate();
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao excluir questão');
        }
      );
    this.questaoSelecionada = null;
  }

  preencherQuestoes(filtro: QuestaoFiltro, pageable: Pageable<QuestaoListagemDTO>) {
    this.verificaSenioridadeETipoQuestaoNull();
    this.questaoListarService.index(filtro, pageable).subscribe(
      (response) => {
        this.questoes = response.content;
        this.totalRegistros = response.numberOfElements;
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

  onChangePage(event = null){
    this.loadingService.activate();

    const pageable = new Pageable<QuestaoListagemDTO>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'descricao');
    }

    this.preencherQuestoes(this.filtro, pageable);
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

  getSenioridades() {
    this.senioridadeService.index().subscribe(
      (resposta) => {
        this.senioridades = resposta;
        this.senioridades.unshift({value: '', label: 'Selecione...'});
      }
    );
  }

  getTiposQuestao() {
    this.tipoQuestaoService.index().subscribe(
      (resposta) => {
        this.tipoQuestoes = resposta;
        this.tipoQuestoes.unshift({value: null, label: 'Selecione...'});
      }
    );
  }

  private verificaSenioridadeETipoQuestaoNull(){
    if(this.filtro.senioridade === null){
      this.filtro.senioridade = 0;
    }
    if(this.filtro.tipoQuestao === null){
      this.filtro.tipoQuestao = 0;
    }
  }
}
