import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {

  @Output() enviarEmail = new EventEmitter();
  @Input() titulo = "Enviar email"
  formulario: FormGroup;
  email = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviar(): void {
    this.formulario.valid && this.enviarEmail.emit(this.email);
  }

  cancelar(): void {
    this.router.navigate(['login']);
  }
}
