import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'b-feature-toolbar',
  imports: [ButtonModule, TooltipModule, DividerModule],
  templateUrl: './feature-toolbar.component.html',
})
export class FeatureToolbarComponent {
  // External properties
  @Input() header: string = '';
  @Output() onNovo = new EventEmitter();
  @Output() onLimparFiltros = new EventEmitter();
  @Output() onAtualizarLista = new EventEmitter();

  // Events methods
  onNovoAction() {
    this.onNovo.emit();
  }

  onLimparFiltrosAction() {
    this.onLimparFiltros.emit();
  }

  onAtualizarListaAction() {
    this.onAtualizarLista.emit();
  }
}
