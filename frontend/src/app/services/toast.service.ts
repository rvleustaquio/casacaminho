import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Classe utilizada para emissão de mensagens toast
 * Basta fazer um injection no construtor do componente que deseja utilizar
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  timeToClose: number = 5000;

  constructor(private messageService: MessageService) {}

  simple(msg: any) {
    const severity = msg.severity ? msg.severity : 'error';
    const detail = msg.detail ? msg.detail : 'Erro desconhecido';
    const summaries: Record<string, string> = {
      success: 'Sucesso',
      info: 'Informação',
      warn: 'Atenção',
      error: 'Erro',
    };
    const summary = summaries[severity] || 'Erro';

    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: this.timeToClose,
    });
  }
}
