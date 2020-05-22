import { AlertService } from './../../../../components/alert/alert.service';
import { AvaliacaoService } from './../../service/avaliacao.service';
import { Avaliacao } from './../../models/avaliacao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realizar-avaliacao',
  templateUrl: './realizar-avaliacao.component.html',
  styleUrls: ['./realizar-avaliacao.component.css'],
})
export class RealizarAvaliacaoComponent implements OnInit {
  constructor(
    private avaliacaoService: AvaliacaoService,
    private alertService: AlertService
  ) { }

  selectedValue: number;

  exibir: boolean;

  avaliacao: Avaliacao;

  ngOnInit(): void {
  }

  abrirDialog() {
    this.exibir = true;
  }

  fecharDialog() {
    this.exibir = false;
  }

  finalizarProva() { }

  verificaQuestoes() {
  }
}
