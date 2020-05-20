import { AlertService } from './../../../../components/alert/alert.service';
import { AvaliacaoService } from './../../service/avaliacao.service';
import { Avaliacao } from './../../models/avaliacao';
import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/pages/questao/models/questao';
import { QuestaoService } from 'src/app/pages/questao/service/questao.service';
import { ProvaService } from 'src/app/pages/prova/service/prova.service';
import { Prova } from 'src/app/pages/prova/models/prova';
import { AvaliacaoPreenchida } from '../../models/avaliacao-preenchida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-realizar-avaliacao',
  templateUrl: './realizar-avaliacao.component.html',
  styleUrls: ['./realizar-avaliacao.component.css'],
})
export class RealizarAvaliacaoComponent implements OnInit {

  @Input() avaliacao: Avaliacao = new Avaliacao();
  avaliacaoPreenchida: AvaliacaoPreenchida = new AvaliacaoPreenchida();
  prova: Prova = new Prova();
  avaliacaoFormulario: FormGroup;
  exibir: boolean = false;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private provaService: ProvaService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.iniciarVetorRespostas();
  }

  iniciarVetorRespostas() {
    this.prova.questoes.forEach(() => {
      this.avaliacaoPreenchida.respostas.push(null);
    })
  }

  iniciarAvaliacaoPreenchida() {
    this.avaliacaoPreenchida.id = this.avaliacao.id;
    this.avaliacaoPreenchida.idProva = this.avaliacao.idProva;
  }

  iniciarFormulario() {
    this.avaliacaoFormulario = this.formBuilder.group({
      alternativa1: [null, Validators.required],
      alternativa2: [null, Validators.required],
      alternativa3: [null, Validators.required],
      alternativa4: [null, Validators.required],
      alternativa5: [null, Validators.required],
    })
  }

  carregarQuestoes() {
    this.provaService.exibirProvaDetalhada(this.avaliacao.idProva)
      .subscribe(
        response => {
          this.prova = response;
        },
        () => {
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao buscar prova');
        })
  }

  abrirDialog() {
    this.exibir = true;
    this.carregarQuestoes();
  }

  fecharDialog() {
    this.exibir = false;
  }

  finalizarProva() {
    this.avaliacaoService.realizarAvaliacao(this.avaliacaoPreenchida);
  }

  verificaQuestoes() {
    return this.avaliacaoFormulario.invalid;
  }
}
