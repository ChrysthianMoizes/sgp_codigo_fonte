import { CadastrarAvaliacaoComponent } from './../../forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Avaliacao } from '../../models/avaliacao';
import { AvaliacaoService } from '../../service/avaliacao.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Pageable } from 'src/app/util/pageable-request';
import { AuthService } from 'src/app/services/auth.service';
import { FiltroAvaliacao } from 'src/app/pages/prova/models/filtro-avaliacao';
import { Prova } from 'src/app/pages/prova/models/prova';
import { ProvaService } from 'src/app/pages/prova/service/prova.service';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng';
import { RealizarAvaliacaoComponent } from '../../forms/realizar-avaliacao/realizar-avaliacao.component';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  constructor(
    private avaliacaoService: AvaliacaoService,
    private provaService: ProvaService,
    private alert: AlertService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) { }

  @ViewChild('cadastroAvaliacao')
  cadastroAvaliacao: CadastrarAvaliacaoComponent;
  @ViewChild('realizarAvaliacao') realizarAvaliacao: RealizarAvaliacaoComponent

  viewOnly: boolean;
  filtro = new FiltroAvaliacao();
  totalElementos: number;
  avaliacao: Avaliacao = new Avaliacao();

  avaliacoesSelecionadas: Avaliacao[] = [];
  avaliacoesRecebidas: Avaliacao[];
  cols: any[];

  ngOnInit(): void {
    this.atualizarLista();
    this.iniciarTabela();
  }

  iniciarTabela() {
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'tituloProva', header: 'Título' },
      { field: 'nomeCandidato', header: 'Candidato' },
      { field: 'data', header: 'Data' },
      { field: 'aproveitamento', header: 'Aproveitamento' },
      { field: 'situacao', header: 'Situação' }
    ];
  }

  temPermissao() {
    return this.authService.getUsuario().admin
  }

  atualizarLista(event = null): void {
    const pageable = new Pageable<Avaliacao>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'id');
    }

    this.avaliacaoService.index(this.filtro, pageable)
      .subscribe(
        response => {
          this.avaliacoesRecebidas = response.content;
          this.totalElementos = response.totalElements;
          this.avaliacoesSelecionadas = [];
          this.resultadoAvaliacao();
        },
        () => {
          this.alert.montarAlerta('error', 'Erro', 'Erro ao listar avaliações');
        }
      );
  }

  resultadoAvaliacao(): void {
    this.avaliacoesRecebidas.forEach(element => {
      let prova = new Prova();
      this.provaService.show(element.idProva).subscribe(
        response => {
          prova = response;
          element.situacao = element.aproveitamento ? ((element.aproveitamento >= prova.percentual) ? 'Aprovado' : 'Reprovado') : ''
        },
        erro => {
          this.alert.montarAlerta('error', 'Erro', 'Erro ao buscar prova')
        })
    })
  }

  abrirAvaliacao() {
    this.realizarAvaliacao.abrirDialog();
  }

  isOneSelected(): boolean {
    return this.avaliacoesSelecionadas != null;
  }

  deleteAvaliacao() {
    this.confirmationService.confirm({
      message: 'Você tem certeza?',
      accept: () => {
        this.avaliacoesSelecionadas.forEach((element) =>
          this.avaliacaoService.destroy(element.id).subscribe({
            next: () => {
              this.atualizarLista();
            },
            error: erro => {
              this.alert.montarAlerta(
                'error',
                'Erro',
                erro.error.message
              )
            }
          })
        );
      },
    })
  }

  cadastrar(): void {
    this.viewOnly = false;
    this.avaliacoesSelecionadas = [];
    this.cadastroAvaliacao.abrirDialog(null);
  }

  editar(): void {
    this.viewOnly = false;
    this.cadastroAvaliacao.abrirDialog(this.avaliacoesSelecionadas[0].id);
  }

  exibir(): void {
    this.viewOnly = true;
    this.cadastroAvaliacao.abrirDialog(this.avaliacoesSelecionadas[0].id);
  }
}
