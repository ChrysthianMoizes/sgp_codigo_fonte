import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private alert: AlertService,
    private authService: AuthService
  ) { }

  necessitaCabecalho = true;
  usuario: Usuario = new Usuario();

  onSubmit(): void {
    this.authService.login(this.usuario).subscribe(
      res => {
        this.authService.setUsuario(res);
        this.router.navigate(["home"]);
      },
      err => {
        this.alert.montarAlerta('error', 'Erro', err.message);
      }
    );
  }

  verificaValidTouched(campo): void {
    return !campo.valid && campo.touched;
  }
}
