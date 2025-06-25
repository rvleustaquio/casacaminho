import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'root-features',
  imports: [
    RouterOutlet,
    ButtonModule,
    TieredMenuModule,
    MenuModule,
    TooltipModule,
    ToastModule,
  ],
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
            label: 'Estados Civis',
            routerLink: 'estado-civil',
          },
          {
            label: 'Situações do Assistido',
            routerLink: 'situacao-assistido',
          },
          {
            label: 'Prazos',
            routerLink: 'prazo',
          },
        ],
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Assistidos',
            routerLink: 'assistido',
          },
        ],
      },
    ];
  }
}
