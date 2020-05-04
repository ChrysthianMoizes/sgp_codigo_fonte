import { Component, OnInit } from '@angular/core';
import { ResetarSenhaService } from 'src/app/stores/resetar-senha/resetar-senha.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent implements OnInit {

  constructor(private resetarSenhaService: ResetarSenhaService) { }

  ngOnInit(): void {
  }

  send(email: string) {
    this.resetarSenhaService.resetarSenha(email).subscribe(
      response => {
        alert(response)
      },
      erro => {
        alert('erro')
      }
    )
  }

}
