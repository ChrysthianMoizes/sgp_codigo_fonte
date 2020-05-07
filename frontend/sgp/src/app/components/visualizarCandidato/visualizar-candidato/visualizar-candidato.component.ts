import { Component, OnInit, Input } from '@angular/core';
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
  usuario: Usuario;
  edicao: boolean;
  visible = false;

  ngOnInit(): void {
  }

  openDialog(usuario: Usuario, edicao: boolean) {
    this.usuario = usuario;
    this.edicao = edicao;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

}
