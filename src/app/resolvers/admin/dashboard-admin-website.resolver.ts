import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Website } from '../../types/Website';
import { inject } from '@angular/core';
import { AdminWebsiteService } from '../../services/admin/admin-website.service';

export const dashboardAdminWebsiteResolver: ResolveFn<Observable<Website[]>> = (route, state) => {
  const websiteService = inject(AdminWebsiteService);

  return websiteService.refreshWebsite();
};

