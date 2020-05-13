import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { FiltroCandidato } from 'src/app/pages/usuario/models/filtro-candidato.model';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { VisualizarCandidatoComponent } from '../../../form/visualizarCandidato/visualizar-candidato/visualizar-candidato.component';

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
  selectedCandidatos: Usuario[] = [];

  ngOnInit(): void {
    this.getCandidatos();
    this.cols = [
      { field: 'id', header: 'ID', width: '10%' },
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'email', header: 'Email', width: '45%' },
    ];
  }

  getCandidatos(): void {
    this.usuarioService.listarCandidatos().subscribe(
      (response) => {
        this.listCandidatos = response;
      },
      (erro) => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao listar candidatos');
      }
    );
  }

  viewCandidato(): void {
    this.visualizarCandidato.openDialog(
      this.selectedCandidatos[0],
      'visualizar'
    );
    this.selectedCandidatos = [];
  }

  editCandidato(): void {
    this.visualizarCandidato.openDialog(this.selectedCandidatos[0], 'edicao');
    this.selectedCandidatos = [];
  }

  deleteCandidato(): void {
    this.selectedCandidatos.forEach((element) => {
      this.usuarioService.excluirCandidatos(element.id).subscribe(
        () => {
          this.alert.montarAlerta(
            'success',
            'Sucesso',
            `${element.nome} excluido com sucesso`
          );
        },
        (erro) => {
          this.alert.montarAlerta(
            'error',
            'Erro',
            `Não foi possível excluir o candidato ${element.nome}`
          );
        }
      );
    });
    this.selectedCandidatos = [];
    this.getCandidatos();
  }

  editarCandidato(candidato: Usuario): void {
    this.usuarioService.editarCandidato(candidato).subscribe(
      (response) => {
        this.listCandidatos = response;
        this.alert.montarAlerta(
          'success',
          'Sucesso',
          'Candidato alterado com sucesso'
        );
      },
      (erro) => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao editar candidato');
      }
    );
    this.getCandidatos();
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
