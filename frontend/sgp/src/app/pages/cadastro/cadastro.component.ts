import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { CadastroUsuarioService } from 'src/app/stores/cadastro/cadastro-usuario.service';
import { LoginService } from 'src/app/stores/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario = new Usuario();

  constructor(private cadastroService: CadastroUsuarioService,
    private loginService:LoginService,
    private router: Router,
    private authService: AuthService) {

  }
  ngOnInit(): void {
  }

  save(usuario: Usuario){
    this.usuario = usuario
    this.cadastroService.cadastrarUsuario(this.usuario)
      .subscribe(response => {
        this.loginService.logar(response.email, response.senha)
        this.authService.setUsuarioSessionStorage(response)
        this.router.navigate(['/home'])
      })
  }
}
