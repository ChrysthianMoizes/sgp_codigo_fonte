import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../components/alert/alert.service';
import { LoadingService } from '../../../../components/loading/loading.service';
import { ProvaService } from '../../../prova/service/prova.service';
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

  @Input() viewOnly = false;
  @Output() avaliacaoAtualizada = new EventEmitter();

  avaliacaoForm: FormGroup;
  avaliacao: Avaliacao = new Avaliacao();
  candidatosFiltrados: SelectItem[];
  provasFiltradas: SelectItem[];
  titulo: string;
  candidato: SelectItem;
  prova: SelectItem;

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

  carregarAutoComplete() {
    if (this.avaliacao.id) {
      this.candidato = this.candidatosFiltrados.find(element => element.value === this.avaliacao.idCandidato)
      this.prova = this.provasFiltradas.find(element => element.value === this.avaliacao.idProva)
    }
  }

  iniciarForm() {
    this.avaliacaoForm = this.formBuilder.group({
      usuario: [null, Validators.required],
      prova: [null, Validators.required],
      data: [null, Validators.required]
    });
  }

  iniciarTitulo(): void {
    this.titulo = this.avaliacao.id ? 'Editar' : 'Cadastrar'
  }

  carregarFiltroCandidato(): void {
    this.usuarioService.listarCandidatosDropdown().pipe(
      catchError(error => {
        this.alertService.montarAlerta("error", 'Erro', error.message);
        return error;
      })
    ).subscribe(
      response => {
        this.candidatosFiltrados = response;
      }
    )
  }

  carregarFiltroProva(): void {
    this.provaService.listarProvasDropdown().pipe(
      catchError(error => {
        this.alertService.montarAlerta('error', 'Erro', error.message)
        return error;
      })
    )
      .subscribe(response => {
        this.provasFiltradas = response;
      })
  }

  validarForm() {
    if (this.avaliacaoForm.invalid) {
      this.alertService.montarAlerta('error', 'Erro', 'Preenchimento obrigatório dos campos: Candidato, Prova, Data da Avaliação');
      return;
    }

    this.avaliacao.idCandidato = this.candidato.value;
    this.avaliacao.idProva = this.prova.value;

    if (!this.avaliacao.id) {
      this.cadastrarNovaAvaliacao();
    }
    else {
      this.atualizarAvaliacao();
    }
  }

  buscarAvaliacao(id: number) {
    if (id) {
      this.avaliacaoService.show(id)
        .subscribe(response => {
          this.avaliacao = response;
          this.carregarAutoComplete();
        },
          erro => {
            this.alertService.montarAlerta('error', 'Erro', erro.message)
          })
    } else {
      this.avaliacao = new Avaliacao();
    }
    this.iniciarDialog();
  }

  iniciarDialog() {
    this.carregarAutoComplete();
    this.iniciarTitulo();
    this.exibir = true;
  }

  abrirDialog(id: number): void {
    this.buscarAvaliacao(id);
  }

  fecharDialog(): void {
    this.avaliacaoAtualizada.emit();
    this.candidato = null;
    this.prova = null;
    this.viewOnly = false;
    this.exibir = false;
  }

  cadastrarNovaAvaliacao(): void {
    this.avaliacaoService
      .create(this.avaliacao)
      .pipe(
        catchError(error => {
          this.alertService.montarAlerta('error', 'Erro', error.message);
          return error;
        })
      )
      .subscribe(
        () => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso!',
            'Prova cadastrada com sucesso!'
          );
          this.avaliacao = new Avaliacao();
          this.fecharDialog();
        }
      )
      .add(() => this.loadingService.deactivate());
  }

  atualizarAvaliacao(): void {
    this.avaliacaoService
      .update(this.avaliacao)
      .pipe(
        catchError(error => {
          this.alertService.montarAlerta('error', 'Erro', error.message);
          return error;
        })
      )
      .subscribe(
        () => {
          this.alertService.montarAlerta(
            'success',
            'Sucesso!',
            'Prova atualizada com sucesso!'
          );
          this.avaliacaoForm.reset();
          this.fecharDialog();
        }
      )
      .add(() => this.loadingService.deactivate());
  }

  onCancel(): void {
    this.fecharDialog();
  }

  updateUsuariosFiltrados(event): void {
    this.usuarioService.findByNome(event.query)
      .pipe(catchError(error => {
        this.alertService.montarAlerta('error', 'Erro', 'Erro ao filtrar nome de candidato');
        return error;
      })
      )
      .subscribe(response => {
        this.candidatosFiltrados = response;
      })
  }

  updateProvasFiltradas(event): void {
    this.provaService.findByTituloFiltro(event.query)
      .pipe(catchError(error => {
        this.alertService.montarAlerta('error', 'Erro', error.message);
        return error;
      }))
      .subscribe((provas) => (this.provasFiltradas = provas));
  }
}
