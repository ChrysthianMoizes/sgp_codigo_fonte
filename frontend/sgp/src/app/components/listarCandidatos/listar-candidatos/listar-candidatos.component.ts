import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ListarCandidatosService } from 'src/app/stores/candidatos/listar-candidatos.service';
import { AlertService } from '../../alert/alert.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { FiltroCandidato } from 'src/app/models/filtro-candidato.model';

@Component({
  selector: 'app-listar-candidatos',
  templateUrl: './listar-candidatos.component.html',
  styleUrls: ['./listar-candidatos.component.css']
})
export class ListarCandidatosComponent implements OnInit {

  constructor(
    private candidatoService: ListarCandidatosService,
    private alerts: AlertService
  ) { }

  candidatos: Usuario[];
  cols: any[];
  filtro = new FiltroCandidato();
  rows = 20;
  first = 0;

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID', width: '5%' },
      { field: 'nome', header: 'Nome', width: '50%' },
      { field: 'email', header: 'Email', width: '45%' }
    ]

    this.candidatoService.listarCandidatos().subscribe(
      response => {
        this.candidatos = response;
      },
      erro => {
        this.alerts.montarAlerta('error', 'Erro', 'Erro ao listar candidatos')
      }
    )

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
    return this.first === (this.candidatos.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  filter(event: LazyLoadEvent) {
    console.log(event);
  }

}
