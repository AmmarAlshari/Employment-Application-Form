import { Routes } from '@angular/router';
import { SurveyComponent } from './components/survey/survey';
import { ApplicationSuccess } from './components/application-success/application-success';

export const routes: Routes = [
  {
    path: '', // Note: Case sensitive if you want uppercase S
    children: [
      { path: 'Index', component: SurveyComponent }, // Result: /Survey/Index
      { path: 'IndexAr', component: SurveyComponent }, // Result: /Survey/Index
      { path: 'application-success', component: ApplicationSuccess },
      { path: '', redirectTo: 'Index', pathMatch: 'full' }, // Redirects /Survey to /Survey/Index
    ],
  },
];
