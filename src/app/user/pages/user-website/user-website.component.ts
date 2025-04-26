import { Component } from '@angular/core';
import { UserWebsitesInformationsComponent } from '../../components/user-websites-informations/user-websites-informations.component';
import { UserWebsitesContractsInformationsComponent } from '../../components/user-websites-contracts-informations/user-websites-contracts-informations.component';
import { UserWebsitesMaintenanceContractsComponent } from '../../components/user-websites-maintenance-contracts/user-websites-maintenance-contracts.component';
import { UserWebsitesDisplayComponent } from '../../components/user-websites-display/user-websites-display.component';

@Component({
  selector: 'app-user-website',
  imports: [
    UserWebsitesInformationsComponent,
    UserWebsitesContractsInformationsComponent,
    UserWebsitesMaintenanceContractsComponent,
    UserWebsitesDisplayComponent,
  ],
  templateUrl: './user-website.component.html',
})
export class UserWebsiteComponent {}
