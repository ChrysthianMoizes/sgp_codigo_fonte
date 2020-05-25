import { Component } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-reenviar-email',
  templateUrl: './reenviar-email.component.html'
})
export class ReenviarEmailComponent {
  
  constructor(
    private alertService: AlertService
  ) { }

  enviarEmail(email: string): void {
    this.alertService.montarAlerta('success', 'Sucesso', `Um email de ativação foi reenviado para ${email}.`);
  }
}
