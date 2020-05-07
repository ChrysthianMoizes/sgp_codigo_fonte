import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() modo: string;
  @Output() cadastrarUsuario = new EventEmitter();

  constructor() {

  }


  ngOnInit(){
  }

  save(){
    this.cadastrarUsuario.emit(this.usuario)
  }

}
