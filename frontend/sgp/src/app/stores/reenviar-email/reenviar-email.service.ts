import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReenviarEmailService {

  constructor() { }

  reenviarEmailConfirmacao(email: string): Observable<void> {
    return of();
  }
}
