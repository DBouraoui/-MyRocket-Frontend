import { Routes } from '@angular/router';
import { AnonymousComponent } from './layout/anonymous/anonymous.component';
import {HomeComponent} from './anonymous/pages/home/home.component';
import {LoginComponent} from './anonymous/pages/login/login.component';
import {DashboardComponent} from './user/pages/dashboard/dashboard.component';
import {UserComponent} from './layout/user/user.component';
import {ErrorComponent} from './anonymous/pages/error/error.component';
import {AdminComponent} from './layout/admin/admin.component';
import {DashboardAdminComponent} from './admin/pages/dashboard/dashboard.component';
import {UtilisateurComponent} from './admin/pages/utilisateur/utilisateur.component';
import {dashboardAdminUsersResolver} from './resolvers/dashboard-admin-users.resolver';
import {ProjectsComponent} from './admin/pages/projects/projects.component';
import {dashboardAdminProjectResolver} from './resolvers/dashboard-admin-project.resolver';

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
    path: 'administration',
    component: AdminComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
        title: 'Pannel d\'administration',
      },
      {
        path: 'utilisateurs',
        component: UtilisateurComponent,
        resolve: {users: dashboardAdminUsersResolver},
        title: 'Gestion des utilisateurs',
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        resolve: {projects: dashboardAdminProjectResolver},
        title: 'Gestion des projects',
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];
