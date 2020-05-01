import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert',
  providers: [MessageService],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() tipo: string;
  @Input() mensagem: string;
  tiposimbolo: string;
  tipostring: string;

  constructor(private messageService: MessageService) {}

  clear() {
    this.messageService.clear();
  }

  showConfirm() {
    this.clear();
    this.verifyType(this.tipo);
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: this.tipo,
      summary: this.tipostring,
      detail: this.mensagem,
    });
  }

  verifyType(tipo: string) {
    {
      switch (tipo) {
        case 'success':
          this.tiposimbolo = 'pi-check';
          this.tipostring = 'Sucesso!';
          break;
        case 'error':
          this.tiposimbolo = 'pi-times';
          this.tipostring = 'Erro!';
          break;
        default:
          this.tiposimbolo = 'pi-exclamation-triangle';
          this.tipostring = 'Atenção!';
          break;
      }
    }
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }
}
