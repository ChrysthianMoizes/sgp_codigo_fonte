import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class CadastroComponent implements OnInit {
  
  @Input() usuario = new Usuario();
  @Input() apenasVisualizar = false;
  @Output() salvar = new EventEmitter();
  formulario: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  
  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      token: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

    if (this.apenasVisualizar) {
      this.formulario.disable();
    }
  }

  validarFormulario(): void {
    this.formulario.valid &&
      this[this.usuario.id ? 'editar' : 'cadastrar'](this.usuario);
  }

  editar(usuario: Usuario): void {
    this.loadingService.activate();
    this.usuarioService.update(usuario).subscribe({
      next: () => {
        this.alertService.montarAlerta('success', 'Sucesso', 'Usuário editado com sucesso!');
        this.salvar.emit();
      },
      error: err => this.tratarError(err)
    });
  }

  cadastrar(usuario: Usuario): void {
    this.loadingService.activate();
    this.usuarioService.create(usuario).subscribe({
      next: () => {
        this.authService.login(usuario).subscribe({
          next: () => {
            this.authService.setUsuario(usuario);
            this.router.navigateByUrl('home');
          },
          error: error => this.tratarError(error)
        });
      },
      error: error => this.tratarError(error)
    })
    .add(() => this.loadingService.deactivate());
  }

  tratarError(error): void {
    if (error.error.errors) {
      error.error.errors
        .forEach(err => this.alertService.montarAlerta('error', 'Erro', err.defaultMessage));
    }
    else {
      this.alertService.montarAlerta('error', 'Erro', error.error.errors)
    }
  }

  cancelar(): void {
    this.formulario.reset();
    this.usuario = new Usuario();
    this.usuario.id && this.router.navigateByUrl('login');
  }
}
