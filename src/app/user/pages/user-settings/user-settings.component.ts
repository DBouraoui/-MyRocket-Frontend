import { Component, inject } from '@angular/core';
import { UserSettingsService } from '../../../services/user/user-settings.service';
import { UserFormSettingsComponent } from '../../components/user-form-settings/user-form-settings.component';
import { UserInformationsSettingsComponent } from '../../components/user-informations-settings/user-informations-settings.component';
import { UserFormPasswordSettingsComponent } from '../../components/user-form-password-settings/user-form-password-settings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  imports: [
    UserFormSettingsComponent,
    UserInformationsSettingsComponent,
    UserFormPasswordSettingsComponent,
  ],
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent {
  user = inject(UserSettingsService);
  router = inject(Router);
}
