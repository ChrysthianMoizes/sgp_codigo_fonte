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
  avaliacaoSendoEditada: Avaliacao;
  avaliacao: Avaliacao[];
  avaliacaoSelecionadas: Avaliacao[];
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
    return (
      this.avaliacaoSelecionadas && this.avaliacaoSelecionadas.length === 1
    );
  }

  isAtLeastOneSelected(): boolean {
    return this.avaliacaoSelecionadas && this.avaliacaoSelecionadas.length >= 1;
  }

  cadastrar() {
    this.viewOnly = false;
    this.avaliacaoSendoEditada = null;
    this.cadastroAvaliacao.abrirDialog();
  }

  editar(avaliacao) {
    this.viewOnly = false;
    this.avaliacaoSendoEditada = avaliacao;
    this.cadastroAvaliacao.abrirDialog();
  }

  exibir(avaliacao) {
    this.viewOnly = true;
    this.avaliacaoSendoEditada = avaliacao;
    this.cadastroAvaliacao.abrirDialog();
  }
}
