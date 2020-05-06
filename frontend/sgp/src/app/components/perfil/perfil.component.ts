import {Location} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {Perfil} from "../../models/perfil";
import {PerfilService} from "../../services/perfil.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();

  constructor(
    private _perfilStore: PerfilService,
    private _location: Location
    // authStore: AuthStore
  ) {
  }

  ngOnInit(): void {
    this._perfilStore.obterPerfil(1).subscribe(perfil => {
      this.perfil = perfil;
    })
  }

  onSubmit() {
    console.log(this.perfil);
  }

  onCancel() {
    this._location.back();
  }

}
