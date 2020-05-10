import { MenuModel } from '../menu/menu.model';
import { menu } from '../menu/menu';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  items: MenuItem[];
  menuSideBar: MenuModel[];

  @Input() title = 'Gestão de Provas - Basis';
  ngOnInit(): void {
    this.menuSideBar = menu;
    this.items = [{ label: 'Logout', command: this.onLogout }];
  }

  onLogout(): void {
    console.log('teste')
    this.authService.lougout();
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
