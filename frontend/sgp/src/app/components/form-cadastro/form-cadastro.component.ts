import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CadastroUsuarioService } from 'src/app/stores/cadastro/cadastro-usuario.service';
import { LoginService } from 'src/app/stores/login/login.service';

import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  @Input() usuario: Usuario;
  @Output() cadastrarUsuario = new EventEmitter();

  constructor() {

  }


  ngOnInit(){
  }

  save(){
    this.cadastrarUsuario.emit(this.usuario)
  }

}
