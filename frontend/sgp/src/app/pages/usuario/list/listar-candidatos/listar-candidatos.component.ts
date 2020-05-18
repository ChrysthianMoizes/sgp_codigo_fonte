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
  totalDeElementos = 1;
  listCandidatos: Usuario[];
  notFilteredListCandidatos: Usuario[];
  candidatoSelecionado: Usuario;
  selectedCandidatos: Usuario[] = [];

  lastPage = 0;
  lastSize = 0;
  
  constructor(
    private alert: AlertService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.atualizarLista(0, 20);
    this.inicializarTabela();
  }

  inicializarTabela(): void {
    this.cols = [
      { field: 'id', header: 'ID', width: '10%' },
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'email', header: 'Email', width: '45%' },
    ];
  }

  atualizarLista(page = this.lastPage, size = this.lastSize): void {
    this.lastPage = page;
    this.lastSize = size;
    this.usuarioService.index(page, size).subscribe(
      (response) => {
        this.listCandidatos = response.content;
        this.notFilteredListCandidatos = response.content;
        this.totalDeElementos = response.totalElements;
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

  onPageChange(event): void {
    this.atualizarLista(event.page, event.rows);
  }

  filterFields(field: string, filter: string): void {
    this.listCandidatos = this.notFilteredListCandidatos
      .filter(candidato => `${candidato[field]}`.toLowerCase().includes(filter.toLowerCase()));
  }
}
