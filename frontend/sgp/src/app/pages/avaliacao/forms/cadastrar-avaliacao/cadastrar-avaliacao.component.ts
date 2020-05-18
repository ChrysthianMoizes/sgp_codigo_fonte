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
    this.iniciarTitulo();
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
      aproveitamento: [null, Validators.required],
      data: [null, Validators.required]
    });
  }

  iniciarTitulo(): void {
    this.titulo = this.avaliacaoSendoEditada ? 'Editar' : 'Cadastrar'
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

  abrirDialog(): void {
    this.exibir = true;
  }

  fecharDialog(): void {
    this.exibir = false;
  }

  cadastrarNovaAvaliacao(): void {
    console.log(this.avaliacao)
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
          this.avaliacaoForm.reset();
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
        console.log(response)
        this.candidatosFiltrados = response;
      })
  }

  updateProvasFiltradas(event): void {
    this.provaService.findByTitulo(event.query)
      .pipe(catchError(error => {
        this.alertService.montarAlerta('error', 'Erro', error.message);
        return error;
      }))
      .subscribe((provas) => (this.provasFiltradas = provas));
  }
}
