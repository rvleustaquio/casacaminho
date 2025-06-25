import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'feature-actions',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './feature-actions.component.html',
})
export class FeatureActionsComponent {
  // External properties
  @Output() onEditing = new EventEmitter();
  @Output() onRemoving = new EventEmitter();

  // Events methods
  onEditingAction() {
    this.onEditing.emit();
  }

  onRemovingAction() {
    this.onRemoving.emit();
  }
}
