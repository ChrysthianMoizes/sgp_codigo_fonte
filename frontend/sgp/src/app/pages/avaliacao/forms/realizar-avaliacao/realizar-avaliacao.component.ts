import { AlertService } from './../../../../components/alert/alert.service';
import { AvaliacaoService } from './../../service/avaliacao.service';
import { Avaliacao } from './../../models/avaliacao';
import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { ProvaService } from 'src/app/pages/prova/service/prova.service';
import { Prova } from 'src/app/pages/prova/models/prova';
import { AvaliacaoPreenchida } from '../../models/avaliacao-preenchida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-realizar-avaliacao',
  templateUrl: './realizar-avaliacao.component.html',
  styleUrls: ['./realizar-avaliacao.component.css'],
})
export class RealizarAvaliacaoComponent implements OnInit {

  @Input() avaliacao: Avaliacao = new Avaliacao();
  avaliacaoPreenchida: AvaliacaoPreenchida = new AvaliacaoPreenchida();
  prova: Prova = new Prova();
  exibir: boolean = false;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private provaService: ProvaService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  iniciarVetorRespostas() {
    this.avaliacaoPreenchida.respostas = new Array(this.prova.questoes.length);
    console.log(this.avaliacaoPreenchida)
  }

  converterResposta(){
    this.avaliacaoPreenchida.respostas = this.avaliacaoPreenchida.respostas.map(x => +x);
  }

  iniciarAvaliacaoPreenchida() {
    this.avaliacaoPreenchida.id = this.avaliacao.id;
    this.avaliacaoPreenchida.idProva = this.avaliacao.idProva;
  }

  carregarQuestoes() {
    this.provaService.exibirProvaDetalhada(this.avaliacao.idProva)
      .subscribe(
        response => {
          this.prova = response;
          this.iniciarVetorRespostas();
          this.iniciarAvaliacaoPreenchida();
        },
        () => {
          this.alertService.montarAlerta('error', 'Erro', 'Erro ao buscar prova');
        })
  }

  abrirDialog() {
    this.exibir = true;
    this.carregarQuestoes();
  }

  returnTitulo(){
    return this.prova.titulo ? this.prova.titulo : '';
  }

  fecharDialog() {
    this.exibir = false;
  }

  finalizarProva() {
    console.log('Finalizou')
    this.converterResposta();
    this.avaliacaoService.realizarAvaliacao(this.avaliacaoPreenchida).subscribe(
      response => {
        this.alertService.montarAlerta('success', 'Sucesso', 'Prova enviada!');
        this.fecharDialog();
      },
      erro => {
        this.alertService.montarAlerta('error', 'Erro', erro.message);
      }
    );
  }

  verificaQuestoes() {
    this.avaliacaoPreenchida.respostas.forEach( element => {
      if(!element){
        console.log(element)
        return true;
      }
    })
    return false;
  }

}
