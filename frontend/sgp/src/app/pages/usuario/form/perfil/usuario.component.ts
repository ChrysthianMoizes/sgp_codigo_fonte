import { UsuarioEdicao } from './../../models/usuario-edicao.model';
import { AuthService } from './../../../../services/auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { UsuarioEdicaoService } from '../../service/usuario-edicao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  perfil: UsuarioEdicao = new UsuarioEdicao();

  constructor(
    private authService: AuthService,
    private location: Location,
    private alert: AlertService,
    private perfilService: UsuarioEdicaoService
  ) {}

  ngOnInit(): void {
    this.perfil.id = this.authService.getUsuario().id;
    this.perfil.nome = this.authService.getUsuario().nome;
    this.perfil.email = this.authService.getUsuario().email;
  }

  onSubmit(): void {
    this.perfilService.update(this.perfil).subscribe(
      () => {
        this.alert.montarAlerta(
          'success',
          'Sucesso',
          'Perfil editado com sucesso'
        );
        this.perfil.senha = null;
      },
      (erro) => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao editar perfil');
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
