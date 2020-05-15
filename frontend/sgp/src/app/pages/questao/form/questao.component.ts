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

  @Output() alterar = new EventEmitter();

  exibir: boolean = false;
  header: string = '';

  senioridade: Senioridade[];
  tipoQuestao: TipoQuestao[];

  idQuestaoEditando: number = 0;
  isQuestaoEditando: boolean = true;
  formulario: FormGroup;

  questao: Questao = new Questao();

  public formQuestao: FormGroup = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(400)]),
    senioridade: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
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
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.preencherSenioridades();
    this.preencherTiposQuestoes();
  }

  iniciarForm() {
    //
  }

  preencherSenioridades() {
    this.senioridade = [
      { id: 1, descricao: 'Estagiário' },
      { id: 2, descricao: 'Júnior' },
      { id: 3, descricao: 'Pleno' },
      { id: 4, descricao: 'Sênior' },
    ];
  }

  preencherTiposQuestoes() {
    this.tipoQuestao = [
      { id: 1, descricao: 'Requisito' },
      { id: 2, descricao: 'Análise e Projeto' },
      { id: 3, descricao: 'Codificação' },
      { id: 4, descricao: 'Teste e Arquitetura' },
    ];
  }

  salvar(): void {
    //pegar os dados e salvar
    this.alterar.emit(null);
  }

  exibirDialog(id: string, questaoSelecionada: Questao): void {

    this.header = id ? 'Editar Questão' : 'Cadastrar Questão';

    if(id) {
      // buscar questao completa do backend
    } else {
      this.questao = new Questao();
      this.exibir = true;
    }
  }

  validarForm(): void {

    if(this.formulario.invalid) {
      // da o erro
      return;
    }

    if(this.questao.id){
      //this.atualizar();
    }else {
      //this.salvar();
    }
  }

  cancelar(): void {
    this.exibir = false;
  }
}
