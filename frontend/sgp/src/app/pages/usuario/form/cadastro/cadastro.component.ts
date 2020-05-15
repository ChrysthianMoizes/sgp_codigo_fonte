import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioToken } from '../../models/usuarioToken';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  usuario = new UsuarioToken();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) {}
  ngOnInit(): void {}

  save(usuario: UsuarioToken) {
    this.usuario = usuario;
    this.usuarioService.create(this.usuario).subscribe(
      (response) => {
        this.authService
          .login({ email: usuario.email, senha: usuario.senha } as Usuario)
          .subscribe(
            (response) => {
              this.authService.setUsuario(response),
                this.router.navigate(['home']);
            },
            (error) => {
              this.alert.montarAlerta('error', 'Erro', 'Usuário inexistente');
            }
          );
      },
      (error) => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao criar usuário');
      }
    );
  }
}
