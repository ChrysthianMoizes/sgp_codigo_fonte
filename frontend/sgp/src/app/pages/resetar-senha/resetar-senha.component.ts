import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  send(email: string) {
    alert(email);
  }

}
