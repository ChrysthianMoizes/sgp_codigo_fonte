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

  ngOnInit(): void {
  }


  login(){
    this.loginService.logar("adasds@asdasd", "asdasdsd").subscribe(
      response => {
        this.authService.setUsuarioSessionStorage(response);
      }
    )
  }

}
