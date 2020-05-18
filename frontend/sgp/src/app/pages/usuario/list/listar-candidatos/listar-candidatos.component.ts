import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng';
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
  
  @ViewChild('VisualizarCandidato')
  visualizarCandidato: VisualizarCandidatoComponent;

  filtro = new FiltroCandidato();
  cols: any[];
  rows: number = 20;
  first: number = 0;
  listCandidatos: Usuario[];
  candidatoSelecionado: Usuario;
  selectedCandidatos: Usuario[] = [];
  
  constructor(
    private alert: AlertService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) { }

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
        this.selectedCandidatos = [];
      },
      () => {
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
    this.atualizarLista();
  }

  verCandidato(): void {
    this.selectedCandidatos.forEach(candidato =>
      this.usuarioService.show(candidato.id).subscribe({
        next: candidatoCompleto => this.visualizarCandidato.openDialog(candidatoCompleto, true),
        error: () => this.alert.montarAlerta('error', 'Erro', 'Erro ao buscar candidato. Tente novamente.')
      })
    );
    this.atualizarLista();
  }

  deleteCandidato(): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza?',
      accept: () => {
        this.selectedCandidatos.forEach((candidato) =>
          this.usuarioService.destroy(candidato.id).subscribe({
            next: () => {
              this.atualizarLista();
            },
            error: () => this.alert.montarAlerta('error', 'Erro', `Não foi possível excluir o candidato ${candidato.nome}`)
          })
        );
      }
    });
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
