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
  @Input() redirecionarAoFinalizar = true;
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
    if (this.formulario.valid) {
      this.cadastrar(this.usuario);
    }
  }

  cadastrar(usuario: Usuario): void {
    this.loadingService.activate();
    this.usuarioService.create(usuario).subscribe({
      next: () => {
        this.authService.login(usuario).subscribe({
          next: () => {
            if (this.redirecionarAoFinalizar) {
              this.authService.setUsuario(usuario);
              this.router.navigateByUrl('home');
            }
            this.salvar.emit(null);
          },
          error: error => error.errors.forEach(err => this.alertService.montarAlerta('error', 'Erro', err))
        });
      },
      error: error => {
        if (error.error.errors) {
          error.error.errors
            .forEach(err => this.alertService.montarAlerta('error', 'Erro', err.defaultMessage));
        }
        else {
          this.alertService.montarAlerta('error', 'Erro', error.error.errors)
        }
        
      }
    })
    .add(() => this.loadingService.deactivate());
  }

  cancelar(): void {
    if (this.redirecionarAoFinalizar) {
      this.router.navigateByUrl('login');
    }
    this.formulario.reset();
    this.usuario = new Usuario();
  }
}
