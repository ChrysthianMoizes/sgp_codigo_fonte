import { Questao } from './../models/questao';
import { TipoQuestao } from './../../tipo-questao/models/tipo-questao';
import { Senioridade } from './../../senioridade/models/senioridade';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestaoService } from '../service/questao.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  exibir: boolean = false;
  hader: string = '';
  @Output() alterar = new EventEmitter();

  senioridades: Senioridade[];
  tipoQuestoes: TipoQuestao[];

  idQuestao: number = 0;
  isQuestaoEditando: boolean = true;
  isQuestaoVisualizando: boolean = false;

  public formQuestao: FormGroup;

  constructor(
    private questaoService: QuestaoService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.construirForm();

    this.senioridades = [
      { id: 1, descricao: 'Estagiário' },
      { id: 2, descricao: 'Júnior' },
      { id: 3, descricao: 'Pleno' },
      { id: 4, descricao: 'Sênior' },
    ];
    this.tipoQuestoes = [
      { id: 1, descricao: 'Requisito' },
      { id: 2, descricao: 'Análise e Projeto' },
      { id: 3, descricao: 'Codificação' },
      { id: 4, descricao: 'Teste e Arquitetura' },
    ];

  }

  exibirDialogVisualisar(questaoSelecionada: Questao) {
    this.exibir = true;
    this.hader = 'Visualizar Questão';
    this.isQuestaoEditando = true;
    this.isQuestaoVisualizando = true;
    this.idQuestao = questaoSelecionada.id;
    this.preencherCamposDoForm(questaoSelecionada);
  }

  exibirDialogEditar(questaoSelecionada: Questao){
    this.exibir = true;
    this.hader = 'Editar Questão';
    this.isQuestaoEditando = true;
    this.isQuestaoVisualizando = false;
    // this.idQuestao = questaoSelecionada.id;
    this.preencherCamposDoForm(questaoSelecionada);
    // this.formQuestao.get('descricao')
  }

  exibirDialogCadastro(){
    this.exibir = true;
    this.hader = 'Cadastrar Questão';
    this.isQuestaoEditando = false;
    this.isQuestaoVisualizando = false;
    this.formQuestao.reset();
  }

  persistir(){
    let questao: Questao = Object.assign({}, this.formQuestao.value);
    console.log(questao.id)
    if(!this.isQuestaoEditando){
      this.cadastar(questao);
    }else{
      this.atualizar(questao);
    }
  }

  atualizar(questao: Questao) {
    questao.id = this.idQuestao;
    this.questaoService.atualizarQuestao(questao).subscribe(
      (response) => {
        this.alertService.montarAlerta(
          'success',
          'Sucesso',
          'Questão editada com Sucesso'
        );
      },
      (error) => {
        this.alertService.montarAlerta(
          'error',
          'Erro',
          'Erro ao editar questão'
        );
      },
      () => {
        this.exibir = false;
      }
    );
  }

  cadastar(questao: Questao) {
    this.questaoService.criarQuestao(questao).subscribe(
      (response) => {
        this.alertService.montarAlerta(
          'success',
          'Sucesso',
          'Questão cadastrada com Sucesso'
        );
      },
      (error) => {
        this.alertService.montarAlerta(
          'error',
          'Erro',
          'Erro ao cadastrar questão'
        );
      },
      () => {
        this.exibir = false;
      }
    );
  }

  cancelar() {
    this.exibir = false;
  }

  preencherCamposDoForm(questao: Questao){
    this.formQuestao.setValue({
      id: questao.id,
      descricao: questao.descricao,
      senioridade: questao.senioridade,
      tipoQuestao: questao.tipoQuestao,
      alternativa1: questao.alternativa1,
      alternativa2: questao.alternativa2,
      alternativa3: questao.alternativa3,
      alternativa4: questao.alternativa4,
      alternativa5: questao.alternativa5,
      resposta: questao.resposta.toString(),
    });
  }

  construirForm(){
    this.formQuestao = this.formBuilder.group({
      id: [null],
      descricao: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(800),
      ]],
      senioridade: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]],
      tipoQuestao: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]],
      alternativa1: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      alternativa2: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      alternativa3: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      alternativa4: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      alternativa5: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]],
      resposta: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]],
    })
  }

  getControlLabel(type: string){
    return this.formQuestao.get(type).value;
   }



}
