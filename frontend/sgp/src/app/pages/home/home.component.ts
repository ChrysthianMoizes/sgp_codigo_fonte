import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario = {nome: 'Teste', id: 1};

  constructor() {
  }

  ngOnInit(): void {
  }
}
