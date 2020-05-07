import { Component, OnInit } from '@angular/core';
import { Prova } from '../../models/prova';
import { ProvaService } from '../../services/prova/prova.service';
import { DialogService } from 'primeng/dynamicdialog';
// TODO: colocar cores padrão no componente
// TODO: resolver layout espaçado em casos de muito texto
@Component({
  selector: 'app-listar-provas',
  templateUrl: './listar-provas.component.html',
  styleUrls: ['./listar-provas.component.css'],
  providers: [DialogService],
})
export class ListarProvasComponent implements OnInit {
  provas: Prova[];
  provasSelecionadas: Prova[];
  definicaoColunas: any[];

  constructor(
    private provaService: ProvaService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.provaService.getProvas().subscribe((provas) => {
      this.provas = provas;
    });

    this.definicaoColunas = [
      { field: 'id', header: 'ID' },
      { field: 'titulo', header: 'Titulo' },
      { field: 'percentualAprovacao', header: '% para aprovação' },
    ];
  }

  isOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.provasSelecionadas && this.provasSelecionadas.length >= 1;
  }
}
