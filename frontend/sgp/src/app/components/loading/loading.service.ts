import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private showSpinner = new Subject();

  constructor() {}

  getData(): Subject<any> {
    return this.showSpinner;
  }

  activate(): void {
    this.showSpinner.next(true);
  }

  deactivate(): void {
    this.showSpinner.next(false);
  }
}
