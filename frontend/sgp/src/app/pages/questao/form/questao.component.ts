import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

import { Questao } from '../models/questao';
import { QuestaoService } from '../service/questao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  exibir: boolean = false;
  hader: string = '';
  @Output() alterar = new EventEmitter();

  senioridade: any[];
  tipo_questao: any[];

  public formQuestao: FormGroup = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(400),
    ]),
    senioridadeQ: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    tipo_questaoQ: new FormControl('', [
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

  constructor(private questaoService: QuestaoService) {
    this.senioridade = [
      { id: 1, descricao: 'Estagiário' },
      { id: 2, descricao: 'Júnior' },
      { id: 3, descricao: 'Pleno' },
      { id: 4, descricao: 'Sênior' },
    ];
    this.tipo_questao = [
      { id: 1, descricao: 'Requisito' },
      { id: 2, descricao: 'Análise e Projeto' },
      { id: 3, descricao: 'Codificação' },
      { id: 4, descricao: 'Teste e Arquitetura' },
    ];
  }
  ngOnInit(): void {}

  salvar() {
    //pegar os dados e salvar
    this.alterar.emit(null);
  }

  exibirDialog(id: string, questoesSelecionadas: any) {
    if (id == '2') {
      this.exibir = true;
      this.hader = 'Editar Questão';
      this.formQuestao.setValue({
        descricao: questoesSelecionadas[0].descricao,
        senioridadeQ: questoesSelecionadas[0].senioridade,
        tipo_questaoQ: questoesSelecionadas[0].tipo_questao,
        alternativa1: questoesSelecionadas[0].alternativa_1,
        alternativa2: questoesSelecionadas[0].alternativa_2,
        alternativa3: questoesSelecionadas[0].alternativa_3,
        alternativa4: questoesSelecionadas[0].alternativa_4,
        alternativa5: questoesSelecionadas[0].alternativa_5,
        selectedValue: questoesSelecionadas[0].resposta.toString(),
      });
    } else {
      this.exibir = true;
      this.hader = 'Cadastrar Questão';
    }
  }

  cadastar() {
    let questao: Questao = new Questao();
    questao.descricao = this.formQuestao.value.descricao;
    questao.senioridade = this.formQuestao.value.senioridadeQ;
    questao.tipoQuestao = this.formQuestao.value.tipo_questaoQ;
    questao.alternativa1 = this.formQuestao.value.alternativa1;
    questao.alternativa2 = this.formQuestao.value.alternativa2;
    questao.alternativa3 = this.formQuestao.value.alternativa3;
    questao.alternativa4 = this.formQuestao.value.alternativa4;
    questao.alternativa5 = this.formQuestao.value.alternativa5;
    questao.resposta = parseInt(this.formQuestao.value.selectedValue, 10);
    console.log(questao);
    this.questaoService.criarQuestao(questao);
  }
}
