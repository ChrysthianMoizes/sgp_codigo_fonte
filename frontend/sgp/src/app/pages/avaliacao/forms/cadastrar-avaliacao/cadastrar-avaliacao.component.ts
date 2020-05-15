import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prova } from 'src/app/pages/prova/models/prova';
import { AlertService } from '../../../../components/alert/alert.service';
import { LoadingService } from '../../../../components/loading/loading.service';
import { ProvaService } from '../../../prova/service/prova.service';
import { Usuario } from '../../../usuario/models/usuario';
import { UsuarioService } from '../../../usuario/service/usuario.service';
import { AvaliacaoService } from '../../service/avaliacao.service';
import { Avaliacao } from './../../models/avaliacao';
import { catchError, finalize } from 'rxjs/operators';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-cadastrar-avaliacao',
  templateUrl: './cadastrar-avaliacao.component.html',
  styleUrls: ['./cadastrar-avaliacao.component.css'],
})
export class CadastrarAvaliacaoComponent implements OnInit, OnChanges {
  @Input() avaliacaoSendoEditada: Avaliacao;
  @Input() viewOnly = false;

  avaliacao: Avaliacao = new Avaliacao();
  avaliacaoForm: FormGroup;
  candidatosFiltrados: SelectItem[];
  provasFiltradas: SelectItem[];

  exibir: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private provaService: ProvaService,
    private avaliacaoService: AvaliacaoService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnChanges(): void {
    if (this.avaliacaoSendoEditada) {
      this.avaliacaoForm
        .get('usuario')
        .setValue(this.avaliacaoSendoEditada.idCandidato);
      this.avaliacaoForm
        .get('prova')
        .setValue(this.avaliacaoSendoEditada.idProva);
    }

    if (this.viewOnly) {
      this.avaliacaoForm.disable();
    }
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarFiltroCandidato();
    this.carregarFiltroProva();

    if (this.viewOnly) {
      this.avaliacaoForm.disable();
    }
  }

  iniciarForm() {
    this.avaliacaoForm = this.formBuilder.group({
      usuario: [null, Validators.required],
      prova: [null, Validators.required],
    });
  }

  carregarFiltroCandidato() {

  }

  carregarFiltroProva() {

  }

  validarForm() {
    if (this.avaliacaoForm.invalid) {
      this.alertService.montarAlerta('error', 'Erro', 'Preenchimento obrigatório dos campos: Candidato, Prova, Data da Avaliação');
      return;
    }

    if (!this.avaliacao.id) {
      this.cadastrarNovaAvaliacao();
    }
    else {
      this.atualizarAvaliacao();
    }
  }

  abrirDialog(): void {
    this.exibir = true;
  }

  fecharDialog(): void {
    this.exibir = false;
  }

  cadastrarNovaAvaliacao(): void {
    this.avaliacaoService
      .create(this.avaliacao)
      .subscribe(
        () => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso!',
            'Prova cadastrada com sucesso!'
          );
          this.avaliacaoForm.reset();
          this.fecharDialog();
        },
        (err) => {
          this.alertService.montarAlerta(
            'error',
            'Error!',
            'Confira seus dados e tente novamente.'
          );
        }
      )
      .add(() => this.loadingService.deactivate());
  }

  atualizarAvaliacao(): void {
    this.avaliacaoService
      .update(this.avaliacao)
      .subscribe(
        () => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso!',
            'Prova atualizada com sucesso!'
          );
          this.avaliacaoForm.reset();
          this.fecharDialog();
        },
        (err) => {
          this.alertService.montarAlerta(
            'error',
            'Error!',
            'Confira seus dados e tente novamente.'
          );
        }
      )
      .add(() => this.loadingService.deactivate());
  }

  onCancel(): void {
    this.fecharDialog();
  }

  updateUsuariosFiltrados(event): void {
    // this.usuarioService
    //   .findByNome(event.query)
    //   .subscribe((usuarios) => (this.usuariosFiltrados = usuarios));
  }

  updateProvasFiltradas(event): void {
    this.provaService
      .findByTitulo(event.query)
      .subscribe((provas) => (this.provasFiltradas = provas));
  }

  get isFormValid(): boolean {
    return (
      this.avaliacaoForm.valid &&
      this.candidatoSelecionado !== null &&
      this.provaSelecionada !== null
    );
  }

  get candidatoSelecionado(): Usuario {
    const candidato = this.avaliacaoForm.get('usuario').value;
    if (typeof candidato === 'object') {
      return candidato;
    }
    return null;
  }

  get provaSelecionada(): Prova {
    const prova = this.avaliacaoForm.get('prova').value;
    if (typeof prova === 'object') {
      return prova;
    }
    return null;
  }

  get titulo(): string {
    return `${this.avaliacaoSendoEditada ? 'Editar' : 'Cadastrar'} avaliação`;
  }
}
