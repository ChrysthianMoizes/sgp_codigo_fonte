import { Component, OnInit } from '@angular/core';
import { ReenviarEmailService } from 'src/app/stores/reenviar-email/reenviar-email.service';

@Component({
  selector: 'app-reenviar-email',
  templateUrl: './reenviar-email.component.html',
  styleUrls: ['./reenviar-email.component.css']
})
export class ReenviarEmailComponent implements OnInit {

  constructor(private reenviarEmailService: ReenviarEmailService) { }

  ngOnInit(): void {
  }

  send(email: string) {
    this.reenviarEmailService.reenviarEmailConfirmacao(email).subscribe(
      response => {
        alert(response);
      },
      erro => {
        alert('Erro')
      }
    )
  }

}
