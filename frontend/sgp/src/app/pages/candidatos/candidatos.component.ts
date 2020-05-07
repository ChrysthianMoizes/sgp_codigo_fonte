import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ListarCandidatosService } from 'src/app/stores/candidatos/listar-candidatos.service';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualizarCandidatoComponent } from 'src/app/components/visualizarCandidato/visualizar-candidato/visualizar-candidato.component';
@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private candidatoService: ListarCandidatosService
  ) { }

  @ViewChild('VisualizarCandidato') visualizarCandidato: VisualizarCandidatoComponent;
  candidatos: Usuario[];

  ngOnInit(): void {
    this.getCandidatos();
  }

  getCandidatos() {
    this.candidatoService.listarCandidatos().subscribe(
      response => {
        this.candidatos = response;
      },
      erro => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao listar candidatos')
      }
    )
  }

  viewCandidato(candidato: Usuario) {
    this.visualizarCandidato.openDialog(candidato, false);
  }

  editCandidato(candidato: Usuario) {
    this.alert.montarAlerta('success', 'Sucesso', `${candidato.nome} editado com sucesso`)
  }

  deleteCandidato(candidatos: Usuario[]) {
    candidatos.forEach(element => {
      this.candidatoService.excluirCandidatos(element.id).subscribe(
        () => {
          this.alert.montarAlerta('success', 'Sucesso', `${element.nome} excluido com sucesso`);
        }, erro => {
          this.alert.montarAlerta('error', 'Erro', `Não foi possível excluir o candidato ${element.nome}`)
        });
    })
    this.getCandidatos();
  }

}
