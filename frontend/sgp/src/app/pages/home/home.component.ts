import { AlertService } from './../../components/alert/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private alertService: AlertService) { }
  ngOnInit(): void { }
  usuario = { nome: 'Teste', id: 1 };

  abrirModal(tipo: string, titulo: string, mensagem: string) {
    this.alertService.montarAlerta(tipo, titulo, mensagem);
  }
}
