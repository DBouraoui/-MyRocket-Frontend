import {Component, inject} from '@angular/core';
import {
  DashboardAdminProjectsFormCreateComponent,
} from './components/dashboard-admin-projects-form-create/dashboard-admin-projects-form-create.component';
import {AdminProjectsService} from '../../../services/admin-projects.service';

@Component({
  selector: 'app-projects',
  imports: [
    DashboardAdminProjectsFormCreateComponent
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  adminProjectsService = inject(AdminProjectsService);

  constructor() {
    console.log(this.adminProjectsService.projects())
  }

}
