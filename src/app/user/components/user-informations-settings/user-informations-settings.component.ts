import {Component, inject} from '@angular/core';
import {UserSettingsService} from '../../../services/user/user-settings.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-informations-settings',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './user-informations-settings.component.html',
})
export class UserInformationsSettingsComponent {
  userSettingsService =  inject(UserSettingsService);


}
