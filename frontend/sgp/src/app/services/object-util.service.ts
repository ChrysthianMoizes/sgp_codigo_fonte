import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectUtil {
  walk(objeto: Object, caminho: string): Object {
    const campo = caminho.split('.');
    let objetoAtual = objeto;
    campo.forEach((cp) => {
      objetoAtual = objetoAtual[cp];
    });
    return objetoAtual;
  }
}
