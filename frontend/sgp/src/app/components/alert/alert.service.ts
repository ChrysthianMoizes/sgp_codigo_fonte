import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private tipoString: string;

  constructor(private messageService: MessageService) {}

  limpar(): void {
    this.messageService.clear();
  }

  verificarTipo(tipo: string): void {
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

  montarAlerta(tipo: string, tipoString: string, mensagem: string): void {
    this.messageService.clear('c');
    this.verificarTipo(tipo);
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: tipo,
      summary: tipoString,
      detail: mensagem,
    });
  }

  confirmar(): void {
    this.messageService.clear('c');
  }

  rejeitar(): void {
    this.messageService.clear('c');
  }
}
