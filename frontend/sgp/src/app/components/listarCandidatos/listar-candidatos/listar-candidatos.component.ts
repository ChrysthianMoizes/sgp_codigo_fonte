import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ListarCandidatosService } from 'src/app/stores/candidatos/listar-candidatos.service';
import { AlertService } from '../../alert/alert.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { FiltroCandidato } from 'src/app/models/filtro-candidato.model';
import { VisualizarCandidatoComponent } from '../../visualizarCandidato/visualizar-candidato/visualizar-candidato.component';

@Component({
  selector: 'app-listar-candidatos',
  templateUrl: './listar-candidatos.component.html',
  styleUrls: ['./listar-candidatos.component.css']
})
export class ListarCandidatosComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private candidatoService: ListarCandidatosService
  ) { }

  @ViewChild('VisualizarCandidato') visualizarCandidato: VisualizarCandidatoComponent;

  cols: any[];
  filtro = new FiltroCandidato();
  rows = 20;
  first = 0;
  listCandidatos: Usuario[];
  selectedCandidatos: Usuario[] = [];

  ngOnInit(): void {
    this.getCandidatos();
    this.cols = [
      { field: 'id', header: 'ID', width: '10%' },
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'email', header: 'Email', width: '45%' }
    ]
  }

  getCandidatos() {
    this.candidatoService.listarCandidatos().subscribe(
      response => {
        this.listCandidatos = response;
      },
      erro => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao listar candidatos')
      }
    )
    console.log(this.listCandidatos)
  }

  viewCandidato() {
    this.visualizarCandidato.openDialog(this.selectedCandidatos[0], 'visualizar');
    this.selectedCandidatos = [];
  }

  editCandidato() {
    this.visualizarCandidato.openDialog(this.selectedCandidatos[0], 'edicao');
    this.selectedCandidatos = [];
  }

  deleteCandidato() {
    this.selectedCandidatos.forEach(element => {
      this.candidatoService.excluirCandidatos(element.id).subscribe(
        () => {
          this.alert.montarAlerta('success', 'Sucesso', `${element.nome} excluido com sucesso`);
        }, erro => {
          this.alert.montarAlerta('error', 'Erro', `Não foi possível excluir o candidato ${element.nome}`)
        });
    })
    this.selectedCandidatos = [];
    this.getCandidatos();
  }

  editarCandidato(candidato: Usuario) {
    this.candidatoService.editarCandidato(candidato).subscribe(
      response => {
        this.listCandidatos = response;
        this.alert.montarAlerta('success', 'Sucesso', 'Candidato alterado com sucesso')
      },
      erro => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao editar candidato')
      }
    )
    this.getCandidatos();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.listCandidatos.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  filter(event: LazyLoadEvent) {
    console.log(event);
  }

}
