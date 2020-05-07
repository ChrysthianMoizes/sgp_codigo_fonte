import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/stores/login/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  necessitaCabecalho = true;

  usuario: Usuario = new Usuario();

  requisitarLogin(formLogin: any){
    this.loginService.logar(this.usuario.email, this.usuario.senha).subscribe(
      response => {
        this.authService.setUsuarioSessionStorage(response),
        this.router.navigate(["home"]);
      }
    )
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  ngOnInit(): void {
  }



}
