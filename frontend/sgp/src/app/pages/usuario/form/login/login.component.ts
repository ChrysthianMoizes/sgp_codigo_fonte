import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  necessitaCabecalho: boolean = true;

  usuario: Usuario = new Usuario();

  requisitarLogin(): void {
    this.usuarioService
      .logar(this.usuario.email, this.usuario.senha)
      .subscribe((response) => {
        this.authService.setUsuario(response), this.router.navigate(['home']);
      });
  }

  verificaValidTouched(campo): void {
    return !campo.valid && campo.touched;
  }
}
