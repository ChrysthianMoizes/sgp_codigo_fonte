import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[];
  @Input() title = 'Gestão de Provas - Basis';
  ngOnInit(): void {
    this.items = [{ label: 'Logout', command: this.onLogout }];
  }

  onLogout(event): void {
    // TODO: Adicionar lógica do logout
  }

  onClickHamburguerMenu(event): void {
    let btn = document.querySelector('#sidebar');
    let icone = document.querySelector('.pi-bars');
    console.log(icone);
    btn.classList.toggle('ativo');
    icone.classList.toggle('icone');
  }
}
