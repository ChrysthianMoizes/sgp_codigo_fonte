import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {AlertService} from '../../../../components/alert/alert.service';
import {LoadingService} from '../../../../components/loading/loading.service';
import {Prova} from '../../../prova/models/prova.model';
import {ProvaService} from '../../../prova/service/prova.service';
import {Usuario} from '../../../usuario/models/usuario';
import {UsuarioService} from '../../../usuario/service/usuario.service';
import {Avaliacao} from '../../models/avaliacao';
import {AvaliacaoService} from '../../service/avaliacao.service';

@Component({
  selector: 'app-cadastrar-avaliacao',
  templateUrl: './cadastrar-avaliacao.component.html',
  styleUrls: ['./cadastrar-avaliacao.component.css']
})
export class CadastrarAvaliacaoComponent implements OnInit {

  @Input() avaliacaoSendoEditada: any;
  @Input() viewOnly = false;
  avaliacaoForm: FormGroup;
  usuariosFiltrados: Usuario[];
  provasFiltradas: Prova[];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private provaService: ProvaService,
    private avaliacaoService: AvaliacaoService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.avaliacaoForm = this.formBuilder.group({
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
    this.avaliacaoService.create(avaliacao).subscribe(
      () => {
        this.alertService.montarAlerta('success', 'Sucesso!', 'Prova cadastrada com sucesso!');
        this.avaliacaoForm.reset();
      },
      err => {
        this.alertService.montarAlerta('error', 'Error!', 'Confira seus dados e tente novamente.');
      }
    ).add(() => this.loadingService.deactivate());
  }

  atualizarAvaliacao(avaliacao: Avaliacao): void {
    this.avaliacaoService.update(avaliacao).subscribe(
      () => {
        this.alertService.montarAlerta('success', 'Sucesso!', 'Prova atualizada com sucesso!');
        this.avaliacaoForm.reset();
      },
      err => {
        this.alertService.montarAlerta('error', 'Error!', 'Confira seus dados e tente novamente.');
      }
    ).add(() => this.loadingService.deactivate());
  }

  onSubmit(): void {
    this.loadingService.activate();
    if (!this.avaliacaoSendoEditada) {
      this.cadastrarNovaAvaliacao(this.avaliacaoForm.value);
    } else {
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
    return `${this.avaliacaoSendoEditada ? 'Editar' : 'Cadastrar'} avaliação`;
  }


}

