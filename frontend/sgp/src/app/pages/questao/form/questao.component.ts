import { Component, OnInit } from '@angular/core';
import { QuestaoModel } from '../model/questao.model';
import { QuestaoService } from '../service/questao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})

export class QuestaoComponent implements OnInit {

  public formQuestao: FormGroup = new FormGroup({
    descricao:  new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(400) ]),
    senioridadeQ: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    tipo_questaoQ: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    alternativa1: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    alternativa2: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    alternativa3: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    alternativa4: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    alternativa5: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    selectedValue: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(100)])
  });

  senioridade:any[]
  tipo_questao:any[]

  constructor(private questaoService: QuestaoService) {
    this.senioridade = [
      {id: 1, descricao: 'Estagiário'},
      {id: 2, descricao: 'Júnior'},
      {id: 3, descricao: 'Pleno'},
      {id: 4, descricao: 'Sênior'}
    ]
    this.tipo_questao = [
      {id: 1, descricao: 'Requisito'},
      {id: 2, descricao: 'Análise e Projeto'},
      {id: 3, descricao: 'Codificação'},
      {id: 4, descricao: 'Teste e Arquitetura'}
    ]
  }

  ngOnInit(): void {

  }

  cadastar() {
    let questao: QuestaoModel = new QuestaoModel();
    questao.senioridade = this.formQuestao.value.senioridadeQ;
    questao.tipo_questao =  this.formQuestao.value.tipo_questaoQ;
    questao.alternativa_1 = this.formQuestao.value.alternativa1;
    questao.alternativa_2 = this.formQuestao.value.alternativa2;
    questao.alternativa_3 = this.formQuestao.value.alternativa3;
    questao.alternativa_4 = this.formQuestao.value.alternativa4;
    questao.alternativa_5 = this.formQuestao.value.alternativa5;
    questao.resposta = parseInt(this.formQuestao.value.selectedValue, 10);

    this.questaoService.criarQuestao(questao);
  }
}
