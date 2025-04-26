import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserSettingsService } from '../../services/user/user-settings.service';
import { Observable } from 'rxjs';
import { User } from '../../types/User';

export const dashboardUserSettingsResolver: ResolveFn<Observable<User>> = () => {
  const userInformations = inject(UserSettingsService);

  return userInformations.refreshInformations();
};
