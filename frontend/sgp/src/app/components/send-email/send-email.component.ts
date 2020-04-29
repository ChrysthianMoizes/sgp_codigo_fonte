import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor() { }

  email = new FormControl('', Validators.required);
  ngOnInit(): void {
  }

  showEmail() {
    alert(this.email.value);
  }

}
