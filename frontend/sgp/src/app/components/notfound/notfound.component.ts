import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: ` <p-card>
    <h1 class="not-found-title">Error 404</h1>
    <p>A Página que você está tentando acessar não foi encontrada.</p>
  </p-card>`,
  styleUrls: ['./notfound.component.css'],
})
export class NotfoundComponent {
  constructor() {}
}
