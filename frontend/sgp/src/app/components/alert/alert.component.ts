import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(private alertService: AlertService) {}

  confirmar(): void {
    this.alertService.confirmar();
  }

  rejeitar(): void {
    this.alertService.rejeitar();
  }
}
