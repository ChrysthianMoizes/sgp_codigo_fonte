import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit, OnChanges {
  @Input() usuario = new Usuario();
  @Input() apenasVisualizar = false;
  @Output() salvar = new EventEmitter();
  @Output() cancelar = new EventEmitter();
  formulario: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  ngOnChanges(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      token: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });

    if (this.usuario.id) {
      this.formulario.controls['senha'].setValidators([]);
      this.formulario.controls['token'].setValidators([]);
      this.formulario.controls['cpf'].setValidators([]);
    }
  }

  formParaEdicao(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: new FormControl({ value: '', disabled: true }),
      token: new FormControl({ value: '', disabled: true }),
      email: ['', Validators.required],
      senha: [''],
    });
  }

  formParaCadastro(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      token: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  formParaVisualizacao(): FormGroup {
    return this.formBuilder.group({
      nome: new FormControl({ value: '', disabled: true }),
      cpf: new FormControl({ value: '', disabled: true }),
      token: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      senha: new FormControl({ value: '', disabled: true }),
    });
  }

  validarFormulario(): void {
    console.log(this.usuario);
    this.formulario.valid &&
      this[this.usuario.id ? 'editar' : 'cadastrar'](this.usuario);
  }

  editar(usuario: Usuario): void {
    this.loadingService.activate();
    this.usuarioService
      .update(usuario)
      .subscribe({
        next: () => this.salvar.emit(usuario),
        error: (err) => this.tratarError(err),
      })
      .add(() => this.loadingService.deactivate());
  }

  cadastrar(usuario: Usuario): void {
    this.loadingService.activate();
    this.usuarioService
      .create(usuario)
      .subscribe({
        next: () => {
          this.authService.login(usuario).subscribe({
            next: (reposta: Usuario) => {
              this.authService.setUsuario(reposta);
              this.router.navigateByUrl('home');
            },
            error: (error) => this.tratarError(error),
          });
        },
        error: (error) => this.tratarError(error),
      })
      .add(() => this.loadingService.deactivate());
  }

  tratarError(error): void {
    if (error.error.errors) {
      error.error.errors.forEach((err) =>
        this.alertService.montarAlerta('error', 'Erro', err.defaultMessage)
      );
    } else {
      this.alertService.montarAlerta('error', 'Erro', error.error.message);
    }
  }

  onCancelar(): void {
    this.usuario.id ? this.cancelar.emit() : this.router.navigateByUrl('login');

    this.apenasVisualizar = false;
    this.usuario = new Usuario();
    this.formulario.reset();
  }
}
