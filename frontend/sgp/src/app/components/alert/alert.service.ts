import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  private tipoString: string;

  limpar() {
    this.messageService.clear();
  }

  verificarTipo(tipo: string) {
    {
      switch (tipo) {
        case 'success':
          this.tipoString = 'Sucesso!';
          break;
        case 'error':
          this.tipoString = 'Erro!';
          break;
        default:
          this.tipoString = 'Atenção!';
          break;
      }
    }
  }

  montarAlerta(tipo: string, tipoString: string, mensagem: string) {
    this.verificarTipo(tipo);
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: tipo,
      summary: tipoString,
      detail: mensagem,
    });
  }

  confirmar() {
    this.messageService.clear('c');
  }

  rejeitar() {
    this.messageService.clear('c');
  }
}
