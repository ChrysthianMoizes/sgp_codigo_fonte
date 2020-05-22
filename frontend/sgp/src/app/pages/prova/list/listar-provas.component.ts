import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertService } from '../../../components/alert/alert.service';
import { ProvaService } from '../service/prova.service';
import { Prova } from '../models/prova';
import { CadastrarProvaComponent } from '../form/cadastrar-prova.component';
import { Pageable } from 'src/app/util/pageable-request';
import { FiltroProva } from 'src/app/pages/prova/models/filtro-prova.model';
import { LoadingService } from 'src/app/components/loading/loading.service';
@Component({
  selector: 'app-listar-provas',
  templateUrl: './listar-provas.component.html',
  styleUrls: ['./listar-provas.component.css'],
  providers: [DialogService],
})
export class ListarProvasComponent implements OnInit {

  @ViewChild('VisualizarProva')
  visualizarProva: CadastrarProvaComponent;


  filtro = new FiltroProva();
  provasSelecionadas: Prova[];
  definicaoColunas: any[];
  rows: number;
  first: number = 0;
  totalDeElementos = 1;
  listProvas: Prova[];
  notFilteredListProvas: Prova[];
  provaSelecionada: Prova;
  selectedProvas: Prova[] = [];
  prova: Prova = new Prova();

  lastPage = 0;
  lastSize = 0;

  constructor(
    private provaService: ProvaService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.atualizarLista(null);
    this.inicializarTabela();
  }

  inicializarTabela(): void {
    this.definicaoColunas = [
      { field: 'id', header: 'ID' },
      { field: 'titulo', header: 'Titulo' },
      { field: 'percentual', header: '% para aprovação' },
    ];
  }

  atualizarLista(event = null): void {

    this.loadingService.activate();

    const pageable = new Pageable<Prova>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'id');
    }

    this.provaService.index(this.filtro, pageable).subscribe(
      (response) => {
        this.listProvas = response.content;
        this.notFilteredListProvas = response.content;
        this.totalDeElementos = response.totalElements;
        this.selectedProvas = [];
        this.loadingService.deactivate();
      },
      (error) => {
        this.loadingService.deactivate();
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao listar provas');
      }
    );
  }


  isOneSelected(): boolean {
    return this.selectedProvas && this.selectedProvas.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.selectedProvas && this.selectedProvas.length >= 1;
  }

  verProva(): void {
    this.selectedProvas.forEach((prova) =>
      this.provaService.show(prova.id).subscribe({
        next: (provaCompleta) => {
          this.visualizarProva.abrirDialog(provaCompleta, true);
        },
        error: () =>
          this.alertService.montarAlerta(
            'error',
            'Erro',
            'Erro ao buscar prova. Tente novamente.'
          ),
      })
    );
  }

  editarProva(): void {
    this.selectedProvas.forEach((prova) =>
      this.provaService.show(prova.id).subscribe({
        next: (provaCompleta) => {
          this.visualizarProva.abrirDialog(provaCompleta, false);
        },
        error: () =>
          this.alertService.montarAlerta(
            'error',
            'Erro',
            'Erro ao buscar prova. Tente novamente.'
          ),
      })
    );
  }

  cadastrarProva(): void {
    this.visualizarProva.abrirDialog(null,false);
  }

  excluirProva(): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir prova',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProvas.forEach((prova) =>
          this.provaService.destroy(prova.id).subscribe({
            next: () => {
              this.atualizarLista();

            },
            error: () => this.alertService.montarAlerta('error', 'Erro', `Não foi possível excluir a prova ${prova.id}`)
          })
        );
      },
    });
  }
}
