import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-visualizar-candidato',
  templateUrl: './visualizar-candidato.component.html',
  styleUrls: ['./visualizar-candidato.component.css'],
})
export class VisualizarCandidatoComponent {
  @Output() candidatoAtualizado = new EventEmitter();
  @Input() apenasVisualizar = false;
  usuario: Usuario = new Usuario();
  visible = false;

  constructor() {}

  openDialog(usuario: Usuario, apenasVisualizar = false): void {
    this.usuario = Object.assign({}, usuario);
    this.apenasVisualizar = apenasVisualizar;
    this.visible = true;
  }

  resetarConfigs(): void {
    this.usuario = new Usuario();
    this.visible = false;
    this.apenasVisualizar = false;
  }

  salvar(): void {
    this.candidatoAtualizado.emit();
    this.resetarConfigs();
  }
}
