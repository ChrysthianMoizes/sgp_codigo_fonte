import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-reenviar-email',
  templateUrl: './reenviar-email.component.html',
  styleUrls: ['./reenviar-email.component.css'],
})
export class ReenviarEmailComponent {
  constructor(
    private usuarioService: UsuarioService,
    private alerts: AlertService
  ) {}

  send(email: string): void {
    // this.usuarioService.reenviarEmailConfirmacao(email).subscribe(
    //   (response) => {
    //     this.alerts.montarAlerta(
    //       'success',
    //       'Sucesso',
    //       'Email reenviado com sucesso'
    //     );
    //   },
    //   (erro) => {
    //     this.alerts.montarAlerta('error', 'Erro', 'Erro ao reenviar email');
    //   }
    // );
  }
}
