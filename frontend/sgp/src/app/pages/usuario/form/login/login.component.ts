import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService) {
      this.authService.recoverToken();
    }

  necessitaCabecalho = true;

  usuario: Usuario = new Usuario();

  requisitarLogin() {
    this.usuarioService.logar(this.usuario.email, this.usuario.senha).subscribe(
      response => {
        if(response){
          this.authService.setUsuarioSessionStorage(response),
            this.router.navigate(["home"]);
        }
        else {
          this.alert.montarAlerta('error', 'Erro', 'Usuário inexistente');
        }
      }
    )
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  ngOnInit(): void {
  }



}
