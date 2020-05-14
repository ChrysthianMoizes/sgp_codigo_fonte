import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { menu } from '../menu/menu';
import { AuthService } from './../../services/auth.service';
import { MenuModel } from '../menu/menu.model';

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
  @Input() title = 'Gestão de Provas';

  menuSideBar: MenuModel[];

  ngOnInit(): void {
    this.menuSideBar = menu;
    this.items = [
      {label: 'Editar Perfil', command: () => this.onEditarPerfil()},
      {label: 'Logout', command: () => this.logout()}
    ];
  }

  onClickLogo(): void {
    this.router.navigateByUrl('home');
  }

  onEditarPerfil(): void {
    this.router.navigateByUrl('perfil');
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
