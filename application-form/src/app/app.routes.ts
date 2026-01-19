import { Routes } from '@angular/router';
import { SurveyComponent } from './features/survey/survey';

export const routes: Routes = [
  {
    path: '', // Note: Case sensitive if you want uppercase S
    children: [
      { path: 'Index', component: SurveyComponent }, // Result: /Survey/Index
      { path: 'IndexAr', component: SurveyComponent }, // Result: /Survey/Index
      { path: '', redirectTo: 'Index', pathMatch: 'full' }, // Redirects /Survey to /Survey/Index
    ],
  },
];
