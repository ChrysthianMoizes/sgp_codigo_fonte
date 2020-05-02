import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[];

  home: MenuItem;

  ngOnInit() {
      this.items = [
          {label:'Home'},
      ];

      this.home = {icon: 'pi pi-home'}
  }

}
