import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-estado-civil',
  imports: [CardModule, TableModule, ButtonModule, ToggleButtonModule],
  templateUrl: './estado-civil.component.html',
})
export class EstadoCivilComponent {
  // Layout properties
  header = 'Estados Civis';

  // Data properties
  data = [
    {
      name: 'Solteiro',
    },
    {
      name: 'Casado',
    },
    {
      name: 'Divorciado',
    },
    {
      name: 'Viúvo',
    },
    {
      name: 'Separado',
    },
    {
      name: 'União Estável',
    },
  ];
}
