import { AlertService } from './alert.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  providers: [AlertService],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(private alertService: AlertService) {}

  confirmar() {
    this.alertService.confirmar();
  }

  rejeitar() {
    this.alertService.rejeitar();
  }
}
