import { Component, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-visualizar-candidato',
  templateUrl: './visualizar-candidato.component.html',
  styleUrls: ['./visualizar-candidato.component.css'],
})
export class VisualizarCandidatoComponent {
  constructor() {}
  usuario: Usuario = new Usuario();
  @Output() editarCandidato = new EventEmitter();
  modo: string;
  visible: boolean = false;

  openDialog(usuario: Usuario, edicao: string): void {
    this.visible = true;
    this.usuario = usuario;
    this.modo = edicao;

    if (edicao == 'edicao') {
      this.usuario = Object.assign({}, usuario);
    }
  }

  save(): void {
    this.editarCandidato.emit(this.usuario);
    this.visible = false;
  }
}
