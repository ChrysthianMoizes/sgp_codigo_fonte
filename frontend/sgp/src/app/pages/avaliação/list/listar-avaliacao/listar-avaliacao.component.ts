import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../models/avaliacao.model';
import { AvaliacaoService } from '../../service/avaliacao.service';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  constructor(private avaliacaoService: AvaliacaoService) {}
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

  cadastrar() {}

  editar() {}

  exibir() {}
}
