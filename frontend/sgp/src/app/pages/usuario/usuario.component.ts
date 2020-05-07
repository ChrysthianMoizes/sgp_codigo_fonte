import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Usuario} from './models/usuario';
import {UsuarioService} from './service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  perfil: Usuario = new Usuario();

  constructor(
    private perfilService: UsuarioService,
    private location: Location
    // authStore: AuthStore
  ) {
  }

  ngOnInit(): void {
    this.perfilService.show(1).subscribe(perfil => {
      this.perfil = perfil as Usuario;
    });
  }

  onSubmit() {
    console.log(this.perfil);
  }

  onCancel() {
    this.location.back();
  }

}
