import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvaService } from 'src/app/services/prova.service';
import { Questao } from 'src/app/models/questao.model';
import { AlertService } from '../alert/alert.service';
import { RequisicaoLoadingService } from '../loading/requisicao-loading.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-cadastrar-prova',
  templateUrl: './cadastrar-prova.component.html',
  styleUrls: ['./cadastrar-prova.component.css']
})
export class CadastrarProvaComponent implements OnInit {

  @Input() isEditando = false;
  provaForm: FormGroup;

  origemQuestoes: Questao[];
  destinoQuestoes: Questao[];
  totalDeQuestoes = 0;
  defaultRowSize = 6;

  constructor(
    private fb: FormBuilder,
    private provaService: ProvaService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.provaService.index().subscribe(questoes => {
      this.origemQuestoes = questoes;
      this.destinoQuestoes = [];
    });
    this.provaService.getNumberOfElements().subscribe(total => this.totalDeQuestoes = total);

    this.provaForm = this.fb.group({
      titulo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.loadingService.activate();
    this.provaService.create({
      ...this.provaForm.value,
      questoes: this.destinoQuestoes
    })
    .subscribe({
      next: () => {
        this.loadingService.deactivate();
        this.alertService.montarAlerta(
          'success', 'Sucesso!', 'Prova cadastrada com suscesso!'
        );
      },
      error: err => {
        this.alertService.montarAlerta(
          'error', 'Error!', err
        );
      }
    });
    this.onCancel();
  }

  paginate(event) {
    this.provaService.index(event.page)
      .subscribe(questoes => this.origemQuestoes = questoes);
  }

  removeRepetitions(arr: any[]) {
    return arr.filter(
      (questao, i) => arr.indexOf(questao) === i
    );
  }

  onMoveToTarget(event): void {
    this.destinoQuestoes = this.removeRepetitions(this.destinoQuestoes);
  }

  onCancel(): void {
    this.ngOnInit();
  }

  get titulo(): string {
    return this.isEditando ? "Editar Prova" : "Cadastrar Prova";
  }

  get inputSize(): number {
    const inputTitulo = this.provaForm.get('titulo').value;
    return (inputTitulo) ? inputTitulo.length : 20;
  }

  get isFormValid(): boolean {
    return this.provaForm.valid
      && this.destinoQuestoes.length > 0;
  }

}
