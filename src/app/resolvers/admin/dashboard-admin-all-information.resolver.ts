import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AdminWebsiteService } from '../../services/admin/admin-website.service';
import { Observable } from 'rxjs';
import { Website } from '../../types/Website';

export const dashboardAdminAllInformationResolver: ResolveFn<Observable<Website[]>> = (route, state) => {
  const adminService = inject(AdminWebsiteService);

  return adminService.refreshAllInformation();
};
