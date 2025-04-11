import {Component} from '@angular/core';
import {ContactComponent} from '../contact/contact.component';
import {
  DashboardAdminUsersMetricsComponent
} from '../utilisateur/components/dashboard-admin-users-metrics/dashboard-admin-users-metrics.component';
import {
  DashboardAdminUsersSearchComponent
} from '../utilisateur/components/dashboard-admin-users-search/dashboard-admin-users-search.component';
import {CreateUserFormComponent} from '../utilisateur/components/create-user-form/create-user-form.component';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    ContactComponent,
    DashboardAdminUsersMetricsComponent,
    DashboardAdminUsersSearchComponent,
    CreateUserFormComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardAdminComponent {
}
