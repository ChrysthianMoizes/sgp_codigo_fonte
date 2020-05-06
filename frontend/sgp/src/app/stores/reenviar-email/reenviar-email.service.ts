import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReenviarEmailService {

  constructor() { }

  reenviarEmailConfirmacao(email: string): Observable<void> {
    return of();
  }
}
