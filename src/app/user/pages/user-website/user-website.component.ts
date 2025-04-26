import { Component } from '@angular/core';
import {
  UserFormPasswordSettingsComponent
} from '../../components/user-form-password-settings/user-form-password-settings.component';
import {UserFormSettingsComponent} from '../../components/user-form-settings/user-form-settings.component';
import {
  UserInformationsSettingsComponent
} from '../../components/user-informations-settings/user-informations-settings.component';
import {
  UserWebsitesInformationsComponent
} from '../../components/user-websites-informations/user-websites-informations.component';
import {
  UserWebsitesContractsInformationsComponent
} from '../../components/user-websites-contracts-informations/user-websites-contracts-informations.component';
import {
  UserWebsitesMaintenanceContractsComponent
} from '../../components/user-websites-maintenance-contracts/user-websites-maintenance-contracts.component';
import {UserWebsitesDisplayComponent} from '../../components/user-websites-display/user-websites-display.component';

@Component({
  selector: 'app-user-website',
  imports: [
    UserFormPasswordSettingsComponent,
    UserFormSettingsComponent,
    UserInformationsSettingsComponent,
    UserWebsitesInformationsComponent,
    UserWebsitesContractsInformationsComponent,
    UserWebsitesMaintenanceContractsComponent,
    UserWebsitesDisplayComponent
  ],
  templateUrl: './user-website.component.html',
})
export class UserWebsiteComponent {

}
