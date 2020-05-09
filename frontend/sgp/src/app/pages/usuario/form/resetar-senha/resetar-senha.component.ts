import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private alerts: AlertService
  ) { }

  ngOnInit(): void {
  }

  send(email: string) {
    this.usuarioService.resetarSenha(email).subscribe(
      response => {
        this.alerts.montarAlerta('success', 'Sucesso', 'Sua nova senha foi enviada para seu email')
      },
      erro => {
        this.alerts.montarAlerta('error', 'Erro', 'Erro ao resetar senha')
      }
    )
  }

}
