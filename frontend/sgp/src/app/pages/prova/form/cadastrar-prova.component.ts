import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { Questao } from '../../questao/models/questao';
import { QuestaoService } from '../../questao/service/questao.service';
import { Prova } from '../models/prova';
import { ProvaService } from '../service/prova.service';

@Component({
  selector: 'app-cadastrar-prova',
  templateUrl: './cadastrar-prova.component.html',
  styleUrls: ['./cadastrar-prova.component.css'],
})
export class CadastrarProvaComponent implements OnInit {
  @Input() provaSendoEditada: Prova;
  provaForm: FormGroup;
  visualizando: boolean;
  edicao: boolean;
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
  ) { }

  getTitulo(): string {
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

  ngOnInit() { }

  preencherFormParaEdicao(): void { }

  abrirDialog(modo): void {
    if (modo === 1) {
      this.edicao = false;
      this.visualizando = false;
      this.exibir = true;
      // novo
    } else if (modo === 2) {
      this.edicao = true;
      this.visualizando = false;
      this.exibir = true;
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      this.provaForm.get('titulo').enable();
      this.provaForm.get('percentualDeAprovacao').enable();
      // ediçao
    } else {
      this.visualizando = true;
      this.edicao = false;
      this.exibir = true;
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      this.provaForm.get('titulo').disable();
      this.provaForm.get('percentualDeAprovacao').disable();
      //visualizar
    }
    if (this.modoDialog > 1) {
      this.provaService.buscaProva().subscribe((prova) => {
        this.provaSendoEditada = prova;
      });
      this.preencherFormParaEdicao();
      if (this.modoDialog === 3) {
        this.provaForm.get('titulo').disable();
        this.provaForm.get('percentualDeAprovacao').disable();
      }
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
      }
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

    this.retornarProva.emit(null);
    this.exibir = false;
  }

  paginate(event): void { }

  removeRepetitions(arr: any[]): Array<Questao> {
    return arr.filter((questao, i) => arr.indexOf(questao) === i);
  }

  onMoveToTarget(): void {
    this.destinoQuestoes = this.removeRepetitions(this.destinoQuestoes);
  }

  onCancel(): void {
    this.provaSendoEditada = undefined;
    this.exibir = false;
  }
}
