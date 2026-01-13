import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-gard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
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
    canActivateChild: [authGuard],
    children: [
      {
        path: 'application',
        loadComponent: () =>
          import('./components/applications/applications').then((m) => m.Application),
        data: { roles: ['ADMIN', 'HR'] },
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
        data: { roles: ['ADMIN', 'HR'] },
      },
      {
        path: 'users',
        loadComponent: () => import('./components/users/users').then((m) => m.Users),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./components/unauthorized/unauthorized').then((m) => m.Unauthorized),
      },
    ],
  },
];
