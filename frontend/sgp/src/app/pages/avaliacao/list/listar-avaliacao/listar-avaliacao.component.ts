import { CadastrarAvaliacaoComponent } from './../../forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Avaliacao } from '../../models/avaliacao';
import { AvaliacaoService } from '../../service/avaliacao.service';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  constructor(private avaliacaoService: AvaliacaoService) {}

  @ViewChild('cadastroAvaliacao')
  cadastroAvaliacao: CadastrarAvaliacaoComponent;
  viewOnly: boolean;
  avaliacao: Avaliacao[];
  avaliacaoSelecionada: Avaliacao;
  avaliacoesRecebidas: Avaliacao[];
  ngOnInit(): void {
    this.avaliacaoService.getAvaliacoes().subscribe({
      next: (avaliacoes) => {
        this.avaliacoesRecebidas = avaliacoes;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
