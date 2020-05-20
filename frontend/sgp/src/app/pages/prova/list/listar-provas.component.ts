import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from '../../../components/alert/alert.service';
import { LoadingService } from '../../../components/loading/loading.service';
import { ProvaService } from '../service/prova.service';
import { Prova } from '../models/prova';
import { CadastrarProvaComponent } from '../form/cadastrar-prova.component';
import { Pageable } from 'src/app/util/pageable-request';
import { FiltroProva } from 'src/app/pages/prova/models/filtro-prova.model';
@Component({
  selector: 'app-listar-provas',
  templateUrl: './listar-provas.component.html',
  styleUrls: ['./listar-provas.component.css'],
  providers: [DialogService],
})
export class ListarProvasComponent implements OnInit {

  @Output() provaAtualizada = new EventEmitter();
  @Input() apenasVisualizar = false;
  filtro = new FiltroProva();
  provasSelecionadas: Prova[];
  definicaoColunas: any[];
  rows: number = 20;
  first: number = 0;
  totalDeElementos = 1;
  listProvas: Prova[];
  notFilteredListProvas: Prova[];
  provaSelecionada: Prova;
  selectedProvas: Prova[] = [];
  prova: Prova = new Prova();
  visible = false;

  lastPage = 0;
  lastSize = 0;

  constructor(
    private provaService: ProvaService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.inicializarTabela();
    this.atualizarLista(null);
  }

  inicializarTabela(): void {
    this.definicaoColunas = [
      { field: 'id', header: 'ID' },
      { field: 'titulo', header: 'Titulo' },
      { field: 'percentual', header: '% para aprovação' },
    ];
  }

  atualizarLista(event = null): void {

    const pageable = new Pageable<Prova>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'titulo');
    }

    this.provaService.index(this.filtro, pageable).subscribe(
      (response) => {
        this.listProvas = response.content;
        this.notFilteredListProvas = response.content;
        this.totalDeElementos = response.totalElements;
        this.selectedProvas = [];
      },
      () => {
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao listar provas');
      }
    );
  }

  abrirDialog(prova: Prova, apenasVisualizar = false): void {
    this.prova = Object.assign({}, prova);
    this.apenasVisualizar = apenasVisualizar;
    this.visible = true;
  }

  resetarConfigs(): void {
    this.prova = new Prova();
    this.visible = false;
    this.apenasVisualizar = false;
  }

  isOneSelected(): boolean {
    return this.selectedProvas && this.selectedProvas.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.selectedProvas && this.selectedProvas.length >= 1;
  }

/*   visualizarProva(): void {
    this.dialogProvaForm.abrirDialog(3);
  } */
  verProva(): void {
    this.selectedProvas.forEach((prova) =>
      this.provaService.show(prova.id).subscribe({
        next: (provaCompleta) =>
          this.abrirDialog(provaCompleta, true),
        error: () =>
          this.alertService.montarAlerta(
            'error',
            'Erro',
            'Erro ao buscar prova. Tente novamente.'
          ),
      })
    );
  }

/*   editarProvass(): void {
    this.dialogProvaForm.abrirDialog(2);
  } */
  editarProva(): void {
    this.selectedProvas.forEach((prova) =>
      this.provaService.show(prova.id).subscribe({
        next: (provaCompleta) => {
          this.abrirDialog(provaCompleta);
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
    this.selectedProvas.forEach((prova) =>
      this.provaService.show(prova.id).subscribe({
        next: (provaCompleta) => {
          this.abrirDialog(provaCompleta);
        },
        error: () =>
          this.alertService.montarAlerta(
            'error',
            'Erro',
            'Erro ao buscar prova. Tente novamente.'
          ),
      })
    );  }

/*   atualizarListagem(): void {
    // atualizar a lista com o banco
  } */

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
