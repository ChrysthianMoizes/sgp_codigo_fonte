import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './loading.service';

const spinnerMessage = 'Loading...';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  @Input() show: boolean;
  loadingText: string;

  constructor(
    private spinner: NgxSpinnerService,
    private spinnerService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingText = spinnerMessage;
    this.spinnerService.getData().subscribe((data) => {
      if (data) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
