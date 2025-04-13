import {Component, inject, Input} from '@angular/core';
import {AdminUsersService} from '../../../../../services/admin/admin-users.service';

@Component({
  selector: 'app-dashboard-admin-users-metrics',
  imports: [],
  templateUrl: './dashboard-admin-users-metrics.component.html',
})
export class DashboardAdminUsersMetricsComponent {
  adminUsersService = inject(AdminUsersService);

  countCompany() {
    return this.adminUsersService.users().filter(user => user.companyName != null).length;
  }

  countParticulier() {
    return this.adminUsersService.users().filter(user => user.companyName == null).length;
  }
}
