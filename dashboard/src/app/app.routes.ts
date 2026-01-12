import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'application',
        loadComponent: () =>
          import('./components/applications/applications').then((m) => m.Application),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
