import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'b-feature-actions',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './feature-actions.component.html',
})
export class FeatureActionsComponent {
  // External properties
  @Input() showEditar: boolean = true;
  @Input() showExcluir: boolean = true;
  @Output() onEditar = new EventEmitter();
  @Output() onExcluir = new EventEmitter();

  // Events methods
  onEditarAction() {
    this.onEditar.emit();
  }

  onExcluirAction() {
    this.onExcluir.emit();
  }
}
