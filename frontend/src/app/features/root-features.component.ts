import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'root-features',
  imports: [RouterOutlet, ButtonModule, TieredMenuModule, MenuModule],
  templateUrl: './root-features.component.html',
})
export class RootFeaturesComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Tabelas',
        items: [
          {
            label: 'Estado Civil',
            routerLink: 'estado-civil',
          },
          {
            label: 'Situação do Assistido',
          },
          {
            label: 'Prazo',
          },
        ],
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Assistidos',
          },
        ],
      },
    ];
  }
}
