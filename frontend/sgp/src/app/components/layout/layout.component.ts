import {Component, OnInit} from '@angular/core';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  exibirTopLayout;

  constructor() {
  }

  ngOnInit(): void {
  }

  shownav(event: any){
    this.exibirTopLayout= event;
  }

}
