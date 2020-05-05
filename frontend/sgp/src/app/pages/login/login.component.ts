import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/stores/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  necessitaCabecalho = true;

  ngOnInit(): void {
  }


  login(){
    this.loginService.logar().subscribe(
      response => {
        alert(response)
      }
    )
  }

}
