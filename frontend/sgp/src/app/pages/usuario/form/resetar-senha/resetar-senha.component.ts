import { Component } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html'
})
export class ResetarSenhaComponent {
  
  constructor(
    private alertService: AlertService
  ) { }

  enviarEmail(email: string): void {
    this.alertService.montarAlerta('success', 'Sucesso', `Um email foi eviado para ${email} para que seja feita a redefinição de senha.`);
  }
}
