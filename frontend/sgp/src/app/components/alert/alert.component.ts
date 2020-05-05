import { AlertService } from './alert.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  providers: [AlertService],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  private tipo: string;
  private mensagem: string;
  private tipostring: string;
  constructor(private alertService: AlertService) {}

  confirmar() {
    this.alertService.confirmar();
  }

  rejeitar() {
    this.alertService.rejeitar();
  }
}
