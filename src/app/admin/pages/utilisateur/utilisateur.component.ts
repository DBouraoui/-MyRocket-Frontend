import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateUserFormComponent} from './components/create-user-form/create-user-form.component';
import {
  DashboardAdminUsersMetricsComponent
} from './components/dashboard-admin-users-metrics/dashboard-admin-users-metrics.component';
import {
  DashboardAdminUsersSearchComponent
} from './components/dashboard-admin-users-search/dashboard-admin-users-search.component';


@Component({
  selector: 'app-utilisateur',
  imports: [
    Button,
    ReactiveFormsModule,
    CreateUserFormComponent,
    DashboardAdminUsersMetricsComponent,
    DashboardAdminUsersSearchComponent,
  ],
  templateUrl: './utilisateur.component.html',
})
export class UtilisateurComponent {

}
