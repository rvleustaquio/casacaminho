import { Routes } from '@angular/router';

import { DashboardComponent } from './features/_dashboard/dashboard.component';
import { EstadoCivilComponent } from './features/estado-civil/estado-civil.component';
import { RootFeaturesComponent } from './features/root-features.component';

export const routes: Routes = [
  {
    path: '',
    component: RootFeaturesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'estado-civil', component: EstadoCivilComponent },
    ],
  },
];
