import { Routes } from '@angular/router';
import { AnonymousComponent } from './layout/anonymous/anonymous.component';
import {HomeComponent} from './anonymous/pages/home/home.component';
import {LoginComponent} from './anonymous/pages/login/login.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {UserComponent} from './layout/user/user.component';
import {ErrorComponent} from './anonymous/pages/error/error.component';

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
  },
  {
    path: 'utilisateur',
    component: UserComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Pannel d\'administration',
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];
