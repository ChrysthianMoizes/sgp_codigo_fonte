import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  constructor() { }
  cadastrar(): Observable<string> {
    return of<string>("tokenAceito");
  }
}
