import {Component, OnInit} from '@angular/core';
import {Prova} from '../../models/prova';
import {ProvaService} from '../../services/prova/prova.service';
// TODO: colocar cores padrão no componente
// TODO: resolver layout espaçado em casos de muito texto
@Component({
  selector: 'app-listar-provas',
  templateUrl: './listar-provas.component.html',
  styleUrls: ['./listar-provas.component.css']
})
export class ListarProvasComponent implements OnInit {

  provas: Prova[];
  provasSelecionadas: Prova[];
  definicaoColunas: any[];

  constructor(
    private provaService: ProvaService
  ) {
  }

  ngOnInit(): void {
    this.provaService.getProvas().subscribe(provas => {
      this.provas = provas;
    });

    this.definicaoColunas = [
      {field: 'id', header: 'ID'},
      {field: 'titulo', header: 'Titulo'},
      {field: 'percentualAprovacao', header: '% para aprovação'}
    ];

  }

  isSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length === 1;
  }
}
