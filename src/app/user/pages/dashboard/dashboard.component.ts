import { Component } from '@angular/core';
import { UserWebsitesDisplayComponent } from '../../components/user-websites-display/user-websites-display.component';
import { UserWebsitesInformationsComponent } from '../../components/user-websites-informations/user-websites-informations.component';
import { UserWebsitesMaintenanceContractsComponent } from '../../components/user-websites-maintenance-contracts/user-websites-maintenance-contracts.component';
import { UserInformationsSettingsComponent } from '../../components/user-informations-settings/user-informations-settings.component';
import { Button, ButtonDirective } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    UserWebsitesInformationsComponent,
    UserWebsitesMaintenanceContractsComponent,
    UserInformationsSettingsComponent,
    RouterLink,
    Button,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  /**
   * Télécharge le contrat de maintenance
   */
  downloadMaintenanceContract() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'Contrat-de-maintenance.pdf');
    link.setAttribute('download', 'Contrat-de-maintenance.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Télécharge le contrat de création de site web
   */
  downloadWebsiteContract() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'Contrat-creation.pdf');
    link.setAttribute('download', 'Contrat-creation.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
