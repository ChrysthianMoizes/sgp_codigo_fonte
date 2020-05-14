import { Questao } from './../models/questao';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestaoService } from '../service/questao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Senioridade } from 'src/app/models/senioridade';
import { TipoQuestao } from 'src/app/models/tipo-questao';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  exibir: boolean = false;
  hader: string = '';
  @Output() alterar = new EventEmitter();

  senioridade: Senioridade[];
  tipoQuestao: TipoQuestao[];

  idQuestaoEditando: number = 0;
  isQuestaoEditando: boolean = true;

  public formQuestao: FormGroup = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(400),
    ]),
    senioridade: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    tipoQuestao: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    alternativa1: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    alternativa2: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    alternativa3: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    alternativa4: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    alternativa5: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    selectedValue: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
  });

  constructor(
    private questaoService: QuestaoService,
    private alertService: AlertService
  ) {
    this.senioridade = [
      { id: 1, descricao: 'Estagiário' },
      { id: 2, descricao: 'Júnior' },
      { id: 3, descricao: 'Pleno' },
      { id: 4, descricao: 'Sênior' },
    ];
    this.tipoQuestao = [
      { id: 1, descricao: 'Requisito' },
      { id: 2, descricao: 'Análise e Projeto' },
      { id: 3, descricao: 'Codificação' },
      { id: 4, descricao: 'Teste e Arquitetura' },
    ];
  }
  ngOnInit(): void { }

  salvar(): void {
    //pegar os dados e salvar
    this.alterar.emit(null);
  }

  exibirDialog(id: string, questaoSelecionada: Questao): void {
    if (id == '2') {
      this.exibir = true;
      this.hader = 'Editar Questão';
      this.idQuestaoEditando = questaoSelecionada.id;
      this.formQuestao.setValue({
        descricao: questaoSelecionada.descricao,
        senioridade: questaoSelecionada.senioridade,
        tipoQuestao: questaoSelecionada.tipoQuestao,
        alternativa1: questaoSelecionada.alternativa1,
        alternativa2: questaoSelecionada.alternativa2,
        alternativa3: questaoSelecionada.alternativa3,
        alternativa4: questaoSelecionada.alternativa4,
        alternativa5: questaoSelecionada.alternativa5,
        selectedValue: questaoSelecionada.resposta.toString(),
      });
    } else {
      this.exibir = true;
      this.hader = 'Cadastrar Questão';
      this.isQuestaoEditando = false;
      this.formQuestao.reset();
    }
  }

  cadastar(): void {
    if (!this.isQuestaoEditando) {
      let questao: Questao = new Questao();
      questao.descricao = this.formQuestao.value.descricao;
      questao.senioridade = this.formQuestao.value.senioridade;
      questao.tipoQuestao = this.formQuestao.value.tipoQuestao;
      questao.alternativa1 = this.formQuestao.value.alternativa1;
      questao.alternativa2 = this.formQuestao.value.alternativa2;
      questao.alternativa3 = this.formQuestao.value.alternativa3;
      questao.alternativa4 = this.formQuestao.value.alternativa4;
      questao.alternativa5 = this.formQuestao.value.alternativa5;
      questao.resposta = parseInt(this.formQuestao.value.selectedValue, 10);
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
        }
      );
    } else {
      let questao: Questao = new Questao();
      questao.descricao = this.formQuestao.value.descricao;
      questao.senioridade = this.formQuestao.value.senioridade;
      questao.tipoQuestao = this.formQuestao.value.tipoQuestao;
      questao.alternativa1 = this.formQuestao.value.alternativa1;
      questao.alternativa2 = this.formQuestao.value.alternativa2;
      questao.alternativa3 = this.formQuestao.value.alternativa3;
      questao.alternativa4 = this.formQuestao.value.alternativa4;
      questao.alternativa5 = this.formQuestao.value.alternativa5;
      questao.resposta = parseInt(this.formQuestao.value.selectedValue, 10);
      questao.id = this.idQuestaoEditando;
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
        }
      );
    }
    this.exibir = false;
  }

  cancelar(): void {
    this.exibir = false;
  }
}
