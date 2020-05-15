import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng';
import { AlertService } from 'src/app/components/alert/alert.service';
import { QuestaoDTO } from '../models/questao.dto';
import { QuestaoService } from '../service/questao.service';
import { SenioridadeService } from '../service/senioridade.service';
import { TipoQuestaoService } from '../service/tipo-questao.service';
import { Questao } from './../models/questao';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {
  exibir: boolean = false;
  hader: string = '';
  questao: QuestaoDTO = new QuestaoDTO();
  @Output() alterar = new EventEmitter();

  senioridades: SelectItem[];
  tipoQuestoes: SelectItem[];

  isQuestaoEditando: boolean = true;
  isQuestaoVisualizando: boolean = false;
  questaoDTO: Questao;

  public formQuestao: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private senioridadeService: SenioridadeService,
    private tipoQuestaoService: TipoQuestaoService,
    public questoesService: QuestaoService
  ) {}

  ngOnInit(): void {
    this.construirForm();

    this.getSenioridades();

    this.getTipoQuestoes();
  }

  getSenioridades() {
    this.senioridadeService.getSenioridades().subscribe((resposta) => {
      this.senioridades = resposta;
    });
  }

  getTipoQuestoes() {
    this.tipoQuestaoService.getTipoQuestoes().subscribe((resposta) => {
      this.tipoQuestoes = resposta;
    });
  }

  exibirDialogVisualisar(questaoSelecionada: Questao) {
    this.exibir = true;
    this.hader = 'Visualizar Questão';
    this.isQuestaoEditando = true;
    this.isQuestaoVisualizando = true;

    this.preencherCamposDoForm(questaoSelecionada);
  }

  exibirDialogEditar(questaoSelecionada: Questao) {
    this.exibir = true;
    this.hader = 'Editar Questão';
    this.isQuestaoEditando = true;
    this.isQuestaoVisualizando = false;
    this.preencherCamposDoForm(questaoSelecionada);
  }

  exibirDialogCadastro() {
    this.exibir = true;
    this.hader = 'Cadastrar Questão';
    this.isQuestaoEditando = false;
    this.isQuestaoVisualizando = false;
    this.formQuestao.reset();
  }

  persistir() {
    let questaoDTO: QuestaoDTO = this.getQuestaoForm();
    if (questaoDTO.id === null) {
      this.cadastar(questaoDTO);
    } else {
      this.atualizar(questaoDTO);
    }
  }

  atualizar(questao: QuestaoDTO) {
    this.questoesService.update(questao).subscribe(
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

  cadastar(questao: QuestaoDTO) {
    // this.questoesService.create(questao).subscribe(
    //   (response) => {
    //     this.alertService.montarAlerta(
    //            'success',
    //            'Sucesso',
    //            'Questão ' + response.id +' cadastrada com Sucesso'
    //     );
    //   },
    //   (error) => {
    //     this.alertService.montarAlerta(
    //       'error',
    //       'Sucesso',
    //       'Erro ao cadastrar questão' + error.defaultMessage
    //     );
    //   },
    //   () => {
    //     this.exibir = false
    //   }
    // )
  }

  cancelar() {
    this.exibir = false;
  }

  preencherCamposDoForm(questao: Questao) {
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

  construirForm() {
    this.formQuestao = this.formBuilder.group({
      id: [null],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(800),
        ],
      ],
      senioridade: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      tipoQuestao: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      alternativa1: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      alternativa2: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      alternativa3: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      alternativa4: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      alternativa5: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      resposta: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  getControlLabel(type: string) {
    return this.formQuestao.get(type).value;
  }

  getQuestaoForm(): QuestaoDTO {
    let questaoDTO: QuestaoDTO = new QuestaoDTO();
    questaoDTO.id = this.formQuestao.value.id;
    questaoDTO.descricao = this.formQuestao.value.descricao;
    questaoDTO.alternativa1 = this.formQuestao.value.alternativa1;
    questaoDTO.alternativa2 = this.formQuestao.value.alternativa2;
    questaoDTO.alternativa3 = this.formQuestao.value.alternativa3;
    questaoDTO.alternativa4 = this.formQuestao.value.alternativa4;
    questaoDTO.alternativa5 = this.formQuestao.value.alternativa5;
    questaoDTO.resposta = this.formQuestao.value.resposta;
    questaoDTO.idSenioridade = this.formQuestao.value.senioridade.value;
    questaoDTO.idTipoQuestao = this.formQuestao.value.tipoQuestao.value;
    return questaoDTO;
  }

  buscarPorId(id: number): void {
    this.questoesService.show(id.toString()).subscribe(
      (response) => {
        // this.questaoDTO = response;
      },
      (error) => {
        this.alertService.montarAlerta(
          'error',
          'Erro',
          'Erro ao Excluir questão'
        );
      }
    );
  }
}
