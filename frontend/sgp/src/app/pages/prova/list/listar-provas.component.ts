import { Component, OnInit, ViewChild } from '@angular/core';
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
  prova: Prova = new Prova();
  provas: Prova[];
  provasSelecionadas: Prova[];
  definicaoColunas: any[];

  @ViewChild('dialogProvaForm') dialogProvaForm: CadastrarProvaComponent;

  filtro = new FiltroProva();
  cols: any[];
  rows: number = 20;
  first: number = 0;
  totalDeElementos = 1;
  listProvas: Prova[];
  notFilteredListProvas: Prova[];
  provaSelecionada: Prova;
  selectedProvas: Prova[] = [];

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

    const pageable = new Pageable(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'titulo');
    }

    this.provaService.index(this.prova, pageable).subscribe(
      (response) => {
        this.listProvas = response.content;
        this.notFilteredListProvas = response.content;
        this.totalDeElementos = response.totalElements;
        this.selectedProvas = [];
      },
      () => {
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao listar candidatos');
      }
    );
  }

  isOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length >= 1;
  }

  visualizarProva(): void {
    this.dialogProvaForm.abrirDialog(3);
  }

  editarProva(): void {
    this.dialogProvaForm.abrirDialog(2);
  }

  cadastrarProva(): void {
    this.dialogProvaForm.abrirDialog(1);
  }

  atualizarListagem(): void {
    // atualizar a lista com o banco
  }

  excluir() {
      this.excluirProva(this.prova);
    }


  excluirProva(prova: Prova) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      header: 'Excluir prova',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.provaService.destroy(this.prova.id).subscribe(() => {
          this.provaService.show(this.prova.id);
        });
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova excluída com sucesso.'
        );
      },
    });
  }
}
