import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { UsuarioToken } from '../../models/usuarioToken';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario = new UsuarioToken();

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService) {

  }
  ngOnInit(): void {
  }

  save(usuario: UsuarioToken) {
    this.usuario = usuario
    this.usuarioService.cadastrarUsuario(this.usuario)
      .subscribe(response => {
        this.usuarioService.logar(response.email, response.senha).subscribe(
          response => {
            if(response){
              this.authService.setUsuarioSessionStorage(response),
                this.router.navigate(["home"]);
            }
            else {
              this.alert.montarAlerta('error', 'Erro', 'Usuário inexistente');
            }
          }
        )
      })
  }
}
