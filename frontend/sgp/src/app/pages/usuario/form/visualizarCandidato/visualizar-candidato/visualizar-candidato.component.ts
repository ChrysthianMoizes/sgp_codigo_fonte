import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-visualizar-candidato',
  templateUrl: './visualizar-candidato.component.html',
  styleUrls: ['./visualizar-candidato.component.css']
})
export class VisualizarCandidatoComponent implements OnInit {

  constructor() { }
  usuario = new Usuario();
  @Output() editarCandidato = new EventEmitter();
  modo: string;
  visible = false;

  ngOnInit(): void {
  }

  openDialog(usuario: Usuario, edicao: string) {
    this.visible = true;
    this.usuario = usuario;
    this.modo = edicao;

    if (edicao == 'edicao') {
      this.usuario = Object.assign({}, usuario);
    }
  }

  save() {
    this.editarCandidato.emit(this.usuario);
    this.visible = false;
  }

}
