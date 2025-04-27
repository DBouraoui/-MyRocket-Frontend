import { Routes } from '@angular/router';
import { AnonymousComponent } from './layout/anonymous/anonymous.component';
import { HomeComponent } from './anonymous/pages/home/home.component';
import { LoginComponent } from './anonymous/pages/login/login.component';
import { DashboardComponent } from './user/pages/dashboard/dashboard.component';
import { UserComponent } from './layout/user/user.component';
import { AdminComponent } from './layout/admin/admin.component';
import { DashboardAdminComponent } from './admin/pages/dashboard/dashboard.component';
import { UtilisateurComponent } from './admin/pages/utilisateur/utilisateur.component';
import { dashboardAdminUsersResolver } from './resolvers/admin/dashboard-admin-users.resolver';
import { ProjectsComponent } from './admin/pages/projects/projects.component';
import { dashboardAdminProjectResolver } from './resolvers/admin/dashboard-admin-project.resolver';
import { ContactComponent } from './anonymous/pages/contact/contact.component';
import { dashboardAdminContactResolver } from './resolvers/admin/dashboard-admin-contact.resolver';
import { anonymousProjectsResolver } from './resolvers/anonymous/anonymous-projects.resolver';
import { AdminContactComponent } from './admin/pages/contact/contact.component';
import { UserSettingsComponent } from './user/pages/user-settings/user-settings.component';
import { dashboardUserSettingsResolver } from './resolvers/user/dashboard-user-settings.resolver';
import { UserWebsiteComponent } from './user/pages/user-website/user-website.component';
import { dashboardUserWebsitesInformationsResolver } from './resolvers/user/dashboard-user-websites-informations.resolver';
import { dashboardUserWebsitesContractsResolver } from './resolvers/user/dashboard-user-websites-contracts.resolver';
import { dashboardUserWebsitesMaintenanceContractsResolver } from './resolvers/user/dashboard-user-websites-maintenance-contracts.resolver';
import { dashboardUserWebsiteAllInformationsResolver } from './resolvers/user/dashboard-user-website-all-informations.resolver';
import { UserTransactionComponent } from './user/pages/user-transaction/user-transaction.component';
import { dashboardUserTransactionResolver } from './resolvers/user/dashboard-user-transaction.resolver';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { WebsiteComponent } from './admin/pages/website/website.component';
import { dashboardAdminWebsiteResolver } from './resolvers/admin/dashboard-admin-website.resolver';
import { dashboardAdminAllInformationResolver } from './resolvers/admin/dashboard-admin-all-information.resolver';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: AnonymousComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: { projects: anonymousProjectsResolver },
        title: 'MyRocket',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Connexion utilisateur',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Nous contactés',
      },
    ],
  },
  {
    path: 'utilisateur',
    component: UserComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          website: dashboardUserWebsitesInformationsResolver,
          contracts: dashboardUserWebsitesContractsResolver,
          mainteanceContracts: dashboardUserWebsitesMaintenanceContractsResolver,
          transactions: dashboardUserTransactionResolver,
          informations: dashboardUserSettingsResolver,
        },
        title: "Pannel d'administration",
      },
      {
        path: 'informations',
        resolve: { informations: dashboardUserSettingsResolver },
        component: UserSettingsComponent,
        title: 'Mes informations',
      },
      {
        path: 'paiments',
        component: UserTransactionComponent,
        resolve: { transactions: dashboardUserTransactionResolver },
        title: 'Mes paiments',
      },
      {
        path: 'website',
        component: UserWebsiteComponent,
        resolve: {
          website: dashboardUserWebsitesInformationsResolver,
          contracts: dashboardUserWebsitesContractsResolver,
          mainteanceContracts: dashboardUserWebsitesMaintenanceContractsResolver,
          allinformation: dashboardUserWebsiteAllInformationsResolver,
        },
        title: 'Mes sites web',
      },
    ],
  },
  {
    path: 'administration',
    component: AdminComponent,
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
        resolve: {
          users: dashboardAdminUsersResolver,
          contact: dashboardAdminContactResolver,
          projects: dashboardAdminProjectResolver,
        },
        title: "Pannel d'administration",
      },
      {
        path: 'utilisateurs',
        component: UtilisateurComponent,
        resolve: { users: dashboardAdminUsersResolver },
        title: 'Gestion des utilisateurs',
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        resolve: { projects: dashboardAdminProjectResolver },
        title: 'Gestion des projects',
      },
      {
        path: 'contact',
        component: AdminContactComponent,
        resolve: { contact: dashboardAdminContactResolver },
        title: 'Gestion des contacts',
      },
      {
        path: 'website',
        component: WebsiteComponent,
        resolve: { users: dashboardAdminUsersResolver, website: dashboardAdminWebsiteResolver,allInformations: dashboardAdminAllInformationResolver },
        title: 'Gestion des sites web',
      },
    ],
  },
];
