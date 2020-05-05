import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetarSenhaService {

  constructor() { }

  resetarSenha(email: string): Observable<void> {
    return of();
  }
}
