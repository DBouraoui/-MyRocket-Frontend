import {Component, inject} from '@angular/core';
import {
  DashboardAdminProjectsFormCreateComponent,
} from './components/dashboard-admin-projects-form-create/dashboard-admin-projects-form-create.component';
import {AdminProjectsService} from '../../../services/admin-projects.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [
    DashboardAdminProjectsFormCreateComponent,
    DatePipe
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  adminProjectsService = inject(AdminProjectsService);

  constructor() {
  }

}
