import { CadastrarAvaliacaoComponent } from './../../forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Avaliacao } from '../../models/avaliacao';
import { AvaliacaoService } from '../../service/avaliacao.service';
import { FiltroCandidato } from 'src/app/pages/usuario/models/filtro-candidato';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Pageable } from 'src/app/util/pageable-request';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  constructor(
    private avaliacaoService: AvaliacaoService,
    private alert: AlertService
  ) { }

  @ViewChild('cadastroAvaliacao')
  cadastroAvaliacao: CadastrarAvaliacaoComponent;

  viewOnly: boolean;
  filtro = new FiltroCandidato();
  totalElementos: number;
  avaliacao: Avaliacao[];

  avaliacaoSelecionada: Avaliacao[];
  avaliacoesRecebidas: Avaliacao[];
  cols = [
    { field: 'id', header: 'Código' },
    { field: 'titulo', header: 'Título' },
    { field: 'candidato', header: 'Candidato' },
    { field: 'data', header: 'Data' },
    { field: 'aproveitamento', header: 'Aproveitamento' },
    { field: 'situacao', header: 'Situação' }
  ];

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(event = null): void {

    const pageable = new Pageable(0, 20);

    if (event) {
      pageable.setSize(event.rows ? event.rows : 20);
      pageable.setPage(event.first ? event.first : 0);
      pageable.setSort(1, 'titulo');
    }

    this.avaliacaoService.index(this.filtro, pageable)
      .subscribe(
        response => {
          this.avaliacoesRecebidas = response.content;
          this.totalElementos = response.totalElements;
          this.avaliacaoSelecionada = [];
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
    this.cadastroAvaliacao.abrirDialog();
  }

  editar(): void {
    this.viewOnly = false;
    this.cadastroAvaliacao.abrirDialog();
  }

  exibir(): void {
    this.viewOnly = true;
    this.cadastroAvaliacao.abrirDialog();
  }
}
