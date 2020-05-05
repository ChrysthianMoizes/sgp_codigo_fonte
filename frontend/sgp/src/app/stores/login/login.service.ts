import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() {

   }

   logar(): Observable<string>{

    return of<string>("tokenAceito")

  }
}


