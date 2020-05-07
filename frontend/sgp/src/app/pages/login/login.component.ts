import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/stores/login/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private authService: AuthService) { }

  necessitaCabecalho = true;

  usuario: any = {
    email: '',
    senha: ''
  }

  requisitarLogin(formLogin: any){
    this.loginService.logar(this.usuario.email, this.usuario.senha).subscribe(
      response => {
        this.authService.setUsuarioSessionStorage(response);
        console.log(response);
      }
    )
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  ngOnInit(): void {
  }



}
