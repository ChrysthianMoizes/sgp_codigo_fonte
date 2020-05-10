import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  exibirTopLayout: boolean = true;

  constructor() {}

  shownav(event: any): void {
    this.exibirTopLayout = event;
  }
}
