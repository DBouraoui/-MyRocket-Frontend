import { Component } from '@angular/core';
import {
  DashboardAdminProjectsFormCreateComponent,
} from './components/dashboard-admin-projects-form-create/dashboard-admin-projects-form-create.component';

@Component({
  selector: 'app-projects',
  imports: [
    DashboardAdminProjectsFormCreateComponent
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

}
