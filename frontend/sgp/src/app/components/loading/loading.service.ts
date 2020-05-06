import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private showSpinner = new Subject();
  getData() {
    return this.showSpinner;
  }
  activate() {
    this.showSpinner.next(true);
  }
  deactivate() {
    this.showSpinner.next(false);
  }
  constructor() {}
}
