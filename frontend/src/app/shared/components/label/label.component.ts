import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'b-label',
  template: `
    <ng-content></ng-content>
    <span id="required-icon" title="Este campo é obrigatório" *ngIf="required">
      *
    </span>
  `,
  styleUrl: './label.component.scss',
  imports: [CommonModule],
})
export class LabelComponent {
  @Input() required?: boolean = false;
}
