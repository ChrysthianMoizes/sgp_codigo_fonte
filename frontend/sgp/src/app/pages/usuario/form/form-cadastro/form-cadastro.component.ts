import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioToken } from '../../models/usuario-token';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css'],
})
export class FormCadastroComponent {
  @Input() usuario: UsuarioToken;
  @Input() modo: string;
  @Output() cadastrarUsuario = new EventEmitter();

  constructor() { }

  save(): void {
    this.cadastrarUsuario.emit(this.usuario);
  }
}
