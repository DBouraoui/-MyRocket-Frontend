import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Website } from '../../types/Website';
import { inject } from '@angular/core';
import { UserWebsitesService } from '../../services/user/user-websites.service';

export const dashboardUserWebsiteAllInformationsResolver: ResolveFn<Observable<Website[]>> = (
) => {
  const websiteService = inject(UserWebsitesService);

  return websiteService.refreshWebsiteAllInformations();
};
