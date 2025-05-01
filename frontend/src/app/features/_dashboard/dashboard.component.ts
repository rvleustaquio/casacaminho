import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, CardModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
