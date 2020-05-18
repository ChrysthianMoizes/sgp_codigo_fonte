import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  formulario: FormGroup;

  constructor(
    private router: Router,
    private alert: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    });
  }

  validarFormulario(): void {
    if (this.formulario.valid) {
      this.logar(this.usuario);
    }
  }

  logar(usuario: Usuario): void {
    this.loadingService.activate();
    this.authService.login(usuario).subscribe({
      next: (resposta: Usuario) => {
        this.authService.setUsuario(resposta);
        this.router.navigateByUrl('home');
      },
      error: error => this.alert.montarAlerta('error', 'Erro', error.error.message)
    })
    .add(() => this.loadingService.deactivate());
  }

  deveMostrarErrors(label: string): boolean {
    const campo = this.formulario.get(label);
    return campo.touched && !campo.valid;
  }
}
