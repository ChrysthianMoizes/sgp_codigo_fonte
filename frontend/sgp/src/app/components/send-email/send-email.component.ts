import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor() { }

  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ]);
  @Input() label: string;
  @Output() sendEmail = new EventEmitter();
  ngOnInit(): void {
  }

  showEmail() {
    alert(this.email);
  }

  send() {
    this.sendEmail.emit(this.email.value);
  }

  verifyPadding() {
    return this.email.invalid;
  }

}
