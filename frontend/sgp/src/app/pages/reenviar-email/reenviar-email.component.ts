import { Component, OnInit } from '@angular/core';
import { ReenviarEmailService } from 'src/app/stores/reenviar-email/reenviar-email.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-reenviar-email',
  templateUrl: './reenviar-email.component.html',
  styleUrls: ['./reenviar-email.component.css']
})
export class ReenviarEmailComponent implements OnInit {

  constructor(
    private reenviarEmailService: ReenviarEmailService,
    private alerts: AlertService
  ) { }

  ngOnInit(): void {
  }

  send(email: string) {
    this.reenviarEmailService.reenviarEmailConfirmacao(email).subscribe(
      response => {
        this.alerts.montarAlerta('success', 'Sucesso', 'Email reenviado com sucesso')
      },
      erro => {
        this.alerts.montarAlerta('error', 'Erro', 'Erro ao reenviar email')
      }
    )
  }

}
