import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../components/alert/alert.service';
import {LoadingService} from '../../components/loading/loading.service';
import {Questao} from '../questao/models/questao';
import {QuestaoService} from '../questao/service/questao.service';
import {Prova} from './models/prova.model';
import {ProvaService} from './service/prova.service';

@Component({
  selector: 'app-cadastrar-prova',
  templateUrl: './cadastrar-prova.component.html',
  styleUrls: ['./cadastrar-prova.component.css'],
})
export class CadastrarProvaComponent implements OnInit {
  @Input() provaSendoEditada: Prova;
  provaForm: FormGroup;
  visualizando;
  edicao;
  modoDialog: number;

  @Output() retornarProva = new EventEmitter();

  origemQuestoes: Questao[];
  destinoQuestoes: Questao[];
  totalDeQuestoes = 0;

  exibir = false;

  constructor(
    private formBuilder: FormBuilder,
    private provaService: ProvaService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private questaoService: QuestaoService
  ) {
  }


  get titulo(): string {
    if (this.visualizando) {
      return 'Visualizar Prova';
    } else if (this.edicao) {
      return 'Editar Prova';
    } else {
      return 'Cadastrar Prova';
    }
  }

  get inputSize(): number {
    const inputTitulo = this.provaForm.get('titulo').value;
    return inputTitulo ? inputTitulo.length : 20;
  }

  get isFormValid(): boolean {
    const percentualDeAprovacao = +this.provaForm.get('percentualDeAprovacao')
      .value;

    return (
      this.provaForm.valid &&
      this.destinoQuestoes.length > 0 &&
      percentualDeAprovacao <= 100 &&
      percentualDeAprovacao >= 0
    );
  }

  ngOnInit() {
    this.questaoService.index().subscribe((questoes) => {
      this.origemQuestoes = questoes;
      this.destinoQuestoes = [];
    });
    this.questaoService
      .getNumberOfElements()
      .subscribe((total) => (this.totalDeQuestoes = total));
    this.provaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      percentualDeAprovacao: ['', Validators.required],
    });
  }

  preencherFormParaEdicao(): void {
    this.provaForm.get('titulo').setValue(this.provaSendoEditada.titulo);
    this.provaForm
      .get('percentualDeAprovacao')
      .setValue(this.provaSendoEditada.percentualAprovacao);
    this.questaoService.index().subscribe((questoes) => {
      this.destinoQuestoes = questoes;
    });
  }

  abrirDialog(id, modo) {
    if (modo === 1) {
      this.edicao = false;
      this.visualizando = false;
      this.exibir = true;
      // novo
    } else if (modo === 2) {
      this.edicao = true;
      this.visualizando = false;
      this.exibir = true;
      this.provaSendoEditada = this.provaService.buscaProva();
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      // ediçao
    } else {
      console.log(this.visualizando);
      this.visualizando = true;
      this.edicao = false;
      this.exibir = true;
      this.provaSendoEditada = this.provaService.buscaProva();
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      this.provaForm.get('titulo').disable();
      this.provaForm.get('percentualDeAprovacao').disable();
      //visualizar
    }
    if (this.modoDialog > 1) {
      this.provaSendoEditada = this.provaService.buscaProva();
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      if (this.modoDialog === 3) {
        this.provaForm.get('titulo').disable();
        this.provaForm.get('percentualDeAprovacao').disable();
      }
    } else {
      console.log('Cadastrar nova prova.');
    }
  }

  cadastrarNovo(prova: Prova): void {
    this.provaService.create(prova).subscribe(
      () => {
        this.loadingService.deactivate();
        this.provaForm.reset();
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova cadastrada com suscesso!'
        );
      },
      (err) => {
        this.alertService.montarAlerta('error', 'Error!', err);
      },
    );
  }

  atualizarProva(prova: Prova): void {
    this.provaService.update(prova).subscribe(
      () => {
        this.loadingService.deactivate();
        this.provaForm.reset();
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova atualizada com suscesso!'
        );
      },
      (err) => {
        this.alertService.montarAlerta('error', 'Error!', err);
      }
    );
  }

  onSubmit(): void {
    this.loadingService.activate();
    if (!this.provaSendoEditada) {
      this.cadastrarNovo({
        ...this.provaForm.value,
        questoes: this.destinoQuestoes,
      });
    } else {
      this.atualizarProva({
        ...this.provaForm.value,
        questoes: this.destinoQuestoes,
        id: this.provaSendoEditada.id,
      });
    }
    this.onCancel();
    // servico.salvar(prova);
    this.retornarProva.emit(null);
    this.exibir = false;
  }

  paginate(event) {
    this.questaoService
      .index(event.page)
      .subscribe((questoes) => (this.origemQuestoes = questoes));
  }

  removeRepetitions(arr: any[]) {
    return arr.filter((questao, i) => arr.indexOf(questao) === i);
  }

  onMoveToTarget(event): void {
    this.destinoQuestoes = this.removeRepetitions(this.destinoQuestoes);
  }

  onCancel(): void {
    this.provaSendoEditada = undefined;
    this.exibir = false;
  }

}
