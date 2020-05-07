import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    private alerts: AlertService
  ) { }

  @Input() candidatos: Usuario[];
  @Output() deleteCandidato = new EventEmitter();
  @Output() editCandidato = new EventEmitter();
  @Output() viewCandidato = new EventEmitter();
  cols: any[];
  filtro = new FiltroCandidato();
  rows = 20;
  first = 0;
  selectedCandidato: Usuario;
  listCandidato: Usuario[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID', width: '10%' },
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'email', header: 'Email', width: '45%' }
    ]
  }

  edit() {
    this.editCandidato.emit(this.listCandidato[0]);
    this.listCandidato = [];
  }

  delete() {
    this.deleteCandidato.emit(this.listCandidato);
    this.listCandidato = [];
  }

  view() {
    this.viewCandidato.emit(this.listCandidato[0]);
    this.listCandidato = [];
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
