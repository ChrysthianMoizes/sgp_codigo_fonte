import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Usuario } from 'src/app/models/usuario.model';
import { ListarCandidatosService } from 'src/app/stores/candidatos/listar-candidatos.service';

@Component({
  selector: 'app-visualizar-candidato',
  templateUrl: './visualizar-candidato.component.html',
  styleUrls: ['./visualizar-candidato.component.css']
})
export class VisualizarCandidatoComponent implements OnInit {

  constructor(private candidatoService: ListarCandidatosService) { }
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
  }

  save() {
    this.editarCandidato.emit(this.usuario);
    this.visible = false;
  }

}
