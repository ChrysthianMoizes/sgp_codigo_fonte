import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];
  @Input() title = 'Gestão de Provas';

  constructor(private router: Router) { };

  ngOnInit(): void {
    this.items = [
      {label: 'Logout', command: this.onLogout}
    ];
  }

  onClickLogo(): void {
    this.router.navigateByUrl('home');
  }

  onLogout(event): void {
    // TODO: Adicionar lógica do logout
  }

  onClickHamburguerMenu(event): void {
    // TODO: Adicionar lógica do clique
  }

}
