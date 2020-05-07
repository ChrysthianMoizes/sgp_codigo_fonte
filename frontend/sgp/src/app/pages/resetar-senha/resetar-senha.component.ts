import { Component, OnInit } from '@angular/core';
import { ResetarSenhaService } from 'src/app/stores/resetar-senha/resetar-senha.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent implements OnInit {

  constructor(
    private resetarSenhaService: ResetarSenhaService,
    private alerts: AlertService
  ) { }

  ngOnInit(): void {
  }

  send(email: string) {
    this.resetarSenhaService.resetarSenha(email).subscribe(
      response => {
        this.alerts.montarAlerta('success', 'Sucesso', 'Sua nova senha foi enviada para seu email')
      },
      erro => {
        this.alerts.montarAlerta('error', 'Erro', 'Erro ao resetar senha')
      }
    )
  }

}
