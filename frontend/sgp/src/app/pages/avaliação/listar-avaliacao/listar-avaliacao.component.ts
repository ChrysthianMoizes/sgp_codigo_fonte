import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../models/avaliacao.model';
import { AvaliacaoService } from '../service/avaliacao.service';

@Component({
  selector: 'app-listar-avaliacao',
  templateUrl: './listar-avaliacao.component.html',
  styleUrls: ['./listar-avaliacao.component.css'],
})
export class ListarAvaliacaoComponent implements OnInit {
  avaliacoes: Avaliacao[];
  constructor(private avaliacaoService: AvaliacaoService) {}

  ngOnInit(): void {
    this.avaliacaoService
      .getAvaliacoes()
      .then((avaliacao) => (this.avaliacoes = avaliacao));
  }
}
