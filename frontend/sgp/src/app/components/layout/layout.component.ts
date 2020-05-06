import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  // static readonly EXIBIR_TOPLAYOUT = 'exibirToplayout';
  exibirTopLayout = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
