import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/pages/usuario/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private alertService: AlertService,
    private oauth: AuthService) {
  }

  ngOnInit(): void {
    this.usuario = this.oauth.getUsuario()  }

  abrirModal(tipo: string, titulo: string, mensagem: string): void {
    this.alertService.montarAlerta(tipo, titulo, mensagem);
  }
}
