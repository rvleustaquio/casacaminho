import { Routes } from '@angular/router';
import { DashboardComponent } from './features/_dashboard/dashboard.component';
import { AssistidosComponent } from './features/assistidos/assistidos.component';
import { EstadosCivisComponent } from './features/estados-civis/estados-civis.component';
import { PrazosComponent } from './features/prazos/prazos.component';
import { RootFeaturesComponent } from './features/root-features.component';
import { ServicosComponent } from './features/servicos/servicos.component';
import { SitAssistidosComponent } from './features/sit-assistidos/sit-assistidos.component';

export const routes: Routes = [
  {
    path: '',
    component: RootFeaturesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'estados-civis', component: EstadosCivisComponent },
      { path: 'sit-assistidos', component: SitAssistidosComponent },
      { path: 'prazos', component: PrazosComponent },
      { path: 'servicos', component: ServicosComponent },
      { path: 'assistidos', component: AssistidosComponent },
    ],
  },
];
