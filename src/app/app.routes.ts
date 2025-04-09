import { Routes } from '@angular/router';
import { AnonymousComponent } from './layout/anonymous/anonymous.component';
import {HomeComponent} from './anonymous/pages/home/home.component';
import {LoginComponent} from './anonymous/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: AnonymousComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'MyRocket',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Connexion utilisateur',
      },
    ],
  }
];
