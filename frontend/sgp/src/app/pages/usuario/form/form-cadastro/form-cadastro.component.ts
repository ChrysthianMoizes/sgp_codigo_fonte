import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioToken } from '../../models/usuarioToken';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  @Input() usuario: UsuarioToken;
  @Input() modo: string;
  @Output() cadastrarUsuario = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  save() {
    this.cadastrarUsuario.emit(this.usuario)
  }

}
