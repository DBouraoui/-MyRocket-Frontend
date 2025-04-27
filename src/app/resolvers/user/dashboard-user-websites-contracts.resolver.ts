import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserWebsitesService } from '../../services/user/user-websites.service';
import { Observable } from 'rxjs';
import { Contracts } from '../../types/Website';

export const dashboardUserWebsitesContractsResolver: ResolveFn<Observable<Contracts[]>> = () => {
  const contractService = inject(UserWebsitesService);

  return contractService.refreshContract();
};
