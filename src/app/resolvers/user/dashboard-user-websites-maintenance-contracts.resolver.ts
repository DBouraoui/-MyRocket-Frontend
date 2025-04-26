import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserWebsitesService } from '../../services/user/user-websites.service';
import { Observable } from 'rxjs';
import { MaintenanceContract } from '../../types/Website';

export const dashboardUserWebsitesMaintenanceContractsResolver: ResolveFn<
  Observable<MaintenanceContract[]>
> = () => {
  const websiteService = inject(UserWebsitesService);

  return websiteService.refreshMaintenanceContract();
};
