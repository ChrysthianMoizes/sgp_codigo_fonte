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
  @Output() alterar = new EventEmitter();

  exibir: boolean = false;
  header: string = '';

  senioridades: SelectItem[];
  tipoQuestoes: SelectItem[];

  questao: QuestaoDTO = new QuestaoDTO();

  isQuestaoVisualizando: boolean = false;

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

  exibirDialog(id: number, visualisar: boolean) {
    this.isQuestaoVisualizando = visualisar;

    this.header = id ? 'Editar Questão' : 'Cadastrar Questão';

    if (id) {
      this.buscarPorId(id);
    } else {
      this.questao = new QuestaoDTO();
      this.formQuestao.reset();
    }
    this.exibir = true;
  }

  persistir() {
    if (this.questao.id === null) {
      this.cadastar(this.questao);
    } else {
      this.atualizar(this.questao);
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
    this.questoesService.create(questao).subscribe(
      (response) => {
        this.alertService.montarAlerta(
          'success',
          'Sucesso',
          'Questão ' + response.id + ' cadastrada com Sucesso'
        );
      },
      (error) => {
        this.alertService.montarAlerta(
          'error',
          'Sucesso',
          'Erro ao cadastrar questão' + error.defaultMessage
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

  buscarPorId(id: number): void {
    this.questoesService.show(id).subscribe(
      (response) => {
        this.questao = response;
        this.exibir = true;
      },
      (error) => {
        this.alertService.montarAlerta(
          'error',
          'Erro',
          'Erro ao buscar a questão de código ' + id
        );
      }
    );
  }
}
