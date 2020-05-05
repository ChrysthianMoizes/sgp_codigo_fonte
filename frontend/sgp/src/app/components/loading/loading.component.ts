import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './loading.service';

const SPINNER_MESSAGE = 'Loading...';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  @Input() show: boolean;
  LOADING_TEXT: string;
  constructor(
    private spinner: NgxSpinnerService,
    private spinnerService: LoadingService
  ) {}

  ngOnInit(): void {
    this.LOADING_TEXT = SPINNER_MESSAGE;
    this.spinnerService.getData().subscribe((data) => {
      if (data) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
