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
  @Input() title = 'Gestão de Provas - Basis';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Editar Perfil', command: () => this.onEditarPerfil()},
      {label: 'Logout', command: this.onLogout}
    ];
  }

  onEditarPerfil(): void {
    this.router.navigateByUrl('/home');
  }

  onLogout(event): void {
    // TODO: Adicionar lógica do logout
  }

  onClickHamburguerMenu(event): void {
    // TODO: Adicionar lógica do clique
  }

}
