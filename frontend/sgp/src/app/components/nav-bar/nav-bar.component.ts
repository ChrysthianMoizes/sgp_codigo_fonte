import { MenuModel } from '../menu/menu.model';
import { menu } from '../menu/menu';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  items: MenuItem[];
  menuSideBar: MenuModel[];

  @Input() title = 'Gestão de Provas - Basis';
  ngOnInit(): void {
    this.menuSideBar = menu;
    this.items = [
      { label: 'Perfil', command: toPerfil => {this.toPerfil()}},
      { label: 'Logout', command: onLogout => {this.logout()} }
    ];
  }

  toPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  logout(): void {
    this.authService.removerSessao();
  }

  verificaPermissao(permissaoMenu: boolean): boolean {
    if (
      permissaoMenu === this.authService.getPermissaoUsuario() ||
      permissaoMenu === false
    ) {
      return true;
    }
    return false;
  }

  onClickHamburguerMenu(): void {
    this.toogleSidebar();
  }

  toogleSidebar(): void {
    let btn = document.querySelector('.sidebar');
    let icone = document.querySelector('.pi-bars');

    btn.classList.toggle('ativo');
    icone.classList.toggle('icone');
  }
}
