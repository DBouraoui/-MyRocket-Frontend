import { ResolveFn } from '@angular/router';
import {Observable} from 'rxjs';
import {Website} from '../../types/Website';
import {inject} from '@angular/core';
import {UserWebsitesService} from '../../services/user/user-websites.service';

export const dashboardUserWebsitesInformationsResolver: ResolveFn<Observable<Website[]>> = (route, state) => {
const websitesInformations = inject(UserWebsitesService);

return websitesInformations.refreshWebsites();

};

