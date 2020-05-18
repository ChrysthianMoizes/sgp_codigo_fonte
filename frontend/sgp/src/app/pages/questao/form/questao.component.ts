import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {SelectItem} from 'primeng';
import {AlertService} from 'src/app/components/alert/alert.service';
import {QuestaoDTO} from '../models/questao.dto';
import {QuestaoService} from '../service/questao.service';
import {SenioridadeService} from '../service/senioridade.service';
import {TipoQuestaoService} from '../service/tipo-questao.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css'],
})
export class QuestaoComponent implements OnInit {

  @Output() alterar = new EventEmitter();

  public exibir: boolean;
  public header: string;
  public isVisualizando: boolean;
  public questao: QuestaoDTO;
  public formQuestao: FormGroup;
  public senioridades: SelectItem[];
  public tiposQuestao: SelectItem[];

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private senioridadeService: SenioridadeService,
    private tipoQuestaoService: TipoQuestaoService,
    public questaoService: QuestaoService
  ) {
  }

  ngOnInit(): void {
    this.exibir = false;
    this.header = '';
    this.questao = new QuestaoDTO();
    this.isVisualizando = false;
    this.construirForm();
    this.getSenioridades();
    this.getTiposQuestao();
  }

  getSenioridades() {
    this.senioridadeService.index().subscribe(
      (resposta) => {
        this.senioridades = resposta;
      }
    );
  }

  getTiposQuestao() {
    this.tipoQuestaoService.index().subscribe(
      (resposta) => {
        this.tiposQuestao = resposta;
      }
    );
  }


  definirCabecalho(edicao: boolean, id: number) {
    if (Boolean(id)) {
      if (edicao) {
        this.header = 'Editar Questão';
      } else {
        this.header = 'Visualizar Questão';
      }
    } else {
      this.header = 'Cadastrar Questão';
    }
  }

  openDialog(edicao: boolean, id: number) {
    this.definirCabecalho(edicao, id);

    this.isVisualizando = !edicao;

    if (id) {
      this.buscarPorId(id);
    } else {
      this.questao = new QuestaoDTO();
      this.formQuestao.reset();
    }
    this.exibir = true;
  }

  salvar() {
    if(!Boolean(this.questao.id)) {
      this.cadastar(this.questao);
    } else {
      this.editar(this.questao);
    }
  }

  editar(questao: QuestaoDTO) {
    this.questaoService.update(questao).subscribe(
      (response) => {
        this.alertService.montarAlerta('success', 'Sucesso', `Questão ${response.id} editada com Sucesso`);
      },
      (error) => {
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao editar questão' + error.defaultMessage);
      },
      () => {
        this.exibir = false;
      }
    );
  }

  cadastar(questao: QuestaoDTO) {
    this.questaoService.create(questao).subscribe(
      (response) => {
        this.alertService.montarAlerta('success', 'Sucesso', `Questão ${response.id} cadastrada com Sucesso`);
      },
      (error) => {
        this.alertService.montarAlerta('error', 'Sucesso', 'Erro ao cadastrar questão' + error.defaultMessage);
      },
      () => {
        this.exibir = false;
      }
    );
  }

  cancelar() {
    this.exibir = false;
    this.questao = null;

  }

  construirForm() {
    this.formQuestao = this.formBuilder.group({
      id: [null],
      descricao: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(400),
        ],
      ],
      senioridade: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      tipoQuestao: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      alternativa1: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
      alternativa2: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
      alternativa3: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
      alternativa4: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
      alternativa5: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
      resposta: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }


  buscarPorId(id: number): void {
    this.questaoService.show(id).subscribe(
      (response) => {
        this.questao = response;
      },
      () => {
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao buscar a questão de código ' + id);
      }
    );
  }


}

