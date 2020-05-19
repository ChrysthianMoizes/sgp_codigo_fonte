import { CadastrarAvaliacaoComponent } from './../../forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Avaliacao } from '../../models/avaliacao';
import { AvaliacaoService } from '../../service/avaliacao.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Pageable } from 'src/app/util/pageable-request';
import { AuthService } from 'src/app/services/auth.service';
import { FiltroAvaliacao } from 'src/app/pages/prova/models/filtro-avaliacao';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  constructor(
    private avaliacaoService: AvaliacaoService,
    private alert: AlertService,
    private authService: AuthService
  ) { }

  @ViewChild('cadastroAvaliacao')
  cadastroAvaliacao: CadastrarAvaliacaoComponent;

  viewOnly: boolean;
  filtro = new FiltroAvaliacao();
  totalElementos: number;
  avaliacao: Avaliacao = new Avaliacao();

  avaliacaoSelecionada: Avaliacao = new Avaliacao();
  avaliacoesRecebidas: Avaliacao[];
  cols: any[];

  ngOnInit(): void {
    this.atualizarLista();
    this.iniciarTabela();
  }

  iniciarTabela(){
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'tituloProva', header: 'Título' },
      { field: 'nomeCandidato', header: 'Candidato' },
      { field: 'data', header: 'Data' },
      { field: 'aproveitamento', header: 'Aproveitamento' },
      { field: 'situacao', header: 'Situação' }
    ];
  }

  temPermissao(){
    return this.authService.getUsuario().admin
  }

  atualizarLista(event = null): void {
    console.log('chamou')

    const pageable = new Pageable<Avaliacao>(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'titulo');
    }

    console.log(this.filtro)

    this.avaliacaoService.index(this.filtro, pageable)
      .subscribe(
        response => {
          this.avaliacoesRecebidas = response.content;
          this.totalElementos = response.numberOfElements;
          this.avaliacaoSelecionada = new Avaliacao();
        },
        () => {
          this.alert.montarAlerta('error', 'Erro', 'Erro ao listar avaliações');
        }
      );
  }

  isOneSelected(): boolean {
    return this.avaliacaoSelecionada != null;
  }

  cadastrar(): void {
    this.viewOnly = false;
    this.avaliacaoSelecionada = null;
    this.cadastroAvaliacao.abrirDialog(null);
  }

  editar(): void {
    this.viewOnly = false;
    this.cadastroAvaliacao.abrirDialog(this.avaliacaoSelecionada.id);
  }

  exibir(): void {
    this.viewOnly = true;
    this.cadastroAvaliacao.abrirDialog(this.avaliacaoSelecionada.id);
  }
}
