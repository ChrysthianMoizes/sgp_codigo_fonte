import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-visualizar-candidato',
  templateUrl: './visualizar-candidato.component.html',
  styleUrls: ['./visualizar-candidato.component.css'],
})
export class VisualizarCandidatoComponent {
  
  @Output() editarCandidato = new EventEmitter();
  @Input() apenasVisualizar = false;
  usuario: Usuario = new Usuario();
  visible = false;
  
  constructor() { }

  openDialog(usuario: Usuario, apenasVisualizar=false): void {
    this.usuario = {...usuario};
    this.apenasVisualizar = apenasVisualizar;
    this.visible = true;
  }

  save(): void {
    this.editarCandidato.emit({...this.usuario});
    this.usuario = new Usuario();
    this.visible = false;
  }
}
