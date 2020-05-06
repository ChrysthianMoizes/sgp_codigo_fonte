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

  constructor(
    private provaService: ProvaService
  ) {
  }

  ngOnInit(): void {
    this.provaService.getProvas().subscribe(provas => {
      this.provas = provas;
    });
  }

}
