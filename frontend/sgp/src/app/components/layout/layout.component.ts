import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public exibirTopLayout: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  shownav(event: any) {
    this.exibirTopLayout = event;
  }

}
