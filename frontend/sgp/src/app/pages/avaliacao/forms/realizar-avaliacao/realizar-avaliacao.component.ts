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

  avaliacao: Avaliacao = {
    id: 5,
    dataAvaliacao: new Date(),
    aproveitamento: 60,
    candidato: {
      id: 0,
      nome: 'Arthur',
      cpf: 'string',
      senha: 'string',
      email: 'string',
      admin: false,
    },
    prova: {
      id: 3,
      titulo: 'Prova',
      percentualAprovacao: 70,
      questoes: [
        {
          id: 3,
          descricao: 'Qual é',
          alternativa1: 'alternativa 1',
          alternativa2: 'alternativa 2',
          alternativa3: 'alternativa 3',
          alternativa4: 'alternativa 4',
          alternativa5: 'alternativa 5',
          resposta: null,
          senioridade: {
            id: 5,
            descricao: 'junior',
          },
          tipoQuestao: {
            id: 2,
            descricao: 'codigo',
          },
        },

        {
          id: 4,
          descricao: 'Qual é',
          alternativa1: 'alternativa 1',
          alternativa2: 'alternativa 2',
          alternativa3: 'alternativa 3',
          alternativa4: 'alternativa 4',
          alternativa5: 'alternativa 5',
          resposta: null,
          senioridade: {
            id: 5,
            descricao: 'junior',
          },
          tipoQuestao: {
            id: 2,
            descricao: 'codigo',
          },
        },

        {
          id: 5,
          descricao: 'Qual é',
          alternativa1: 'alternativa 1',
          alternativa2: 'alternativa 2',
          alternativa3: 'alternativa 3',
          alternativa4: 'alternativa 4',
          alternativa5: 'alternativa 5',
          resposta: null,
          senioridade: {
            id: 5,
            descricao: 'junior',
          },
          tipoQuestao: {
            id: 2,
            descricao: 'codigo',
          },
        },
      ],
    },
  };

  ngOnInit(): void {
    console.log(this.avaliacao.candidato.nome);
  }

  abrirDialog() {
    this.exibir = true;
  }

  fecharDialog() {
    this.exibir = false;
  }

  finalizarProva() {
    // this.avaliacaoService.responder(this.avaliacao).subscribe((avaliacao) => {
    //   this.alertService.montarAlerta(
    //     'success',
    //     'Sucesso!',
    //     'Prova finalizada!'
    //   );
    // });
    // console.log(this.avaliacao.prova);
  }

  verificaQuestoes(): boolean {
    let valido = false;

    this.avaliacao.prova.questoes.forEach((questao) => {
      if (!questao.resposta) {
        valido = true;
      }
    });

    return valido;
  }
}
