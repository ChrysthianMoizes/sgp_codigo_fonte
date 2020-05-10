import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  perfil: Usuario = new Usuario();

  constructor(
    private perfilService: UsuarioService,
    private location: Location,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.perfilService.getUsuarioLogado().subscribe(
      response => {
        this.perfil = response
      },
      erro => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao recuperar usuario logado')
      }
    );
  }

  onSubmit(): void {
    this.perfilService.editarUsuario(this.perfil).subscribe(
      () => {
        this.alert.montarAlerta('success', 'Sucesso', 'Perfil editado com sucesso')
      },
      erro => {
        this.alert.montarAlerta('error', 'Erro', 'Erro ao editar perfil')
      }
    )
  }

  onCancel(): void {
    this.location.back();
  }
}
