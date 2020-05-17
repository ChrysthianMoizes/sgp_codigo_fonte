import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { FiltroCandidato } from 'src/app/pages/usuario/models/filtro-candidato.model';
import { VisualizarCandidatoComponent } from '../../form/visualizar-candidato/visualizar-candidato.component';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-listar-candidatos',
  templateUrl: './listar-candidatos.component.html',
  styleUrls: ['./listar-candidatos.component.css'],
})
export class ListarCandidatosComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private usuarioService: UsuarioService
  ) {}

  @ViewChild('VisualizarCandidato')
  visualizarCandidato: VisualizarCandidatoComponent;

  cols: any[];
  filtro = new FiltroCandidato();
  rows: number = 20;
  first: number = 0;
  listCandidatos: Usuario[];
  candidatoSelecionado: Usuario;
  selectedCandidatos: Usuario[] = [];

  ngOnInit(): void {
    this.atualizarLista();
    this.inicializarTabela();
  }

  inicializarTabela() {
    this.cols = [
      { field: 'id', header: 'ID', width: '10%' },
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'email', header: 'Email', width: '45%' },
    ];
  }

  atualizarLista(): void {
    this.usuarioService.index().subscribe(
      (response) => {
        this.listCandidatos = response.content;
      },
      (erro) => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao listar candidatos');
      }
    );
  }
  
  editarCandidato(): void {
    this.selectedCandidatos.forEach(candidato =>
      this.usuarioService.show(candidato.id).subscribe({
        next: candidatoCompleto => this.visualizarCandidato.openDialog(candidatoCompleto),
        error: () => this.alert.montarAlerta('error', 'Erro', 'Erro ao buscar candidato. Tente novamente.')
      })
    )
    this.selectedCandidatos = [];
  }

  verCandidato(): void {
    this.selectedCandidatos.forEach(candidato =>
      this.usuarioService.show(candidato.id).subscribe({
        next: candidatoCompleto => this.visualizarCandidato.openDialog(candidatoCompleto, true),
        error: () => this.alert.montarAlerta('error', 'Erro', 'Erro ao buscar candidato. Tente novamente.')
      })
    );
    this.selectedCandidatos = [];
  }

  deleteCandidato(): void {
    this.selectedCandidatos.forEach((candidato) =>
      this.usuarioService.destroy(candidato.id).subscribe({
        next: () => this.alert.montarAlerta('success', 'Sucesso', `${candidato.nome} excluido com sucesso!`),
        error: () => this.alert.montarAlerta('error', 'Erro', `Não foi possível excluir o candidato ${candidato.nome}`)
      })
    );
    this.selectedCandidatos = [];
    this.atualizarLista();
  }

  next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  reset(): void {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === this.listCandidatos.length - this.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
}
