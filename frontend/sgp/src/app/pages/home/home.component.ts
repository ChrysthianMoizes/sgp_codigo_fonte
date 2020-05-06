import {Component, OnInit} from '@angular/core';
import {AlertService} from './../../components/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario = {nome: 'Teste', id: 1};

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  abrirModal(tipo: string, titulo: string, mensagem: string) {
    this.alertService.montarAlerta(tipo, titulo, mensagem);
  }
}
