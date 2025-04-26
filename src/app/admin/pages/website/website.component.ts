import { Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import {
  AdminDashboardWebsiteCreateComponent
} from './components/admin-dashboard-website-create/admin-dashboard-website-create.component';
import {
  AdminDashboardWebsiteAddContractComponent
} from './components/admin-dashboard-website-add-contract/admin-dashboard-website-add-contract.component';
import {
  AdminDashboardWebsiteAddConfigurationComponent
} from './components/admin-dashboard-website-add-configuration/admin-dashboard-website-add-configuration.component';

@Component({
  selector: 'app-website',
  imports: [
    ReactiveFormsModule,
    AdminDashboardWebsiteCreateComponent,
    AdminDashboardWebsiteAddContractComponent,
    AdminDashboardWebsiteAddConfigurationComponent,
  ],
  templateUrl: './website.component.html',
})
export class WebsiteComponent {


}
