import { AuthService } from './../../../../services/auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {

  formulario: FormGroup;
  perfil: Usuario = new Usuario();
  formSubmetido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private alert: AlertService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.obterUsuario();
  }

  iniciarForm() {
    this.formulario = this.formBuilder.group(
      {
        nome: [null, [Validators.required]],
        email: [null, [Validators.required]],
        senha: [null]
      },
      { updateOn: "blur" }
    );
  }

  obterUsuario() {
    let id = this.authService.getUsuario().id;
    if (id) {
      this.usuarioService.show(id).subscribe(user => {
        this.perfil = user;
      });
    }
  }

  validarForm() {

    if (this.formulario.invalid) {
      this.alert.montarAlerta('error', 'Erro', 'Preenchimento obrigatório dos campos: Nome e Email');
      return;
    }

    this.salvar();

  }

  salvar() {
    this.usuarioService.update(this.perfil).pipe(catchError(err => {
      this.alert.montarAlerta('error', 'Erro', err.message);
      return err;
    })).subscribe(() => {
        this.alert.montarAlerta('success', 'Sucesso', 'Perfil editado com sucesso');
        this.perfil.senha = null;
        this.router.navigate(["/home"]);
      }
    );
  }

  onCancel() {
    this.location.back();
  }
}
