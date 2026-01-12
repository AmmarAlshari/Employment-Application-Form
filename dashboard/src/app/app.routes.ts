import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./components/signin/signin').then((m) => m.Signin),
      },
    ],
  },
  {
    path: '',
    component: AdminLayout,
    // canActivateChild: [authGuard],
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
      {
        path: 'users',
        loadComponent: () => import('./components/users/users').then((m) => m.Users),
      },
    ],
  },
];
