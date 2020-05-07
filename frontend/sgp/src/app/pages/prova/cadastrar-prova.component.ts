import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Prova} from 'src/app/pages/prova/models/prova.model';
import {AlertService} from '../../components/alert/alert.service';
import {LoadingService} from '../../components/loading/loading.service';
import {Questao} from '../questao/models/questao';
import {QuestaoService} from '../questao/service/questao.service';
import {ProvaService} from './service/prova.service';

@Component({
  selector: 'app-cadastrar-prova',
  templateUrl: './cadastrar-prova.component.html',
  styleUrls: ['./cadastrar-prova.component.css'],
})
export class CadastrarProvaComponent implements OnInit {
  @Input() provaSendoEditada;
  provaForm: FormGroup;
  visualizando = true;

  origemQuestoes: Questao[];
  destinoQuestoes: Questao[];
  totalDeQuestoes = 0;

  constructor(
    private fb: FormBuilder,
    private provaService: ProvaService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private questaoService: QuestaoService
  ) {
  }

  get titulo(): string {
    return this.provaSendoEditada ? 'Editar Prova' : 'Cadastrar Prova';
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
    this.provaForm = this.fb.group({
      titulo: ['', Validators.required],
      percentualDeAprovacao: ['', Validators.required],
    });

    if (this.provaSendoEditada) {
      this.preencherFormParaEdicao();
    }
  }

  preencherFormParaEdicao(): void {
    this.provaForm.get('titulo').setValue(this.provaSendoEditada.titulo);
    this.provaForm
      .get('percentualDeAprovacao')
      .setValue(this.provaSendoEditada.percentualDeAprovacao);
    this.destinoQuestoes = this.provaSendoEditada.questoes;
  }

  cadastrarNovo(prova: Prova): void {
    this.provaService.create(prova).subscribe({
      next: () => {
        this.loadingService.deactivate();
        this.provaForm.reset();
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova cadastrada com suscesso!'
        );
      },
      error: (err) => {
        this.alertService.montarAlerta('error', 'Error!', err);
      },
    });
  }

  atualizarProva(prova: Prova): void {
    this.provaService.update(prova).subscribe({
      next: () => {
        this.loadingService.deactivate();
        this.provaForm.reset();
        this.alertService.montarAlerta(
          'success',
          'Sucesso!',
          'Prova atualizada com suscesso!'
        );
      },
      error: (err) => {
        this.alertService.montarAlerta('error', 'Error!', err);
      },
    });
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
    this.ngOnInit();
  }
}
