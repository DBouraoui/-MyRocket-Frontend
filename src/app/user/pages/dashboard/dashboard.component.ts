import { Component } from '@angular/core';
import { UserWebsitesDisplayComponent } from '../../components/user-websites-display/user-websites-display.component';
import { UserWebsitesInformationsComponent } from '../../components/user-websites-informations/user-websites-informations.component';
import { UserWebsitesMaintenanceContractsComponent } from '../../components/user-websites-maintenance-contracts/user-websites-maintenance-contracts.component';
import { UserInformationsSettingsComponent } from '../../components/user-informations-settings/user-informations-settings.component';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    UserWebsitesDisplayComponent,
    UserWebsitesInformationsComponent,
    UserWebsitesMaintenanceContractsComponent,
    UserInformationsSettingsComponent,
    ButtonDirective,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
