import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { AuthService } from './../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  onCancelar(): void {
    this.router.navigateByUrl('/home');
  }

  onSalvar(usuario: Usuario): void {
    this.alertService.montarAlerta('success', 'Sucesso', `Perfil atualizado!`);
    this.authService.setUsuario(usuario);
    this.usuario = usuario;
  }
}
