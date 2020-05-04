import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reenviar-email',
  templateUrl: './reenviar-email.component.html',
  styleUrls: ['./reenviar-email.component.css']
})
export class ReenviarEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  send(email: string) {
    alert(email);
  }

}
