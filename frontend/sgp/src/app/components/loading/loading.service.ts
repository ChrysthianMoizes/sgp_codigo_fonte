import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private showSpinner = new Subject();

  constructor() {
  }

  getData() {
    return this.showSpinner;
  }

  activate() {
    this.showSpinner.next(true);
  }

  deactivate() {
    this.showSpinner.next(false);
  }
}
