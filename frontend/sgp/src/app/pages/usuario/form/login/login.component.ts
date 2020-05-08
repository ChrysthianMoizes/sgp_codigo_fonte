import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) { }

  necessitaCabecalho = true;

  usuario: Usuario = new Usuario();

  requisitarLogin(formLogin: any) {
    this.usuarioService.logar(this.usuario.email, this.usuario.senha).subscribe(
      response => {
        this.authService.setUsuarioSessionStorage(response),
          this.router.navigate(["home"]);
      }
    )
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  ngOnInit(): void {
  }



}
