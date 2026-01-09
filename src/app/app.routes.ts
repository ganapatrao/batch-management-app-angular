import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { BatchMaster } from './pages/batch-master/batch-master';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',// if admin -- admin/batch suppose if we keep this empty it will be /batch
    component: Layout,
    children: [
      {
        path: 'batch',
        component: BatchMaster,
      },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate:[authGuard]
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
