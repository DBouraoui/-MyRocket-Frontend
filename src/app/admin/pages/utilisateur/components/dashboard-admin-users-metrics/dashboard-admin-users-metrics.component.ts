import {Component, Input} from '@angular/core';
import {User} from '../../../../../types/User';

@Component({
  selector: 'app-dashboard-admin-users-metrics',
  imports: [],
  templateUrl: './dashboard-admin-users-metrics.component.html',
})
export class DashboardAdminUsersMetricsComponent {
  @Input() users: User[] = [];

  countCompany() {
    return this.users.filter(user => user.companyName != null).length;
  }

  countParticulier() {
    return this.users.filter(user => user.companyName == null).length;
  }
}
