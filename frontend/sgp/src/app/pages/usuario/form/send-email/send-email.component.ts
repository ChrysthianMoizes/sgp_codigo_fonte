import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor(
    private router: Router,
    private alerts: AlertService
  ) { }

  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
  ]);
  @Input() label: string;
  @Output() sendEmail = new EventEmitter();

  ngOnInit(): void {
  }

  toHome() {
    this.router.navigate(['login']);
  }

  send() {
    if (!this.email.invalid) {
      this.sendEmail.emit(this.email.value);
    }
    else {
      this.alerts.montarAlerta('error', 'Erro', 'Formato de email inválido')
    }
  }

}
