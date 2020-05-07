import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Prova } from 'src/app/models/prova.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProvaService } from 'src/app/services/prova.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { AlertService } from '../alert/alert.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-cadastrar-avaliacao',
  templateUrl: './cadastrar-avaliacao.component.html',
  styleUrls: ['./cadastrar-avaliacao.component.css']
})
export class CadastrarAvaliacaoComponent implements OnInit {

  @Input() avaliacaoSendoEditada: Avaliacao;
  @Input() viewOnly = false;
  avaliacaoForm: FormGroup;
  usuariosFiltrados: Usuario[];
  provasFiltradas: Prova[];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private provaService: ProvaService,
    private avaliacaoService: AvaliacaoService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.avaliacaoForm = this.fb.group({
      usuario: ['', Validators.required],
      prova: ['', Validators.required]
    });

    if (this.avaliacaoSendoEditada) {
      this.avaliacaoForm.get('usuario').setValue(this.avaliacaoSendoEditada.usuario);
      this.avaliacaoForm.get('prova').setValue(this.avaliacaoSendoEditada.prova);
    }

    if (this.viewOnly) {
      this.avaliacaoForm.disable();
    }

  }

  cadastrarNovaAvaliacao(avaliacao: Avaliacao): void {
    this.avaliacaoService.create(avaliacao).subscribe({
      next: avaliacao => {
        this.alertService.montarAlerta('success', 'Sucesso!', 'Prova cadastrada com sucesso!');
        this.avaliacaoForm.reset();
      },
      error: err => {
        this.alertService.montarAlerta('error', 'Error!', 'Confira seus dados e tente novamente.');
      }
    }).add(() => this.loadingService.deactivate());
  }

  atualizarAvaliacao(avaliacao: Avaliacao): void {
    this.avaliacaoService.update(avaliacao).subscribe({
      next: avaliacao => {
        this.alertService.montarAlerta('success', 'Sucesso!', 'Prova atualizada com sucesso!');
        this.avaliacaoForm.reset();
      },
      error: err => {
        this.alertService.montarAlerta('error', 'Error!', 'Confira seus dados e tente novamente.');
      }
    }).add(() => this.loadingService.deactivate());
  }

  onSubmit(): void {
    this.loadingService.activate();
    if (!this.avaliacaoSendoEditada) {
      this.cadastrarNovaAvaliacao(this.avaliacaoForm.value);
    }
    else {
      this.atualizarAvaliacao({
        ...this.avaliacaoForm.value,
        id: this.avaliacaoSendoEditada.id
      });
    }
  }

  onCancel(): void {
    this.avaliacaoForm.reset();
  }

  updateUsuariosFiltrados(event): void {
    this.usuarioService.findByNome(event.query)
      .subscribe(usuarios => this.usuariosFiltrados = usuarios);
  }

  updateProvasFiltradas(event): void {
    this.provaService.findByTitulo(event.query)
      .subscribe(provas => this.provasFiltradas = provas);
  }

  get isFormValid(): boolean {
    return this.avaliacaoForm.valid
      && this.candidatoSelecionado !== null
      && this.provaSelecionada !== null;
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
    return `${this.avaliacaoSendoEditada ? 'Editar' : 'Cadastrar'} avaliação`
  }

}
