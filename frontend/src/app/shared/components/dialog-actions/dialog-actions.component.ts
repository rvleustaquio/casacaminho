import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';

interface entity {
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

@Component({
  selector: 'b-dialog-actions',
  imports: [CommonModule, ButtonModule, TooltipModule, PopoverModule],
  templateUrl: './dialog-actions.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        justify-content: space-between;
      }

      .audit-entity-info {
        border-spacing: 0px;
        border-collapse: collapse;

        tbody > tr > td {
          border: rgb(230, 230, 230) 1px solid;
          border-width: 1px;
          padding: 0.5rem 0.5rem;
        }
      }
    `,
  ],
})
export class DialogActionsComponent {
  // External properties
  @Input() entity: entity | undefined;
  @Input() disabled: boolean = true;
  @Input() loading: boolean = false;
  @Input() showSalvarContinuar: boolean = false;
  @Output() onSalvar = new EventEmitter();
  @Output() onSalvarContinuar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();

  // Events methods
  onSalvarAction() {
    this.onSalvar.emit();
  }

  onSalvarContinuarAction() {
    this.onSalvarContinuar.emit();
  }

  onCancelarAction() {
    this.onCancelar.emit();
  }
}
