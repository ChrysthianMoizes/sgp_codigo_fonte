import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Perfil} from '../../models/perfil';
import {PerfilService} from '../../services/perfil/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();

  constructor(
    private perfilService: PerfilService,
    private location: Location
    // authStore: AuthStore
  ) {
  }

  ngOnInit(): void {
    this.perfilService.getPerfil(1).subscribe(perfil => {
      this.perfil = perfil;
    });
  }

  onSubmit() {
    console.log(this.perfil);
  }

  onCancel() {
    this.location.back();
  }

}
