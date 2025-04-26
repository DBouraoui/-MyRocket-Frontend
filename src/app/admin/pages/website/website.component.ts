import { Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import {
  AdminDashboardWebsiteCreateComponent
} from './components/admin-dashboard-website-create/admin-dashboard-website-create.component';
import {
  AdminDashboardWebsiteAddContractComponent
} from './components/admin-dashboard-website-add-contract/admin-dashboard-website-add-contract.component';

@Component({
  selector: 'app-website',
  imports: [
    ReactiveFormsModule,
    AdminDashboardWebsiteCreateComponent,
    AdminDashboardWebsiteAddContractComponent,
  ],
  templateUrl: './website.component.html',
})
export class WebsiteComponent {


}
