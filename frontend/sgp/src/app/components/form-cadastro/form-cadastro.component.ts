import { Component, OnInit } from '@angular/core';
import { CadastroUsuarioService } from 'src/app/stores/cadastro/cadastro-usuario.service';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  constructor(private cadastroService: CadastroUsuarioService) {

  }

  cadastrar(){
    this.cadastroService.cadastrar().subscribe(response => {alert(response)})
  }

  ngOnInit(): void {
  }

}
