import { Component } from '@angular/core';
import { UserWebsitesDisplayComponent } from '../../components/user-websites-display/user-websites-display.component';
import { UserWebsitesInformationsComponent } from '../../components/user-websites-informations/user-websites-informations.component';
import { UserWebsitesMaintenanceContractsComponent } from '../../components/user-websites-maintenance-contracts/user-websites-maintenance-contracts.component';
import { UserInformationsSettingsComponent } from '../../components/user-informations-settings/user-informations-settings.component';
import { ButtonDirective } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    UserWebsitesInformationsComponent,
    UserWebsitesMaintenanceContractsComponent,
    UserInformationsSettingsComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
