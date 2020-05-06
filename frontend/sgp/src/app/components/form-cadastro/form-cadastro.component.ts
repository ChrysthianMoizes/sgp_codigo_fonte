import { Component, OnInit } from '@angular/core';
import { CadastroUsuarioService } from 'src/app/stores/cadastro/cadastro-usuario.service';
import { LoginService } from 'src/app/stores/login/login.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private cadastroService: CadastroUsuarioService, private loginService:LoginService) {

  }


  ngOnInit(){
  }

  // cadastrar(){
    save(){
      this.cadastroService.cadastrarUsuario(this.usuario)
        .subscribe(response => { this.loginService.logar(response.email, response.senha)})
    }

}
